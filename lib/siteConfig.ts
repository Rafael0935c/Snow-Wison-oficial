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
  // Domínio próprio. É a URL usada em canonical, Open Graph, sitemap,
  // robots e JSON-LD. O endereço .workers.dev continua respondendo, mas
  // aponta para cá como versão oficial.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://snowwison.com",
  title: "Snow Wison Idiomas | Inglês Personalizado e Aulas ao Vivo",
  description:
    "Escola premium de inglês 100% online e ao vivo. Conteúdo estruturado e aplicação personalizada para o seu objetivo. Agende seu diagnóstico.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP ?? "5521980999435",
  whatsappMessage: "Olá! gostaria de agendar um diagnóstico",
  // Mensagem dos atalhos diretos da landing page (/diagnostico): botão
  // flutuante e "Prefiro chamar direto no WhatsApp". Quem passa pelo quiz
  // manda outra, com as respostas e o código (lib/quiz/message.ts).
  whatsappMessageLp:
    "Olá, Snow Wison! Vim pelo site e gostaria de saber sobre as aulas de inglês e agendar o meu diagnóstico.",
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
