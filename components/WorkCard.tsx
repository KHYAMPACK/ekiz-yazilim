import { STATUS_LABEL, type Work } from "@/lib/works";
import WorkIcon from "./WorkIcons";

/** Browser chrome with the domain — tells "this is a website" without a screenshot. */
function BrowserBar({ project }: { project: Work }) {
  return (
    <div className="border-b border-black bg-ice/30 px-5 py-6 sm:px-6">
      <div className="border border-black bg-white">
        <div className="flex items-center gap-3 border-b border-black px-3 py-2">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 border border-black" />
            <span className="h-2 w-2 border border-black" />
            <span className="h-2 w-2 bg-black" />
          </div>
          <p className="min-w-0 flex-1 truncate border border-black/20 px-2 py-0.5 font-mono text-xs text-black/70">
            {project.domain ?? "yakında"}
          </p>
        </div>
        <div className="space-y-2 px-3 py-4" aria-hidden>
          <div className="h-2 w-2/3 bg-black" />
          <div className="h-1.5 w-full bg-black/15" />
          <div className="h-1.5 w-5/6 bg-black/15" />
        </div>
      </div>
    </div>
  );
}

function IconStage({ project }: { project: Work }) {
  return (
    <div className="flex items-center justify-center border-b border-black bg-ice/30 px-5 py-8 sm:px-6">
      {project.icon ? (
        <WorkIcon name={project.icon} className="h-20 w-20 text-black" />
      ) : null}
    </div>
  );
}

export default function WorkCard({ project }: { project: Work }) {
  return (
    <article className="flex h-full flex-col border border-black bg-white">
      {project.kind === "site" ? (
        <BrowserBar project={project} />
      ) : (
        <IconStage project={project} />
      )}

      <div className="flex flex-1 flex-col px-5 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            {project.meta}
          </p>
          <span
            className={`border border-black px-2 py-0.5 text-[10px] font-medium tracking-[0.14em] uppercase ${
              project.status === "live" ? "bg-black text-white" : ""
            }`}
          >
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        <h3 className="mt-3 text-2xl font-medium tracking-tight text-black sm:text-3xl">
          {project.name}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-black/70">
          {project.blurb}
        </p>

        <ul className="mt-5 space-y-2">
          {project.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-black/80"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-black" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Kullanılan teknolojiler">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="border border-black/25 px-2 py-0.5 text-xs text-black/70"
            >
              {tech}
            </li>
          ))}
        </ul>

        {project.href || project.repo ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-8">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center border border-black bg-black px-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black/85"
              >
                {project.kind === "site" ? "Siteyi gör" : "Uygulamayı gör"}
              </a>
            ) : null}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center border border-black px-4 text-sm font-medium tracking-wide text-black transition-colors hover:bg-ice/40"
              >
                GitHub
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
