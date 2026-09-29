import Link from "next/link";
import WorkCard from "./WorkCard";
import { featuredWorks } from "@/lib/works";

export default function WorksSection() {
  const projects = featuredWorks();

  return (
    <section
      id="isler"
      className="border-b border-black bg-white"
      aria-labelledby="isler-title"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 flex max-w-xl flex-col gap-4 sm:mb-12">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            İşler
          </p>
          <h2
            id="isler-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Yaptıklarımız
          </h2>
          <p className="text-base text-black/65">
            Seçilmiş yayındaki işler. Tam liste İşler sayfasında.
          </p>
          <Link
            href="/isler"
            className="inline-flex min-h-12 w-fit items-center border border-black bg-black px-5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black/85"
          >
            Tüm işler
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
