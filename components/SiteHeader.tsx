"use client";

import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#surec", label: "Süreç" },
  { href: "#isler", label: "İşler" },
  { href: "#kurucu", label: "Kurucu" },
  { href: "#sss", label: "SSS" },
  { href: "#iletisim", label: "İletişim" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#ust"
          className="flex min-w-0 shrink items-center overflow-hidden"
          onClick={close}
        >
          <Logo variant="full" tone="onLight" size={24} layout="inline" />
        </a>

        <nav className="ml-auto hidden md:block" aria-label="Ana menü">
          <ul className="flex items-center justify-end gap-6 lg:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-black transition-colors hover:text-black/60"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center border border-black md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menü</span>
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span
              className={`block h-px w-4 bg-black transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-black transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-black transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-black bg-white md:hidden"
          aria-label="Mobil menü"
        >
          <ul className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            {links.map((link) => (
              <li key={link.href} className="border-b border-black/10 last:border-0">
                <a
                  href={link.href}
                  onClick={close}
                  className="flex min-h-12 items-center text-sm font-medium tracking-wide text-black"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
