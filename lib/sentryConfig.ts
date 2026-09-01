/**
 * DSN do Sentry.
 *
 * Fica no código pelo mesmo motivo dos valores em `siteConfig`: não é
 * segredo. O DSN é público por design — ele autoriza apenas *enviar*
 * eventos de erro, nunca ler dados da conta, e já vai embutido no
 * JavaScript entregue a qualquer visitante. Guardá-lo só em variável de
 * ambiente não protegia nada e fazia o monitoramento sumir silenciosamente
 * quando a variável faltava no build.
 *
 * A variável de ambiente continua tendo prioridade, para apontar um
 * ambiente de teste a outro projeto do Sentry.
 */
export const SENTRY_DSN =
  process.env.NEXT_PUBLIC_SENTRY_DSN ??
  "https://251dd05109ee7aa51804bec06f7d67c4@o4511965828284416.ingest.us.sentry.io/4511965838901248";
