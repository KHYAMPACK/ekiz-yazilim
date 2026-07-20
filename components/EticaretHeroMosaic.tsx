"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import Logo from "@/components/Logo";

const NOTICES = [
  { title: "Yeni sipariş", detail: "1 ürün · beden M", meta: "Az önce" },
  { title: "Yeni sipariş", detail: "2 ürün · beden S", meta: "Şimdi" },
  { title: "Yeni sipariş", detail: "1 ürün · beden L", meta: "Az önce" },
] as const;

/** Jagged rising polyline — ikas-style (viewBox padded so tip/halo never clips). */
const CHART_POINTS: { x: number; y: number }[] = [
  { x: 8, y: 86 },
  { x: 28, y: 80 },
  { x: 48, y: 74 },
  { x: 64, y: 68 },
  { x: 84, y: 56 },
  { x: 104, y: 48 },
  { x: 126, y: 36 },
  { x: 148, y: 26 },
  { x: 168, y: 18 },
  { x: 186, y: 12 },
];

const CHART_END_X = CHART_POINTS[CHART_POINTS.length - 1].x;

const SALES_FROM = 84_200;
const SALES_TO = 322_360;
const PCT_FROM = 12;
const PCT_TO = 75;
const SALES_DURATION_MS = 3800;
const SALES_HOLD_MS = 1600;

