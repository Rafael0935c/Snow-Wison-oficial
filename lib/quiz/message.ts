import { labelOf, type QuizAnswers } from "@/config/quiz";
import { normalizeName } from "@/lib/quiz/name";

/** Código curto e legível que casa a conversa do WhatsApp com o CRM. */
export function leadCodeFromId(leadId: string): string {
  return `SW-${leadId.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}

export type CompleteAnswers = Required<QuizAnswers>;

/**
 * Mensagem pré-preenchida do WhatsApp. O nome passa por normalizeName:
 * sem quebras de linha nem caracteres de controle, ninguém consegue
 * inserir linhas falsas (um "Código:" inventado, por exemplo).
 */
export function buildWhatsAppMessage({
  name,
  answers,
  code,
}: {
  name: string;
  answers: CompleteAnswers;
  code: string;
}): string {
  return [
    `Olá, Snow Wison! Meu nome é ${normalizeName(name)}.`,
    "Vim pelo site e quero agendar o meu diagnóstico de inglês.",
    "",
    `• Objetivo: ${labelOf("objetivo", answers.objetivo)}`,
    `• Nível hoje: ${labelOf("nivel", answers.nivel)}`,
    `• Quero começar: ${labelOf("urgencia", answers.urgencia)}`,
    "",
    `Código: ${code}`,
  ].join("\n");
}
