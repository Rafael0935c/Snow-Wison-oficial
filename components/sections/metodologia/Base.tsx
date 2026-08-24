import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { metodologia } from "@/lib/content";

export function Base() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <Reveal>
        <SectionLabel>{metodologia.base.eyebrow}</SectionLabel>
        <h2 className="mt-9 max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
          {metodologia.base.heading}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
        {metodologia.base.items.map((item, index) => (
          <Reveal
            key={item.title}
            delay={index * 0.1}
            className="border-t border-line pt-6"
          >
            <p className="font-display text-lg font-semibold text-ivory">
              {item.title}
            </p>
            <p className="mt-2 leading-[1.65] text-ivory/62">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
