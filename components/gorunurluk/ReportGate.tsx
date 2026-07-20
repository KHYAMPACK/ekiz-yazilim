"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function ReportGate({ clientId }: { clientId: string }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = token.trim();
    if (!t) {
      setError("Erişim anahtarını girin.");
      return;
    }
    router.push(`/raporlar/${clientId}?t=${encodeURIComponent(t)}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <header className="border-b border-black px-4 py-4 sm:px-6">
        <Link href="/" className="inline-flex items-center">
          <Logo variant="full" tone="onLight" size={22} layout="inline" />
        </Link>
      </header>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
          Özel Rapor
        </p>
        <h1 className="mt-3 text-2xl font-medium tracking-tight text-black sm:text-3xl">
          Bu Sayfa Herkese Açık Değil
        </h1>
        <p className="mt-3 text-base leading-relaxed text-black/65">
          Görünürlük raporları yalnızca paylaşılan erişim anahtarıyla
          görüntülenir. Anahtarınız yoksa Ekiz Yazılım ile iletişime geçin.
        </p>
        <form onSubmit={onSubmit} className="mt-8 border border-black">
          <label
            htmlFor="report-token"
            className="block border-b border-black bg-ice/40 px-4 py-3 text-xs font-medium tracking-[0.14em] uppercase text-black/55"
          >
            Erişim Anahtarı
          </label>
          <input
            id="report-token"
            type="password"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setError("");
            }}
            placeholder="Anahtar"
            autoComplete="off"
            className="w-full border-0 bg-transparent px-4 py-4 text-base outline-none placeholder:text-black/35"
          />
          {error ? (
            <p className="border-t border-black bg-black px-4 py-2 text-sm text-white">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full border-t border-black bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
          >
            Rapora Gir
          </button>
        </form>
        <p className="mt-6 text-sm text-black/45">
          Analiz talebi için{" "}
          <Link href="/gorunurluk" className="underline underline-offset-2">
            /gorunurluk
          </Link>
        </p>
      </main>
    </div>
  );
}
