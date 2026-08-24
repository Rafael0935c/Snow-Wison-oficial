import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/siteConfig";
import { a11y } from "@/lib/content";

// Botão flutuante — discreto, não pulsa nem expande sozinho.
// Sem número configurado, renderiza desabilitado em vez de link quebrado.
export function WhatsAppFAB() {
  const url = getWhatsAppUrl();

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Snow Wison] NEXT_PUBLIC_WHATSAPP não configurado — WhatsAppFAB desabilitado."
      );
    }
    return (
      <span
        role="button"
        aria-disabled="true"
        title={a11y.whatsappDisabledTitle}
        className="fixed bottom-6 right-6 z-40 flex h-[3.1rem] w-[3.1rem] cursor-not-allowed items-center justify-center rounded-full bg-navy-2 text-ivory/25 shadow-lg"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={a11y.whatsappAria}
      className="fixed bottom-6 right-6 z-40 flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-full bg-[linear-gradient(135deg,#4FA3FF,#12299E)] text-ivory shadow-[0_8px_24px_rgba(18,41,158,0.4)] transition-transform duration-300 hover:scale-[1.06]"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
