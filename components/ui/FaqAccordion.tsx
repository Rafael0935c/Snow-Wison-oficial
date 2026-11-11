"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { track } from "@/lib/track";

type FaqAccordionItem = {
  question: string;
  answer: ReactNode;
};

type FaqAccordionProps = {
  items: FaqAccordionItem[];
  /**
   * Nível de título das perguntas. 2 na página /faq, onde elas ficam logo
   * abaixo do <h1>; 3 quando o acordeão está dentro de uma seção que já
   * tem o próprio <h2>, para não pular nem repetir níveis.
   */
  headingLevel?: 2 | 3;
  /** Registra o evento faq_open (landing page). */
  trackOpens?: boolean;
};

// Uma pergunta aberta por vez, com transição de altura via grid-template-rows
// (funciona melhor que <details> nativo para animar abertura/fechamento).
export function FaqAccordion({
  items,
  headingLevel = 2,
  trackOpens = false,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <div className="divide-y divide-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setOpenIndex(isOpen ? null : index);
                  if (!isOpen && trackOpens) {
                    track("faq_open", { question_id: index + 1 });
                  }
                }}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-base font-semibold text-ivory md:text-lg">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-blue-soft transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="pb-6 pr-10 leading-[1.65] text-ivory/62">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
