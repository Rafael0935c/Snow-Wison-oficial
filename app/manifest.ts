import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

// Necessário para o export estático (Cloudflare): diz ao Next que
// esta rota é gerada no build, não sob demanda.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05070F",
    theme_color: "#05070F",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
