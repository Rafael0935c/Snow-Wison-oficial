import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/lib/content";

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="mx-auto max-w-7xl px-6 py-32 lg:px-10 lg:py-48"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <SectionLabel>{home.comoFunciona.eyebrow}</SectionLabel>
          <h2 className="mt-9 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
            {home.comoFunciona.heading}
          </h2>
          <p className="mt-6 max-w-xl leading-[1.65] text-ivory/62">
            {home.comoFunciona.support}
          </p>
        </Reveal>

        <Reveal delay={0.18} className="lg:col-span-6 lg:col-start-7">
          <ol className="border-l border-line-strong">
            {home.comoFunciona.steps.map((step, index) => (
              <li key={step} className="relative py-4 pl-8">
                <span
                  className="absolute left-[-4.5px] top-6 h-2 w-2 rounded-full bg-blue-soft"
                  aria-hidden="true"
                />
                <span className="font-utility text-xs text-blue-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-ivory/80">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
