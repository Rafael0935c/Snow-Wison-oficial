import { siteConfig } from "@/lib/siteConfig";

// Apenas campos confirmados. address/telephone/sameAs ficam de fora
// até o cliente fornecer os dados reais — não inventar.
export const educationalOrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  // address: PENDENTE — aguardando dado do cliente
  // telephone: PENDENTE — aguardando dado do cliente
  // sameAs: PENDENTE — aguardando Instagram/redes oficiais confirmadas
};

/**
 * Serializa o JSON-LD para injeção dentro de uma tag <script>.
 *
 * `JSON.stringify` sozinho não escapa `<`, então uma string contendo
 * `</script>` fecharia a tag e permitiria injeção de HTML. Hoje todos os
 * campos são constantes, mas `url` vem de variável de ambiente — escapar
 * aqui garante que o ponto continue seguro mesmo que passe a receber
 * valor dinâmico no futuro.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
