"use client";

import { useEffect, useRef } from "react";

export type RailNode = {
  id: string;
  number: string;
};

type StructuralRailProps = {
  nodes: RailNode[];
};

// Elemento de assinatura da marca (§2.5): a linha se desenha conforme
// o scroll avança pela Home; os nós marcam a posição real de cada
// seção no total da página. Visível apenas em lg+ — nunca no mobile.
//
// Atualiza o DOM direto via refs (sem setState) para não disparar
// re-render do React a cada frame de scroll — a geometria em si (barata
// para o tamanho desta página) é recalculada a cada frame throttled via
// requestAnimationFrame, então nunca fica desatualizada.
export function StructuralRail({ nodes }: StructuralRailProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    function update() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      const progress = Math.min(100, Math.max(0, pct));

      if (fillRef.current) {
        fillRef.current.style.height = `${progress}%`;
      }

      nodes.forEach((node, index) => {
        const el = nodeRefs.current[index];
        if (!el) return;
        const target = document.getElementById(node.id);
        let top = 0;
        if (target && scrollableHeight > 0) {
          const targetTop = target.getBoundingClientRect().top + window.scrollY;
          top = Math.min(100, Math.max(0, (targetTop / scrollableHeight) * 100));
        }
        el.style.top = `${top}%`;
        el.dataset.active = progress >= top - 2 ? "true" : "false";
      });
    }

    function onScroll() {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        update();
        frame.current = null;
      });
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [nodes]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-10 top-0 z-20 hidden h-dvh lg:block"
    >
      <div className="relative h-full w-px bg-line-strong">
        <div
          ref={fillRef}
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-blue-soft to-blue"
        />
        {nodes.map((node, index) => (
          <div
            key={node.id}
            ref={(el) => {
              nodeRefs.current[index] = el;
            }}
            data-active="false"
            className="group absolute left-1/2 -translate-x-1/2"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-line-strong bg-void font-utility text-[0.55rem] text-ivory/35 transition-colors duration-500 group-data-[active=true]:border-blue-soft group-data-[active=true]:bg-blue-soft/20 group-data-[active=true]:text-blue-soft">
              {node.number}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
