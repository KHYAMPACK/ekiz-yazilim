"use client";

import { useEffect, useRef, useState } from "react";
import { LOGO_PATHS } from "./logoPaths";

type Phase = "boot" | "assemble" | "open" | "gone";

const SESSION_KEY = "ekiz-intro-seen";

export default function LogoLoader({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("boot");
  const holeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setPhase("gone");
      return;
    }

    document.documentElement.classList.add("logo-loader-active");
    setPhase("assemble");

    const openAt = window.setTimeout(() => setPhase("open"), 1500);
    const doneAt = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      document.documentElement.classList.remove("logo-loader-active");
      setPhase("gone");
    }, 2900);

    return () => {
      window.clearTimeout(openAt);
      window.clearTimeout(doneAt);
      document.documentElement.classList.remove("logo-loader-active");
    };
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    const el = holeRef.current;
    if (!el) return;

    let anim: Animation | undefined;
    const raf = window.requestAnimationFrame(() => {
      anim = el.animate(
        [
          { transform: "translate(-50%, -50%) scale(1)" },
          { transform: "translate(-50%, -50%) scale(60)" },
        ],
        {
          duration: 1200,
          easing: "cubic-bezier(0.77, 0, 0.175, 1)",
          fill: "forwards",
        },
      );
    });

    return () => {
      window.cancelAnimationFrame(raf);
      anim?.cancel();
    };
  }, [phase]);

  return (
    <>
      {children}

      {phase !== "gone" && (
        <div
          className={`logo-loader logo-loader--${phase}`}
          role="status"
          aria-live="polite"
          aria-label="Yükleniyor"
        >
          <div ref={holeRef} className="logo-loader__hole" aria-hidden="true" />

          {/* Mark only during assemble — hide the moment expand starts */}
          {phase === "assemble" && (
            <div className="logo-loader__stage">
              <svg
                className="logo-loader__layer logo-loader__core"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d={LOGO_PATHS.core} fill="#ffffff" />
              </svg>
              <svg
                className="logo-loader__layer logo-loader__bracket-tl"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d={LOGO_PATHS.bracketTl} fill="#ffffff" />
              </svg>
              <svg
                className="logo-loader__layer logo-loader__bracket-br"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d={LOGO_PATHS.bracketBr} fill="#ffffff" />
              </svg>
            </div>
          )}
        </div>
      )}
    </>
  );
}
