"use client";

import { useEffect, useRef, useState } from "react";

const NODES = [
  { cx: 20, cy: 190 },
  { cx: 240, cy: 100 },
  { cx: 460, cy: 40 },
];

// Metáfora visual do §8.3: um caminho que se desenha progressivamente
// quando entra em viewport. Respeita prefers-reduced-motion via a
// regra global em globals.css (força transition-duration a ~0).
export function PathProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <svg viewBox="0 0 480 220" className="w-full" aria-hidden="true">
        <defs>
          <linearGradient id="path-progress-gradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#4FA3FF" />
            <stop offset="100%" stopColor="#12299E" />
          </linearGradient>
        </defs>
        <path
          d="M20 190 C 140 190, 140 60, 240 100 S 400 190, 460 40"
          fill="none"
          stroke="url(#path-progress-gradient)"
          strokeWidth={2}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={drawn ? 0 : 100}
          style={{
            transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {NODES.map((node, index) => (
          <circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r={index === NODES.length - 1 ? 7 : 5}
            fill={index === NODES.length - 1 ? "#4FA3FF" : "#05070F"}
            stroke="#4FA3FF"
            strokeWidth={2}
            style={{
              opacity: drawn ? 1 : 0,
              transition: `opacity 0.5s ease ${0.6 + index * 0.3}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
