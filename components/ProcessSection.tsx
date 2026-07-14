export default function ProcessSection() {
  const steps = [
    {
      n: "01",
      title: "Konuşuruz",
      body: "İhtiyacınızı bir cümlede veya kısa bir görüşmeyle netleştiririz.",
    },
    {
      n: "02",
      title: "Teklif",
      body: "Kapsam, süre ve fiyatı açık yazarız. Sürpriz madde olmaz.",
    },
    {
      n: "03",
      title: "Yapıp yayınlarız",
      body: "Tasarım, geliştirme, yayına alma ve sonrası destek — tek muhatap.",
    },
  ] as const;

  return (
    <section
      id="surec"
      className="border-b border-black bg-white"
      aria-labelledby="surec-title"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            Süreç
          </p>
          <h2
            id="surec-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Nasıl çalışırız?
          </h2>
          <p className="mt-3 text-base text-black/65">
            Üç adım. Uzun sunum yok — net ilerleme var.
          </p>
        </div>

        <ol className="grid gap-0 border border-black sm:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={`flex min-w-0 flex-col gap-3 p-5 sm:p-6 ${
                i < steps.length - 1
                  ? "border-b border-black sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <span className="text-xs font-medium tracking-[0.2em] text-black/40">
                {step.n}
              </span>
              <h3 className="text-xl font-medium tracking-tight text-black">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-black/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
