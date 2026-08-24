import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BrandMark } from "@/components/ui/BrandMark";
import { Divider } from "@/components/ui/Divider";
import { nav, footer, brand } from "@/lib/content";
import { siteConfig, getWhatsAppUrl } from "@/lib/siteConfig";

export function Footer() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="mt-auto px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark size={28} />
            <div className="font-display text-sm tracking-[0.16em] text-ivory">
              {brand.wordmark}
              <span className="ml-2 font-utility text-[0.6rem] tracking-[0.3em] text-ivory/40">
                {brand.wordmarkSuffix}
              </span>
            </div>
          </div>

          <nav
            aria-label={footer.navTitle}
            className="flex flex-wrap gap-x-8 gap-y-3"
          >
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-ivory/60 hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {siteConfig.instagram && (
              <a
                href={`https://instagram.com/${siteConfig.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Snow Wison"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ivory/70 transition-colors hover:border-blue-soft hover:text-blue-soft"
              >
                <InstagramIcon />
              </a>
            )}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Snow Wison"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ivory/70 transition-colors hover:border-blue-soft hover:text-blue-soft"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <Divider />

        <div className="flex flex-col gap-2 text-xs text-ivory/60">
          <p className="font-utility">{footer.tagline}</p>
          {/* CNPJ — PENDENTE, aguardando dado do cliente */}
          {/* Política de Privacidade — PENDENTE */}
          {/* Termos de Uso — PENDENTE */}
        </div>
      </div>
    </footer>
  );
}
