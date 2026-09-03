"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { FAQS } from "@/lib/websitesi";
import WebReveal from "./WebReveal";

export default function WebFaq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="sss"
      className="border-b border-black bg-ice/30"
      aria-labelledby="web-faq-title"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <WebReveal>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            SSS
          </p>
          <h2
            id="web-faq-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Sık Sorulanlar
          </h2>
        </WebReveal>

        <div className="mt-10 border border-black bg-white">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={i > 0 ? "border-t border-black" : ""}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-base font-medium tracking-tight text-black sm:text-lg">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-lg text-black/40 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-black/65 sm:px-6 sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
