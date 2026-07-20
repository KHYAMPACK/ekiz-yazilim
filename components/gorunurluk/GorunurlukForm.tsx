"use client";

import { useEffect, useRef, useState } from "react";

const GOALS = [
  { id: "calls", label: "Daha Fazla Arama / WhatsApp" },
  { id: "maps", label: "Haritada / Google İşletme’de Çıkmak" },
  { id: "google", label: "Google Aramada Bulunmak" },
  { id: "sales", label: "Siteden Satış / Teklif Artırmak" },
] as const;

type Answers = {
  brand: string;
  website: string;
  city: string;
  oneLiner: string;
  goal: string;
  gbp: string;
  competitors: string;
  problem: string;
  phone: string;
};

const EMPTY: Answers = {
  brand: "",
  website: "",
  city: "",
  oneLiner: "",
  goal: "",
  gbp: "",
  competitors: "",
  problem: "",
  phone: "",
};

type Phase = "flow" | "loading" | "ok" | "error";

const STEPS = [
  {
    id: "brand",
    title: "İşletmenizin Adı Nedir?",
    hint: "Müşterilerinizin bildiği marka veya ticari unvan.",
  },
  {
    id: "website",
    title: "Website Adresiniz?",
    hint: "Yoksa “yok” yazmanız yeterli.",
  },
  {
    id: "city",
    title: "Hangi Şehir / Bölgede Hizmet Veriyorsunuz?",
    hint: "Örn. Denizli veya Denizli + çevre iller.",
  },
  {
    id: "oneLiner",
    title: "Tek Cümlede Ne Yapıyorsunuz?",
    hint: "Farkınızı kısaca yazın — ana mesajınız bu olacak.",
  },
  {
    id: "goal",
    title: "Şu An En Önemli Hedefiniz?",
    hint: "Birini seçin; detayı görüşmede konuşuruz.",
  },
  {
    id: "extras",
    title: "Ek Bilgi Var Mı?",
    hint: "İsterseniz atlayabilirsiniz — zorunlu değil.",
  },
  {
    id: "phone",
    title: "Sizi Nereden Arayalım?",
    hint: "Form biter bitmez 24 saat içinde dönüş yaparız.",
  },
] as const;

