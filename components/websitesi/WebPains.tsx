"use client";

import { motion, useReducedMotion } from "motion/react";
import { PAINS } from "@/lib/websitesi";
import WebReveal from "./WebReveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WebPains() {
  const reduce = useReducedMotion();

  return (
    <section
      className="border-b border-black bg-ice/30"
      aria-labelledby="pains-title"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <WebReveal>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            Sık duyduklarımız
          </p>
          <h2
            id="pains-title"
            className="max-w-2xl text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Web Sitesi Yaptırmak Bu Kadar Yorucu Olmamalı.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-black/65">
            Bunları sık duyuyoruz. Hepsinin çözümü var — önce ihtiyacı netleştirmek yeterli.
          </p>
        </WebReveal>

        <ul className="mt-10 grid gap-px border border-black bg-black sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((item, i) => (
            <motion.li
              key={item.quote}
              className="flex min-h-[12rem] flex-col justify-between bg-white p-5 sm:p-6"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
            >
              <p className="text-lg leading-snug font-medium tracking-tight text-black sm:text-xl">
                “{item.quote}”
              </p>
              <p className="mt-6 text-xs font-medium tracking-[0.18em] uppercase text-black/40">
                {item.note}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
