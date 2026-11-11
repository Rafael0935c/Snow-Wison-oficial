import type { ReactNode } from "react";

type LpEyebrowProps = {
  number: string;
  children: ReactNode;
  /** Em fundo claro (seção de avaliações). */
  tone?: "dark" | "light";
  className?: string;
};

// Numeração editorial das seções: "02 —— DIAGNÓSTICO".
export function LpEyebrow({
  number,
  children,
  tone = "dark",
  className = "",
}: LpEyebrowProps) {
  const color = tone === "light" ? "text-blue-deep" : "text-blue-soft";
  return (
    <p
      className={`flex items-center gap-2.5 font-utility text-[0.74rem] uppercase tracking-[0.12em] sm:gap-3 sm:text-[0.78rem] sm:tracking-[0.18em] ${color} ${className}`}
    >
      <span>{number}</span>
      <span
        className={`h-px w-5 shrink-0 sm:w-8 ${tone === "light" ? "bg-blue-deep/40" : "bg-blue-soft/50"}`}
        aria-hidden="true"
      />
      <span>{children}</span>
    </p>
  );
}