export default function GorunurlukForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [phase, setPhase] = useState<Phase>("flow");
  const [error, setError] = useState("");
  const [stepError, setStepError] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const total = STEPS.length;
  const progress = Math.round(((step + 1) / total) * 100);
  const current = STEPS[step];

  useEffect(() => {
    setStepError("");
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [step]);

  function setField<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStepError("");
  }

  function validateStep(): boolean {
    switch (current.id) {
      case "brand":
        if (!answers.brand.trim()) {
          setStepError("İşletme adını yazın.");
          return false;
        }
        break;
      case "website":
        if (!answers.website.trim()) {
          setStepError("Website yazın veya “yok” deyin.");
          return false;
        }
        break;
      case "city":
        if (!answers.city.trim()) {
          setStepError("Şehir veya bölge yazın.");
          return false;
        }
        break;
      case "oneLiner":
        if (!answers.oneLiner.trim()) {
          setStepError("Kısa bir cümle yazın.");
          return false;
        }
        break;
      case "goal":
        if (!answers.goal) {
          setStepError("Bir hedef seçin.");
          return false;
        }
        break;
      case "phone":
        if (!answers.phone.trim()) {
          setStepError("Telefon numaranızı yazın.");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  }

  function goNext() {
    if (!validateStep()) return;
    if (step < total - 1) {
      setStep((s) => s + 1);
      return;
    }
    void submit();
  }

  function goBack() {
    setStepError("");
    setError("");
    if (step > 0) setStep((s) => s - 1);
  }

  function skipExtras() {
    setStep(total - 1);
  }

  async function submit() {
    setPhase("loading");
    setError("");
    try {
      const res = await fetch("/api/gorunurluk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: answers.brand.trim(),
          website: answers.website.trim(),
          city: answers.city.trim(),
          oneLiner: answers.oneLiner.trim(),
          goal: answers.goal,
          gbp: answers.gbp.trim(),
          competitors: answers.competitors.trim(),
          problem: answers.problem.trim(),
          phone: answers.phone.trim(),
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setPhase("error");
        setError(data.error ?? "Gönderilemedi. Lütfen tekrar deneyin.");
        return;
      }
      setPhase("ok");
    } catch {
      setPhase("error");
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  }

  function restart() {
    setAnswers(EMPTY);
    setStep(0);
    setPhase("flow");
    setError("");
    setStepError("");
  }

  if (phase === "ok") {
    return (
      <div className="border border-black bg-ice/40 p-6 sm:p-8">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
          Talep Alındı
        </p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight text-black">
          Teşekkürler — 24 Saat İçinde Dönüş Yapacağız
        </h2>
        <p className="mt-3 text-base leading-relaxed text-black/65">
          Kısa bir görüşmeyle eksikleri netleştirip işletmenizin internetteki
          durumunu anlaşılır bir raporla özetleriz.
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 border border-black px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white"
        >
          Yeni Başlangıç
        </button>
      </div>
    );
  }

  return (
    <div className="border border-black bg-white">
      <div className="border-b border-black bg-ice/40 px-5 py-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Görünürlük Analizi
            </p>
            <p className="mt-2 text-sm text-black/55">
              Adım {step + 1} / {total}
            </p>
          </div>
          <p className="text-sm font-medium text-black">{progress}%</p>
        </div>
        <div className="mt-3 h-1 w-full bg-black/10" aria-hidden>
          <div
            className="h-full bg-black transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="min-h-[18rem] px-5 py-8 sm:px-8 sm:py-10">
        <h2 className="max-w-xl text-2xl font-medium tracking-tight text-black sm:text-3xl">
          {current.title}
        </h2>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-black/60">
          {current.hint}
        </p>

        <div className="mt-8 max-w-xl">
          {current.id === "brand" ? (
            <StepInput
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={answers.brand}
              onChange={(v) => setField("brand", v)}
              onEnter={goNext}
              placeholder="Örn. Denizli Butik Atölye"
            />
          ) : null}

          {current.id === "website" ? (
            <StepInput
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={answers.website}
              onChange={(v) => setField("website", v)}
              onEnter={goNext}
              placeholder="Örn. https://isletmem.com veya yok"
            />
          ) : null}

          {current.id === "city" ? (
            <StepInput
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={answers.city}
              onChange={(v) => setField("city", v)}
              onEnter={goNext}
              placeholder="Denizli"
            />
          ) : null}

          {current.id === "oneLiner" ? (
            <StepInput
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={answers.oneLiner}
              onChange={(v) => setField("oneLiner", v)}
              onEnter={goNext}
              placeholder="Örn. El yapımı ürünlerimizi online satıyoruz."
              maxLength={200}
            />
          ) : null}

          {current.id === "goal" ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {GOALS.map((g) => {
                const active = answers.goal === g.label;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setField("goal", g.label)}
                    className={`border px-4 py-4 text-left text-sm font-medium transition-colors ${
                      active
                        ? "border-black bg-ice text-black"
                        : "border-black/25 bg-white text-black hover:border-black hover:bg-ice/30"
                    }`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          {current.id === "extras" ? (
            <div className="space-y-5">
              <StepInput
                ref={inputRef as React.RefObject<HTMLInputElement>}
                label="Google İşletme Profili"
                value={answers.gbp}
                onChange={(v) => setField("gbp", v)}
                placeholder="Örn. maps.google.com/… veya bilmiyorum"
              />
              <StepInput
                label="Rakipler veya arama ifadeleri"
                value={answers.competitors}
                onChange={(v) => setField("competitors", v)}
                placeholder="Örn. Denizli butik, online satış, rakipleriniz"
              />
              <div>
                <label className="block text-xs font-medium tracking-[0.14em] uppercase text-black/45">
                  Şu An En Büyük Sorun
                </label>
                <textarea
                  value={answers.problem}
                  onChange={(e) => setField("problem", e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="Örn. Google’da çıkmıyoruz / siteden arama gelmiyor"
                  className="mt-2 w-full resize-y border border-black/20 bg-transparent p-3 text-base text-black outline-none placeholder:text-black/35 focus:border-black"
                />
              </div>
            </div>
          ) : null}

          {current.id === "phone" ? (
            <StepInput
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={answers.phone}
              onChange={(v) => setField("phone", v)}
              onEnter={goNext}
              placeholder="05XX XXX XX XX"
              type="tel"
            />
          ) : null}
        </div>

        {stepError || (phase === "error" && error) ? (
          <p className="mt-5 text-sm text-black" role="alert">
            {stepError || error}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-black px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0 || phase === "loading"}
          className="border border-black px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ice/50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Geri
        </button>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          {current.id === "extras" ? (
            <button
              type="button"
              onClick={skipExtras}
              disabled={phase === "loading"}
              className="border border-black/30 px-4 py-2.5 text-sm font-medium text-black/70 transition-colors hover:border-black hover:text-black"
            >
              Atla
            </button>
          ) : null}
          <button
            type="button"
            onClick={goNext}
            disabled={phase === "loading"}
            className="border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black disabled:opacity-50"
          >
            {phase === "loading"
              ? "Gönderiliyor…"
              : step === total - 1
                ? "Gönder — Sizi Arayalım"
                : "Devam"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StepInput({
  ref,
  value,
  onChange,
  onEnter,
  placeholder,
  type = "text",
  maxLength = 200,
  label,
}: {
  ref?: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  label?: string;
}) {
  return (
    <div>
      {label ? (
        <label className="block text-xs font-medium tracking-[0.14em] uppercase text-black/45">
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            e.preventDefault();
            onEnter();
          }
        }}
        className={`w-full border-0 border-b border-black/25 bg-transparent py-3 text-lg text-black outline-none placeholder:text-black/35 focus:border-black ${
          label ? "mt-2" : ""
        }`}
      />
    </div>
  );
}
