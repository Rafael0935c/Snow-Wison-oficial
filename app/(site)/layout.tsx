import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";

// Páginas do site institucional (início, quem somos, metodologia...).
// O parêntese no nome da pasta não entra no endereço: /sobre continua /sobre.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
