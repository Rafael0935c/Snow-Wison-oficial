/**
 * Fonte única do quiz de diagnóstico.
 *
 * Usada por: a interface do quiz (components/lp/quiz), o gerador da
 * mensagem do WhatsApp (lib/quiz/message.ts), a validação do servidor
 * (Worker /api/lead, etapa 4) e o contrato com o CRM
 * (docs/crm-lead-contract.md). Mudar um rótulo aqui muda em todos.
 *
 * Sem imports de React ou de ícones de propósito: o servidor também
 * importa este arquivo. Os ícones de cada opção ficam na interface.
 */

export const OBJETIVOS = [
  { id: "carreira", label: "Carreira e trabalho" },
  { id: "viagem", label: "Viagens e intercâmbio" },
  { id: "conversacao", label: "Falar com naturalidade" },
  { id: "estudos", label: "Estudos, provas e certificações" },
  { id: "outro", label: "Outro objetivo / ainda não sei" },
] as const;

export const NIVEIS = [
  { id: "zero", label: "Do zero", description: "Nunca estudei" },
  { id: "basico", label: "Básico", description: "Entendo pouco" },
  {
    id: "intermediario",
    label: "Intermediário",
    description: "Entendo, mas travo para falar",
  },
  {
    id: "avancado",
    label: "Avançado",
    description: "Quero polir e ganhar fluência",
  },
  {
    id: "nao-sei",
    label: "Não sei",
    description: "O diagnóstico vai me dizer",
  },
] as const;

/**
 * `priority` é de uso interno (CRM): nunca aparece na tela e nunca é
 * aceita do navegador — o servidor recalcula a partir do id.
 */
export const URGENCIAS = [
  {
    id: "imediato",
    label: "Quero começar já (próximas 2 semanas)",
    priority: "quente",
  },
  { id: "ate-1-mes", label: "Em até 1 mês", priority: "quente" },
  { id: "ate-3-meses", label: "Nos próximos 3 meses", priority: "morno" },
  {
    id: "sem-prazo",
    label: "Sem prazo, estou pesquisando",
    priority: "frio",
  },
] as const;

export type ObjetivoId = (typeof OBJETIVOS)[number]["id"];
export type NivelId = (typeof NIVEIS)[number]["id"];
export type UrgenciaId = (typeof URGENCIAS)[number]["id"];
export type Priority = (typeof URGENCIAS)[number]["priority"];

export type QuizAnswers = {
  objetivo?: ObjetivoId;
  nivel?: NivelId;
  urgencia?: UrgenciaId;
};

/** As três perguntas de escolha, na ordem em que aparecem. */
export const QUIZ_QUESTIONS = [
  {
    name: "objetivo",
    title: "Qual é o seu objetivo com o inglês?",
    summaryLabel: "Objetivo",
    options: OBJETIVOS,
  },
  {
    name: "nivel",
    title: "Como está o seu inglês hoje?",
    summaryLabel: "Nível hoje",
    options: NIVEIS,
  },
  {
    name: "urgencia",
    title: "Quando você quer começar?",
    summaryLabel: "Quero começar",
    options: URGENCIAS,
  },
] as const;

export type QuizQuestionName = (typeof QUIZ_QUESTIONS)[number]["name"];

/** Passo 4: dados de contato. */
export const QUIZ_CONTACT_TITLE = "Quase lá. Para quem é o diagnóstico?";
export const QUIZ_TOTAL_STEPS = QUIZ_QUESTIONS.length + 1;

export const NAME_MIN = 2;
export const NAME_MAX = 60;

export function isObjetivoId(value: unknown): value is ObjetivoId {
  return OBJETIVOS.some((o) => o.id === value);
}

export function isNivelId(value: unknown): value is NivelId {
  return NIVEIS.some((o) => o.id === value);
}

export function isUrgenciaId(value: unknown): value is UrgenciaId {
  return URGENCIAS.some((o) => o.id === value);
}

export function labelOf(name: QuizQuestionName, id: string): string {
  const question = QUIZ_QUESTIONS.find((q) => q.name === name);
  const option = question?.options.find((o) => o.id === id);
  return option?.label ?? "";
}

export function priorityFromUrgencia(id: UrgenciaId): Priority {
  const urgencia = URGENCIAS.find((u) => u.id === id);
  // Sem correspondência não acontece com um UrgenciaId válido; "frio" é o
  // padrão conservador caso a lista mude e algo escape.
  return urgencia?.priority ?? "frio";
}
