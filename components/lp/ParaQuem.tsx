import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LpEyebrow } from "@/components/lp/LpEyebrow";
import { diagnostico } from "@/lib/content";

const p = diagnostico.paraQuem;

// Qualifica o lead: quem não se encaixa descobre aqui, não no diagnóstico.
// Sem vermelho (fora da paleta): o "não" usa um traço neutro.
export function ParaQuem() {
  return (
    <section
      id="para-quem"
      aria-labelledby="para-quem-titulo"
      className="lp-dots relative z-10 py-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <Reveal variant="display" className="max-w-2xl">
          <LpEyebrow number="07">{p.eyebrow}</LpEyebrow>
          <h2
            id="para-quem-titulo"
            className="mt-6 font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ivory"
          >
            {p.heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:gap-6">
          <Reveal
            variant="quiet"
            className="rounded-sm border border-blue-soft/40 bg-void/70 p-6 lg:p-8"
          >
            <h3 className="font-display text-lg font-semibold text-ivory">
              {p.yesTitle}
            </h3>
            <ul className="mt-5 space-y-4">
              {p.yes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 leading-[1.5] text-ivory/85"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-blue-soft"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            delay={0.1}
            variant="quiet"
            className="rounded-sm border border-line bg-void/40 p-6 lg:p-8"
          >
            <h3 className="font-display text-lg font-semibold text-ivory/80">
              {p.noTitle}
            </h3>
            <ul className="mt-5 space-y-4">
              {p.no.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 leading-[1.5] text-ivory/65"
                >
                  <Minus
                    className="mt-0.5 h-5 w-5 shrink-0 text-ivory/40"
                    aria-hidden="true"
                  />
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
