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
    // 192 e 512 são os tamanhos que o Chrome exige para instalar o site
    // como app. Os dois saem de scripts/make-icons.mjs.
    icons: [
      { src: "/icon", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
