import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { diagnostico } from "@/lib/content";

export function LpFaq() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
      <Reveal className="text-center" variant="display">
        <SectionLabel className="justify-center">
          {diagnostico.faq.eyebrow}
        </SectionLabel>
        <h2 className="mt-9 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
          {diagnostico.faq.heading}
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="mt-14">
        <FaqAccordion items={[...diagnostico.faq.items]} />
      </Reveal>
    </section>
  );
}
