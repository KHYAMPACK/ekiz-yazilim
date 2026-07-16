import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import IlhamGallery from "@/components/ilham/IlhamGallery";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "İlham",
  description:
    "Beğendiğimiz siteler — ortak bir görsel dil kurmak ve yön seçmek için ilham kaynağı.",
  alternates: { canonical: "/ilham" },
};

function GalleryFallback() {
  return (
    <div className="border border-black bg-white px-5 py-10 text-sm text-black/50 sm:px-6">
      Yükleniyor…
    </div>
  );
}

export default function IlhamPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-black bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Referans
            </p>
            <h1 className="text-3xl font-medium tracking-tight text-black sm:text-5xl">
              İlham
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg">
              Gözümüzü şekillendiren siteler. Toplantıda birlikte bakıp “böyle
              bir dil” demek için — şablon değil, ortak dil.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/50">
              Yaptığımız işler burada değil; onlar için ana sayfadaki İşler
              bölümüne bakın.
            </p>
          </div>
        </section>

        <section className="border-b border-black bg-ice/20">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <Suspense fallback={<GalleryFallback />}>
              <IlhamGallery />
            </Suspense>
          </div>
        </section>

        <section className="border-b border-black bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-14">
            <p className="max-w-md text-sm leading-relaxed text-black/65">
              Yön netleşince birlikte ilerleriz.
            </p>
            <Link
              href="/#iletisim"
              className="inline-flex shrink-0 border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              İletişime geç
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
