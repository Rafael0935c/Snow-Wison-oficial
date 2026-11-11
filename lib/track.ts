/**
 * Eventos de análise (GA4 / Meta). Por enquanto não envia nada: os IDs do
 * GTM e do Pixel ainda não existem e não há banner de consentimento — os
 * dois entram na etapa 6. As chamadas já ficam no código para que, quando
 * entrarem, os eventos funcionem sem mexer nos componentes.
 *
 * Regra que vale desde já: NUNCA passar nome, telefone ou qualquer dado
 * pessoal em `params`.
 */
export type TrackEvent =
  | "view_quiz"
  | "quiz_start"
  | "quiz_step_complete"
  | "quiz_back"
  | "quiz_edit_chip"
  | "lead_validation_error"
  | "generate_lead"
  | "whatsapp_direct_click"
  | "video_play"
  | "faq_open"
  | "scroll_depth";

export type TrackParams = Record<string, string | number | boolean>;

export function track(event: TrackEvent, params: TrackParams = {}): void {
  void event;
  void params;
}
