import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/ui/BrandMark";
import { diagnostico } from "@/lib/content";

// Momento de respiro da LP: uma afirmação só, com peso. Faz a ponte
// entre a dor (seções acima) e a oferta (seções abaixo).
export function LpImplicacao() {
  return (
    <section className="relative overflow-hidden border-y border-line py-28 lg:py-36">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="absolute h-[30rem] w-[30rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(47,140,240,0.16), transparent 70%)",
          }}
        />
        <BrandMark size={380} className="relative opacity-[0.07]" />
      </div>

      <Reveal className="relative mx-auto max-w-3xl px-6 text-center" variant="display">
        <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.2] text-ivory">
          {diagnostico.implicacao.heading}
        </h2>
        <p className="mx-auto mt-8 max-w-xl leading-[1.65] text-ivory/70">
          {diagnostico.implicacao.paragraph}
        </p>
      </Reveal>
    </section>
  );
}
