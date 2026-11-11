import { describe, expect, it } from "vitest";
import { getWhatsAppUrl, siteConfig } from "@/lib/siteConfig";

describe("getWhatsAppUrl", () => {
  it("aponta sempre para o número oficial, no wa.me", () => {
    const url = new URL(getWhatsAppUrl() ?? "");
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe(`/${siteConfig.whatsappNumber}`);
  });

  it("usa a mensagem padrão do site quando nenhuma é passada", () => {
    const url = new URL(getWhatsAppUrl() ?? "");
    expect(url.searchParams.get("text")).toBe(siteConfig.whatsappMessage);
  });

  it("codifica a mensagem: acentos, quebras de linha e & não quebram o link", () => {
    const mensagem = "Olá! Objetivo: viagem & trabalho\nCódigo: SW-4F2A9C";
    const url = getWhatsAppUrl(mensagem) ?? "";
    expect(url).not.toContain("\n");
    expect(url).not.toContain(" ");
    expect(new URL(url).searchParams.get("text")).toBe(mensagem);
  });
});
