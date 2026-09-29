import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import WorksGrid from "@/components/WorksGrid";
import { STACK_GROUPS, works } from "@/lib/works";

export const metadata: Metadata = {
  title: "İşler",
  description:
    "Ekiz Yazılım’ın tüm işleri: e-ticaret altyapısı, okul yönetim uygulaması, kurumsal web siteleri ve oyun. Kullanılan teknolojilerle birlikte.",
  alternates: { canonical: "/isler" },
};

const stats = [
  { value: works.length, label: "Proje" },
  { value: works.filter((w) => w.status === "live").length, label: "Yayında" },
  { value: works.filter((w) => w.kind === "app").length, label: "Uygulama ve oyun" },
];

export default function IslerPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-black bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              İşler
            </p>
            <h1 className="max-w-3xl text-3xl font-medium tracking-tight text-black sm:text-5xl">
              Yaptığım her şey
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg">
              Kurumsal sitelerden e-ticaret altyapısına, okul yönetim
              uygulamasından oyuna kadar tüm işler. Satıştan tasarıma, kodlamadan
              yayına kadar her birini uçtan uca ben yürütüyorum.
            </p>
            <dl className="mt-10 grid max-w-xl grid-cols-3 border border-black">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-4 py-5 ${i > 0 ? "border-l border-black" : ""}`}
                >
                  <dt className="text-xs tracking-wide text-black/55">{stat.label}</dt>
                  <dd className="mt-1 text-3xl font-medium tracking-tight">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className="border-b border-black bg-ice/30"
          aria-labelledby="isler-stack-title"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <h2
              id="isler-stack-title"
              className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
            >
              Kullandığım teknolojiler
            </h2>
            <div className="mt-8 grid gap-px border border-black bg-black sm:grid-cols-2 lg:grid-cols-5">
              {STACK_GROUPS.map((group) => (
                <div key={group.title} className="bg-white px-5 py-5">
                  <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                    {group.title}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-black">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-b border-black bg-white"
          aria-labelledby="isler-list-title"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2
              id="isler-list-title"
              className="mb-6 text-2xl font-medium tracking-tight text-black sm:text-3xl"
            >
              Projeler
            </h2>
            <WorksGrid />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
