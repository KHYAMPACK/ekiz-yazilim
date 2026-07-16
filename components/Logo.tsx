"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { LOGO_FRAME, LOGO_PATHS } from "./logoPaths";

type LogoProps = {
  variant?: "mark" | "full";
  tone?: "onLight" | "onDark";
  layout?: "stacked" | "inline";
  size?: number;
  className?: string;
  /** Snake L brackets crawl half-lap on load and on click (alternating CCW/CW). */
  assembleOnClick?: boolean;
};

export default function Logo({
  variant = "mark",
  tone = "onLight",
  layout = "stacked",
  size = 40,
  className = "",
  assembleOnClick = false,
}: LogoProps) {
  const fill = tone === "onDark" ? "var(--ekiz-white)" : "var(--ekiz-black)";
  const isStacked = variant === "full" && layout === "stacked";
  const wordSize = isStacked
    ? Math.round(size * 0.42)
    : Math.round(size * 0.5);
  const subSize = Math.max(8, Math.round(wordSize * 0.34));
  const markRef = useRef<SVGSVGElement>(null);
  const snakeTlRef = useRef<SVGPathElement>(null);
  const snakeBrRef = useRef<SVGPathElement>(null);
  /** Alternate: +1 CCW, −1 CW */
  const dirRef = useRef(1);
  const animatingRef = useRef(false);
  const playAssembleRef = useRef<() => void>(() => {});

  function playAssemble() {
    if (!assembleOnClick || animatingRef.current) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const tl = snakeTlRef.current;
    const br = snakeBrRef.current;
    if (!tl || !br) return;

    for (const el of [tl, br]) {
      el.getAnimations().forEach((a) => a.cancel());
    }

    const { offsetTl, offsetBr, halfLap } = LOGO_FRAME;
    const tlFrom = Number(tl.style.strokeDashoffset || offsetTl);
    const brFrom = Number(br.style.strokeDashoffset || offsetBr);
    const dir = dirRef.current;
    const tlTo = tlFrom + dir * halfLap;
    const brTo = brFrom + dir * halfLap;

    animatingRef.current = true;
    const timing: KeyframeAnimationOptions = {
      duration: 650,
      easing: "cubic-bezier(0.45, 0.05, 0.55, 1)",
      fill: "forwards",
    };

    const a1 = tl.animate(
      [{ strokeDashoffset: tlFrom }, { strokeDashoffset: tlTo }],
      timing,
    );
    const a2 = br.animate(
      [{ strokeDashoffset: brFrom }, { strokeDashoffset: brTo }],
      timing,
    );

    Promise.all([a1.finished, a2.finished])
      .then(() => {
        tl.style.strokeDashoffset = String(tlTo);
        br.style.strokeDashoffset = String(brTo);
        dirRef.current = -dir;
      })
      .catch(() => {
        /* cancelled */
      })
      .finally(() => {
        animatingRef.current = false;
      });
  }

  playAssembleRef.current = playAssemble;

  useEffect(() => {
    if (!assembleOnClick) return;
    const id = window.setTimeout(() => playAssembleRef.current(), 400);
    return () => window.clearTimeout(id);
  }, [assembleOnClick]);

  function onKeyDown(e: KeyboardEvent<HTMLSpanElement>) {
    if (!assembleOnClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      playAssemble();
    }
  }

  const snakeCommon = {
    d: LOGO_FRAME.path,
    pathLength: LOGO_FRAME.pathLength,
    fill: "none" as const,
    stroke: fill,
    strokeWidth: LOGO_FRAME.stroke,
    strokeLinecap: "butt" as const,
    strokeLinejoin: "miter" as const,
    strokeMiterlimit: 8,
  };

  return (
    <span
      className={[
        isStacked
          ? "logo inline-flex flex-col items-center gap-[0.35em]"
          : "logo inline-flex items-center gap-2.5",
        assembleOnClick ? "logo--interactive cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ color: fill }}
      aria-label={
        assembleOnClick ? "Ekiz Yazılım — tıklayınca canlanır" : "Ekiz Yazılım"
      }
      role={assembleOnClick ? "button" : undefined}
      tabIndex={assembleOnClick ? 0 : undefined}
      onClick={assembleOnClick ? playAssemble : undefined}
      onKeyDown={assembleOnClick ? onKeyDown : undefined}
    >
      <svg
        ref={markRef}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="logo-mark block shrink-0 overflow-visible"
      >
        {assembleOnClick ? (
          <>
            <path
              ref={snakeTlRef}
              className="logo-snake logo-snake-tl"
              {...snakeCommon}
              strokeDasharray={`${LOGO_FRAME.dash} ${LOGO_FRAME.gap}`}
              strokeDashoffset={LOGO_FRAME.offsetTl}
            />
            <path
              ref={snakeBrRef}
              className="logo-snake logo-snake-br"
              {...snakeCommon}
              strokeDasharray={`${LOGO_FRAME.dash} ${LOGO_FRAME.gap}`}
              strokeDashoffset={LOGO_FRAME.offsetBr}
            />
          </>
        ) : (
          <g className="logo-brackets" fill={fill}>
            <path className="logo-bracket-tl" d={LOGO_PATHS.bracketTl} />
            <path className="logo-bracket-br" d={LOGO_PATHS.bracketBr} />
          </g>
        )}
        <g className="logo-core" fill={fill}>
          <path d={LOGO_PATHS.core} />
        </g>
      </svg>

      {variant === "full" && (
        <span
          className={
            isStacked
              ? "logo-wordmark flex flex-col items-center leading-none"
              : "logo-wordmark flex flex-col justify-center leading-none"
          }
          style={isStacked ? undefined : { minHeight: size }}
        >
          <span
            className="logo-wordmark-ekiz font-semibold tracking-tight lowercase"
            style={{ fontSize: wordSize, lineHeight: 1 }}
          >
            ekiz
          </span>
          <span
            className={
              isStacked
                ? "logo-wordmark-yazilim font-light uppercase self-end"
                : "logo-wordmark-yazilim font-light uppercase"
            }
            style={{
              fontSize: subSize,
              letterSpacing: "0.18em",
              marginRight: "-0.18em",
              marginTop: isStacked ? "0.22em" : "0.28em",
              paddingLeft: isStacked ? "0.55em" : 0,
              lineHeight: 1,
            }}
          >
            YAZILIM
          </span>
        </span>
      )}
    </span>
  );
}
