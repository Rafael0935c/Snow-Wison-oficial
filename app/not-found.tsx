import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
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
  );
}
