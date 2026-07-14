const projects = [
  { title: "Proje A", meta: "Web sitesi — yakında" },
  { title: "Proje B", meta: "E-ticaret — yakında" },
  { title: "Proje C", meta: "Kurumsal — yakında" },
  { title: "Proje D", meta: "Ürün — yakında" },
  { title: "Proje E", meta: "Landing — yakında" },
  { title: "Proje F", meta: "Panel — yakında" },
];

export default function WorksSection() {
  return (
    <section
      id="isler"
      className="border-b border-black bg-white"
      aria-labelledby="isler-title"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="mb-10 max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            İşler
          </p>
          <h2
            id="isler-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Daha önce ne yaptık
          </h2>
          <p className="mt-3 text-base text-black/65">
            Çalışmalar burada listelenecek. Şimdilik yerleşim iskeleti.
          </p>
        </div>

        <div className="works-masonry">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex min-h-[160px] flex-col justify-between bg-white p-5 transition-colors hover:bg-ice/30"
            >
              <div className="aspect-video w-full border border-dashed border-black/25 bg-[linear-gradient(135deg,#bfd5eb33_25%,transparent_25%,transparent_50%,#bfd5eb33_50%,#bfd5eb33_75%,transparent_75%,transparent)] bg-size-[16px_16px]" />
              <div className="mt-4">
                <h3 className="text-lg font-medium tracking-tight text-black">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-black/50">{project.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
