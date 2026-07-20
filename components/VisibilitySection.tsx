import Link from "next/link";

function ScorePreview() {
  return (
    <div
      className="w-full min-w-0 overflow-hidden border border-white/25 bg-black text-ice"
      style={{ aspectRatio: "10 / 7" }}
    >
      <svg
        viewBox="0 0 200 140"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
        aria-hidden
      >
        <circle
          cx="70"
          cy="70"
          r="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          opacity="0.25"
        />
        <circle
          cx="70"
          cy="70"
          r="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray="168 240"
          strokeLinecap="square"
          transform="rotate(-90 70 70)"
        />
        <text
          x="70"
          y="66"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="500"
        >
          44
        </text>
        <text
          x="70"
          y="84"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          letterSpacing="1.5"
        >
          ZAYIF
        </text>
        <rect x="124" y="36" width="56" height="14" fill="none" stroke="white" strokeWidth="1" opacity="0.7" />
        <rect x="124" y="56" width="48" height="14" fill="none" stroke="white" strokeWidth="1" opacity="0.55" />
        <rect x="124" y="76" width="52" height="14" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
        <rect x="124" y="96" width="40" height="14" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}

const points = [
  "Sitenizin ve Google’daki durumunuz net bir puanla özetlenir",
  "Nerede güçlüsünüz, nerede kayıp var — sade dilde görürsünüz",
  "Önce ne yapılacağını adım adım yazılmış bir plan alırsınız",
] as const;

export default function VisibilitySection() {
  return (
    <section
      id="gorunurluk"
      className="border-b border-black bg-black text-white"
      aria-labelledby="gorunurluk-home-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 border border-ice/50 bg-ice/15 px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase text-ice">
            Yeni · Görünürlük analizi
          </p>
          <h2
            id="gorunurluk-home-title"
            className="mt-4 max-w-xl text-3xl font-medium tracking-tight text-white sm:text-4xl"
          >
            Web’de Daha Görünür Olun
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
            Formu doldurun, sizi arayalım. Kısa bir görüşmeden sonra işletmenizin
            internetteki durumunu anlaşılır bir raporla özetleriz — reklam
            vermeden önce neyin öncelikli olduğunu bilirsiniz.
          </p>
          <ul className="mt-6 space-y-2">
            {points.map((p) => (
              <li
                key={p}
                className="flex gap-3 text-sm leading-snug text-white/80 sm:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ice" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/gorunurluk"
              className="inline-flex items-center justify-center border border-ice bg-ice px-6 py-3.5 text-sm font-medium tracking-wide text-black transition-colors hover:bg-white"
            >
            Formu Doldur — Sizi Arayalım
            </Link>
            <p className="text-sm text-white/45"></p>
          </div>
        </div>

        <div className="border border-white/20 bg-white/5 p-5 sm:p-6">
          <p className="mb-4 text-[11px] font-medium tracking-[0.18em] uppercase text-ice">
            Örnek Görünürlük Özeti
          </p>
          <ScorePreview />
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Rapor, durumunuzu tek bakışta gösterir: genel puan ve öncelikli
            iyileştirme alanları. Sizinle konuşarak hazırlanır.
          </p>
        </div>
      </div>
    </section>
  );
}
