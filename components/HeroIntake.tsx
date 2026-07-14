"use client";

import { useState } from "react";
import Logo from "./Logo";

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

export default function HeroIntake() {
  const [problem, setProblem] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  function applySolution(id: string, prompt: string) {
    setSelected(id);
    setProblem(prompt);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (problem.trim()) {
      try {
        sessionStorage.setItem("ekiz-problem-draft", problem.trim());
      } catch {
        /* ignore */
      }
    }
    document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="ust"
      className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center border-b border-black bg-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="relative mx-auto w-full min-w-0 max-w-3xl px-4 py-12 sm:px-6 sm:py-24">
        <div className="mb-8 flex justify-center overflow-hidden sm:mb-12">
          <span className="sm:hidden">
            <Logo variant="full" tone="onLight" size={64} layout="stacked" />
          </span>
          <span className="hidden sm:inline">
            <Logo variant="full" tone="onLight" size={96} layout="stacked" />
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full min-w-0 flex-col gap-4">
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
              onChange={(e) => {
                setProblem(e.target.value);
                setSelected(null);
              }}
              placeholder="Örn. Müşterilerimin online sipariş verebileceği bir site lazım"
              className="min-h-12 w-full min-w-0 flex-1 border-0 bg-white px-4 text-base text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice"
            />
            <button
              type="submit"
              className="min-h-12 border-t border-black bg-black px-6 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black/85 sm:border-t-0 sm:border-l"
            >
              Devam
            </button>
          </div>
        </form>

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
                  onClick={() => applySolution(s.id, s.prompt)}
                  className={`border px-4 py-2 text-sm font-medium transition-colors ${
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
      </div>
    </section>
  );
}
