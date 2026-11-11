import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { LpEyebrow } from "@/components/lp/LpEyebrow";
import { diagnostico } from "@/lib/content";

const f = diagnostico.faq;

export function LpFaq() {
  return (
    <section
      id="duvidas"
      aria-labelledby="duvidas-titulo"
      className="py-16 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        {/* No desktop o título acompanha a rolagem pelas 12 perguntas. */}
        <div className="lg:col-span-5">
          <Reveal variant="display" className="lg:sticky lg:top-28">
            <LpEyebrow number="08">{f.eyebrow}</LpEyebrow>
            <h2
              id="duvidas-titulo"
              className="mt-6 font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ivory"
            >
              {f.heading}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <FaqAccordion items={[...f.items]} headingLevel={3} trackOpens />
        </Reveal>
      </div>
    </section>
  );
}
