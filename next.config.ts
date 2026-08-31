import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import { buildSecurityHeaders } from "./config/security-headers.mjs";

const isDev = process.env.NODE_ENV !== "production";

// A Cloudflare Pages serve arquivos estáticos, então o build para lá roda
// com STATIC_EXPORT=true e gera a pasta `out/`. Nesse modo o Next não
// aplica `headers()` (não há servidor para aplicá-los) — quem cumpre esse
// papel é `public/_headers`, gerado por scripts/generate-headers.mjs a
// partir da mesma fonte importada acima.
//
// Os dois modos ficam vivos de propósito: sem a variável, o projeto
// continua sendo um app Next.js normal, pronto para a Vercel. Migrar
// depois é só trocar o comando de build, sem mexer em código.
// `CF_PAGES` é definida automaticamente pelo ambiente de build da
// Cloudflare Pages, então lá não é preciso configurar nada. `STATIC_EXPORT`
// existe para reproduzir o mesmo build localmente.
const isStaticExport =
  process.env.STATIC_EXPORT === "true" || process.env.CF_PAGES === "1";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      // Sem servidor não há otimizador de imagem sob demanda.
      images: { unoptimized: true },
    }
  : {
      async headers() {
        return [{ source: "/:path*", headers: buildSecurityHeaders({ isDev }) }];
      },
    };

export default withSentryConfig(nextConfig, {
  silent: true,
});
