"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  CHOOSER_QUESTIONS,
  buildWhatsAppMessage,
  calculateResult,
  selectionLabels,
  type Answers,
  type PreviewKind,
} from "@/lib/ilham";
import { whatsappHref } from "@/lib/site";

const PREVIEW_IMAGES: Record<PreviewKind, string> = {
  calm: "/ilham/ilham-calm.png",
  energetic: "/ilham/ilham-energetic.png",
  spacious: "/ilham/ilham-spacious.png",
  dense: "/ilham/ilham-dense.png",
  geometric: "/ilham/ilham-geometric.png",
  expressive: "/ilham/ilham-expressive.png",
  neutral: "/ilham/ilham-neutral.png",
  colorful: "/ilham/ilham-colorful.png",
  trust: "/ilham/ilham-trust.png",
  explain: "/ilham/ilham-explain.png",
  leads: "/ilham/ilham-leads.png",
  showcase: "/ilham/ilham-showcase.png",
};

function Preview({ kind }: { kind: PreviewKind }) {
  return (
    <Image
      src={PREVIEW_IMAGES[kind]}
      alt=""
      fill
      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
  );
}

export default function IlhamChooser() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const total = CHOOSER_QUESTIONS.length;
  const question = CHOOSER_QUESTIONS[step];
  const profile = useMemo(
    () => (done ? calculateResult(answers) : null),
    [done, answers],
  );
  const picks = useMemo(
    () => (done ? selectionLabels(answers) : []),
    [done, answers],
  );

  const wa =
    profile != null
      ? whatsappHref(buildWhatsAppMessage(profile, answers))
      : null;

  function choose(optionId: string) {
    if (!question) return;
    const next = { ...answers, [question.id]: optionId };
    setAnswers(next);
    if (step >= total - 1) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    if (done) {
      setDone(false);
      setStep(total - 1);
      return;
    }
    if (step > 0) setStep((s) => s - 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done && profile) {
    return (
      <div className="border border-black bg-white">
        <div className="border-b border-black bg-ice/40 px-5 py-4 sm:px-6">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-black/45">
            Sonuç
          </p>
          <h2 className="mt-2 text-2xl font-medium tracking-tight text-black sm:text-3xl">
            {profile.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/70 sm:text-base">
            {profile.summary}
          </p>
        </div>

        <div className="grid gap-0 border-b border-black sm:grid-cols-3">
          {(["Düzen", "Görünüm", "İçerik"] as const).map((label, i) => (
            <div
              key={label}
              className={[
                "px-5 py-5 sm:px-6",
                i > 0 ? "border-t border-black sm:border-t-0 sm:border-l" : "",
              ].join(" ")}
            >
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-black/45">
                {label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                {profile.implications[i].replace(
                  /^(Düzen|Görünüm|İçerik):\s*/,
                  "",
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="border-b border-black px-5 py-5 sm:px-6">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-black/45">
            Seçimleriniz
          </p>
          <ul className="mt-3 space-y-2">
            {picks.map((p) => (
              <li
                key={p.question}
                className="flex flex-wrap items-baseline gap-x-2 text-sm"
              >
                <span className="text-black/45">{p.question}</span>
                <span className="font-medium text-black">{p.choice}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={goBack}
              className="border border-black px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-ice/40"
            >
              Geri
            </button>
            <button
              type="button"
              onClick={restart}
              className="border border-black/30 px-4 py-2 text-sm font-medium text-black/70 transition-colors hover:border-black hover:text-black"
            >
              Baştan başla
            </button>
          </div>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              WhatsApp’ta konuş
            </a>
          )}
        </div>
      </div>
    );
  }

  if (!question) return null;

  const many = question.options.length > 2;

  return (
    <div className="border border-black bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-black px-5 py-4 sm:px-6">
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-black/45">
          {question.title}
        </p>
        <p className="text-xs font-medium tabular-nums tracking-wide text-black/50">
          {step + 1} / {total}
        </p>
      </div>

      <div className="border-b border-black bg-ice/25 px-5 py-5 sm:px-6 sm:py-6">
        <h2 className="text-xl font-medium tracking-tight text-black sm:text-2xl">
          {question.prompt}
        </h2>
        <p className="mt-2 text-sm text-black/55">
          Doğru veya yanlış yok — size yakın olanı seçin.
        </p>
      </div>

      <div
        className={
          many
            ? "grid sm:grid-cols-2 lg:grid-cols-4"
            : "grid sm:grid-cols-2"
        }
      >
        {question.options.map((opt, i) => {
          const selected = answers[question.id] === opt.id;
          const borders = many
            ? [
                i > 0 ? "border-t border-black" : "",
                i % 2 === 1 ? "sm:border-l sm:border-t-0" : "",
                i >= 2 ? "sm:border-t" : "",
                i > 0 ? "lg:border-l lg:border-t-0" : "",
              ]
            : [
                i > 0 ? "border-t border-black sm:border-t-0 sm:border-l" : "",
              ];

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => choose(opt.id)}
              aria-pressed={selected}
              className={[
                "group flex flex-col text-left transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black",
                selected ? "bg-ice/50" : "bg-white hover:bg-ice/25",
                ...borders,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-black/15 bg-ice/20">
                <Preview kind={opt.preview} />
              </div>
              <div className="flex flex-1 flex-col gap-2 px-4 py-4 sm:px-5 sm:py-5">
                <span className="text-base font-medium tracking-tight text-black">
                  {opt.label}
                </span>
                <span className="text-sm leading-relaxed text-black/60">
                  {opt.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-black px-5 py-4 sm:px-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="border border-black px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-ice/40 disabled:cursor-not-allowed disabled:border-black/20 disabled:text-black/30 disabled:hover:bg-transparent"
        >
          Geri
        </button>
        <button
          type="button"
          onClick={restart}
          className="text-xs font-medium tracking-wide text-black/45 underline-offset-2 hover:text-black hover:underline"
        >
          Baştan
        </button>
      </div>
    </div>
  );
}
