type DividerProps = {
  className?: string;
  strong?: boolean;
};

export function Divider({ className = "", strong = false }: DividerProps) {
  return (
    <hr
      className={`border-0 border-t ${strong ? "border-line-strong" : "border-line"} ${className}`}
    />
  );
}
