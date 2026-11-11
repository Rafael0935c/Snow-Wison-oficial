import { describe, expect, it } from "vitest";
import { isValidPhoneNumber } from "libphonenumber-js/max";
import {
  OBJETIVOS,
  NIVEIS,
  URGENCIAS,
  labelOf,
  priorityFromUrgencia,
} from "@/config/quiz";
import { firstName, normalizeName, validateName } from "@/lib/quiz/name";
import { BR_DDDS, formatBrPhone, parseBrMobile } from "@/lib/quiz/phone";
import { listCountries, parseIntlPhone } from "@/lib/quiz/phoneIntl";
import { buildWhatsAppMessage, leadCodeFromId } from "@/lib/quiz/message";

describe("config do quiz", () => {
  it("ids únicos em cada pergunta", () => {
    for (const lista of [OBJETIVOS, NIVEIS, URGENCIAS]) {
      const ids = lista.map((o) => o.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("prioridade derivada da urgência", () => {
    expect(priorityFromUrgencia("imediato")).toBe("quente");
    expect(priorityFromUrgencia("ate-1-mes")).toBe("quente");
    expect(priorityFromUrgencia("ate-3-meses")).toBe("morno");
    expect(priorityFromUrgencia("sem-prazo")).toBe("frio");
  });

  it("rótulo por id", () => {
    expect(labelOf("objetivo", "viagem")).toBe("Viagens e intercâmbio");
    expect(labelOf("nivel", "inexistente")).toBe("");
  });
});

describe("nome", () => {
  it("aceita nomes reais com acento, apóstrofo e hífen", () => {
    for (const nome of ["Maria Clara", "João", "D'Ávila", "Ana-Lu", "Zé"]) {
      expect(validateName(nome)).toEqual({ ok: true, value: nome });
    }
  });

  it("junta espaços e corta as pontas", () => {
    expect(validateName("  Maria    Clara ")).toEqual({
      ok: true,
      value: "Maria Clara",
    });
  });

  it("recusa o que não é nome", () => {
    for (const nome of [
      "",
      "A",
      "R2D2",
      "Maria 😀",
      "--",
      "Ana!",
      "x".repeat(61),
    ]) {
      expect(validateName(nome).ok).toBe(false);
    }
  });

  it("quebra de linha vira espaço, nunca linha nova", () => {
    expect(normalizeName("Maria\nCódigo: SW-FALSO")).toBe(
      "Maria Código: SW-FALSO"
    );
    expect(firstName("  maria clara ")).toBe("maria");
  });
});

describe("celular brasileiro", () => {
  it("máscara enquanto digita", () => {
    expect(formatBrPhone("2")).toBe("(2");
    expect(formatBrPhone("21")).toBe("(21");
    expect(formatBrPhone("219")).toBe("(21) 9");
    expect(formatBrPhone("2199999")).toBe("(21) 99999");
    expect(formatBrPhone("21999998888")).toBe("(21) 99999-8888");
    expect(formatBrPhone("2199999888877")).toBe("(21) 99999-8888");
  });

  it("normaliza para E.164 aceitando os jeitos comuns de digitar", () => {
    for (const entrada of [
      "(21) 99999-8888",
      "21999998888",
      "+55 21 99999-8888",
      "5521999998888",
      "021999998888",
    ]) {
      const r = parseBrMobile(entrada);
      expect(r).toMatchObject({ ok: true, e164: "+5521999998888" });
    }
  });

  it("recusa fixo, DDD inexistente e tamanho errado", () => {
    for (const entrada of [
      "(21) 3333-4444",
      "(20) 99999-8888",
      "2199999888",
      "",
    ]) {
      expect(parseBrMobile(entrada).ok).toBe(false);
    }
  });

  it("concorda com a libphonenumber-js (usada pelo servidor) em todo DDD", () => {
    for (const ddd of BR_DDDS) {
      const numero = `+55${ddd}987654321`;
      expect(parseBrMobile(numero).ok).toBe(true);
      expect(isValidPhoneNumber(numero)).toBe(true);
    }
  });
});

describe("telefone internacional", () => {
  it("valida e normaliza com o país escolhido", () => {
    expect(parseIntlPhone("912 345 678", "PT")).toMatchObject({
      ok: true,
      e164: "+351912345678",
      country: "PT",
    });
    expect(parseIntlPhone("123", "PT").ok).toBe(false);
  });

  it("lista de países em português, sem o Brasil", () => {
    const paises = listCountries();
    expect(paises.find((p) => p.code === "BR")).toBeUndefined();
    expect(paises.find((p) => p.code === "US")?.dial).toBe("+1");
    expect(paises.find((p) => p.code === "DE")?.name).toBe("Alemanha");
  });
});

describe("mensagem do WhatsApp", () => {
  const answers = {
    objetivo: "viagem",
    nivel: "intermediario",
    urgencia: "imediato",
  } as const;

  it("código curto derivado do id do lead", () => {
    expect(leadCodeFromId("4f2a9c1e-0000-4000-8000-000000000000")).toBe(
      "SW-4F2A9C"
    );
  });

  it("segue o modelo, com rótulos e código", () => {
    expect(
      buildWhatsAppMessage({ name: "Rafael", answers, code: "SW-4F2A9C" })
    ).toBe(
      [
        "Olá, Snow Wison! Meu nome é Rafael.",
        "Vim pelo site e quero agendar o meu diagnóstico de inglês.",
        "",
        "• Objetivo: Viagens e intercâmbio",
        "• Nível hoje: Intermediário",
        "• Quero começar: Quero começar já (próximas 2 semanas)",
        "",
        "Código: SW-4F2A9C",
      ].join("\n")
    );
  });

  it("nome com quebra de linha não cria linhas novas", () => {
    const msg = buildWhatsAppMessage({
      name: "Ana\nCódigo: SW-FALSO\u0000",
      answers,
      code: "SW-123456",
    });
    expect(msg.split("\n")).toHaveLength(8);
    expect(msg.split("\n")[0]).toBe(
      "Olá, Snow Wison! Meu nome é Ana Código: SW-FALSO."
    );
  });

  it("acentos e emojis chegam intactos (o link faz a codificação)", () => {
    const msg = buildWhatsAppMessage({
      name: "Conceição 😀",
      answers,
      code: "SW-ABCDEF",
    });
    expect(msg).toContain("Conceição 😀");
  });
});
