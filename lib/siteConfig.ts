// Os valores abaixo ficam no código, e não apenas em variáveis de
// ambiente, de propósito: nenhum deles é segredo. O número aparece nos
// botões, a URL é pública e o DSN do Sentry é público por design (só
// permite enviar erro, não ler nada da conta). Depender de variável para
// eles só criava um passo a mais para esquecer — e, quando esquecido, o
// site subia com todos os CTAs de WhatsApp desabilitados.
//
// As variáveis continuam funcionando e têm prioridade, para quem quiser
// publicar um ambiente de teste apontando para outro número.
export const siteConfig = {
  name: "Snow Wison Idiomas",
  shortName: "Snow Wison",
  // TROCAR quando o domínio próprio estiver ativo — é a URL usada em
  // canonical, Open Graph, sitemap e JSON-LD.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://snow-wison-oficial.levelupenglish-ofc.workers.dev",
  title: "Snow Wison Idiomas | Inglês Personalizado e Aulas ao Vivo",
  description:
    "Escola premium de inglês 100% online e ao vivo. Conteúdo estruturado e aplicação personalizada para o seu objetivo. Agende seu diagnóstico.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP ?? "5521980999435",
  whatsappMessage: "Olá! gostaria de agendar um diagnóstico",
  // Mensagem própria da landing page de tráfego pago (/diagnostico).
  // Serve para identificar, no WhatsApp, quais leads vieram do anúncio.
  whatsappMessageLp:
    "Olá! Vim pelo anúncio e gostaria de agendar a aula diagnóstica",
  // PENDENTE — usuário do Instagram oficial
  instagram: "",
} as const;

export function getWhatsAppUrl(
  message: string = siteConfig.whatsappMessage
): string | null {
  if (!siteConfig.whatsappNumber) return null;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
