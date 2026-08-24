import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { Reveal } from "@/components/ui/Reveal";
import { brand, home } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-36 pt-44 text-center lg:pb-48 lg:pt-56"
    >
      <Reveal delay={0.05}>
        <BrandMark size={128} glow priority className="mx-auto" />
      </Reveal>

      <Reveal delay={0.22} className="mt-8 flex flex-col items-center">
        <span className="font-display text-2xl font-extrabold tracking-[0.16em] text-ivory">
          {brand.wordmark}
        </span>
        <span className="mt-2 font-utility text-[0.65rem] tracking-[0.4em] text-ivory/40">
          {brand.wordmarkSuffix}
        </span>
      </Reveal>

      <Reveal delay={0.4} className="mt-10 max-w-3xl">
        <h1 className="font-display text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ivory">
          {home.hero.headline}
        </h1>
      </Reveal>

      <Reveal delay={0.58} className="mt-8 flex max-w-xl flex-col items-center gap-10">
        <p className="text-base leading-[1.65] text-ivory/62 lg:text-lg">
          {home.hero.summary}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <WhatsAppCTA>{home.hero.ctaPrimary}</WhatsAppCTA>
          <Button href="/sobre" variant="ghost">
            {home.hero.ctaSecondary}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
