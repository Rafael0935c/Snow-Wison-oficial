import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { diagnostico } from "@/lib/content";

export function LpProfessor() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 lg:py-32">
      <Reveal className="text-center">
        <SectionLabel className="justify-center">
          {diagnostico.professor.eyebrow}
        </SectionLabel>
        <h2 className="mt-9 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
          {diagnostico.professor.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-[1.65] text-ivory/62">
          {diagnostico.professor.paragraph}
        </p>
      </Reveal>

      <Reveal delay={0.18} className="mt-10 flex flex-wrap justify-center gap-3">
        {diagnostico.professor.criteria.map((item) => (
          <span
            key={item}
            className="rounded-full border border-line-strong px-4 py-1.5 font-utility text-xs uppercase tracking-[0.08em] text-ivory/70"
          >
            {item}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
