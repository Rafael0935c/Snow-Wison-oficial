import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { ModalidadeBlock } from "@/components/sections/modalidades/ModalidadeBlock";
import { PremiumDestaque } from "@/components/sections/modalidades/PremiumDestaque";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { modalidades } from "@/lib/content";

export const metadata: Metadata = {
  title: "Modalidades",
  description: modalidades.intro.paragraph,
};

export default function ModalidadesPage() {
  return (
    <main id="main-content">
      <PageIntro
        heading={modalidades.intro.heading}
        paragraph={modalidades.intro.paragraph}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {modalidades.blocks.map((block, index) => (
          <ModalidadeBlock key={block.id} {...block} reverse={index % 2 === 1} />
        ))}
      </div>

      <PremiumDestaque />
      <CtaFinal />
    </main>
  );
}
