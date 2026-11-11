import { Reveal } from "@/components/ui/Reveal";
import { LpEyebrow } from "@/components/lp/LpEyebrow";
import { diagnostico } from "@/lib/content";

const c = diagnostico.comoFunciona;

// Os quatro passos ligados por uma linha — a "ponte" da marca. Na
// horizontal no desktop, na vertical no celular.
export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-titulo"
      className="lp-dots relative z-10 py-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <Reveal variant="display" className="max-w-2xl">
          <LpEyebrow number="05">{c.eyebrow}</LpEyebrow>
          <h2
            id="como-funciona-titulo"
            className="mt-6 font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ivory"
          >
            {c.heading}
          </h2>
        </Reveal>

        {/* A linha fica fora da lista: <ol> só pode ter <li> como filho. */}
        <div className="relative mt-10 lg:mt-16">
          <span
            className="absolute bottom-4 left-[1.1rem] top-4 w-px bg-gradient-to-b from-blue-soft via-blue to-transparent lg:bottom-auto lg:left-4 lg:right-0 lg:top-[1.1rem] lg:h-px lg:w-auto lg:bg-gradient-to-r"
            aria-hidden="true"
          />
          <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-8">
            {c.steps.map((step, index) => (
              <li key={step.number} className="relative">
                <Reveal
                  delay={index * 0.1}
                  variant="quiet"
                  className="flex gap-5 lg:block"
                >
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-soft bg-navy font-utility text-xs text-blue-soft">
                    {step.number}
                  </span>
                  <div className="lg:mt-6">
                    <h3 className="font-display text-lg font-semibold text-ivory">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-[1.6] text-ivory/65">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
