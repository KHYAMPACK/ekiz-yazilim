"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PILLARS } from "@/lib/websitesi";

const EASE = [0.22, 1, 0.36, 1] as const;
const PILLAR_COUNT = PILLARS.length;
const PHOTO_MS = 450;

function pillarFromProgress(v: number) {
  const clamped = Math.min(0.999, Math.max(0, v));
  return Math.min(PILLAR_COUNT - 1, Math.floor(clamped * PILLAR_COUNT));
}

function PhotoFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden border border-white/20 bg-black ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={900}
        className="h-full w-full object-cover"
        sizes="(max-width: 1024px) 90vw, 420px"
      />
    </div>
  );
}

export default function WebPillars() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [photo, setPhoto] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const line = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = pillarFromProgress(v);
    setActive((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    setPhoto(0);
    if (reduce) return;
    const id = window.setInterval(() => {
      setPhoto((prev) => {
        const total = PILLARS[active]?.images.length ?? 1;
        return (prev + 1) % total;
      });
    }, PHOTO_MS);
    return () => window.clearInterval(id);
  }, [active, reduce]);

  const current = PILLARS[active] ?? PILLARS[0];
  const shot = current.images[photo] ?? current.images[0];

  if (reduce) {
    return (
      <section
        id="odak"
        className="border-b border-black bg-black text-white"
        aria-labelledby="odak-title"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-ice">
            Odak
          </p>
          <h2 id="odak-title" className="sr-only">
            Keşif, Tasarım, Destek
          </h2>
          <ul className="grid gap-10 lg:grid-cols-3">
            {PILLARS.map((item) => (
              <li key={item.word}>
                <p className="text-3xl font-medium tracking-tight text-white uppercase">
                  {item.word}
                </p>
                <div className="mt-4">
                  <PhotoFrame
                    src={item.images[0]}
                    alt={item.imageAlt}
                    className="aspect-[16/10]"
                  />
                </div>
                <p className="mt-4 text-lg font-medium tracking-tight text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id="odak"
      className="border-b border-black bg-black text-white"
      aria-labelledby="odak-title"
    >
      <div ref={ref} className="h-[600vh]">
        <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-hidden">
          <div className="relative mx-auto grid h-full w-full max-w-6xl grid-rows-[auto_1fr] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-rows-1 lg:gap-16">
            <div className="flex flex-col items-center justify-center pt-8 text-center lg:items-start lg:pt-0 lg:text-left">
              <p className="mb-6 text-xs font-medium tracking-[0.2em] uppercase text-ice">
                Odak
              </p>
              <h2 id="odak-title" className="sr-only">
                Keşif, Tasarım, Destek
              </h2>
              <ul className="flex flex-col">
                {PILLARS.map((item, i) => {
                  const on = i === active;
                  return (
                    <li key={item.word}>
                      <motion.span
                        className="block py-[0.04em] text-[clamp(2.8rem,8vw,6.4rem)] leading-[1.02] font-medium tracking-tight uppercase"
                        animate={{
                          color: on ? "#ffffff" : "rgba(255,255,255,0.16)",
                        }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        {item.word}
                      </motion.span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-8 text-sm text-white/40">
                Her Biri Gerekli. Hepsi Birlikte.
              </p>
            </div>

            <div className="relative flex flex-col justify-center pb-8 pl-8 sm:pl-10 lg:h-full lg:pb-0">
              <div
                className="absolute inset-y-0 left-[11px] w-px bg-white/15 sm:left-[15px]"
                aria-hidden
              />
              <motion.div
                style={{ scaleY: line }}
                className="absolute inset-y-0 left-[11px] w-px origin-top bg-ice sm:left-[15px]"
                aria-hidden
              />

              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.word}
                    initial={{ y: "40%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-28%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border border-white/20 bg-black">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={shot}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.12 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={shot}
                            alt={current.imageAlt}
                            width={1400}
                            height={900}
                            className="h-full w-full object-cover"
                            sizes="(max-width: 1024px) 90vw, 480px"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <p className="mt-5 text-xl font-medium tracking-tight text-white sm:text-2xl">
                      {current.title}
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                      {current.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
