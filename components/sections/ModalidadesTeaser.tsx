import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/lib/content";

export function ModalidadesTeaser() {
  return (
    <section
      id="modalidades-teaser"
      className="mx-auto max-w-7xl px-6 py-32 lg:px-10 lg:py-48"
    >
      <Reveal variant="display">
        <SectionLabel>{home.modalidadesTeaser.eyebrow}</SectionLabel>
        <div className="mt-9 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
            {home.modalidadesTeaser.heading}
          </h2>
          <p className="max-w-xs text-sm text-ivory/50">
            {home.modalidadesTeaser.note}
          </p>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {home.modalidadesTeaser.items.map((item, index) => (
          <Reveal
            key={item.name}
            delay={index * 0.1}
            className="border-t border-line pt-8"
            variant="quiet"
          >
            <p className="font-utility text-xs uppercase tracking-[0.14em] text-blue-soft">
              {item.tag}
            </p>
            <p className="mt-3 font-display text-2xl font-semibold text-ivory">
              {item.name}
            </p>
            <Link
              href="/modalidades"
              className="mt-6 inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-ivory"
            >
              {home.modalidadesTeaser.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
