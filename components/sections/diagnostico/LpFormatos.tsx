import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { diagnostico } from "@/lib/content";

export function LpFormatos() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <Reveal>
        <SectionLabel>{diagnostico.formatos.eyebrow}</SectionLabel>
        <div className="mt-9 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
            {diagnostico.formatos.heading}
          </h2>
          <p className="max-w-sm text-sm leading-[1.6] text-ivory/55">
            {diagnostico.formatos.note}
          </p>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {diagnostico.formatos.items.map((item, index) => (
          <Reveal
            key={item.name}
            delay={index * 0.1}
            className="border-t border-line pt-8"
          >
            <p className="font-utility text-xs uppercase tracking-[0.14em] text-blue-soft">
              {item.tag}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ivory">
              {item.name}
            </h3>
            <p className="mt-4 text-sm leading-[1.65] text-ivory/62">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
