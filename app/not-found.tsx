import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { brand } from "@/lib/content";

// O Next anexa esta página a TODAS as rotas (é o "não encontrado" do
// layout raiz). Por isso ela não usa o cabeçalho do site, que é
// interativo: o JavaScript dele iria junto para todas as páginas,
// inclusive a landing page de anúncios. O rodapé não tem JavaScript.
export default function NotFound() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="-m-2 flex min-h-11 min-w-11 items-center p-2"
            aria-label={`${brand.wordmark} ${brand.wordmarkSuffix} — início`}
          >
            <BrandMark size={32} eager />
          </Link>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 flex-col">
        <main
          id="main-content"
          className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-utility text-xs uppercase tracking-[0.18em] text-blue-soft">
            404
          </p>
          <h1 className="mt-6 font-display text-3xl font-semibold text-ivory">
            Essa página não foi encontrada.
          </h1>
          <p className="mt-4 max-w-md text-ivory/62">
            O caminho que você procurou não existe ou foi movido.
          </p>
          <Button href="/" variant="primary" className="mt-10">
            Voltar para o início
          </Button>
        </main>
      </div>

      <Footer />
    </>
  );
}
