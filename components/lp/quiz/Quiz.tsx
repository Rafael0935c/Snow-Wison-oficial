"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  Copy,
  GraduationCap,
  HelpCircle,
  Loader2,
  MessageCircle,
  MessagesSquare,
  Plane,
  type LucideIcon,
} from "lucide-react";
import {
  isObjetivoId,
  labelOf,
  NAME_MAX,
  QUIZ_CONTACT_TITLE,
  QUIZ_QUESTIONS,
  QUIZ_TOTAL_STEPS,
  type QuizAnswers,
  type QuizQuestionName,
} from "@/config/quiz";
import { diagnostico } from "@/lib/content";
import { getWhatsAppUrl, siteConfig } from "@/lib/siteConfig";
import { firstName, validateName } from "@/lib/quiz/name";
import { formatBrPhone, parseBrMobile } from "@/lib/quiz/phone";
import type { CountryOption } from "@/lib/quiz/phoneIntl";
import {
  buildWhatsAppMessage,
  leadCodeFromId,
  type CompleteAnswers,
} from "@/lib/quiz/message";
import { clearQuiz, loadQuiz, saveQuiz } from "@/lib/quiz/storage";
import { track } from "@/lib/track";

const q = diagnostico.quiz;

// Ícones só do passo 1 (objetivo). Ficam aqui, e não em config/quiz.ts,
// porque aquele arquivo também é importado pelo servidor.
const OBJETIVO_ICONS: Record<string, LucideIcon> = {
  carreira: Briefcase,
  viagem: Plane,
  conversacao: MessagesSquare,
  estudos: GraduationCap,
  outro: HelpCircle,
};

const ADVANCE_DELAY_MS = 250;

type Sent = { firstName: string; message: string; url: string };

