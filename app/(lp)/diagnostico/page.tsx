import type { Metadata, Viewport } from "next";
import { LpHeader } from "@/components/lp/LpHeader";
import { LpHero } from "@/components/lp/LpHero";
import { Quiz } from "@/components/lp/quiz/Quiz";
import { Avaliacoes } from "@/components/lp/Avaliacoes";
import { Dores } from "@/components/lp/Dores";
import { ComoFunciona } from "@/components/lp/ComoFunciona";
import { Professores } from "@/components/lp/Professores";
import { ParaQuem } from "@/components/lp/ParaQuem";
import { LpFaq } from "@/components/lp/LpFaq";
import { LpCtaFinal } from "@/components/lp/LpCtaFinal";
import { LpFooter } from "@/components/lp/LpFooter";
import { LpFloatingCta } from "@/components/lp/LpFloatingCta";
import { diagnostico } from "@/lib/content";
import { serializeJsonLd } from "@/lib/jsonLd";

// Landing page de tráfego pago. Não é linkada no menu nem incluída no
// sitemap — o acesso é pelo link do anúncio. Mantida indexável porque o
// Google Ads exige que a página de destino seja rastreável.
export const metadata: Metadata = {
  // `absolute` evita o template do layout raiz duplicar o nome da marca.
  title: { absolute: "Diagnóstico de inglês ao vivo | Snow Wison Idiomas" },
  description:
    "Você entende quase tudo, mas trava na hora de falar. Agende seu diagnóstico gratuito e descubra o caminho para o seu objetivo em inglês.",
  alternates: { canonical: "/diagnostico" },
};

// A página ocupa a tela inteira do iPhone (atrás do entalhe e da barra de
// gestos); as barras fixas compensam com env(safe-area-inset-*). Os demais
// campos de viewport vêm do layout raiz.
export const viewport: Viewport = { viewportFit: "cover" };

// Mesmo conteúdo do FAQ da página, em dados estruturados.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: diagnostico.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function DiagnosticoPage() {
  return (
    <div className="lp-root">
      <LpHeader />
      <main id="main-content">
        <LpHero />
        <Quiz />
        <Avaliacoes />
        <Dores />
        <ComoFunciona />
        <Professores />
        <ParaQuem />
        <LpFaq />
        <LpCtaFinal />
      </main>
      <LpFooter />
      <LpFloatingCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />
    </div>
  );
}
