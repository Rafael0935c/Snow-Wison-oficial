import { CornerDownRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LpEyebrow } from "@/components/lp/LpEyebrow";
import { diagnostico } from "@/lib/content";

const d = diagnostico.dores;

export function Dores() {
  return (
    <section id="voce" aria-labelledby="voce-titulo" className="py-16 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <Reveal variant="display" className="max-w-2xl">
          <LpEyebrow number="04">{d.eyebrow}</LpEyebrow>
          <h2
            id="voce-titulo"
            className="mt-6 font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ivory"
          >
            {d.heading}
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {d.items.map((item, index) => (
            <li key={item.tag}>
              <Reveal
                delay={index * 0.08}
                variant="quiet"
                className="flex h-full flex-col rounded-sm border border-line bg-navy/50 p-6 lg:p-7"
              >
                <p className="font-utility text-[0.7rem] uppercase tracking-[0.14em] text-blue-soft">
                  {item.tag}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ivory">
                  {item.title}
                </h3>
                <p className="mt-3 leading-[1.6] text-ivory/65">
                  {item.description}
                </p>
                <div className="mt-auto pt-6">
                  <div className="border-t border-line pt-5">
                    <p className="flex items-center gap-2 font-utility text-[0.68rem] uppercase tracking-[0.14em] text-blue-soft">
                      <CornerDownRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      {d.answerLabel}
                    </p>
                    <p className="mt-2 font-display text-[0.98rem] font-semibold leading-snug text-ivory">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
