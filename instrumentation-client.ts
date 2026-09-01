import * as Sentry from "@sentry/nextjs";
import { SENTRY_DSN } from "@/lib/sentryConfig";

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
  // Sem Session Replay: gravar sessões de visitantes sem aviso/consentimento
  // seria um problema de privacidade num site sem banner de cookies.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
