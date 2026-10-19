/**
 * Monitoramento de erros (Sentry), carregado DEPOIS que a página abre.
 *
 * Antes, o SDK era importado de forma estática e ia no mesmo arquivo que o
 * React: ~129 KB comprimidos e ~600 ms de execução no celular, rodando
 * antes de o site responder a qualquer toque (medido no Lighthouse). Para
 * um site de conteúdo, monitorar erro não pode custar a abertura.
 *
 * Agora o `import()` dinâmico (de lib/sentryClient, ver lá por que não
 * direto do pacote) vira um arquivo separado, baixado e executado só quando
 * a página terminou de carregar e o navegador está ocioso.
 *
 * Troca consciente: um erro que aconteça nos primeiros segundos, antes do
 * Sentry iniciar, não é registrado. Também saiu o tracing de performance
 * (tracesSampleRate), que instrumentava navegação e requisições — o pedido
 * era monitorar erros, e o tracing tinha custo em toda visita.
 */
function startSentry() {
  void import("@/lib/sentryClient").then((m) => m.startSentry());
}

function whenIdle() {
  // Safari não tem requestIdleCallback.
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(startSentry, { timeout: 5000 });
  } else {
    setTimeout(startSentry, 2500);
  }
}

if (typeof window !== "undefined") {
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
}
