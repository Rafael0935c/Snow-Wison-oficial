"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { WhatsAppBubble } from "@/components/sections/resultados/WhatsAppBubble";
import { diagnostico, type Testimonial } from "@/lib/content";

const t = diagnostico.avaliacoes;
const INTERVAL_MS = 5000;

/**
 * Carrossel de avaliações. Avança sozinho a cada 5 s, mas para quando a
 * pessoa passa o mouse, toca, põe o foco dentro dele, quando sai da tela
 * ou quando a aba fica em segundo plano. Com "reduzir movimento", nunca
 * anda sozinho. O botão de pausa atende à WCAG 2.2.2 (todo movimento
 * automático precisa poder ser parado).
 *
 * A rolagem é nativa (scroll-snap): no celular a pessoa também arrasta
 * com o dedo, sem biblioteca.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false); // pelo botão
  const [hold, setHold] = useState(false); // hover, toque ou foco
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector("[role=group]");
      const step = card
        ? card.getBoundingClientRect().width + 16
        : el.clientWidth;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      const atStart = el.scrollLeft <= 8;
      const behavior = reduced ? "auto" : "smooth";
      if (direction === 1 && atEnd) {
        el.scrollTo({ left: 0, behavior });
      } else if (direction === -1 && atStart) {
        el.scrollTo({ left: el.scrollWidth, behavior });
      } else {
        el.scrollBy({ left: step * direction, behavior });
      }
    },
    [reduced]
  );

  const autoplay = !paused && !hold && visible && !reduced;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") scrollByCard(1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [autoplay, scrollByCard]);

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={t.regionLabel}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
      }}
      onTouchStart={() => setHold(true)}
      onTouchEnd={() => window.setTimeout(() => setHold(false), 4000)}
    >
      <div
        ref={trackRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            role="group"
            aria-roledescription="slide"
            aria-label={t.slideLabel
              .replace("{atual}", String(index + 1))
              .replace("{total}", String(items.length))}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]"
          >
            <WhatsAppBubble testimonial={item} tone="light" className="" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label={t.prev}
          className="flex h-11 w-11 items-center justify-center rounded-sm border border-navy/20 text-navy transition-colors hover:border-blue-deep hover:text-blue-deep"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? t.play : t.pause}
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-navy/20 text-navy transition-colors hover:border-blue-deep hover:text-blue-deep"
          >
            {paused ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label={t.next}
          className="flex h-11 w-11 items-center justify-center rounded-sm border border-navy/20 text-navy transition-colors hover:border-blue-deep hover:text-blue-deep"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
