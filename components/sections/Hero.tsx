import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { Enter } from "@/components/ui/Enter";
import { brand, home } from "@/lib/content";

// A primeira tela é uma composição fechada: marca, promessa, ação e, no
// pé, as credenciais. A faixa fica presa à base da tela (min-h-svh +
// coluna flexível) para que resultados e método já apareçam antes da
// primeira rolagem, em qualquer altura de monitor.
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col px-6 pt-20 lg:px-10 lg:pt-24"
    >
      <div className="flex flex-1 flex-col items-center justify-center py-8 text-center lg:py-10">
        <Enter>
          <BrandMark size={76} glow eager className="mx-auto" />
        </Enter>

        <Enter delay={0.08} className="mt-5 flex flex-col items-center">
          <span className="font-display text-xl font-extrabold tracking-[0.16em] text-ivory">
            {brand.wordmark}
          </span>
          <span className="mt-1.5 font-utility text-[0.6rem] tracking-[0.4em] text-ivory/40">
            {brand.wordmarkSuffix}
          </span>
        </Enter>

        <Enter delay={0.16} className="mt-7 max-w-3xl lg:mt-9">
          <h1 className="font-display text-[clamp(1.95rem,4.4vw,3.3rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-ivory">
            {home.hero.headline}
          </h1>
        </Enter>

        <Enter
          delay={0.26}
          className="mt-5 flex max-w-xl flex-col items-center gap-7 lg:mt-7 lg:gap-9"
        >
          <p className="text-base leading-[1.6] text-ivory/62 lg:text-lg">
            {home.hero.summary}
          </p>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <WhatsAppCTA>{home.hero.ctaPrimary}</WhatsAppCTA>
            <Button href="/sobre" variant="ghost">
              {home.hero.ctaSecondary}
            </Button>
          </div>
        </Enter>
      </div>

      {/* 75rem = a largura útil das outras seções (max-w-7xl menos o
          respiro lateral delas), para a faixa alinhar com tudo abaixo. */}
      <Enter delay={0.36} className="mx-auto w-full max-w-[75rem]">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line py-6 lg:grid-cols-4 lg:gap-0 lg:py-8">
          {home.hero.credenciais.map((item) => (
            <div
              key={item.label}
              className="lg:border-l lg:border-line lg:px-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="font-utility text-[0.62rem] uppercase tracking-[0.16em] text-blue-soft">
                {item.label}
              </dt>
              <dd className="mt-1.5 font-display text-[0.95rem] font-semibold leading-snug text-ivory lg:text-base">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Enter>
    </section>
  );
}
