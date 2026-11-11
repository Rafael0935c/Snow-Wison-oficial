import { Reveal } from "@/components/ui/Reveal";
import { LpEyebrow } from "@/components/lp/LpEyebrow";
import { diagnostico } from "@/lib/content";

const p = diagnostico.professores;

// Por enquanto só os critérios de seleção (equipe sem fotos ainda).
// Quando chegarem foto, nome, papel e uma frase de cada professor, eles
// entram aqui — sem credencial inventada.
export function Professores() {
  return (
    <section
      id="professores"
      aria-labelledby="professores-titulo"
      className="py-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal variant="display" className="lg:col-span-7">
            <LpEyebrow number="06">{p.eyebrow}</LpEyebrow>
            <h2
              id="professores-titulo"
              className="mt-6 font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ivory"
            >
              {p.heading}
            </h2>
            <p className="mt-5 max-w-xl leading-[1.65] text-ivory/70">
              {p.paragraph}
            </p>
          </Reveal>
          <Reveal delay={0.12} variant="quiet" className="lg:col-span-5">
            <ul className="grid grid-cols-2 gap-3">
              {p.criteria.map((item) => (
                <li
                  key={item}
                  className="flex min-h-16 items-center rounded-sm border border-line-strong bg-navy/40 px-4 py-3 font-display text-[0.92rem] font-semibold leading-snug text-ivory"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
