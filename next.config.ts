import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const isDev = process.env.NODE_ENV !== "production";

// Diferença dev/produção decidida aqui (no servidor, uma vez), não por
// requisição — por isso não força as páginas a virarem dinâmicas, ao
// contrário de um middleware com nonce.
const contentSecurityPolicy = [
  "default-src 'self'",
  // Sem nonce por requisição de propósito: um nonce exigiria
  // middleware, e isso forçaria toda página a virar dinâmica (perderíamos
  // a geração estática — testado, ver PENDENCIAS.md). 'unsafe-inline'
  // cobre nosso único <script> inline (JSON-LD) e a hidratação do Next.
  // 'unsafe-eval' só em dev: o React precisa de eval() para o Fast
  // Refresh; em produção o React nunca usa eval().
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https: data:",
  "media-src 'self' https:",
  "font-src 'self'",
  `connect-src 'self' https://*.ingest.us.sentry.io https://*.sentry.io${isDev ? " ws:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  // Impede o site de ser carregado dentro de um <iframe> em outro
  // domínio — mitiga clickjacking (um overlay invisível sobre o botão
  // de WhatsApp, por exemplo).
  { key: "X-Frame-Options", value: "DENY" },
  // Impede o navegador de tentar "adivinhar" o tipo de um arquivo
  // servido, o que pode ser explorado para rodar script disfarçado
  // de imagem/texto.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Não vaza a URL completa (com paths) para o site de destino ao
  // clicar em um link externo — só a origem.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desliga explicitamente APIs do navegador que o site não usa.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
});
