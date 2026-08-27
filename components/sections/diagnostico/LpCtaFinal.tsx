import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/ui/BrandMark";
import { LpCta } from "@/components/sections/diagnostico/LpCta";
import { diagnostico } from "@/lib/content";

export function LpCtaFinal() {
  return (
    <section className="relative overflow-hidden border-t border-line px-6 py-28 lg:py-36">
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 opacity-[0.07]"
        aria-hidden="true"
      >
        <BrandMark size={320} />
      </div>

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold leading-[1.15] text-ivory">
          {diagnostico.ctaFinal.headingLine1}
          <br />
          <span className="text-blue-soft">
            {diagnostico.ctaFinal.headingLine2}
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl leading-[1.65] text-ivory/70">
          {diagnostico.ctaFinal.paragraph}
        </p>
        <div className="mt-12 flex flex-col items-center gap-4">
          <LpCta>{diagnostico.ctaFinal.cta}</LpCta>
          <p className="font-utility text-xs text-ivory/50">
            {diagnostico.ctaFinal.microcopy}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
