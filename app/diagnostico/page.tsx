import type { Metadata } from "next";
import { LpHero } from "@/components/sections/diagnostico/LpHero";
import { LpParaQuem } from "@/components/sections/diagnostico/LpParaQuem";
import { LpImplicacao } from "@/components/sections/diagnostico/LpImplicacao";
import { LpComoFunciona } from "@/components/sections/diagnostico/LpComoFunciona";
import { LpFormatos } from "@/components/sections/diagnostico/LpFormatos";
import { LpProvaSocial } from "@/components/sections/diagnostico/LpProvaSocial";
import { LpProfessor } from "@/components/sections/diagnostico/LpProfessor";
import { LpFaq } from "@/components/sections/diagnostico/LpFaq";
import { LpCtaFinal } from "@/components/sections/diagnostico/LpCtaFinal";
import { LpFooter } from "@/components/sections/diagnostico/LpFooter";

// Landing page de tráfego pago. Não é linkada no menu nem incluída no
// sitemap — o acesso é pelo link do anúncio. Mantida indexável porque o
// Google Ads exige que a página de destino seja rastreável.
export const metadata: Metadata = {
  // `absolute` evita o template do layout raiz duplicar o nome da marca.
  title: { absolute: "Aula diagnóstica de inglês | Snow Wison Idiomas" },
  description:
    "Você entende quase tudo, mas trava na hora de falar. Agende uma aula diagnóstica e descubra o caminho para o seu objetivo em inglês.",
  alternates: { canonical: "/diagnostico" },
};

export default function DiagnosticoPage() {
  return (
    <>
      <main id="main-content">
        <LpHero />
        <LpParaQuem />
        <LpImplicacao />
        <LpComoFunciona />
        <LpFormatos />
        <LpProvaSocial />
        <LpProfessor />
        <LpFaq />
        <LpCtaFinal />
      </main>
      <LpFooter />
    </>
  );
}
