import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="h-px w-8 bg-blue-soft/60" aria-hidden="true" />
      <span className="font-utility text-[0.88rem] uppercase tracking-[0.18em] text-blue-soft">
        {children}
      </span>
    </div>
  );
}
