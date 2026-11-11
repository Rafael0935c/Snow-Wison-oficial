"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { diagnostico } from "@/lib/content";
import { getWhatsAppUrl, siteConfig } from "@/lib/siteConfig";
import { track } from "@/lib/track";

const m = diagnostico.mobileBar;

/**
 * Atalhos fixos da landing page.
 *
 * Celular: barra no rodapé da tela com "Fazer meu diagnóstico" e o
 * WhatsApp direto. Aparece depois que o topo sai da tela e some enquanto
 * o quiz está visível (ali ela seria redundante e cobriria o formulário).
 *
 * Desktop: só o botão redondo do WhatsApp, no canto.
 *
 * Também registra os cliques em links marcados com data-track (WhatsApp
 * direto) — num lugar só, sem um ouvinte por botão.
 */
export function LpFloatingCta() {
  const [pastHero, setPastHero] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);
  const whatsapp = getWhatsAppUrl(siteConfig.whatsappMessageLp);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const quiz = document.getElementById("diagnostico");
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([entry]) =>
        setPastHero(!entry.isIntersecting)
      );
      io.observe(hero);
      observers.push(io);
    }
    if (quiz) {
      const io = new IntersectionObserver(
        ([entry]) => setQuizVisible(entry.isIntersecting),
        { threshold: 0.15 }
      );
      io.observe(quiz);
      observers.push(io);
    }
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const el = (event.target as Element | null)?.closest?.("[data-track]");
      const name = el?.getAttribute("data-track");
      if (name === "whatsapp_direct_click") track("whatsapp_direct_click");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const showBar = pastHero && !quizVisible;

  return (
    <>
      <div
        inert={!showBar}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-strong bg-void/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-[translate,opacity] duration-300 lg:hidden ${
          showBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-md items-center gap-3">
          <a
            href="#diagnostico"
            data-quiz-cta=""
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-sm bg-[linear-gradient(135deg,#4FA3FF,#12299E)] font-display text-[0.95rem] font-semibold text-ivory shadow-[inset_0_-3px_0_rgba(3,4,8,0.35)]"
          >
            {m.cta}
          </a>
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_direct_click"
              aria-label={m.whatsappLabel}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-line-strong text-ivory"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {whatsapp && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_direct_click"
          aria-label={m.whatsappLabel}
          className="fixed bottom-6 right-6 z-40 hidden h-[3.1rem] w-[3.1rem] items-center justify-center rounded-full bg-[linear-gradient(135deg,#4FA3FF,#12299E)] text-ivory shadow-[0_8px_24px_rgba(18,41,158,0.4)] transition-transform duration-300 hover:scale-[1.06] lg:flex"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </a>
      )}
    </>
  );
}
