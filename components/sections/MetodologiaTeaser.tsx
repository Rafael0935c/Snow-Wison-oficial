import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { home, metodologia } from "@/lib/content";

// Resumo da metodologia na home, em três camadas: o conceito (estrutura +
// aplicação), os princípios de cada aula e, por último, o que sustenta
// tudo isso — quem ensina e de onde vêm as referências.
export function MetodologiaTeaser() {
  const m = home.metodologia;
  const [first, second] = m.equation;

  return (
    <section
      id="metodologia"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <Reveal className="lg:col-span-7" variant="display">
          <SectionLabel>{m.eyebrow}</SectionLabel>
          <h2 className="mt-8 max-w-xl font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
            {m.heading}
          </h2>
          <p className="mt-5 max-w-lg font-display text-lg font-semibold leading-[1.4] text-blue-soft">
            {m.statement}
          </p>
        </Reveal>

        {/* A "equação" da marca, montada como fórmula: operador numa
            coluna estreita, termos alinhados na outra. As notas repetem a
            frase azul ao lado, então somem no celular para poupar altura. */}
        <Reveal delay={0.15} className="lg:col-span-5" variant="quiet">
          <div className="space-y-3 border-l border-line-strong pl-5 lg:space-y-4 lg:pl-6">
            <div className="grid grid-cols-[1.4rem_minmax(0,1fr)] items-baseline">
              <span aria-hidden="true" />
              <div>
                <p className="font-display text-lg font-semibold text-ivory lg:text-xl">
                  {first.title}
                </p>
                <p className="mt-1 hidden font-utility text-[0.68rem] uppercase tracking-[0.1em] text-ivory/55 sm:block">
                  {first.note}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[1.4rem_minmax(0,1fr)] items-baseline">
              <span className="font-utility text-lg text-blue-soft" aria-hidden="true">
                +
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-ivory lg:text-xl">
                  {second.title}
                </p>
                <p className="mt-1 hidden font-utility text-[0.68rem] uppercase tracking-[0.1em] text-ivory/55 sm:block">
                  {second.note}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[1.4rem_minmax(0,1fr)] items-baseline">
              <span className="font-utility text-lg text-blue-soft" aria-hidden="true">
                =
              </span>
              <p className="bg-gradient-to-r from-ivory to-blue-soft bg-clip-text font-display text-xl font-semibold text-transparent lg:text-2xl">
                {m.result}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <ol className="mt-12 grid grid-cols-2 gap-x-5 gap-y-7 border-t border-line pt-8 lg:mt-14 lg:grid-cols-4 lg:gap-x-10">
        {metodologia.base.items.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 0.08} variant="quiet">
              <span className="font-utility text-xs text-blue-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-display text-base font-semibold leading-snug text-ivory lg:text-lg">
                {item.title}
              </p>
              {/* No celular ficam só os títulos: em meia largura de tela
                  cada frase quebrava em cinco linhas. A descrição completa
                  está em /metodologia. */}
              <p className="mt-1.5 hidden text-sm leading-[1.55] text-ivory/58 sm:block">
                {item.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal
        delay={0.1}
        className="mt-10 grid rounded-sm border border-line bg-navy/45 lg:mt-12 lg:grid-cols-2"
        variant="quiet"
      >
        <div className="p-6 lg:p-8">
          <p className="font-utility text-[0.68rem] uppercase tracking-[0.14em] text-blue-soft">
            {m.professoresLabel}
          </p>
          <p className="mt-3 text-[0.95rem] leading-[1.6] text-ivory/72">
            {m.professores}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {metodologia.professores.criteria.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line-strong px-3 py-1 font-utility text-[0.6rem] uppercase tracking-[0.06em] text-ivory/75 sm:px-3.5 sm:py-1.5 sm:text-[0.68rem] sm:tracking-[0.08em]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col border-t border-line p-6 lg:border-l lg:border-t-0 lg:p-8">
          <p className="font-utility text-[0.68rem] uppercase tracking-[0.14em] text-blue-soft">
            {m.referenciasLabel}
          </p>
          <p className="mt-3 text-[0.95rem] leading-[1.6] text-ivory/72">
            {metodologia.referencias.paragraph}
          </p>
          <Link
            href="/metodologia"
            className="group mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-4 font-display text-sm font-semibold text-ivory/85 transition-colors hover:text-ivory"
          >
            {m.cta}
            <ArrowRight
              className="h-4 w-4 text-blue-soft transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
