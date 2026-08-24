import { BrandMark } from "@/components/ui/BrandMark";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/lib/content";

// Nenhuma foto cinematográfica real do pinguim foi fornecida pelo
// cliente — os únicos assets recebidos além do símbolo gráfico são
// renders 3D estilo mascote, proibidos pelo §2.6 do briefing. Em vez de
// um placeholder de "conteúdo pendente", o respiro usa o próprio símbolo
// como marca d'água atmosférica (uso explicitamente permitido pelo §2.6).
export function RespiroAtmosferico() {
  return (
    <Reveal>
      <section id="respiro" className="relative h-[62vh] overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="absolute h-[36rem] w-[36rem] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(47,140,240,0.22), transparent 70%)",
            }}
          />
          <BrandMark size={520} className="relative opacity-[0.14]" />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void" />
        </div>

        <div className="absolute bottom-10 left-6 max-w-md lg:left-10">
          <p className="font-display text-xl font-semibold leading-snug text-ivory lg:text-2xl">
            {home.atmospheric.line1}
            <br />
            {home.atmospheric.line2}
          </p>
        </div>
      </section>
    </Reveal>
  );
}
