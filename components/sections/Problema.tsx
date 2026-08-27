import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/lib/content";

// Esta seção carrega a dor do aluno — tratamento deliberadamente
// diferente das seções vizinhas (coluna única, tipografia maior, mais
// respiro por item) para não se misturar ao padrão de 2 colunas usado
// em Filosofia/ComoFunciona.
export function Problema() {
  return (
    <section
      id="problema"
      className="mx-auto max-w-4xl px-6 py-32 lg:py-48"
    >
      <Reveal className="text-center" variant="display">
        <SectionLabel className="justify-center">
          {home.problema.eyebrow}
        </SectionLabel>
        <h2 className="mx-auto mt-9 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.15] text-ivory">
          {home.problema.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-blue-soft">
          {home.problema.subheading}
        </p>
      </Reveal>

      <ul className="mt-20">
        {home.problema.items.map((item, index) => (
          <li key={item}>
            <Reveal delay={0.15 + index * 0.1} variant="quiet">
              {index > 0 && <Divider fade />}
              <div className="flex items-start gap-5 py-8">
                <span
                  className="font-utility text-2xl leading-none text-blue-soft"
                  aria-hidden="true"
                >
                  /
                </span>
                <span className="font-display text-xl leading-[1.4] text-ivory md:text-2xl">
                  {item}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
