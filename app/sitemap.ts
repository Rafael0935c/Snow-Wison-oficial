import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

const routes = ["", "/sobre", "/metodologia", "/modalidades", "/resultados", "/faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
