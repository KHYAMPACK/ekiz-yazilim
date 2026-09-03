"use client";

import { motion, useReducedMotion } from "motion/react";
import { COMPARE_COLS, COMPARE_ROWS } from "@/lib/websitesi";
import WebReveal from "./WebReveal";

const EASE = [0.22, 1, 0.36, 1] as const;

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-black text-ice"
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6.2L4.6 8.8L10 3.2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    </span>
  );
}

function DashIcon() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-black/25 text-black/35"
      aria-hidden
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5h6" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </span>
  );
}

export default function WebWhy() {
  const reduce = useReducedMotion();

  return (
    <section
      id="neden"
      className="border-b border-black bg-ice/30"
      aria-labelledby="neden-title"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <WebReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            Neden biz?
          </p>
          <h2
            id="neden-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Online Olmanın Daha Net Yolu.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/65">
            Hazır site, freelance veya klasik ajansla karşılaştırdığınızda süre,
            fiyat ve yayın sonrası destek çoğu zaman belirsiz kalır. Ekiz’de
            kapsam yazılıdır; yayından sonra da yanınızdayız.
          </p>
        </WebReveal>

        <div className="mt-10 overflow-x-auto border border-black bg-white">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">
              Ekiz, ajans, freelance ve kendin yap karşılaştırması
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[18%] border-b border-black bg-white px-4 py-3 text-xs font-medium tracking-[0.16em] uppercase text-black/40"
                >
                  <span className="sr-only">Kriter</span>
                </th>
                {COMPARE_COLS.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={`border-b border-l border-black px-4 py-3 text-xs font-medium tracking-[0.16em] uppercase ${
                      col.ours
                        ? "bg-ice text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <motion.tr
                  key={row.label}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                    ease: EASE,
                  }}
                >
                  <th
                    scope="row"
                    className={`px-4 py-4 text-xs font-medium tracking-[0.16em] uppercase text-black/45 ${
                      i < COMPARE_ROWS.length - 1 ? "border-b border-black/10" : ""
                    }`}
                  >
                    {row.label}
                  </th>
                  {COMPARE_COLS.map((col) => {
                    const value = row[col.key];
                    return (
                      <td
                        key={col.key}
                        className={`border-l border-black/10 px-4 py-4 ${
                          i < COMPARE_ROWS.length - 1
                            ? "border-b border-black/10"
                            : ""
                        } ${col.ours ? "bg-ice/35" : "bg-white"}`}
                      >
                        <span className="flex items-start gap-2.5 text-sm leading-snug text-black">
                          {col.ours ? <CheckIcon /> : <DashIcon />}
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
