// Fonte única dos headers de segurança do site.
//
// Consumida por dois caminhos diferentes, de propósito:
//   - next.config.ts  -> aplica via servidor Next (modo Vercel)
//   - scripts/generate-headers.mjs -> gera public/_headers (modo Cloudflare)
//
// Manter os dois lendo daqui evita o cenário em que alguém endurece a CSP
// num arquivo e a produção continua servindo a política antiga pelo outro.

export function buildContentSecurityPolicy({ isDev = false } = {}) {
  return [
    "default-src 'self'",
    // Sem nonce por requisição de propósito: um nonce exigiria middleware,
    // e isso forçaria toda página a virar dinâmica (perderíamos a geração
    // estática — testado, ver PENDENCIAS.md). 'unsafe-inline' cobre nosso
    // único <script> inline (JSON-LD) e a hidratação do Next.
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
}

export function buildSecurityHeaders({ isDev = false } = {}) {
  return [
    // Impede o site de ser carregado dentro de um <iframe> em outro
    // domínio — mitiga clickjacking (um overlay invisível sobre o botão
    // de WhatsApp, por exemplo).
    { key: "X-Frame-Options", value: "DENY" },
    // Faz o navegador lembrar, por um ano, que este site é só HTTPS — depois
    // da primeira visita segura, ele nem tenta HTTP. Complementa o
    // upgrade-insecure-requests da CSP, que cobre apenas os recursos da
    // página, não a navegação inicial. Sem "preload": isso é um compromisso
    // irreversível numa lista global, inadequado para um domínio provisório.
    {
      key: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains",
    },
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
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy({ isDev }),
    },
  ];
}
