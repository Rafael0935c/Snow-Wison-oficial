import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

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
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
});
