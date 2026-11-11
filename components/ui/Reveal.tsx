"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "default" | "display" | "quiet";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /**
   * `display` — entrada mais ampla (deslocamento maior + escala), para títulos
   * e blocos de destaque. `quiet` — deslocamento curto, para itens de
   * lista em sequência, onde um movimento longo vira ruído repetido.
   */
  variant?: RevealVariant;
};

// Um observador só para a página inteira, compartilhado por todos os
// blocos. Cada bloco que entra na tela ganha `is-revealed` uma única vez
// e deixa de ser observado.
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer?.unobserve(entry.target);
        }
      },
      // Mesma margem de antes: o bloco começa a entrar quando já está
      // 80px dentro da tela, não no primeiro pixel.
      { rootMargin: "-80px" }
    );
  }
  return observer;
}

/**
 * Entrada ao rolar a página. O movimento em si é CSS (`.reveal` em
 * app/globals.css); aqui só se decide QUANDO ele começa.
 *
 * Substitui o Framer Motion, que custava cerca de 40 KB comprimidos de
 * JavaScript em toda página só para isto. Curva, durações, deslocamentos
 * e atrasos são os mesmos de antes — o visual não muda.
 *
 * "Reduzir movimento" e visitante sem JavaScript são resolvidos no CSS:
 * nos dois casos o bloco já aparece no lugar, sem depender deste código.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "default",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const style = delay
    ? ({ "--reveal-delay": `${delay}s` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
