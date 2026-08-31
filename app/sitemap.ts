import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

// Necessário para o export estático (Cloudflare): diz ao Next que
// esta rota é gerada no build, não sob demanda.
export const dynamic = "force-static";

const routes = ["", "/sobre", "/metodologia", "/modalidades", "/resultados", "/faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
