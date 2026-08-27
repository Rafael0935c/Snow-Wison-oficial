import { Reveal } from "@/components/ui/Reveal";
import { sobre } from "@/lib/content";

export function Objetivos() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <Reveal className="text-center" variant="display">
        <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
          {sobre.objetivos.heading}
        </h2>
      </Reveal>

      <Reveal
        delay={0.18}
        className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4"
      >
        {sobre.objetivos.items.map((item) => (
          <p
            key={item}
            className="border-t border-line pt-4 text-center font-display text-lg text-ivory/80"
          >
            {item}
          </p>
        ))}
      </Reveal>

      <Reveal delay={0.3}>
        <p className="mx-auto mt-12 max-w-2xl text-center leading-[1.65] text-ivory/62">
          {sobre.objetivos.note}
        </p>
      </Reveal>
    </section>
  );
}
