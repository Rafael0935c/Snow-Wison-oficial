/**
 * Celular brasileiro: máscara enquanto digita e validação.
 *
 * Sem dependências de propósito: é o caminho de quase todo visitante, e
 * fica no JavaScript da página. Número estrangeiro usa a
 * libphonenumber-js (lib/quiz/phoneIntl.ts), baixada só quando a pessoa
 * clica em "Mora fora do Brasil?". O servidor revalida tudo com a
 * libphonenumber-js — um teste garante que as duas regras concordam.
 */

/** DDDs em uso no Brasil (Anatel). */
export const BR_DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
  37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64,
  65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
  89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Tira prefixos que as pessoas costumam digitar sem perceber: o "0" de
 * operadora/longa distância ("021...") e o "55" do país.
 */
function nationalDigits(value: string): string {
  let d = digitsOnly(value);
  if (d.length === 13 && d.startsWith("55")) d = d.slice(2);
  while (d.length > 11 && d.startsWith("0")) d = d.slice(1);
  return d;
}

/** Máscara "(21) 99999-9999", aplicada a cada tecla. */
export function formatBrPhone(value: string): string {
  const d = digitsOnly(value).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export type PhoneResult =
  { ok: true; e164: string; display: string; country: string } | { ok: false };

/**
 * Celular brasileiro válido: DDD em uso + 9 dígitos começando com 9.
 * Devolve sempre em E.164 (+5521999999999), o formato do CRM.
 */
export function parseBrMobile(value: string): PhoneResult {
  const d = nationalDigits(value);
  if (d.length !== 11) return { ok: false };
  const ddd = Number(d.slice(0, 2));
  if (!BR_DDDS.has(ddd) || d[2] !== "9") return { ok: false };
  return {
    ok: true,
    e164: `+55${d}`,
    display: formatBrPhone(d),
    country: "BR",
  };
}
