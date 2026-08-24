import { CheckCheck } from "lucide-react";
import type { Testimonial } from "@/lib/content";

type WhatsAppBubbleProps = {
  testimonial: Testimonial;
};

// Formato de bolha de chat (canto sem raio para simular o "rabinho"),
// nas cores da marca — não usa o verde do WhatsApp real, que é proibido
// pelo guia de identidade visual. Os dois tiques de leitura em azul são
// um aceno ao original (no WhatsApp de verdade, mensagens lidas também
// ficam azuis).
export function WhatsAppBubble({ testimonial }: WhatsAppBubbleProps) {
  return (
    <div className="mb-8 break-inside-avoid">
      <div className="relative rounded-2xl rounded-bl-sm bg-navy-2 px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
        <p className="leading-[1.6] text-ivory/85">{testimonial.quote}</p>
        <div className="mt-2 flex justify-end">
          <CheckCheck className="h-4 w-4 text-blue-soft" aria-hidden="true" />
        </div>
      </div>
      <div className="mt-3 pl-2">
        <p className="font-display text-sm font-semibold text-ivory">
          {testimonial.name}
        </p>
        <p className="mt-0.5 font-utility text-[0.65rem] uppercase tracking-[0.1em] text-blue-soft">
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}
