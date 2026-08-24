import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/lib/content";

export function Filosofia() {
  const [first, second] = home.filosofia.equation;

  return (
    <section
      id="filosofia"
      className="mx-auto max-w-7xl px-6 py-32 lg:px-10 lg:py-48"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <SectionLabel>{home.filosofia.eyebrow}</SectionLabel>
          <h2 className="mt-9 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
            {home.filosofia.heading}
          </h2>
          <p className="mt-6 max-w-xl font-display text-lg font-semibold leading-[1.4] text-blue-soft">
            {home.filosofia.statement}
          </p>
          <p className="mt-6 max-w-xl leading-[1.65] text-ivory/62">
            {home.filosofia.paragraph}
          </p>
        </Reveal>

        <Reveal delay={0.18} className="lg:col-span-6 lg:col-start-7">
          <div className="flex flex-col items-start">
            <div>
              <p className="font-display text-2xl font-semibold text-ivory lg:text-3xl">
                {first.title}
              </p>
              <p className="mt-2 font-utility text-sm uppercase tracking-[0.1em] text-ivory/50">
                {first.note}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1 py-4 pl-1">
              <span className="h-7 w-px bg-line-strong" aria-hidden="true" />
              <span className="font-utility text-2xl text-blue-soft" aria-hidden="true">
                +
              </span>
            </div>

            <div>
              <p className="font-display text-2xl font-semibold text-ivory lg:text-3xl">
                {second.title}
              </p>
              <p className="mt-2 font-utility text-sm uppercase tracking-[0.1em] text-ivory/50">
                {second.note}
              </p>
            </div>

            <div className="flex flex-col items-center gap-1 py-4 pl-1">
              <span className="h-7 w-px bg-line-strong" aria-hidden="true" />
              <span className="font-utility text-2xl text-blue-soft" aria-hidden="true">
                =
              </span>
            </div>

            <p className="bg-gradient-to-r from-ivory to-blue-soft bg-clip-text font-display text-3xl font-semibold text-transparent">
              {home.filosofia.result}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
