import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/lib/content";

export function Solucao() {
  return (
    <section
      id="solucao"
      className="mx-auto max-w-7xl px-6 py-32 lg:px-10 lg:py-48"
    >
      <Reveal>
        <SectionLabel>{home.solucao.eyebrow}</SectionLabel>
        <h2 className="mt-9 max-w-3xl font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
          {home.solucao.heading}
        </h2>
      </Reveal>

      <div className="mt-20 grid gap-10 md:grid-cols-5 md:gap-6">
        {home.solucao.steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.08}>
            <p className="font-display text-3xl font-semibold text-blue">
              {step.number}
            </p>
            <span
              className="mt-4 block h-px w-full bg-gradient-to-r from-blue-soft to-transparent"
              aria-hidden="true"
            />
            <p className="mt-5 font-display text-lg font-semibold text-ivory">
              {step.title}
            </p>
            <p className="mt-2 text-sm leading-[1.65] text-ivory/60">
              {step.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
