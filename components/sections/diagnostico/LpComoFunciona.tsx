import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { LpCta } from "@/components/sections/diagnostico/LpCta";
import { diagnostico } from "@/lib/content";

export function LpComoFunciona() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <SectionLabel>{diagnostico.comoFunciona.eyebrow}</SectionLabel>
          <h2 className="mt-9 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
            {diagnostico.comoFunciona.heading}
          </h2>
          <div className="mt-10 hidden lg:block">
            <LpCta>{diagnostico.hero.cta}</LpCta>
          </div>
        </Reveal>

        <ol className="lg:col-span-6 lg:col-start-7">
          {diagnostico.comoFunciona.steps.map((step, index) => (
            <li key={step.number}>
              <Reveal delay={index * 0.12}>
                <div className="flex gap-6 border-t border-line py-8 first:border-t-0 first:pt-0">
                  <span className="font-display text-2xl font-semibold text-blue">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ivory">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-[1.65] text-ivory/62">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="lg:hidden">
          <LpCta>{diagnostico.hero.cta}</LpCta>
        </Reveal>
      </div>
    </section>
  );
}