function newLeadId(): string {
  // randomUUID existe em todo navegador atual (e no app do Instagram desde
  // o iOS 15.4); o fallback cobre os antigos.
  const c = globalThis.crypto as Crypto & { randomUUID?: () => string };
  if (typeof c.randomUUID === "function") return c.randomUUID();
  // Navegadores antigos: UUID v4 a partir de bytes aleatórios.
  const b = c.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/**
 * Abre o WhatsApp DENTRO do mesmo toque/clique — se acontecer depois de
 * um await, Safari e os navegadores internos do Instagram/Facebook
 * bloqueiam. Celular e navegador interno: troca a página (o link wa.me
 * abre o app). Desktop: nova aba; se o bloqueador de pop-up impedir,
 * troca a página também.
 *
 * Sem "noopener" no window.open de propósito: com ele o navegador sempre
 * devolve null, e não daria para saber se a aba abriu. O mesmo isolamento
 * é feito à mão, zerando `opener`.
 */
function openWhatsApp(url: string) {
  const ua = navigator.userAgent;
  const inApp = /Instagram|FBAN|FBAV|FB_IAB|Line\/|MicroMessenger/i.test(ua);
  const mobile =
    inApp ||
    /Android|iPhone|iPad|iPod/i.test(ua) ||
    window.matchMedia("(pointer: coarse)").matches;
  if (mobile) {
    window.location.href = url;
    return;
  }
  const win = window.open(url, "_blank");
  if (win) {
    try {
      win.opener = null;
    } catch {
      // ignorar: alguns navegadores não deixam escrever em opener
    }
  } else {
    window.location.href = url;
  }
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Sem a API (ou sem permissão): seleção de um campo invisível.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Quiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  // Veio dos "chips" do passo 4: depois de escolher, volta direto para lá.
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [intl, setIntl] = useState(false);
  const [country, setCountry] = useState("PT");
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [sent, setSent] = useState<Sent | null>(null);
  const [copied, setCopied] = useState(false);
  const [restored, setRestored] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLElement | null>(null);
  const stepBodyRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const advanceTimer = useRef<number | null>(null);
  // Como a última escolha foi feita: setas do teclado só navegam (sem
  // avançar); clique, toque, Espaço e Enter avançam.
  const inputMode = useRef<"pointer" | "keys" | "arrows">("pointer");
  // Foco só depois de uma ação da pessoa — nunca ao carregar a página.
  const shouldFocus = useRef(false);
  const started = useRef(false);
  // Módulo de telefone internacional, carregado ao abrir "Mora fora do
  // Brasil?". Fica guardado para o envio validar sem esperar nada: o
  // WhatsApp precisa abrir dentro do próprio clique.
  const intlModule = useRef<typeof import("@/lib/quiz/phoneIntl") | null>(null);

  const question =
    step <= QUIZ_QUESTIONS.length ? QUIZ_QUESTIONS[step - 1] : null;

  // Retoma o progresso da aba e aplica ?objetivo= da URL (anúncios).
  useEffect(() => {
    const saved = loadQuiz();
    const fromUrl = new URLSearchParams(window.location.search).get("objetivo");
    let nextAnswers: QuizAnswers = saved?.answers ?? {};
    let nextStep = saved?.step ?? 1;
    if (isObjetivoId(fromUrl)) {
      nextAnswers = { ...nextAnswers, objetivo: fromUrl };
      if (nextStep === 1) nextStep = 2;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única do storage/URL ao montar
    setAnswers(nextAnswers);
    setStep(nextStep);
    setRestored(true);
  }, []);

  useEffect(() => {
    // Depois do envio o progresso foi apagado e não volta a ser salvo.
    if (!restored || status !== "idle") return;
    saveQuiz({ step, answers });
  }, [step, answers, restored, status]);

  // A cada troca de passo provocada pela pessoa, o foco vai para o título
  // do passo novo — o leitor de tela anuncia a pergunta.
  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    titleRef.current?.focus({ preventScroll: false });
  }, [step, status]);

  // "view_quiz": uma vez por sessão, quando 35% do quiz aparece.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        track("view_quiz");
        io.disconnect();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const focusCurrent = useCallback(() => {
    const body = stepBodyRef.current;
    if (!body) return;
    const target =
      body.querySelector<HTMLElement>("input[type=radio]:checked") ??
      body.querySelector<HTMLElement>("input[type=radio]") ??
      body.querySelector<HTMLElement>("input:not([tabindex='-1']), button");
    target?.focus({ preventScroll: true });
  }, []);

  // Todos os botões "Fazer meu diagnóstico" da página são âncoras para
  // #diagnostico com data-quiz-cta. Aqui eles rolam até o quiz e põem o
  // foco na primeira opção; data-objetivo pré-seleciona o objetivo.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.(
        "[data-quiz-cta]"
      );
      if (!link) return;
      event.preventDefault();
      const objetivo = link.getAttribute("data-objetivo");
      if (isObjetivoId(objetivo)) {
        setAnswers((prev) => ({ ...prev, objetivo }));
        setStep((prev) => (prev === 1 ? 2 : prev));
      }
      const reduce = prefersReducedMotion();
      sectionRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
      window.setTimeout(focusCurrent, reduce ? 0 : 450);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [focusCurrent]);

  useEffect(
    () => () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    },
    []
  );

  function goToStep(next: number) {
    shouldFocus.current = true;
    setStep(next);
  }

  function nextStepAfter(current: number, nextAnswers: QuizAnswers) {
    const allAnswered = QUIZ_QUESTIONS.every((qq) => nextAnswers[qq.name]);
    if (editing && allAnswered) return QUIZ_TOTAL_STEPS;
    return Math.min(current + 1, QUIZ_TOTAL_STEPS);
  }

  function advance(nextAnswers: QuizAnswers = answers) {
    if (!question || !nextAnswers[question.name]) return;
    track("quiz_step_complete", {
      step,
      answer_id: nextAnswers[question.name] as string,
    });
    const next = nextStepAfter(step, nextAnswers);
    if (next === QUIZ_TOTAL_STEPS) setEditing(false);
    goToStep(next);
  }

  function choose(name: QuizQuestionName, id: string) {
    if (!started.current) {
      started.current = true;
      track("quiz_start");
    }
    const nextAnswers = { ...answers, [name]: id } as QuizAnswers;
    setAnswers(nextAnswers);
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    if (inputMode.current === "arrows") return;
    // Um instante para a pessoa ver a opção marcada antes de avançar.
    advanceTimer.current = window.setTimeout(
      () => advance(nextAnswers),
      ADVANCE_DELAY_MS
    );
  }

  function onOptionsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key.startsWith("Arrow")) {
      inputMode.current = "arrows";
      return;
    }
    if (event.key === " " || event.key === "Enter") {
      inputMode.current = "keys";
      const target = event.target as HTMLInputElement;
      // Enter não marca rádio por padrão; Espaço numa opção já marcada não
      // dispara mudança. Nos dois casos, a pessoa quer seguir.
      if (event.key === "Enter" || target.checked) {
        event.preventDefault();
        if (!target.checked && question) {
          choose(question.name, target.value);
        } else {
          advance();
        }
      }
    }
  }

  function back() {
    track("quiz_back", { step });
    setEditing(false);
    goToStep(Math.max(1, step - 1));
  }

  function editAnswer(index: number) {
    track("quiz_edit_chip", { step: index + 1 });
    setEditing(true);
    goToStep(index + 1);
  }

  async function openAbroad() {
    setIntl(true);
    setPhone("");
    setErrors((e) => ({ ...e, phone: false }));
    const mod = await import("@/lib/quiz/phoneIntl");
    intlModule.current = mod;
    const list = mod.listCountries();
    setCountries(list);
    // País inicial: o do idioma do navegador, quando não for o Brasil.
    const region = navigator.languages
      .map((l) => l.split("-")[1]?.toUpperCase())
      .find((r) => r && r !== "BR" && list.some((c) => c.code === r));
    if (region) setCountry(region);
    window.setTimeout(() => phoneRef.current?.focus(), 0);
  }

  function closeAbroad() {
    setIntl(false);
    setPhone("");
    setErrors((e) => ({ ...e, phone: false }));
    window.setTimeout(() => phoneRef.current?.focus(), 0);
  }

  function checkPhone() {
    if (!intl) return parseBrMobile(phone);
    return (
      intlModule.current?.parseIntlPhone(phone, country) ?? {
        ok: false as const,
      }
    );
  }

  // Validação ao sair do campo (nunca a cada tecla). Campo vazio não
  // acusa erro no blur: só no envio.
  function validateField(field: "name" | "phone") {
    if (field === "name") {
      if (name) setErrors((e) => ({ ...e, name: !validateName(name).ok }));
    } else if (phone) {
      setErrors((e) => ({ ...e, phone: !checkPhone().ok }));
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    // Campo-isca: só robôs preenchem. Quem preencheu não chega a enviar.
    if (honeypotRef.current?.value) return;

    const nameCheck = validateName(name);
    const phoneCheck = checkPhone();
    setErrors({ name: !nameCheck.ok, phone: !phoneCheck.ok });
    if (!nameCheck.ok) {
      track("lead_validation_error", { field: "name" });
      nameRef.current?.focus();
      return;
    }
    if (!phoneCheck.ok) {
      track("lead_validation_error", { field: "phone" });
      phoneRef.current?.focus();
      return;
    }

    const complete = answers as CompleteAnswers;
    const leadId = newLeadId();
    const code = leadCodeFromId(leadId);
    const message = buildWhatsAppMessage({
      name: nameCheck.value,
      answers: complete,
      code,
    });
    const url = getWhatsAppUrl(message);
    if (!url) return;

    setStatus("sending");
    // Etapa 4: aqui entra o envio do lead para /api/lead (fetch com
    // keepalive, sem esperar a resposta). Fica desligado até a API e a
    // Política de Privacidade estarem no ar.
    track("generate_lead", {
      event_id: leadId,
      objetivo: complete.objetivo,
      nivel: complete.nivel,
      urgencia: complete.urgencia,
    });
    openWhatsApp(url);
    setSent({ firstName: firstName(nameCheck.value), message, url });
    clearQuiz();
    // Feedback de "abrindo" por um instante (e trava contra clique duplo);
    // no celular a página já terá ido para o WhatsApp.
    window.setTimeout(() => {
      shouldFocus.current = true;
      setStatus("done");
    }, 900);
  }

  async function onCopy() {
    if (!sent) return;
    const ok = await copyText(sent.message);
    setCopied(ok);
  }

  const counter = q.stepCounter
    .replace("{atual}", String(Math.min(step, QUIZ_TOTAL_STEPS)))
    .replace("{total}", String(QUIZ_TOTAL_STEPS));

  const inputBase =
    "mt-2 block min-h-12 w-full rounded-sm border bg-void/60 px-4 text-base text-ivory placeholder:text-ivory/35 transition-colors focus:border-blue-soft focus:outline-2 focus:outline-offset-2 focus:outline-blue-soft";
  const inputState = (invalid?: boolean) =>
    invalid
      ? "border-2 border-blue-soft bg-blue-deep/15"
      : "border-line-strong";

  return (
    <section
      id="diagnostico"
      ref={sectionRef}
      aria-labelledby="quiz-titulo"
      className="lp-dots relative py-16 lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <div className="text-center">
          <p className="flex items-center justify-center gap-3 font-utility text-[0.78rem] uppercase tracking-[0.18em] text-blue-soft">
            <span>02</span>
            <span className="h-px w-8 bg-blue-soft/50" aria-hidden="true" />
            <span>{q.eyebrow}</span>
          </p>
          <h2
            id="quiz-titulo"
            className="mx-auto mt-6 max-w-2xl font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ivory"
          >
            {q.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-[1.6] text-ivory/70">
            {q.paragraph}
          </p>
        </div>

        <div className="mt-10 rounded-sm border border-line-strong bg-void/85 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-8">
          {/* O quiz depende de JavaScript; sem ele, fica o caminho direto. */}
          <noscript>
            <p className="mb-6 rounded-sm border border-line-strong p-4 text-sm leading-[1.6] text-ivory/85">
              {q.noscript}{" "}
              <a
                href={getWhatsAppUrl(siteConfig.whatsappMessageLp) ?? "#"}
                className="text-blue-soft underline underline-offset-4"
              >
                {q.noscriptLink}
              </a>
            </p>
          </noscript>
          {status !== "done" && (
            <>
              <div className="flex items-center justify-between gap-4 font-utility text-[0.72rem] uppercase tracking-[0.14em]">
                <span className="text-blue-soft">{q.cardTitle}</span>
                <span className="text-ivory/65" aria-live="polite">
                  {counter}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden="true">
                {Array.from({ length: QUIZ_TOTAL_STEPS }, (_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-colors duration-300 ${
                      i + 1 < step
                        ? "bg-blue-soft"
                        : i + 1 === step
                          ? "bg-blue"
                          : "bg-line-strong"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div ref={stepBodyRef} className="mt-7">
            {status === "done" && sent ? (
              <div className="quiz-step text-center" role="status">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-deep/40 text-blue-soft">
                  <Check className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3
                  ref={(el) => {
                    titleRef.current = el;
                  }}
                  tabIndex={-1}
                  className="mt-5 font-display text-2xl font-semibold text-ivory outline-none"
                >
                  {q.success.title.replace("{nome}", sent.firstName)}
                </h3>
                <p className="mx-auto mt-3 max-w-md leading-[1.6] text-ivory/75">
                  {q.success.text}
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => openWhatsApp(sent.url)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[linear-gradient(135deg,#4FA3FF,#12299E)] px-6 font-display text-sm font-semibold text-ivory shadow-[inset_0_-3px_0_rgba(3,4,8,0.35)]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {q.success.reopen}
                  </button>
                  <button
                    type="button"
                    onClick={onCopy}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-line-strong px-6 font-display text-sm font-semibold text-ivory/90 hover:border-blue-soft/60"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    {copied ? q.success.copied : q.success.copy}
                  </button>
                </div>
                <p className="sr-only" aria-live="polite">
                  {copied ? q.success.copied : ""}
                </p>
              </div>
            ) : question ? (
              <fieldset key={step} className="quiz-step">
                <legend
                  ref={(el) => {
                    titleRef.current = el;
                  }}
                  tabIndex={-1}
                  className="font-display text-xl font-semibold text-ivory outline-none sm:text-2xl"
                >
                  {question.title}
                </legend>
                <div
                  className="mt-5 grid gap-3 sm:grid-cols-2"
                  onKeyDown={onOptionsKeyDown}
                  onPointerDown={() => {
                    inputMode.current = "pointer";
                  }}
                >
                  {question.options.map((option) => {
                    const checked = answers[question.name] === option.id;
                    const Icon =
                      question.name === "objetivo"
                        ? OBJETIVO_ICONS[option.id]
                        : null;
                    const description =
                      "description" in option ? option.description : null;
                    return (
                      <label
                        key={option.id}
                        className="relative block cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={question.name}
                          value={option.id}
                          checked={checked}
                          onChange={() => choose(question.name, option.id)}
                          className="peer sr-only"
                        />
                        <span
                          className={`flex min-h-14 items-center gap-3 rounded-sm border px-4 py-3 transition-[border-color,background-color,transform] duration-150 active:scale-[0.98] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-soft ${
                            checked
                              ? "border-blue-soft bg-blue-deep/25"
                              : "border-line-strong bg-navy/40 hover:border-blue-soft/50 hover:bg-navy-2/70"
                          }`}
                        >
                          {Icon && (
                            <Icon
                              className="h-5 w-5 shrink-0 text-blue-soft"
                              aria-hidden="true"
                            />
                          )}
                          <span className="flex-1">
                            <span className="block font-display text-[0.95rem] font-semibold leading-snug text-ivory">
                              {option.label}
                            </span>
                            {description && (
                              <span className="mt-0.5 block text-sm leading-snug text-ivory/60">
                                {description}
                              </span>
                            )}
                          </span>
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                              checked
                                ? "border-blue-soft bg-blue-soft text-ink"
                                : "border-line-strong"
                            }`}
                            aria-hidden="true"
                          >
                            {checked && <Check className="h-3.5 w-3.5" />}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="mt-6 flex min-h-11 items-center justify-between gap-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-ivory"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      {q.back}
                    </button>
                  ) : (
                    <span />
                  )}
                  {answers[question.name] && (
                    <button
                      type="button"
                      onClick={() => advance()}
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-soft transition-colors hover:text-ivory"
                    >
                      {q.next}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </fieldset>
            ) : (
              <div key="contato" className="quiz-step">
                <h3
                  ref={(el) => {
                    titleRef.current = el;
                  }}
                  tabIndex={-1}
                  className="font-display text-xl font-semibold text-ivory outline-none sm:text-2xl"
                >
                  {QUIZ_CONTACT_TITLE}
                </h3>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {QUIZ_QUESTIONS.map((qq, index) => {
                    const id = answers[qq.name];
                    if (!id) return null;
                    return (
                      <li key={qq.name}>
                        <button
                          type="button"
                          onClick={() => editAnswer(index)}
                          aria-label={`${qq.summaryLabel}: ${labelOf(qq.name, id)}. ${q.edit}`}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-sm border border-line-strong bg-navy/50 px-3 py-1 text-[0.82rem] text-ivory/85 transition-colors hover:border-blue-soft/60"
                        >
                          {labelOf(qq.name, id)}
                          <span className="text-blue-soft">· {q.edit}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <form noValidate onSubmit={onSubmit} className="mt-6 space-y-5">
                  <div>
                    <label
                      htmlFor="quiz-nome"
                      className="font-display text-sm font-semibold text-ivory"
                    >
                      {q.nameLabel}
                    </label>
                    <input
                      ref={nameRef}
                      id="quiz-nome"
                      name="nome"
                      type="text"
                      autoComplete="given-name"
                      maxLength={NAME_MAX}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => validateField("name")}
                      aria-invalid={errors.name || undefined}
                      aria-describedby={
                        errors.name ? "quiz-nome-erro" : undefined
                      }
                      className={`${inputBase} ${inputState(errors.name)}`}
                    />
                    {errors.name && (
                      <p
                        id="quiz-nome-erro"
                        className="mt-2 flex items-start gap-2 text-sm text-ivory"
                      >
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-blue-soft"
                          aria-hidden="true"
                        />
                        {q.errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    {intl ? (
                      <div className="grid gap-3 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
                        <div>
                          <label
                            htmlFor="quiz-pais"
                            className="font-display text-sm font-semibold text-ivory"
                          >
                            {q.countryLabel}
                          </label>
                          <select
                            id="quiz-pais"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className={`${inputBase} border-line-strong`}
                          >
                            {countries.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.name} ({c.dial})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="quiz-whatsapp"
                            className="font-display text-sm font-semibold text-ivory"
                          >
                            {q.phoneIntlLabel}
                          </label>
                          <input
                            ref={phoneRef}
                            id="quiz-whatsapp"
                            name="whatsapp"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => validateField("phone")}
                            aria-invalid={errors.phone || undefined}
                            aria-describedby={
                              errors.phone ? "quiz-whatsapp-erro" : undefined
                            }
                            className={`${inputBase} ${inputState(errors.phone)}`}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <label
                          htmlFor="quiz-whatsapp"
                          className="font-display text-sm font-semibold text-ivory"
                        >
                          {q.phoneLabel}
                        </label>
                        <input
                          ref={phoneRef}
                          id="quiz-whatsapp"
                          name="whatsapp"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel-national"
                          placeholder={q.phonePlaceholder}
                          value={phone}
                          onChange={(e) =>
                            setPhone(formatBrPhone(e.target.value))
                          }
                          onBlur={() => validateField("phone")}
                          aria-invalid={errors.phone || undefined}
                          aria-describedby={
                            errors.phone ? "quiz-whatsapp-erro" : undefined
                          }
                          className={`${inputBase} ${inputState(errors.phone)}`}
                        />
                      </>
                    )}
                    {errors.phone && (
                      <p
                        id="quiz-whatsapp-erro"
                        className="mt-2 flex items-start gap-2 text-sm text-ivory"
                      >
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-blue-soft"
                          aria-hidden="true"
                        />
                        {intl ? q.errors.phoneIntl : q.errors.phone}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={intl ? closeAbroad : openAbroad}
                      className="mt-2 inline-flex min-h-9 items-center text-sm text-blue-soft underline decoration-blue-soft/40 underline-offset-4 hover:decoration-blue-soft"
                    >
                      {intl ? q.backToBrazil : q.abroad}
                    </button>
                  </div>

                  {/* Campo-isca para robôs: fora da tela, fora do Tab e
                      escondido do leitor de tela. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
                  >
                    <label htmlFor="quiz-website">Website</label>
                    <input
                      ref={honeypotRef}
                      id="quiz-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      aria-disabled={status === "sending"}
                      className="group inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-sm bg-[linear-gradient(135deg,#4FA3FF,#12299E)] px-6 py-3 font-display text-base font-semibold text-ivory shadow-[inset_0_-3px_0_rgba(3,4,8,0.35),0_10px_26px_rgba(18,41,158,0.42)] transition-[transform,box-shadow] duration-200 hover:-translate-y-px active:translate-y-px disabled:cursor-wait"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2
                            className="h-5 w-5 animate-spin"
                            aria-hidden="true"
                          />
                          {q.submitting}
                        </>
                      ) : (
                        <>
                          {q.submit}
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory/15"
                            aria-hidden="true"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center font-utility text-[0.7rem] text-ivory/60">
                      {q.submitMicrocopy}
                    </p>
                    <p className="mt-3 text-center text-[0.78rem] leading-[1.55] text-ivory/55">
                      {q.consent}
                    </p>
                  </div>
                </form>

                <div className="mt-5 flex min-h-11 items-center">
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex min-h-11 items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-ivory"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {q.back}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
