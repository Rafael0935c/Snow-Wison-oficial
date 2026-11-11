import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type LpButtonProps = {
  children: ReactNode;
  /** Leva ao quiz (#diagnostico) — o quiz intercepta o clique, rola até
   *  ele e põe o foco na primeira opção. Sem JavaScript, a âncora funciona. */
  quiz?: boolean;
  /** Pré-seleciona o objetivo no quiz (anúncios segmentados). */
  objetivo?: string;
  href?: string;
  variant?: "primary" | "secondary";
  /** Para links externos (WhatsApp). */
  external?: boolean;
  trackEvent?: string;
  className?: string;
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm font-display text-[0.95rem] font-semibold tracking-wide transition-[transform,box-shadow,background-color,color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-4";

// Primário com "profundidade": sombra interna embaixo (a borda inferior
// mais escura dá o volume), sobe 1px no hover e afunda no clique.
const variants = {
  primary:
    "bg-[linear-gradient(135deg,#4FA3FF,#12299E)] py-2.5 pl-6 pr-2.5 text-ivory shadow-[inset_0_-3px_0_rgba(3,4,8,0.35),0_10px_26px_rgba(18,41,158,0.42)] hover:-translate-y-px hover:shadow-[inset_0_-3px_0_rgba(3,4,8,0.35),0_14px_34px_rgba(18,41,158,0.55)] active:translate-y-px active:shadow-[inset_0_-1px_0_rgba(3,4,8,0.35),0_6px_16px_rgba(18,41,158,0.4)]",
  secondary:
    "border border-line-strong px-6 py-2.5 text-ivory/90 hover:border-blue-soft/60 hover:text-ivory active:translate-y-px",
} as const;

export function LpButton({
  children,
  quiz = false,
  objetivo,
  href,
  variant = "primary",
  external = false,
  trackEvent,
  className = "",
}: LpButtonProps) {
  return (
    <a
      href={quiz ? "#diagnostico" : href}
      data-quiz-cta={quiz ? "" : undefined}
      data-objetivo={objetivo}
      data-track={trackEvent}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      {variant === "primary" && (
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory/15 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </a>
  );
}
