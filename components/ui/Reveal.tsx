"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

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

const EASE_BRAND = [0.16, 1, 0.3, 1] as const;

// Movimento diferenciado por papel do elemento: um título não deve
// entrar igual a um item de lista. É o que separa uma página com
// animação de uma página coreografada.
// Só opacity e transform (y/scale), de propósito. O Lighthouse sinalizou
// o desfoque (`filter: blur`) que existia na variante `display` como
// "animação não composta": filtro não roda na GPU, então cada quadro da
// entrada era recalculado na thread principal — perceptível como travada
// no celular. opacity/transform são animados pelo compositor.
const variants = {
  display: {
    hidden: { opacity: 0, y: 44, scale: 0.985 },
    shown: { opacity: 1, y: 0, scale: 1 },
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

// Com "reduzir movimento" ligado, o bloco aparece no lugar, sem trajeto.
const INSTANT = { duration: 0 } as const;

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "default",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const v = variants[variant];

  // `initial` e `whileInView` são sempre os mesmos — só a transição muda.
  // Antes, com "reduzir movimento" ligado, o componente trocava para
  // initial={false} e tirava o whileInView. Só que o HTML do servidor já
  // chega com opacity 0 (o servidor não sabe a preferência do visitante),
  // e nada mais mandava o bloco aparecer: tudo abaixo do topo da página
  // ficava invisível para quem usa essa opção de acessibilidade.
  return (
    <motion.div
      className={className}
      initial={v.hidden}
      whileInView={v.shown}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        shouldReduceMotion
          ? INSTANT
          : { duration: v.duration, delay, ease: EASE_BRAND }
      }
    >
      {children}
    </motion.div>
  );
}
