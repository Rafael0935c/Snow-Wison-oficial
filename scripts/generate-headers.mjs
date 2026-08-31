import { writeFileSync } from "node:fs";
import { buildSecurityHeaders } from "../config/security-headers.mjs";

/**
 * Gera `public/_headers`, o arquivo que a Cloudflare Pages lê para aplicar
 * cabeçalhos HTTP (equivalente ao `headers()` do next.config, que não roda
 * em site estático).
 *
 * Roda antes do build estático — ver o script `build:static` no
 * package.json. Não editar `public/_headers` à mão: ele é sobrescrito.
 */
const headers = buildSecurityHeaders({ isDev: false });

const linhas = [
  "# ARQUIVO GERADO — não editar à mão.",
  "# Origem: config/security-headers.mjs (via scripts/generate-headers.mjs)",
  "",
  "/*",
  ...headers.map((h) => `  ${h.key}: ${h.value}`),
  "",
  "# As rotas de ícone e imagem de compartilhamento são exportadas pelo",
  "# Next como arquivos SEM extensão. Sem isso a Cloudflare as serviria",
  "# como octet-stream e o navegador não as reconheceria como imagem.",
  "/icon",
  "  Content-Type: image/png",
  "/apple-icon",
  "  Content-Type: image/png",
  "/opengraph-image",
  "  Content-Type: image/png",
  "",
  "# Assets com hash no nome nunca mudam de conteúdo: cache longo.",
  "/_next/static/*",
  "  Cache-Control: public, max-age=31536000, immutable",
  "",
];

writeFileSync("public/_headers", linhas.join("\n"), "utf-8");
console.log("public/_headers gerado a partir de config/security-headers.mjs");
