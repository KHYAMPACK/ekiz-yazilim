"use client";

import { useEffect, useRef, useState } from "react";
import { normalizePhone } from "@/lib/intake";

export type IntakeAnswers = Record<string, string>;

type Step =
  | {
      kind: "scan";
      title: string;
      detail: string;
      durationMs: number;
      progressTo: number;
    }
  | {
      kind: "tip";
      title: string;
      detail: string;
      durationMs: number;
      progressTo: number;
    }
  | {
      kind: "question";
      id: string;
      title: string;
      detail: string;
      options: readonly string[];
      progressTo: number;
    }
  | {
      kind: "wrap";
      title: string;
      detail: string;
      durationMs: number;
      progressTo: number;
    }
  | { kind: "phone"; progressTo: number };

const STEPS: readonly Step[] = [
  {
    kind: "scan",
    title: "Hazırlanıyor",
    detail: "İhtiyacınıza bakıyoruz. Kısa ipuçlarıyla devam ediyoruz.",
    durationMs: 2200,
    progressTo: 8,
  },
  {
    kind: "tip",
    title: "Biliyor muydunuz?",
    detail:
      "İyi kurulmuş bir e-ticaret sitesi, satışları ciddi oranda artırabilir — bazı işletmelerde %60’a varan büyüme görülür.",
    durationMs: 4600,
    progressTo: 26,
  },
  {
    kind: "question",
    id: "dijital",
    title: "İşinizi dijitale taşımaya hazır mısınız?",
    detail: "Küçük bir adım bile yeter. Biz gerisini sadeleştiririz.",
    options: ["Evet", "Neredeyse"],
    progressTo: 40,
  },
  {
    kind: "tip",
    title: "Biliyor muydunuz?",
    detail:
      "Müşterilerin büyük kısmı alışverişten önce işletmeyi internette arar. Net bir web sitesi, güvenin ilk adımıdır.",
    durationMs: 4600,
    progressTo: 58,
  },
  {
    kind: "question",
    id: "online",
    title: "Müşterileriniz sizi internette bulsun ister misiniz?",
    detail: "Vitrininizi açık tutmak, kapıyı gece gündüz açık bırakmaya benzer.",
    options: ["Evet", "Kesinlikle"],
    progressTo: 72,
  },
  {
    kind: "tip",
    title: "Biliyor muydunuz?",
    detail:
      "Denizli’deki yerel işletmeler için sade bir site veya e-ticaret başlangıcı çoğu zaman karmaşık paketlerden daha hızlı sonuç verir.",
    durationMs: 4600,
    progressTo: 88,
  },
  {
    kind: "wrap",
    title: "Neredeyse bitti",
    detail: "İsterseniz numaranızı bırakın — sizi arayalım.",
    durationMs: 2000,
    progressTo: 100,
  },
  { kind: "phone", progressTo: 100 },
];

const LABELS: Record<string, string> = {
  dijital: "Dijitale hazır",
  online: "Online görünürlük",
};

const YES_NO_TOTAL = STEPS.filter((s) => s.kind === "question").length;
const EXIT_MS = 420;

export function formatIntakeAnswers(answers: IntakeAnswers) {
  return Object.entries(answers)
    .map(([key, value]) => `${LABELS[key] ?? key}: ${value}`)
    .join("\n");
}

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onSubmitPhone: (payload: {
    answers: IntakeAnswers;
    phone: string;
  }) => Promise<{ ok: boolean; error?: string }>;
};

