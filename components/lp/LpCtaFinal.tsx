import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BrandMark } from "@/components/ui/BrandMark";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { LpButton } from "@/components/lp/LpButton";
import { LpEyebrow } from "@/components/lp/LpEyebrow";
import { diagnostico } from "@/lib/content";
import { getWhatsAppUrl, siteConfig } from "@/lib/siteConfig";

const c = diagnostico.ctaFinal;

export function LpCtaFinal() {
  const direct = getWhatsAppUrl(siteConfig.whatsappMessageLp);

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="relative overflow-hidden border-t border-line py-20 lg:py-32"
    >
      {/* Momento da conversão: o ponto mais iluminado da página. */}
      <AmbientGlow intensity={0.16} size={46} />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 opacity-[0.07]"
        aria-hidden="true"
      >
        <BrandMark size={320} />
      </div>

      <Reveal
        variant="display"
        className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-6"
      >
        <LpEyebrow number="09">{c.eyebrow}</LpEyebrow>
        <h2
          id="contato-titulo"
          className="mt-6 font-display text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ivory"
        >
          {c.headingLine1}
          <br />
          <span className="text-blue-soft">{c.headingLine2}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-[1.65] text-ivory/70">
          {c.paragraph}
        </p>
        <div className="mt-10 flex flex-col items-center gap-5">
          <LpButton quiz>{c.cta}</LpButton>
          {direct && (
            <a
              href={direct}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_direct_click"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-ivory/70 underline decoration-line-strong underline-offset-8 transition-colors hover:text-ivory hover:decoration-blue-soft"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {c.direct}
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
