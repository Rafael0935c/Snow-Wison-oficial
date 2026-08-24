// Camada de profundidade global: glows ambiente + grão sutil.
// Fixa atrás de todo o conteúdo (z-0); páginas renderizam em z-10.
export function Atmosphere() {
  return (
    <div
      aria-hidden="true"
      className="bg-grain pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(47,140,240,0.20), transparent 70%)",
        }}
      />
      <div
        className="absolute -left-40 top-1/3 h-[40rem] w-[40rem] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(18,41,158,0.28), transparent 70%)",
        }}
      />
    </div>
  );
}
