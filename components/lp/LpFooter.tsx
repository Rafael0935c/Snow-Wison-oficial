import { BrandMark } from "@/components/ui/BrandMark";
import { brand, diagnostico, footer } from "@/lib/content";
import { getWhatsAppUrl, siteConfig } from "@/lib/siteConfig";

const f = diagnostico.footer;

// Rodapé da landing page: identidade, aviso comercial e contato.
// [PREENCHER] razão social, CNPJ, Instagram e link da Política de
// Privacidade — só aparecem quando houver os dados reais.
export function LpFooter() {
  const whatsapp = getWhatsAppUrl(siteConfig.whatsappMessageLp);
  // Ano do build. O site é estático e é publicado de novo a cada
  // mudança; se passar um ano inteiro sem publicação, basta um novo build.
  const year = new Date().getFullYear();

  return (
    // pb extra no celular: a barra fixa de CTA não cobre os links.
    <footer className="relative z-10 border-t border-line px-5 pb-28 pt-12 sm:px-6 lg:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="flex flex-col items-center gap-3 lg:items-start">
          <div className="flex items-center gap-3">
            <BrandMark size={24} />
            <span className="font-display text-xs font-extrabold tracking-[0.16em] text-ivory/85">
              {brand.wordmark}
            </span>
          </div>
          <p className="font-utility text-[0.7rem] text-ivory/60">
            {footer.tagline}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 lg:items-end">
          <p className="max-w-sm text-[0.8rem] leading-[1.55] text-ivory/60">
            {f.notice}
          </p>
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_direct_click"
              className="inline-flex min-h-11 items-center text-sm text-blue-soft underline decoration-blue-soft/40 underline-offset-4 hover:decoration-blue-soft"
            >
              {f.whatsapp}
            </a>
          )}
          <p className="font-utility text-[0.68rem] text-ivory/50">
            © {year} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
