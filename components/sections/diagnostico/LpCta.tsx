import type { ReactNode } from "react";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { siteConfig } from "@/lib/siteConfig";

type LpCtaProps = {
  children: ReactNode;
  className?: string;
};

// CTA único da landing page. Usa a mensagem própria da LP para que os
// leads vindos do anúncio sejam identificáveis no WhatsApp.
export function LpCta({ children, className = "" }: LpCtaProps) {
  return (
    <WhatsAppCTA
      message={siteConfig.whatsappMessageLp}
      className={`px-9 py-4 text-base ${className}`}
    >
      {children}
    </WhatsAppCTA>
  );
}
