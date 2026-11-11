import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/min";
import type { PhoneResult } from "@/lib/quiz/phone";

/**
 * Número de fora do Brasil. Este módulo só é baixado quando a pessoa
 * clica em "Mora fora do Brasil?" (import dinâmico no quiz): a biblioteca
 * de telefones tem dezenas de KB que quase nenhum visitante precisa.
 */

export type CountryOption = { code: CountryCode; name: string; dial: string };

export function listCountries(): CountryOption[] {
  const names = new Intl.DisplayNames(["pt-BR"], { type: "region" });
  return getCountries()
    .filter((code) => code !== "BR")
    .map((code) => ({
      code,
      name: names.of(code) ?? code,
      dial: `+${getCountryCallingCode(code)}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export function parseIntlPhone(value: string, country: string): PhoneResult {
  const parsed = parsePhoneNumberFromString(value, country as CountryCode);
  if (!parsed || !parsed.isValid()) return { ok: false };
  return {
    ok: true,
    e164: parsed.number,
    display: parsed.formatInternational(),
    country: parsed.country ?? country,
  };
}
