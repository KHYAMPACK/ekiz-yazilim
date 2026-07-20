import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { canAccessReport } from "@/lib/gorunurluk/access";
import { businessIntake } from "@/lib/gorunurluk/intake-fields";
import { universalChecklist } from "@/lib/gorunurluk/checklist";
import { clientFileInstructions } from "@/lib/gorunurluk/intake-fields";

export const metadata: Metadata = {
  title: "Görünürlük Kontrol Listesi",
  description: "İç kullanım: görüşme sonrası bilgi ve SEO kontrol listesi.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ t?: string }>;
};

export default async function GorunurlukKontrolPage({ searchParams }: PageProps) {
  const { t } = await searchParams;
  if (!canAccessReport(t)) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="border-b border-black bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            İç Kullanım
          </p>
          <h1 className="max-w-2xl text-3xl font-medium tracking-tight text-black sm:text-4xl">
            Görüşme Sonrası Kontrol Listesi
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/65">
            Public form kısa tutulur. Raporu yazmadan önce bu maddeleri
            tamamlayın. Yeni müşteri dosyası için:{" "}
            <code className="bg-ice/50 px-1 text-sm">
              /raporlar/[id]?t=TOKEN
            </code>
          </p>
          <pre className="mt-6 overflow-x-auto border border-black bg-ice/20 p-4 text-xs leading-relaxed text-black/80 whitespace-pre-wrap">
            {clientFileInstructions}
          </pre>

          <div className="mt-12 space-y-10">
            {businessIntake.map((section) => (
              <section key={section.id} className="border border-black">
                <h2 className="border-b border-black bg-ice/40 px-5 py-3 text-lg font-medium tracking-tight">
                  {section.title}
                </h2>
                <ul className="divide-y divide-black/10">
                  {section.fields.map((field) => (
                    <li key={field.id} className="px-5 py-4">
                      <p className="font-medium text-black">
                        {field.label}
                        {field.required ? (
                          <span className="ml-2 text-xs text-black/45">zorunlu</span>
                        ) : null}
                      </p>
                      <p className="mt-1 text-sm text-black/55">{field.why}</p>
                      {field.example ? (
                        <p className="mt-1 text-xs text-black/40">
                          Örn: {field.example}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-medium tracking-tight text-black">
              Website &amp; Google Temelleri
            </h2>
            {universalChecklist.map((block) => (
              <section key={block.section} className="border border-black">
                <h3 className="border-b border-black bg-black px-5 py-3 text-sm font-medium tracking-wide text-white">
                  {block.section}
                </h3>
                <ul className="divide-y divide-black/10">
                  {block.items.map((item) => (
                    <li key={item} className="px-5 py-3 text-sm text-black/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-10 text-sm text-black/55">
            Örnek rapor (token gerekli):{" "}
            <code className="bg-ice/40 px-1">/raporlar/fmx?t=…</code>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
