import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Logo from "@/components/Logo";
import { CategorySection } from "@/components/gorunurluk/CategorySection";
import { PrintButton } from "@/components/gorunurluk/PrintButton";
import ReportGate from "@/components/gorunurluk/ReportGate";
import { ScoreRing } from "@/components/gorunurluk/ScoreRing";
import { canAccessReport } from "@/lib/gorunurluk/access";
import { getClient } from "@/lib/gorunurluk/clients";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ clientId: string }>;
  searchParams: Promise<{ t?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Görünürlük Raporu",
    robots: { index: false, follow: false },
  };
}

export default async function RaporPage({ params, searchParams }: PageProps) {
  const { clientId } = await params;
  const { t } = await searchParams;

  if (!canAccessReport(t)) {
    return <ReportGate clientId={clientId} />;
  }

  const audit = getClient(clientId);
  if (!audit) {
    notFound();
  }

  const { meta, executive, categories, roadmap } = audit;

  return (
    <div className="report-shell min-h-screen bg-white text-black">
      <header className="no-print border-b border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center">
              <Logo variant="full" tone="onLight" size={22} layout="inline" />
            </Link>
            <p className="mt-2 text-[11px] font-medium tracking-[0.18em] uppercase text-black/45">
              Website &amp; Google Görünürlük Analizi
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-end gap-2 text-sm">
            <a
              href="#roadmap"
              className="border border-black px-4 py-2 font-medium transition-colors hover:bg-ice/50"
            >
              Yol haritası
            </a>
            <PrintButton />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <section className="no-print mb-8 border border-black bg-ice/35 p-5 md:p-6">
          <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-black/45">
            Bu sayfa nedir?
          </p>
          <h2 className="mt-2 text-2xl font-medium tracking-tight text-black md:text-3xl">
            İşletmenizin dijital durum raporu
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/65 md:text-base">
            Üstteki puan genel durumu gösterir. Bölüm skorları kategori bazında
            hazırlığı özetler. Aşağıda sorunlar, kanıt notları ve{" "}
            <strong className="font-medium text-black">ne yapacağımız</strong>{" "}
            yazar. PDF için{" "}
            <strong className="font-medium text-black">PDF indir</strong> →
            yazıcıdan “PDF olarak kaydet”.
          </p>
        </section>

        <section className="overflow-hidden border border-black bg-white">
          <div className="print-cover-grid grid gap-8 border-b border-black bg-ice/20 p-6 print:bg-white md:grid-cols-[1.3fr_auto] md:p-10">
            <div>
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-black/45">
                Hazırlanan işletme · {meta.preparedFor}
              </p>
              <h1 className="mt-4 max-w-xl text-4xl leading-[1.05] font-medium tracking-tight text-black md:text-5xl">
                {executive.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/65 md:text-lg">
                {executive.summary}
              </p>
              <div className="mt-8 grid gap-3 text-sm sm:grid-cols-2 print:grid-cols-2">
                <MetaCard label="İşletme türü" value={meta.businessType} />
                <MetaCard label="Website" value={meta.websiteUrl} />
                {meta.city ? <MetaCard label="Şehir" value={meta.city} /> : null}
                {meta.contactName ? (
                  <MetaCard
                    label="Yetkili"
                    value={`${meta.contactName}${meta.phone ? ` · ${meta.phone}` : ""}`}
                  />
                ) : null}
                <MetaCard label="Hazırlayan" value={meta.preparedBy} />
                <MetaCard label="Tarih" value={meta.date} />
              </div>
            </div>

            <div className="print-score-box flex flex-col items-center justify-center border border-black bg-white px-6 py-6">
              <ScoreRing score={executive.overallScore} />
              <p className="mt-3 max-w-[12rem] text-center text-xs leading-relaxed text-black/55">
                Genel görünürlük puanı (0–100)
              </p>
            </div>
          </div>

          <div className="print-priorities grid gap-px border-t border-black bg-black md:grid-cols-2 lg:grid-cols-4">
            {executive.topPriorities.map((item, index) => (
              <div key={item} className="bg-white p-4">
                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-black/45">
                  Öncelik 0{index + 1}
                </p>
                <p className="mt-2 text-sm leading-snug text-black">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <nav className="no-print mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="border border-black bg-white px-3 py-1.5 text-xs font-medium text-black/70 transition-colors hover:bg-ice/50 hover:text-black"
            >
              {category.title} · {category.score}
            </a>
          ))}
        </nav>

        <div className="mt-8 space-y-8">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              pageBreak
            />
          ))}
        </div>

        <section
          id="roadmap"
          className="print-break mt-8 border border-black bg-black p-6 text-white md:p-10"
        >
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-ice">
            Çalışma planı
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
            Birlikte neyi sırayla yapacağız?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
            Reklam sonra. Önce site kontrol altına alınır, darboğazlar kalkar,
            Google’da ücretsiz görünürlük temeli kurulur.
          </p>

          <div className="print-stack mt-8 grid gap-0 border border-white/25 md:grid-cols-3">
            {roadmap.map((phase, i) => (
              <article
                key={phase.phase}
                className={`print-keep p-5 ${
                  i < roadmap.length - 1
                    ? "border-b border-white/25 md:border-r md:border-b-0"
                    : ""
                }`}
              >
                <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-ice">
                  {phase.phase}
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-tight">
                  {phase.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-snug text-white/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ice" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="no-print mt-8 border border-black bg-white p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-black/45">
                Sonraki adım
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-black">
                Bu rapor onaylandıktan sonra uygulamaya geçeriz
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/65 md:text-base">
                Sorularınız için {site.name} ile görüşmeye devam ederiz. PDF için
                üstteki butonu kullanın.
              </p>
            </div>
            <PrintButton />
          </div>
        </section>
      </main>

      <footer className="no-print border-t border-black py-8 text-center text-xs text-black/45">
        {meta.preparedFor} · {site.name} görünürlük raporu · {meta.date}
      </footer>
    </div>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black bg-white px-4 py-3">
      <p className="text-[11px] tracking-[0.14em] uppercase text-black/45">
        {label}
      </p>
      <p className="mt-1 font-medium text-black">{value}</p>
    </div>
  );
}
