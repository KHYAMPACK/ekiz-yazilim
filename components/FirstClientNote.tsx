import Link from "next/link";

export default function FirstClientNote() {
  return (
    <section
      className="border-b border-black bg-ice/30"
      aria-label="İşler notu"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10 sm:px-6 sm:py-12">
        <p className="shrink-0 text-xs font-medium tracking-[0.2em] uppercase text-black/55">
          Not
        </p>
        <p className="min-w-0 max-w-3xl text-base leading-relaxed text-black sm:text-lg">
          Yayındaki işlerin tam listesi{" "}
          <Link href="/isler" className="underline underline-offset-4">
            İşler
          </Link>{" "}
          sayfasında. Yeni projeler geldikçe oraya eklenir.
        </p>
      </div>
    </section>
  );
}
