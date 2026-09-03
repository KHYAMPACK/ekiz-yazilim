"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { STEPS } from "@/lib/websitesi";

export default function WebProcess() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="surec"
      className="bg-black text-white"
      aria-labelledby="web-surec-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pt-14 pb-0 sm:px-6 sm:pt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-ice">
            İş akışı
          </p>
          <h2
            id="web-surec-title"
            className="text-3xl font-medium tracking-tight text-white sm:text-4xl"
          >
            İş Akışımız
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/60">
            Keşiften yayına, ardından sürekli destek. Siz işinizi anlatırsınız;
            gerisini biz yürütürüz.
          </p>
        </div>

        <div ref={ref} className="relative">
          <div
            className="absolute top-2 bottom-0 left-[11px] w-px bg-white/15 sm:left-[15px]"
            aria-hidden
          />
          {!reduce && (
            <motion.div
              style={{ scaleY }}
              className="absolute top-2 bottom-0 left-[11px] w-px origin-top bg-ice sm:left-[15px]"
              aria-hidden
            />
          )}

          <ol className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                className="relative grid grid-cols-[32px_1fr] gap-4 py-6 sm:grid-cols-[40px_1fr] sm:gap-6 sm:py-8"
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="relative z-10 mt-0.5 flex size-6 items-center justify-center border border-ice bg-black text-[10px] font-medium tracking-wide text-ice sm:size-8 sm:text-xs">
                  {step.n}
                </span>
                <div className={i < STEPS.length - 1 ? "border-b border-white/10 pb-6 sm:pb-8" : ""}>
                  <h3 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
