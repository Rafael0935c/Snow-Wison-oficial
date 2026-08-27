import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/ui/BrandMark";
import { home } from "@/lib/content";

export function CtaFinal() {
  return (
    <section
      id="cta-final"
      className="relative overflow-hidden px-6 py-32 lg:px-10 lg:py-48"
    >
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.08]"
        aria-hidden="true"
      >
        <BrandMark size={280} />
      </div>

      <Reveal className="relative mx-auto max-w-3xl text-center" variant="display">
        <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
          {home.finalCta.headingLine1}
          <br />
          <span className="text-blue-soft">{home.finalCta.headingLine2}</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl leading-[1.65] text-ivory/62">
          {home.finalCta.paragraph}
        </p>
        <div className="mt-12 flex flex-col items-center gap-4">
          <WhatsAppCTA>{home.finalCta.cta}</WhatsAppCTA>
          <p className="font-utility text-xs text-ivory/50">
            {home.finalCta.microcopy}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
