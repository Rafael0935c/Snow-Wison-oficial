type DividerProps = {
  className?: string;
  strong?: boolean;
  /**
   * Filete que desvanece em vez de terminar em corte seco. Para listas
   * de texto alinhadas à esquerda, evita que a linha "aponte" para um
   * vazio à direita.
   */
  fade?: boolean;
};

export function Divider({
  className = "",
  strong = false,
  fade = false,
}: DividerProps) {
  if (fade) {
    return <hr className={`hairline-fade ${className}`} />;
  }

  return (
    <hr
      className={`border-0 border-t ${strong ? "border-line-strong" : "border-line"} ${className}`}
    />
  );
}
