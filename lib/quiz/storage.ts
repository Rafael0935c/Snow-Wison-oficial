import {
  isNivelId,
  isObjetivoId,
  isUrgenciaId,
  QUIZ_TOTAL_STEPS,
  type QuizAnswers,
} from "@/config/quiz";

/**
 * Progresso do quiz na aba atual (sessionStorage): se a pessoa recarregar
 * a página, continua de onde parou. Só as escolhas e o passo — nome e
 * telefone NUNCA são gravados no navegador.
 *
 * Tudo em try/catch: em aba anônima, com cookies bloqueados ou no
 * navegador interno de alguns apps, o acesso ao storage pode lançar erro.
 */
const KEY = "sw-diagnostico-v1";

export type SavedQuiz = { step: number; answers: QuizAnswers };

export function loadQuiz(): SavedQuiz | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<SavedQuiz>;
    // Nunca confiar no que está no storage: valida cada campo.
    const answers: QuizAnswers = {};
    if (isObjetivoId(data.answers?.objetivo))
      answers.objetivo = data.answers.objetivo;
    if (isNivelId(data.answers?.nivel)) answers.nivel = data.answers.nivel;
    if (isUrgenciaId(data.answers?.urgencia))
      answers.urgencia = data.answers.urgencia;
    const step =
      Number.isInteger(data.step) &&
      (data.step as number) >= 1 &&
      (data.step as number) <= QUIZ_TOTAL_STEPS
        ? (data.step as number)
        : 1;
    return { step, answers };
  } catch {
    return null;
  }
}

export function saveQuiz(state: SavedQuiz): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Sem storage, o quiz só não retoma depois de recarregar.
  }
}

export function clearQuiz(): void {
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    // idem
  }
}
