import { Hero } from "@/components/sections/Hero";
import { Filosofia } from "@/components/sections/Filosofia";
import { Problema } from "@/components/sections/Problema";
import { Solucao } from "@/components/sections/Solucao";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { RespiroAtmosferico } from "@/components/sections/RespiroAtmosferico";
import { ModalidadesTeaser } from "@/components/sections/ModalidadesTeaser";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { StructuralRail, type RailNode } from "@/components/layout/StructuralRail";

const railNodes: RailNode[] = [
  { id: "hero", number: "01" },
  { id: "filosofia", number: "02" },
  { id: "problema", number: "03" },
  { id: "solucao", number: "04" },
  { id: "como-funciona", number: "05" },
  { id: "respiro", number: "06" },
  { id: "modalidades-teaser", number: "07" },
  { id: "cta-final", number: "08" },
];

export default function HomePage() {
  return (
    <>
      <StructuralRail nodes={railNodes} />
      <main id="main-content">
        <Hero />
        <Filosofia />
        <Problema />
        <Solucao />
        <ComoFunciona />
        <RespiroAtmosferico />
        <ModalidadesTeaser />
        <CtaFinal />
      </main>
    </>
  );
}
