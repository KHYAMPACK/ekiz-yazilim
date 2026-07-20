import type { Metadata } from "next";
import Link from "next/link";
import GorunurlukForm from "@/components/gorunurluk/GorunurlukForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Görünürlük Analizi",
  description:
    "Web’de daha görünür olun. Kısa formu doldurun; Ekiz Yazılım sizi arayıp işletmenizin internetteki durumunu anlaşılır bir raporla özetlesin.",
  alternates: { canonical: "/gorunurluk" },
};

const DELIVERABLES = [
  {
    title: "Durumunuz Netleşir",
    body: "Sitenizin ve Google’daki görünürlüğünüz tek bakışta anlaşılır bir özetle sunulur.",
  },
  {
    title: "Öncelikler Çıkar",
    body: "Ne işe yarıyor, nerede müşteri kaçırıyorsunuz — önce hangisine dokunacağınız belli olur.",
  },
  {
    title: "Somut Yol Planı",
    body: "Reklamdan önce yapılacaklar sırayla yazılır; PDF olarak elinizde kalır.",
  },
] as const;

export default function GorunurlukPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-black bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">
            <div>
              <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                Görünürlük
              </p>
              <h1 className="max-w-xl text-3xl font-medium tracking-tight text-black sm:text-5xl">
                Web’de Daha Görünür Olun
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-black/65 sm:text-lg">
                Formu doldurun; {site.name} sizi arasın. Kısa bir görüşmeden sonra
                işletmenizin internetteki durumunu sade bir raporla özetleriz —
                reklam vermeden önce neyin öncelikli olduğunu bilirsiniz.
              </p>
            </div>
            <ul className="grid gap-0 border border-black">
              {DELIVERABLES.map((item, i) => (
                <li
                  key={item.title}
                  className={`bg-white p-5 ${
                    i < DELIVERABLES.length - 1 ? "border-b border-black" : ""
                  }`}
                >
                  <p className="text-sm font-medium tracking-tight text-black">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-black/60">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-black bg-ice/25">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <GorunurlukForm />
            <p className="mt-6 text-sm text-black/55">
              Zaten müşteriysek rapor linkinizi ayrıca paylaşırız. Genel sorular
              için{" "}
              <Link href="/#iletisim" className="underline underline-offset-2">
                iletişim
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="border-b border-black bg-black text-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-ice">
              Nasıl İşler?
            </p>
            <ol className="mt-8 grid gap-0 border border-white/25 sm:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Form",
                  b: "İşletme, site ve hedefinizi bırakın.",
                },
                {
                  n: "02",
                  t: "Görüşme",
                  b: "Eksikleri yüz yüze / telefonla netleştiririz.",
                },
                {
                  n: "03",
                  t: "Rapor",
                  b: "Durum özeti ve sıradaki adımlar — PDF olarak elinizde.",
                },
              ].map((step, i) => (
                <li
                  key={step.n}
                  className={`flex flex-col gap-2 p-5 sm:p-6 ${
                    i < 2
                      ? "border-b border-white/25 sm:border-r sm:border-b-0"
                      : ""
                  }`}
                >
                  <span className="text-xs font-medium tracking-[0.2em] text-ice">
                    {step.n}
                  </span>
                  <h2 className="text-xl font-medium tracking-tight">{step.t}</h2>
                  <p className="text-sm leading-relaxed text-white/65">{step.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
