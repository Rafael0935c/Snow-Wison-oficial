export const siteConfig = {
  name: "Snow Wison Idiomas",
  shortName: "Snow Wison",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://snowwisonidiomas.com.br",
  title: "Snow Wison Idiomas | Inglês Personalizado e Aulas ao Vivo",
  description:
    "Escola premium de inglês 100% online e ao vivo. Conteúdo estruturado e aplicação personalizada para o seu objetivo. Agende seu diagnóstico.",
  // PENDENTE — número oficial da Snow Wison, formato internacional sem símbolos (ex: 5511999999999)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
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
