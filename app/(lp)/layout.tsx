// Landing pages de tráfego pago (hoje só /diagnostico). Funil de objetivo
// único: sem o menu, o rodapé e o botão flutuante do site institucional —
// e sem baixar o JavaScript deles.
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative z-10 flex flex-1 flex-col">{children}</div>;
}
