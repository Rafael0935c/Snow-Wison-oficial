import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

type SplitTextProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  paragraph: string;
};

// Layout editorial reutilizado em várias páginas internas: eyebrow +
// heading de um lado, parágrafo do outro — nunca cards.
export function SplitText({ id, eyebrow, heading, paragraph }: SplitTextProps) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-6" variant="display">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="mt-9 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.18} className="lg:col-span-5 lg:col-start-8">
          <p className="max-w-xl leading-[1.65] text-ivory/62">{paragraph}</p>
        </Reveal>
      </div>
    </section>
  );
}
