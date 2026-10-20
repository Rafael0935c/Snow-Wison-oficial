"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/siteConfig";
import { a11y } from "@/lib/content";

// Páginas em que o botão só aparece depois de rolar meia tela. Na home,
// o topo já tem o botão de agendar — e, no celular, o flutuante caía em
// cima da faixa de credenciais. Nas demais páginas ele aparece desde o
// início: no celular, é o único atalho para o WhatsApp no topo.
const HIDE_AT_TOP = ["/"];

// Botão flutuante — discreto, não pulsa nem expande sozinho.
// Sem número configurado, renderiza desabilitado em vez de link quebrado.
export function WhatsAppFAB() {
  const url = getWhatsAppUrl();
  const pathname = usePathname();
  const hideAtTop = HIDE_AT_TOP.includes(pathname);
  const [pastTop, setPastTop] = useState(false);

  useEffect(() => {
    if (!hideAtTop) return;
    function onScroll() {
      setPastTop(window.scrollY > window.innerHeight * 0.5);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideAtTop]);

  const visible = !hideAtTop || pastTop;
  // translate e scale são propriedades separadas no Tailwind 4, por isso
  // entram as duas na transição (a de scale é o hover).
  const visibility = `transition-[opacity,translate,scale] duration-300 ${
    visible ? "" : "pointer-events-none translate-y-3 opacity-0"
  }`;

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
        inert={!visible}
        className={`fixed bottom-6 right-6 z-40 flex h-[3.1rem] w-[3.1rem] cursor-not-allowed items-center justify-center rounded-full bg-navy-2 text-ivory/25 shadow-lg ${visibility}`}
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
      inert={!visible}
      className={`fixed bottom-6 right-6 z-40 flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-full bg-[linear-gradient(135deg,#4FA3FF,#12299E)] text-ivory shadow-[0_8px_24px_rgba(18,41,158,0.4)] hover:scale-[1.06] ${visibility}`}
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