export default function IntakeProcessModal({
  open,
  onClose,
  onSuccess,
  onSubmitPhone,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState<IntakeAnswers>({});
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  const answersRef = useRef<IntakeAnswers>({});
  const wasOpenRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const onSuccessRef = useRef(onSuccess);
  const onSubmitRef = useRef(onSubmitPhone);

  onCloseRef.current = onClose;
  onSuccessRef.current = onSuccess;
  onSubmitRef.current = onSubmitPhone;
  answersRef.current = answers;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;

    if (open) {
      const opening = !wasOpenRef.current;
      wasOpenRef.current = true;
      setMounted(true);
      if (opening) {
        setStepIndex(0);
        setProgress(0);
        setAnswers({});
        answersRef.current = {};
        setPhone("");
        setPhoneError("");
        setSubmitting(false);
        setContentKey(0);
      }
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => setVisible(true));
      });
    } else {
      wasOpenRef.current = false;
      setVisible(false);
      timeout = setTimeout(() => {
        setMounted(false);
        setStepIndex(0);
        setProgress(0);
      }, EXIT_MS);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
    };
  }, [open]);

  useEffect(() => {
    if (!mounted || !visible) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mounted, visible]);

  const step = STEPS[stepIndex];

  useEffect(() => {
    if (!open || !visible || !step) return;
    if (step.kind === "question" || step.kind === "phone") return;

    const from = stepIndex === 0 ? 0 : STEPS[stepIndex - 1]!.progressTo;
    const to = step.progressTo;
    const start = performance.now();
    let raf = 0;
    let finished = false;

    const finish = () => {
      if (finished || !wasOpenRef.current) return;
      finished = true;
      setProgress(to);
      if (stepIndex < STEPS.length - 1) {
        setStepIndex((i) => i + 1);
        setContentKey((k) => k + 1);
      }
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / step.durationMs);
      const eased = 1 - (1 - t) * (1 - t);
      setProgress(from + (to - from) * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, visible, step, stepIndex]);

  function requestClose() {
    if (submitting || !open) return;
    onCloseRef.current();
  }

  function pickOption(option: string) {
    if (!step || step.kind !== "question" || !open) return;
    const nextAnswers = { ...answersRef.current, [step.id]: option };
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
    setProgress(step.progressTo);
    window.setTimeout(() => {
      if (stepIndex < STEPS.length - 1) {
        setStepIndex((i) => i + 1);
        setContentKey((k) => k + 1);
      }
    }, 240);
  }

  async function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || !open) return;

    const check = normalizePhone(phone);
    if (!check.ok) {
      setPhoneError(check.reason);
      return;
    }

    setSubmitting(true);
    setPhoneError("");
    const result = await onSubmitRef.current({
      answers: answersRef.current,
      phone,
    });
    setSubmitting(false);

    if (!result.ok) {
      setPhoneError(result.error ?? "Gönderilemedi. Tekrar deneyin.");
      return;
    }

    onSuccessRef.current();
  }

  if (!mounted) return null;

  const questionNumber =
    STEPS.slice(0, stepIndex + 1).filter((s) => s.kind === "question").length;

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center px-4 transition-opacity ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: `${EXIT_MS}ms` }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intake-process-title"
    >
      <button
        type="button"
        aria-label="Kapat"
        className="absolute inset-0 cursor-default bg-white/55 backdrop-blur-md transition-opacity"
        style={{ transitionDuration: `${EXIT_MS}ms` }}
        onClick={requestClose}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000007_1px,transparent_1px),linear-gradient(to_bottom,#00000007_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div
        className={`relative w-full max-w-lg border border-black bg-white transition-[opacity,transform] ease-out ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-[0.98] opacity-0"
        }`}
        style={{ transitionDuration: `${EXIT_MS}ms` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-black px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={requestClose}
            disabled={submitting}
            className="absolute top-3 right-3 flex size-9 items-center justify-center border border-black bg-white text-lg leading-none text-black transition-colors hover:bg-ice/50 disabled:opacity-50 sm:top-3.5 sm:right-3.5"
            aria-label="Kapat"
          >
            ×
          </button>
          <div className="flex items-end justify-between gap-4 pr-10">
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-black/45">
              {step?.kind === "phone" ? "Son adım" : "Hazırlanıyor"}
            </p>
            <p className="text-xs tabular-nums text-black/45">
              %{Math.round(progress)}
            </p>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden bg-black/10">
            <div
              className="h-full bg-black transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          key={contentKey}
          className="intake-step-in min-h-[16rem] px-5 py-8 sm:min-h-[18rem] sm:px-7 sm:py-10"
        >
          {step?.kind === "question" ? (
            <>
              <p className="mb-3 text-xs font-medium tracking-[0.18em] uppercase text-black/45">
                Kısa soru {questionNumber} / {YES_NO_TOTAL}
              </p>
              <h2
                id="intake-process-title"
                className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
              >
                {step.title}
              </h2>
              <p className="mt-2 text-sm text-black/60">{step.detail}</p>
              <div className="mt-8 grid grid-cols-2 gap-0 border border-black">
                {step.options.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pickOption(opt)}
                    className={`min-h-12 text-sm font-medium tracking-wide text-black transition-colors hover:bg-ice/50 ${
                      i > 0 ? "border-l border-black" : ""
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : step?.kind === "tip" ? (
            <>
              <div className="mb-5 flex items-center gap-3">
                <span className="intake-pulse-dot inline-block size-2.5 shrink-0 bg-black" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-black/45">
                  İpucu
                </span>
              </div>
              <h2
                id="intake-process-title"
                className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
              >
                {step.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/75">
                {step.detail}
              </p>
            </>
          ) : step?.kind === "phone" ? (
            <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-5">
              <div>
                <p className="mb-3 text-xs font-medium tracking-[0.18em] uppercase text-black/45">
                  İsteğe bağlı
                </p>
                <h2
                  id="intake-process-title"
                  className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
                >
                  Numaranızı bırakın, sizi arayalım.
                </h2>
                <p className="mt-2 text-sm text-black/60">
                  Girdiğiniz numarayı arayarak kısa sürede dönüş yaparız. İstemezseniz
                  kapatabilirsiniz.
                </p>
              </div>
              <div className="flex w-full min-w-0 flex-col gap-0 border border-black sm:flex-row">
                <label className="sr-only" htmlFor="intake-telefon">
                  Telefon
                </label>
                <input
                  id="intake-telefon"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  disabled={submitting}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                  placeholder="05XX XXX XX XX"
                  className="min-h-12 w-full min-w-0 flex-1 border-0 bg-white px-4 text-base text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={submitting || !phone.trim()}
                  className="min-h-12 border-t border-black bg-black px-6 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60 sm:border-t-0 sm:border-l"
                >
                  {submitting ? "…" : "Ara beni"}
                </button>
              </div>
              {phoneError && (
                <p className="border border-black px-4 py-3 text-sm text-black">
                  {phoneError}
                </p>
              )}
            </form>
          ) : (
            <>
              <div className="mb-5 flex items-center gap-3">
                <span className="intake-pulse-dot inline-block size-2.5 shrink-0 bg-black" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-black/45">
                  {step?.kind === "wrap" ? "Tamamlanıyor" : "İşleniyor"}
                </span>
              </div>
              <h2
                id="intake-process-title"
                className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
              >
                {step?.title}
              </h2>
              <p className="mt-2 text-sm text-black/60">{step?.detail}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
