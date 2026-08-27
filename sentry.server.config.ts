import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  // Explícito por consciência de LGPD: não anexar IP/headers de request
  // aos eventos de erro além do que for estritamente necessário para
  // depurar.
  sendDefaultPii: false,
});
