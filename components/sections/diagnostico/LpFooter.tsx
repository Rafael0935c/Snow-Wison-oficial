import { BrandMark } from "@/components/ui/BrandMark";
import { brand, footer } from "@/lib/content";

// Rodapé mínimo: só identidade e linha legal. Sem links de navegação —
// numa LP de tráfego pago, cada link é uma rota de saída do funil.
export function LpFooter() {
  return (
    <footer className="border-t border-line px-6 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3">
          <BrandMark size={22} />
          <span className="font-display text-xs tracking-[0.16em] text-ivory/80">
            {brand.wordmark}
          </span>
        </div>
        <p className="font-utility text-[0.7rem] text-ivory/50">
          {footer.tagline}
        </p>
        {/* CNPJ, Política de Privacidade e Termos de Uso: pendentes — ver PENDENCIAS.md */}
      </div>
    </footer>
  );
}
