type AmbientGlowProps = {
  /** Intensidade do brilho no centro (0–1). Acima de ~0.3 começa a virar neon. */
  intensity?: number;
  /** Diâmetro em rem. */
  size?: number;
  /** Posição vertical dentro da seção. */
  anchor?: "center" | "top" | "bottom";
  className?: string;
};

const anchorPosition = {
  center: "top-1/2 -translate-y-1/2",
  top: "top-0 -translate-y-1/3",
  bottom: "bottom-0 translate-y-1/3",
} as const;

/**
 * Brilho ambiente de seção. Serve para hierarquia, não para decoração:
 * a ideia é iluminar os poucos momentos que importam (primeiro impacto,
 * prova social, conversão) e deixar o resto da página em penumbra. Se
 * toda seção brilhar, nenhuma brilha.
 *
 * CSS puro — sem JavaScript e sem custo de renderização por frame.
 * O elemento pai precisa ser `relative`, e o conteúdo depois dele
 * precisa ser `relative` também, para ficar por cima.
 */
export function AmbientGlow({
  intensity = 0.16,
  size = 34,
  anchor = "center",
  className = "",
}: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full blur-3xl ${anchorPosition[anchor]} ${className}`}
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        background: `radial-gradient(circle, rgba(47,140,240,${intensity}), transparent 70%)`,
      }}
    />
  );
}
