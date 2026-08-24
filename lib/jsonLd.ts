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