function formatTry(n: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function tipAtX(x: number) {
  const maxX = CHART_POINTS[CHART_POINTS.length - 1].x;
  const target = Math.min(maxX, Math.max(0, x));
  for (let i = 0; i < CHART_POINTS.length - 1; i++) {
    const a = CHART_POINTS[i];
    const b = CHART_POINTS[i + 1];
    if (target >= a.x && target <= b.x) {
      const local = (target - a.x) / (b.x - a.x || 1);
      return {
        x: target,
        y: a.y + (b.y - a.y) * local,
      };
    }
  }
  return CHART_POINTS[CHART_POINTS.length - 1];
}

const LINE_D = CHART_POINTS.map((p, i) =>
  `${i === 0 ? "M" : "L"}${p.x} ${p.y}`,
).join(" ");

const FILL_D = `${LINE_D} L${CHART_END_X} 100 L${CHART_POINTS[0].x} 100 Z`;

/**
 * Hero mosaic: people + UI tiles (desktop). Sharp borders / ice — Ekiz language.
 */
export default function EticaretHeroMosaic() {
  const [noticeIndex, setNoticeIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const clipId = useId().replace(/:/g, "");
  const fillId = useId().replace(/:/g, "");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    const noticeTimer = window.setInterval(() => {
      setNoticeIndex((i) => (i + 1) % NOTICES.length);
    }, 2800);

    let cancelled = false;
    let holdTimer: number | undefined;

    function runCycle() {
      if (cancelled) return;
      const start = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / SALES_DURATION_MS);
        // slight ease-out so the tip settles like a live ticker
        const eased = 1 - (1 - t) ** 2.2;
        setProgress(eased);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          holdTimer = window.setTimeout(() => {
            if (cancelled) return;
            setProgress(0);
            // next frame so clip resets before climbing again
            requestAnimationFrame(() => {
              if (!cancelled) runCycle();
            });
          }, SALES_HOLD_MS);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }

    runCycle();

    return () => {
      cancelled = true;
      window.clearInterval(noticeTimer);
      if (holdTimer) window.clearTimeout(holdTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const notice = NOTICES[noticeIndex];
  const sales = SALES_FROM + (SALES_TO - SALES_FROM) * progress;
  const pct = Math.round(PCT_FROM + (PCT_TO - PCT_FROM) * progress);
  const startX = CHART_POINTS[0].x;
  const clipW = startX + Math.max(0.01, progress * (CHART_END_X - startX));
  const tip = tipAtX(clipW);

  return (
    <div
      className="eticaret-mosaic hidden grid-cols-3 grid-rows-3 gap-2.5 lg:grid"
      style={{ aspectRatio: "1 / 1.05", minHeight: "20rem" }}
      aria-hidden="true"
    >
      <div className="eticaret-mosaic__cell relative col-span-1 row-span-1 overflow-hidden">
        <Image
          src="/denizli-e-ticaret/person-1.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="180px"
          priority
        />
      </div>

      <div className="eticaret-mosaic__cell eticaret-mosaic__notice col-span-2 row-span-1 overflow-hidden bg-white px-4 py-3">
        <div className="eticaret-mosaic__notice-stack">
          <div className="eticaret-mosaic__notice-ghost" />
          <div className="eticaret-mosaic__notice-ghost eticaret-mosaic__notice-ghost--2" />
          <div key={noticeIndex} className="eticaret-mosaic__notice-card">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-black/45">
                {notice.title}
              </p>
              <span className="text-[10px] text-black/40">{notice.meta}</span>
            </div>
            <p className="mt-1.5 text-sm font-medium tracking-tight text-black">
              {notice.detail}
            </p>
            <p className="mt-1 text-xs text-black/50">Denizli</p>
          </div>
        </div>
      </div>

      <div className="eticaret-mosaic__cell relative col-span-1 row-span-1 overflow-hidden">
        <Image
          src="/denizli-e-ticaret/person-2.png"
          alt=""
          fill
          className="object-cover object-[center_20%]"
          sizes="180px"
        />
      </div>

      <div className="eticaret-mosaic__cell col-span-1 row-span-1 flex items-center justify-center bg-ice">
        <Logo variant="mark" tone="onLight" size={52} assembleOnClick />
      </div>

      <div className="eticaret-mosaic__cell relative col-span-1 row-span-1 overflow-hidden">
        <Image
          src="/denizli-e-ticaret/person-3.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="180px"
        />
      </div>

      <div className="eticaret-mosaic__cell eticaret-mosaic__sales relative col-span-2 row-span-1 overflow-hidden">
        <div className="eticaret-mosaic__sales-grid" />
        <div className="relative z-[1] flex h-full flex-col px-3.5 pt-3 pb-2">
          <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-black/50">
            Toplam satış
          </p>

          <div className="eticaret-mosaic__sales-badge mt-2 inline-flex w-fit max-w-full items-center gap-2 border border-black bg-white px-2.5 py-1.5">
            <span className="text-sm font-medium tracking-tight text-black tabular-nums sm:text-base">
              {formatTry(sales)}
            </span>
            <span className="border border-black bg-ice px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-black tabular-nums">
              ▲ %{pct}
            </span>
          </div>

          <div className="relative mt-auto min-h-0 flex-1 overflow-visible pt-2">
            <svg
              className="eticaret-mosaic__chart absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 200 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id={fillId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--ekiz-ice)"
                    stopOpacity="0.75"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--ekiz-ice)"
                    stopOpacity="0.08"
                  />
                </linearGradient>
                <clipPath id={clipId}>
                  <rect x="0" y="0" width={clipW + 1} height="100" />
                </clipPath>
              </defs>

              <g clipPath={`url(#${clipId})`}>
                <path d={FILL_D} fill={`url(#${fillId})`} />
                <path
                  d={LINE_D}
                  fill="none"
                  stroke="#000"
                  strokeWidth="2.25"
                  strokeLinejoin="miter"
                />
              </g>

              {progress > 0.02 && (
                <g className="eticaret-mosaic__sales-tip">
                  <line
                    x1={tip.x}
                    y1={tip.y}
                    x2={tip.x}
                    y2="100"
                    stroke="rgb(0 0 0 / 0.28)"
                    strokeWidth="1.25"
                    strokeDasharray="2.5 2.5"
                  />
                  <circle
                    cx={tip.x}
                    cy={tip.y}
                    r="4.5"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1"
                    opacity="0.18"
                  />
                  <circle cx={tip.x} cy={tip.y} r="2.75" fill="#000" />
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      <div className="eticaret-mosaic__cell relative col-span-1 row-span-1 overflow-hidden">
        <Image
          src="/denizli-e-ticaret/person-4.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="180px"
        />
      </div>
    </div>
  );
}
