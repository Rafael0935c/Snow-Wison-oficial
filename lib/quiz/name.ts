import { NAME_MAX, NAME_MIN } from "@/config/quiz";

/**
 * Limpa o nome digitado: tira caracteres de controle (inclusive quebras
 * de linha, que poderiam injetar linhas falsas na mensagem do WhatsApp),
 * junta espaços repetidos e corta as pontas.
 */
export function normalizeName(raw: string): string {
  return raw
    .normalize("NFC")
    .replace(/[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Letras (com acento), separadas por espaço, apóstrofo ou hífen — nunca
// começando ou terminando num separador. "Maria Clara", "D'Ávila" e
// "Ana-Lu" passam; números, emojis e símbolos não.
const NAME_PATTERN = /^[\p{L}\p{M}]+(?:[ '’-][\p{L}\p{M}]+)*$/u;

export type NameResult = { ok: true; value: string } | { ok: false };

export function validateName(raw: string): NameResult {
  const value = normalizeName(raw);
  const letters = value.replace(/[^\p{L}]/gu, "").length;
  if (
    value.length > NAME_MAX ||
    letters < NAME_MIN ||
    !NAME_PATTERN.test(value)
  ) {
    return { ok: false };
  }
  return { ok: true, value };
}

/** Primeiro nome, para a mensagem de sucesso ("Pronto, Maria!"). */
export function firstName(name: string): string {
  return normalizeName(name).split(" ")[0] ?? "";
}
