import { captureException, init } from "@sentry/nextjs";
import { SENTRY_DSN } from "@/lib/sentryConfig";

/**
 * Ponto único de entrada do Sentry no navegador. Sempre carregado via
 * `import("@/lib/sentryClient")`, nunca de forma estática.
 *
 * Por que este módulo existe: `import("@sentry/nextjs")` direto devolve o
 * pacote inteiro, e o bundler não consegue descartar o que não é usado —
 * o arquivo adiado veio com gravação de sessão (rrweb), widget de
 * feedback e profiling, 178 KB comprimidos. Com imports nomeados aqui
 * dentro, o tree-shaking volta a funcionar e só entra o que é chamado.
 */
export function startSentry() {
  init({
    dsn: SENTRY_DSN,
    sendDefaultPii: false,
    // Sem Session Replay: gravar sessões de visitantes sem aviso/consentimento
    // seria um problema de privacidade num site sem banner de cookies.
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
  });
}

export { captureException };
