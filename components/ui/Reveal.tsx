"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "default" | "display" | "quiet";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /**
   * `display` — entrada cinematográfica (desfoque + escala), para títulos
   * e blocos de destaque. `quiet` — deslocamento curto, para itens de
   * lista em sequência, onde um movimento longo vira ruído repetido.
   */
  variant?: RevealVariant;
};

const EASE_BRAND = [0.16, 1, 0.3, 1] as const;

// Movimento diferenciado por papel do elemento: um título não deve
// entrar igual a um item de lista. É o que separa uma página com
// animação de uma página coreografada.
// `filter` aparece só na variante que realmente desfoca. Um
// `blur(0px)` inerte ainda faz o navegador tratar o elemento como
// candidato a camada de composição própria — multiplicado por dezenas
// de blocos, é exatamente o tipo de custo invisível que deixa uma
// página pesada sem motivo.
const variants = {
  display: {
    hidden: { opacity: 0, y: 44, filter: "blur(5px)", scale: 0.992 },
    shown: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
    duration: 1.25,
  },
  default: {
    hidden: { opacity: 0, y: 38 },
    shown: { opacity: 1, y: 0 },
    duration: 1.15,
  },
  quiet: {
    hidden: { opacity: 0, y: 20 },
    shown: { opacity: 1, y: 0 },
    duration: 0.85,
  },
} satisfies Record<RevealVariant, unknown>;

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "default",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const v = variants[variant];

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : v.hidden}
      whileInView={shouldReduceMotion ? undefined : v.shown}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: v.duration, delay, ease: EASE_BRAND }}
    >
      {children}
    </motion.div>
  );
}
