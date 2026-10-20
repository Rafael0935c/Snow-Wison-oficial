import { Hero } from "@/components/sections/Hero";
import { ResultadosTeaser } from "@/components/sections/ResultadosTeaser";
import { MetodologiaTeaser } from "@/components/sections/MetodologiaTeaser";
import { Problema } from "@/components/sections/Problema";
import { ModalidadesTeaser } from "@/components/sections/ModalidadesTeaser";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { StructuralRail, type RailNode } from "@/components/layout/StructuralRail";

// Ordem pensada para quem decide rápido: credenciais já na primeira tela,
// depois a prova (alunos), o porquê (método e quem ensina), o problema
// com o caminho proposto, os formatos e o convite final.
const railNodes: RailNode[] = [
  { id: "hero", number: "01" },
  { id: "resultados", number: "02" },
  { id: "metodologia", number: "03" },
  { id: "problema", number: "04" },
  { id: "modalidades-teaser", number: "05" },
  { id: "cta-final", number: "06" },
];

export default function HomePage() {
  return (
    <>
      <StructuralRail nodes={railNodes} />
      <main id="main-content">
        <Hero />
        <ResultadosTeaser />
        <MetodologiaTeaser />
        <Problema />
        <ModalidadesTeaser />
        <CtaFinal />
      </main>
    </>
  );
}
