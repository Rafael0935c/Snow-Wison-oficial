import type { CSSProperties, ReactNode } from "react";

type EnterProps = {
  children: ReactNode;
  /** Atraso em segundos. Manter curto: é o tempo que o bloco fica invisível. */
  delay?: number;
  className?: string;
};

/**
 * Entrada do PRIMEIRO bloco de cada página (o que aparece sem rolar).
 *
 * Por que não usar o <Reveal> aqui: o Reveal depende do Framer Motion, e o
 * HTML chega do servidor com o conteúdo em opacidade 0 — ele só aparece
 * depois que o JavaScript inteiro baixa, executa e dispara a animação.
 * Medido no Lighthouse (celular): o topo ficava invisível por 3,4 s depois
 * de já ter chegado. Era o "site travando ao abrir".
 *
 * Esta versão é CSS puro: a animação começa no primeiro quadro pintado,
 * sem esperar JS, e só anima opacity/transform (roda na GPU, fora da
 * thread principal). Componente de servidor — não adiciona nada ao bundle.
 */
export function Enter({ children, delay = 0, className = "" }: EnterProps) {
  const style: CSSProperties | undefined = delay
    ? { animationDelay: `${delay}s` }
    : undefined;

  return (
    <div className={`enter ${className}`} style={style}>
      {children}
    </div>
  );
}
