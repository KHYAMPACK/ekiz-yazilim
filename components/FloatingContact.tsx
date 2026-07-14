"use client";

import { useEffect, useState } from "react";
import { phoneHref, whatsappHref } from "@/lib/site";

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const call = phoneHref();
  const wa = whatsappHref(
    "Merhaba, Ekiz Yazılım sitesinden yazıyorum. İşimi dijitalleştirmek istiyorum.",
  );

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 280);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!call && !wa) return null;

  return (
    <div
      className={`fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 w-[min(18.5rem,calc(100vw-1.5rem))] border border-black bg-white shadow-none transition-opacity duration-300 sm:right-5 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="complementary"
      aria-label="Hızlı iletişim"
    >
      <div className="border-b border-black px-3 py-2.5">
        <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-black/45">
          Hızlı iletişim
        </p>
        <p className="mt-0.5 text-sm font-medium tracking-tight text-black">
          Sorununuzu birlikte netleştirelim.
        </p>
      </div>
      <div
        className={`grid divide-x divide-black ${call && wa ? "grid-cols-2" : "grid-cols-1"}`}
      >
        {call && (
          <a
            href={call}
            className="flex min-h-11 items-center justify-center bg-black text-xs font-medium tracking-wide text-white transition-colors hover:bg-black/85"
          >
            Ara
          </a>
        )}
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center bg-white text-xs font-medium tracking-wide text-black transition-colors hover:bg-ice/50"
          >
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
