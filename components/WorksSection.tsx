import Image from "next/image";

type Project = {
  name: string;
  meta: string;
  blurb: string;
  href: string;
  desktop: string;
  mobile: string;
};

const projects: Project[] = [
  {
    name: "Şahika Öncü Minikler",
    meta: "Kurumsal web sitesi — kreş",
    blurb:
      "Denizli Yenişehir’de butik kreş için kurumsal site: programlar, kayıt ve mobil uyumlu yapı.",
    href: "https://www.sahikaoncuminikler.com",
    desktop: "/works/sahika-desktop.png",
    mobile: "/works/sahika-mobile.png",
  },
  {
    name: "Lider Çocuklar Anaokulu",
    meta: "Kurumsal web sitesi — anaokulu",
    blurb:
      "Denizli Yenişehir’de anaokulu için kurumsal site: atölyeler, iletişim ve mobil uyumlu yapı.",
    href: "https://www.denizlilidercocuklaranaokulu.com",
    desktop: "/works/lider-desktop.png",
    mobile: "/works/lider-mobile.png",
  },
  {
    name: "Özel Başak Akademi",
    meta: "Kurumsal web sitesi — eğitim",
    blurb:
      "Denizli’de bir eğitim kurumu için kurumsal site: programlar, iletişim ve mobil uyumlu yapı.",
    href: "https://basakakademi20.com",
    desktop: "/works/basak-desktop.png",
    mobile: "/works/basak-mobile.png",
  },
];

function DeviceStage({ project }: { project: Project }) {
  return (
    <div className="relative overflow-hidden bg-white px-4 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <div className="relative mx-auto max-w-[34rem] pb-8 max-sm:pb-0 sm:pb-10">
        {/* Laptop — 1920×1080 */}
        <div className="relative z-0 mx-auto w-[92%] sm:w-[88%]">
          <div className="border-[5px] border-b-0 border-black bg-black pt-2 sm:border-[6px] sm:pt-2.5">
            <div
              className="mx-auto mb-1.5 h-1 w-1 bg-white/40 sm:mb-2"
              style={{ borderRadius: "9999px" }}
              aria-hidden
            />
            <div className="relative aspect-video w-full overflow-hidden bg-white">
              <Image
                src={project.desktop}
                alt={`${project.name} — masaüstü görünüm`}
                width={1920}
                height={1080}
                className="h-full w-full object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 520px"
              />
            </div>
          </div>
          <div className="relative h-2.5 bg-black sm:h-3">
            <div
              className="absolute top-0 left-1/2 h-1.5 w-[18%] -translate-x-1/2 bg-black/80 sm:h-2"
              aria-hidden
            />
          </div>
          <div
            className="mx-auto h-1.5 w-[108%] -translate-x-[3.7%] bg-black sm:h-2"
            aria-hidden
          />
        </div>

        {/* iPhone 13 — 390×844 */}
        <div
          className="device-iphone13 absolute z-10 border-[3px] border-black bg-black max-sm:relative max-sm:mx-auto max-sm:mt-8 max-sm:w-[44%] sm:right-[-2%] sm:bottom-0 sm:w-[30%]"
          style={{
            borderRadius: "1.85rem",
            aspectRatio: "390 / 844",
          }}
        >
          <div
            className="absolute top-0 left-1/2 z-20 h-[3.4%] w-[42%] -translate-x-1/2 bg-black"
            style={{ borderRadius: "0 0 0.75rem 0.75rem" }}
            aria-hidden
          />
          <div
            className="absolute inset-[2.5px] overflow-hidden bg-white"
            style={{ borderRadius: "1.65rem" }}
          >
            <Image
              src={project.mobile}
              alt={`${project.name} — iPhone 13 görünüm`}
              width={780}
              height={1688}
              className="h-full w-full object-cover object-top"
              sizes="160px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkCard({ project }: { project: Project }) {
  return (
    <article className="border border-black">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)]">
        <div className="flex flex-col justify-center border-b border-black bg-ice/30 px-5 py-8 sm:px-8 sm:py-10 lg:border-r lg:border-b-0">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            {project.meta}
          </p>
          <h3 className="mt-3 text-2xl font-medium tracking-tight text-black sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-black/70">
            {project.blurb}
          </p>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 w-fit items-center border border-black bg-black px-5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black/85"
          >
            Siteyi gör
          </a>
        </div>
        <DeviceStage project={project} />
      </div>
    </article>
  );
}

export default function WorksSection() {
  return (
    <section
      id="isler"
      className="border-b border-black bg-white"
      aria-labelledby="isler-title"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            İşler
          </p>
          <h2
            id="isler-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Yaptıklarımız
          </h2>
          <p className="mt-3 text-base text-black/65">
            Yayında olan işler.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <WorkCard key={project.href} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
