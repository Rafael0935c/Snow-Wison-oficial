import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/lib/content";

export function ModalidadesTeaser() {
  return (
    <section
      id="modalidades-teaser"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"
    >
      <Reveal variant="display">
        <SectionLabel>{home.modalidadesTeaser.eyebrow}</SectionLabel>
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
            {home.modalidadesTeaser.heading}
          </h2>
          <p className="max-w-xs text-sm leading-[1.6] text-ivory/50">
            {home.modalidadesTeaser.note}
          </p>
        </div>
      </Reveal>

      {/* Duas colunas já no celular: quatro cartões empilhados ocupavam
          mais de uma tela inteira só de rolagem. */}
      <ul className="mt-10 grid grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-4 lg:gap-5">
        {home.modalidadesTeaser.items.map((item, index) => (
          <li key={item.id}>
            <Reveal delay={index * 0.08} className="h-full" variant="quiet">
              <Link
                href={`/modalidades#${item.id}`}
                className="group flex h-full flex-col rounded-sm border border-line bg-navy/40 p-4 transition-colors duration-300 hover:border-blue-soft/45 hover:bg-navy-2/70 sm:p-5 lg:p-7"
              >
                <span className="font-utility text-[0.6rem] uppercase tracking-[0.12em] text-blue-soft sm:text-[0.65rem]">
                  {item.tag}
                </span>
                <span className="mt-2.5 font-display text-xl font-semibold text-ivory lg:mt-3 lg:text-2xl">
                  {item.name}
                </span>
                {/* Spans em bloco, com text-pretty: a regra global que
                    evita palavra sozinha na última linha só vale para <p>. */}
                <span className="mt-2 block text-pretty text-[0.82rem] leading-[1.55] text-ivory/58 sm:text-sm">
                  {item.description}
                </span>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm text-ivory/70 transition-colors group-hover:text-ivory lg:pt-6">
                  {home.modalidadesTeaser.cta}
                  <ArrowRight
                    className="h-4 w-4 text-blue-soft transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
