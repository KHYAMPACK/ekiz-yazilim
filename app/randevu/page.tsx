import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Randevu",
  description:
    "Ekiz Yazılım ile ücretsiz keşif görüşmesi — web sitesi, e-ticaret ve yazılım.",
  alternates: { canonical: "/randevu" },
};

export default function RandevuPage() {
  if (site.bookingUrl) {
    redirect(site.bookingUrl);
  }

  const call = phoneHref();
  const wa = whatsappHref(
    "Merhaba, Ekiz Yazılım’dan keşif görüşmesi için randevu almak istiyorum.",
  );

  return (
    <>
      <header className="border-b border-black bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <Link href="/" className="inline-flex h-9 items-center">
            <Logo variant="full" tone="onLight" size={26} layout="inline" />
          </Link>
        </div>
      </header>

      <main className="border-b border-black bg-ice/35">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            Randevu
          </p>
          <h1 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
            Keşif Görüşmesi
          </h1>
          <p className="mt-4 text-base leading-relaxed text-black/70 sm:text-lg">
            15–20 dakikalık bir konuşma. Ne istediğinizi netleştirir, size uygun
            yolu söyleriz. Ücret yok — yalnızca netlik.
          </p>

          <div className="mt-10 border border-black bg-white">
            <div className="border-b border-black px-5 py-5 sm:px-6">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-black/45">
                Nasıl Randevu Alınır?
              </p>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-base text-black/80">
                <li>WhatsApp’tan yazın veya arayın.</li>
                <li>Uygun olduğunuz gün/saati belirtin.</li>
                <li>Kısa bir görüşme planlarız.</li>
              </ol>
            </div>

            <div className="flex flex-col gap-0 sm:flex-row">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 flex-1 items-center justify-center bg-black text-sm font-medium tracking-wide text-white transition-colors hover:bg-black/85"
                >
                  WhatsApp ile randevu
                </a>
              )}
              {call && (
                <a
                  href={call}
                  className={`flex min-h-12 flex-1 items-center justify-center bg-white text-sm font-medium tracking-wide text-black transition-colors hover:bg-ice/50 ${wa ? "border-t border-black sm:border-t-0 sm:border-l" : ""}`}
                >
                  Ara · {phoneDisplay()}
                </a>
              )}
            </div>
          </div>

          <p className="mt-6 text-sm text-black/55">
            Form tercih ederseniz:{" "}
            <Link href="/#iletisim" className="underline underline-offset-2">
              iletişim
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
