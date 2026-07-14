import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma",
  description: "Kişisel verilerin korunması hakkında kısa bilgilendirme.",
};

export default function KvkkPage() {
  return (
    <>
      <header className="border-b border-black">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <Link href="/" className="inline-flex h-9 items-center">
            <Logo variant="full" tone="onLight" size={26} layout="inline" />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
          Yasal
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
          KVKK aydınlatma
        </h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-black/75">
          <p>
            {site.name} olarak iletişim formları ve e-posta yoluyla ilettiğiniz
            ad, e-posta ve mesaj içeriği gibi kişisel verileri yalnızca
            talebinize dönüş yapmak ve hizmet sunumu için işleriz.
          </p>
          <p>
            Verileriniz, yasal zorunluluklar dışında üçüncü taraflarla pazarlama
            amacıyla paylaşılmaz. Saklama süresi, işin gerektirdiği makul süre
            ile sınırlıdır.
          </p>
          <p>
            Başvuru ve talepleriniz için:{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
        <Link
          href="/"
          className="mt-12 inline-flex border border-black px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-ice/40"
        >
          Ana sayfaya dön
        </Link>
      </main>
    </>
  );
}
