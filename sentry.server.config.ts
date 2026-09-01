import * as Sentry from "@sentry/nextjs";
import { SENTRY_DSN } from "@/lib/sentryConfig";

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.1,
  // Explícito por consciência de LGPD: não anexar IP/headers de request
  // aos eventos de erro além do que for estritamente necessário para
  // depurar.
  sendDefaultPii: false,
});
