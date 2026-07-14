"use client";

import { useEffect, useState } from "react";
import { phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const call = phoneHref();
  const wa = whatsappHref(
    "Merhaba, Ekiz Yazılım sitesinden yazıyorum. Kısa bir iş konuşmak istiyorum.",
  );

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("ekiz-problem-draft");
      if (stored) {
        setDraft(stored);
        sessionStorage.removeItem("ekiz-problem-draft");
      }
    } catch {
      /* ignore */
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      ad: String(data.get("ad") ?? ""),
      email: String(data.get("email") ?? ""),
      mesaj: String(data.get("mesaj") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        mailto?: string;
      };

      if (!res.ok) {
        setError(json.error ?? "Bir sorun oluştu.");
        setStatus("error");
        return;
      }

      if (json.mailto) {
        window.location.href = json.mailto;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError("Bağlantı hatası. Lütfen e-posta ile yazın.");
      setStatus("error");
    }
  }

  return (
    <section
      id="iletisim"
      className="border-b border-black bg-white"
      aria-labelledby="iletisim-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="min-w-0">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            İletişim
          </p>
          <h2
            id="iletisim-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Birlikte çalışalım
          </h2>
          <p className="mt-4 max-w-md text-base text-black/65">
            Arayın, yazın veya formu doldurun. {site.responseTime}.
          </p>

          <dl className="mt-10 space-y-5 border-t border-black pt-8 text-sm">
            <div>
              <dt className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                Telefon
              </dt>
              <dd className="mt-1">
                {call ? (
                  <a
                    href={call}
                    className="text-base text-black transition-colors hover:text-black/60"
                  >
                    {phoneDisplay()}
                  </a>
                ) : (
                  <span className="text-base text-black">{phoneDisplay()}</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                E-posta
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-base text-black transition-colors hover:text-black/60"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                Konum
              </dt>
              <dd className="mt-1 text-base text-black">{site.city}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                Yanıt
              </dt>
              <dd className="mt-1 text-base text-black">{site.responseTime}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-0 border border-black sm:flex-row">
            {call && (
              <a
                href={call}
                className="flex min-h-12 flex-1 items-center justify-center bg-black text-sm font-medium tracking-wide text-white transition-colors hover:bg-black/85"
              >
                Ara
              </a>
            )}
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex min-h-12 flex-1 items-center justify-center bg-white text-sm font-medium tracking-wide text-black transition-colors hover:bg-ice/50 ${call ? "border-t border-black sm:border-t-0 sm:border-l" : ""}`}
              >
                WhatsApp’tan yazın
              </a>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-w-0 w-full flex-col gap-0"
        >
          <label className="sr-only" htmlFor="ad">
            Ad
          </label>
          <input
            id="ad"
            name="ad"
            type="text"
            required
            autoComplete="name"
            placeholder="Adınız"
            className="min-h-12 w-full min-w-0 border border-black border-b-0 bg-white px-4 text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice"
          />
          <label className="sr-only" htmlFor="email">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="E-posta"
            className="min-h-12 w-full min-w-0 border border-black border-b-0 bg-white px-4 text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice"
          />
          <label className="sr-only" htmlFor="mesaj">
            Mesaj
          </label>
          <textarea
            id="mesaj"
            name="mesaj"
            required
            rows={5}
            placeholder="Mesajınız"
            defaultValue={draft}
            key={draft || "empty"}
            className="w-full min-w-0 border border-black border-b-0 bg-white px-4 py-3 text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="min-h-12 w-full border border-black bg-black text-sm font-medium tracking-wide text-white transition-colors hover:bg-black/85 disabled:opacity-60"
          >
            {status === "loading" ? "Gönderiliyor…" : "Gönder"}
          </button>
          {status === "sent" && (
            <p className="mt-3 border border-ice bg-ice/40 px-4 py-3 text-sm text-black">
              Teşekkürler — mesajınız alındı. En kısa sürede döneceğiz.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 border border-black px-4 py-3 text-sm text-black">
              {error}{" "}
              <a className="underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
