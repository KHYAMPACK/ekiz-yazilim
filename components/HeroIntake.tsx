"use client";

import { useEffect, useState } from "react";
import IntakeProcessModal, {
  type IntakeAnswers,
} from "@/components/IntakeProcessModal";
import Logo from "./Logo";

const MAX_ATTEMPTS = 3;
const ATTEMPTS_KEY = "ekiz-intake-attempts";
const DONE_KEY = "ekiz-intake-done";

const solutions = [
  {
    id: "website",
    label: "Web sitesi",
    prompt: "Kurumsal veya kişisel bir web sitesi istiyorum.",
  },
  {
    id: "ecommerce",
    label: "E-ticaret sitesi",
    prompt: "Ürün satışı için bir e-ticaret sitesi istiyorum.",
  },
] as const;

type Phase =
  | "idle"
  | "checking"
  | "process"
  | "rejected"
  | "success"
  | "capped"
  | "error";

function readAttempts() {
  try {
    const n = Number(sessionStorage.getItem(ATTEMPTS_KEY) ?? "0");
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function writeAttempts(n: number) {
  try {
    sessionStorage.setItem(ATTEMPTS_KEY, String(n));
  } catch {
    /* ignore */
  }
}

function readDone() {
  try {
    return sessionStorage.getItem(DONE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDone() {
  try {
    sessionStorage.setItem(DONE_KEY, "1");
  } catch {
    /* ignore */
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function HeroIntake() {
  const [problem, setProblem] = useState("");
  const [pendingMessage, setPendingMessage] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const used = readAttempts();
    setAttempts(used);
    if (readDone()) {
      setPhase("success");
      return;
    }
    if (used >= MAX_ATTEMPTS) {
      setPhase("capped");
      setFeedback(
        "Deneme hakkınız doldu. Aşağıdaki iletişimden yazabilir veya bizi arayabilirsiniz.",
      );
    }
  }, []);

  function applySolution(id: string, prompt: string) {
    if (
      phase === "checking" ||
      phase === "process" ||
      phase === "success" ||
      phase === "capped"
    ) {
      return;
    }
    setSelected(id);
    setProblem(prompt);
    setFeedback("");
    if (phase === "rejected" || phase === "error") setPhase("idle");
  }

  async function handleProblemSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = problem.trim();
    if (!text) return;
    if (
      phase === "checking" ||
      phase === "process" ||
      phase === "success" ||
      phase === "capped"
    ) {
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    writeAttempts(nextAttempts);

    if (nextAttempts > MAX_ATTEMPTS) {
      setPhase("capped");
      setFeedback(
        "Deneme hakkınız doldu. Aşağıdaki iletişimden yazabilir veya bizi arayabilirsiniz.",
      );
      return;
    }

    setPhase("checking");
    setFeedback("");

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mesaj: text, step: "classify" }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        isProblem?: boolean;
        reason?: string;
        error?: string;
      };

      if (!res.ok) {
        setPhase("error");
        setFeedback(
          data.error ??
            "Bir sorun oluştu. İletişim bölümünden yazabilir veya bizi arayabilirsiniz.",
        );
        maybeCap(nextAttempts);
        return;
      }

      if (data.isProblem === false) {
        await sleep(350);
        setPhase(nextAttempts >= MAX_ATTEMPTS ? "capped" : "rejected");
        setFeedback(
          nextAttempts >= MAX_ATTEMPTS
            ? "Deneme hakkınız doldu. Aşağıdaki iletişimden yazabilir veya bizi arayabilirsiniz."
            : (data.reason ??
              "Bu bir iş problemi gibi durmuyor. Lütfen ihtiyacınızı net yazın."),
        );
        return;
      }

      setPendingMessage(text);
      setPhase("process");
    } catch {
      setPhase("error");
      setFeedback(
        "Bağlantı hatası. İletişim bölümünden yazabilir veya bizi arayabilirsiniz.",
      );
      maybeCap(nextAttempts);
    }
  }

  function handleProcessClose() {
    setPhase("idle");
    setFeedback("");
  }

  function handleProcessSuccess() {
    writeDone();
    setPhase("success");
  }

  async function handleSubmitPhone(payload: {
    answers: IntakeAnswers;
    phone: string;
  }) {
    const text = pendingMessage || problem.trim();
    if (!text) {
      return { ok: false, error: "Mesaj kayboldu. Lütfen tekrar yazın." };
    }

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mesaj: text,
          telefon: payload.phone,
          answers: payload.answers,
          step: "complete",
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        return {
          ok: false,
          error:
            data.error ??
            "Gönderilemedi. Numaranızı kontrol edip tekrar deneyin.",
        };
      }
      return { ok: true };
    } catch {
      return { ok: false, error: "Bağlantı hatası. Lütfen tekrar deneyin." };
    }
  }

  function maybeCap(used: number) {
    if (used >= MAX_ATTEMPTS) {
      setPhase("capped");
      setFeedback(
        "Deneme hakkınız doldu. Aşağıdaki iletişimden yazabilir veya bizi arayabilirsiniz.",
      );
    }
  }

  const problemLocked =
    phase === "checking" ||
    phase === "process" ||
    phase === "success" ||
    phase === "capped";
  return (
    <section
      id="ust"
      className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center border-b border-black bg-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-size-[48px_48px]" />

      <IntakeProcessModal
        open={phase === "process"}
        onClose={handleProcessClose}
        onSubmitPhone={handleSubmitPhone}
        onSuccess={handleProcessSuccess}
      />

      <div className="relative mx-auto w-full min-w-0 max-w-3xl px-4 py-12 sm:px-6 sm:py-24">
        <div className="ekiz-reveal ekiz-reveal--in mb-6 flex justify-center overflow-hidden sm:mb-8">
          <span className="sm:hidden">
            <Logo variant="full" tone="onLight" size={64} layout="stacked" />
          </span>
          <span className="hidden sm:inline">
            <Logo variant="full" tone="onLight" size={96} layout="stacked" />
          </span>
        </div>

        <h1 className="mb-8 text-center text-base font-medium tracking-tight text-black/70 sm:mb-12 sm:text-lg">
          Denizli’de web sitesi, e-ticaret ve yazılım
        </h1>

        {phase === "success" ? (
          <div
            className="ekiz-reveal ekiz-reveal--in border border-black bg-white px-6 py-10 text-center"
            role="status"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Talebiniz alındı
            </p>
            <p className="mt-3 text-xl font-medium tracking-tight text-black sm:text-2xl">
              En kısa sürede sizi arayacağız.
            </p>
            <p className="mt-3 text-sm text-black/60">
              Numaranızı aldık. Kısa süre içinde dönüş yapacağız.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleProblemSubmit}
            className="flex w-full min-w-0 flex-col gap-4"
          >
            <label
              htmlFor="problem"
              className="text-center text-sm font-medium tracking-wide text-black/70"
            >
              Probleminizi bir cümlede anlatın
            </label>
            <div className="flex w-full min-w-0 flex-col gap-0 border border-black sm:flex-row">
              <input
                id="problem"
                type="text"
                value={problem}
                maxLength={500}
                disabled={problemLocked}
                onChange={(e) => {
                  setProblem(e.target.value);
                  setSelected(null);
                  if (phase === "rejected" || phase === "error") {
                    setPhase("idle");
                    setFeedback("");
                  }
                }}
                placeholder="Örn. Müşterilerimin online sipariş verebileceği bir site lazım"
                className="min-h-12 w-full min-w-0 flex-1 border-0 bg-white px-4 text-base text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={problemLocked || !problem.trim()}
                className="min-h-12 border-t border-black bg-black px-6 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60 sm:border-t-0 sm:border-l"
              >
                {phase === "checking" ? "…" : "Gönder"}
              </button>
            </div>

            {feedback && (
              <p
                className={`border px-4 py-3 text-center text-sm transition-opacity duration-300 ${
                  phase === "rejected" || phase === "capped" || phase === "error"
                    ? "border-black text-black"
                    : "border-ice bg-ice/40 text-black"
                }`}
                role="status"
              >
                {feedback}
              </p>
            )}

          </form>
        )}

        {phase !== "success" && phase !== "process" && (
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <span className="text-xs font-medium tracking-widest uppercase text-black/45">
              Hazır çözümler
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {solutions.map((s) => {
                const isActive = selected === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={problemLocked}
                    onClick={() => applySolution(s.id, s.prompt)}
                    className={`border px-4 py-2 text-sm font-medium transition-colors duration-300 disabled:opacity-50 ${
                      isActive
                        ? "border-black bg-ice text-black"
                        : "border-black bg-white text-black hover:bg-ice/50"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
