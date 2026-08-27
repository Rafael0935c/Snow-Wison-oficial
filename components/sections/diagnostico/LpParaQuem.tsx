import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { diagnostico } from "@/lib/content";

export function LpParaQuem() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <Reveal className="text-center">
        <SectionLabel className="justify-center">
          {diagnostico.paraQuem.eyebrow}
        </SectionLabel>
        <h2 className="mx-auto mt-9 max-w-2xl font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
          {diagnostico.paraQuem.heading}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
        {diagnostico.paraQuem.items.map((item, index) => (
          <Reveal
            key={item.tag}
            delay={index * 0.12}
            className="border-t border-line pt-8"
          >
            <p className="font-utility text-xs uppercase tracking-[0.14em] text-blue-soft">
              {item.tag}
            </p>
            <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-ivory">
              {item.title}
            </h3>
            <p className="mt-4 leading-[1.65] text-ivory/62">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
