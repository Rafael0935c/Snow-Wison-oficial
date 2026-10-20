import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/lib/content";

// Problema e solução lado a lado: a coluna da esquerda é a situação de
// quem chega (tom apagado, marcador "/"), o painel da direita é o caminho
// da Snow Wison (numerado, em azul). O contraste entre os dois é o que
// a seção comunica — por isso ficam na mesma tela, e não em duas seções.
export function Problema() {
  return (
    <section
      id="problema"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal variant="display">
            <SectionLabel>{home.problema.eyebrow}</SectionLabel>
            <h2 className="mt-8 max-w-lg font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.15] text-ivory">
              {home.problema.heading}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-[1.5] text-blue-soft">
              {home.problema.subheading}
            </p>
          </Reveal>

          <ul className="mt-8 lg:mt-10">
            {home.problema.items.map((item, index) => (
              <li key={item}>
                <Reveal delay={0.1 + index * 0.06} variant="quiet">
                  {index > 0 && <Divider fade />}
                  <div className="flex items-start gap-4 py-3.5 lg:py-4">
                    <span
                      className="font-utility text-base leading-[1.45] text-blue-soft/70 lg:text-lg"
                      aria-hidden="true"
                    >
                      /
                    </span>
                    <span className="font-display text-base leading-[1.45] text-ivory/80 lg:text-lg">
                      {item}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal
          delay={0.12}
          className="self-start rounded-sm border border-line bg-navy/50 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-6 lg:p-10"
        >
          <SectionLabel>{home.solucao.eyebrow}</SectionLabel>
          <h2 className="mt-7 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-semibold leading-[1.2] text-ivory">
            {home.solucao.heading}
          </h2>
          <p className="mt-4 leading-[1.65] text-ivory/62">
            {home.solucao.support}
          </p>

          <ol className="mt-7">
            {home.solucao.steps.map((step) => (
              <li
                key={step.number}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline border-t border-line py-3.5 first:border-t-0"
              >
                <span className="font-display text-lg font-semibold text-blue">
                  {step.number}
                </span>
                <p className="leading-[1.5]">
                  <span className="font-display font-semibold text-ivory">
                    {step.title}
                  </span>
                  <span className="text-ivory/60"> — {step.description}</span>
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
