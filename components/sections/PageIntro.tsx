import { Reveal } from "@/components/ui/Reveal";

type PageIntroProps = {
  heading: string;
  paragraph?: string;
};

// Intro padrão das páginas internas — respiro suficiente no topo para
// não colidir com o Header fixo/transparente.
export function PageIntro({ heading, paragraph }: PageIntroProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-20 pt-40 text-center lg:pt-52">
      <Reveal>
        <h1 className="font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] text-ivory">
          {heading}
        </h1>
        {paragraph && (
          <p className="mx-auto mt-8 max-w-2xl leading-[1.65] text-ivory/62">
            {paragraph}
          </p>
        )}
      </Reveal>
    </section>
  );
}
