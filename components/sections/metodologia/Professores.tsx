import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { metodologia } from "@/lib/content";

export function Professores() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <Reveal className="max-w-2xl" variant="display">
        <SectionLabel>{metodologia.professores.eyebrow}</SectionLabel>
        <h2 className="mt-9 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
          {metodologia.professores.heading}
        </h2>
        <p className="mt-6 leading-[1.65] text-ivory/62">
          {metodologia.professores.paragraph}
        </p>
      </Reveal>

      <Reveal delay={0.18} className="mt-10">
        <p className="font-utility text-xs uppercase tracking-[0.1em] text-ivory/50">
          {metodologia.professores.criteriaLabel}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {metodologia.professores.criteria.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line-strong px-4 py-1.5 font-utility text-xs uppercase tracking-[0.08em] text-ivory/70"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
