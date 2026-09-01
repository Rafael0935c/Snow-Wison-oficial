import * as Sentry from "@sentry/nextjs";
import { SENTRY_DSN } from "@/lib/sentryConfig";

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
});
