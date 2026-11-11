import type { Metadata, Viewport } from "next";
import { sora, manrope, spaceMono } from "@/lib/fonts";
import { siteConfig } from "@/lib/siteConfig";
import { a11y } from "@/lib/content";
import { educationalOrganizationJsonLd, serializeJsonLd } from "@/lib/jsonLd";
import { Atmosphere } from "@/components/layout/Atmosphere";
import "./globals.css";

// Layout raiz: só o que vale para TODAS as rotas (documento, fontes,
// atmosfera de fundo, link de acessibilidade). Cabeçalho, rodapé e botão
// flutuante do site institucional ficam em app/(site)/layout.tsx; a
// landing page de anúncios tem o seu próprio, em app/(lp)/layout.tsx.
// Separar assim faz cada página baixar só o JavaScript que usa — antes, a
// landing page carregava o código do menu do site sem nunca exibi-lo.

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.shortName,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${manrope.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(educationalOrganizationJsonLd),
          }}
        />
        {/* Sem JavaScript, nada dispararia a entrada dos blocos (.reveal)
            e eles ficariam invisíveis. */}
        <noscript>
          <style>
            {".reveal{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>
      </head>
      <body className="relative flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
        >
          {a11y.skipLink}
        </a>
        <Atmosphere />
        {children}
      </body>
    </html>
  );
}
