"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SCORE_FROM = 28;
const SCORE_TO = 86;
const CIRCUMFERENCE = 2 * Math.PI * 38;

const BARS = [
  { max: 56, from: 12, to: 50 },
  { max: 56, from: 10, to: 46 },
  { max: 56, from: 14, to: 52 },
  { max: 56, from: 8, to: 44 },
] as const;

function scoreLabelTr(score: number) {
  if (score >= 80) return "GÜÇLÜ";
  if (score >= 60) return "ORTA";
  if (score >= 40) return "ZAYIF";
  return "KRİTİK";
}

const points = [
  "Sitenizin ve Google’daki durumunuz net bir puanla özetlenir",
  "Nerede güçlüsünüz, nerede kayıp var — sade dilde görürsünüz",
  "Önce ne yapılacağını adım adım yazılmış bir plan alırsınız",
] as const;

function ScorePreview() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let cancelled = false;
    let raf = 0;
    let hold = 0;

    function run() {
      if (cancelled) return;
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / 3400);
        const eased = 1 - (1 - t) ** 2.2;
        setProgress(eased);
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          hold = window.setTimeout(() => {
            if (cancelled) return;
            setProgress(0);
            requestAnimationFrame(() => {
              if (!cancelled) run();
            });
          }, 2000);
        }
      };
      raf = requestAnimationFrame(tick);
    }

    run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(hold);
    };
  }, []);

  const score = Math.round(SCORE_FROM + (SCORE_TO - SCORE_FROM) * progress);
  const label = scoreLabelTr(score);
  const dash = CIRCUMFERENCE * (0.12 + progress * 0.74);

  return (
    <div
      className="score-preview w-full min-w-0 overflow-hidden border border-white/25 bg-black text-ice"
      style={{ aspectRatio: "10 / 7" }}
      aria-hidden
    >
      <svg
        viewBox="0 0 200 140"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
      >
        <circle
          cx="70"
          cy="70"
          r="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          opacity="0.25"
        />
        <circle
          cx="70"
          cy="70"
          r="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
          strokeLinecap="square"
          transform="rotate(-90 70 70)"
        />
        <text
          x="70"
          y="66"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="500"
          className="tabular-nums"
        >
          {score}
        </text>
        <text
          x="70"
          y="84"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          letterSpacing="1.5"
        >
          {label}
        </text>

        {BARS.map((bar, i) => {
          const y = 36 + i * 20;
          const w = bar.from + (bar.to - bar.from) * progress;
          return (
            <g key={i}>
              <rect
                x="124"
                y={y}
                width={bar.max}
                height="14"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity={0.25 + i * 0.08}
              />
              <rect
                x="124"
                y={y}
                width={w}
                height="14"
                fill="var(--ekiz-ice)"
                opacity={0.55 + progress * 0.35}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function VisibilitySection() {
  return (
    <section
      id="gorunurluk"
      className="border-b border-black bg-white text-black"
      aria-labelledby="gorunurluk-home-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
        <div className="order-2 border border-black bg-black p-5 text-white sm:p-6 lg:order-1">
          <p className="mb-4 text-[11px] font-medium tracking-[0.18em] uppercase text-ice">
            Örnek Görünürlük Özeti
          </p>
          <ScorePreview />
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Rapor, durumunuzu tek bakışta gösterir: genel puan ve öncelikli
            iyileştirme alanları. Sizinle konuşarak hazırlanır.
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-3 inline-flex items-center gap-2 border border-black bg-ice/30 px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase text-black/55">
            Yeni · Görünürlük analizi
          </p>
          <h2
            id="gorunurluk-home-title"
            className="mt-4 max-w-xl text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Web’de Daha Görünür Olun
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-black/65 sm:text-lg">
            Formu doldurun, sizi arayalım. Kısa bir görüşmeden sonra işletmenizin
            internetteki durumunu anlaşılır bir raporla özetleriz — reklam
            vermeden önce neyin öncelikli olduğunu bilirsiniz.
          </p>
          <ul className="mt-6 space-y-2">
            {points.map((p) => (
              <li
                key={p}
                className="flex gap-3 text-sm leading-snug text-black/70 sm:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-black" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/gorunurluk"
              className="inline-flex items-center justify-center border border-black bg-black px-6 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white hover:text-black"
            >
              Formu Doldur — Sizi Arayalım
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
