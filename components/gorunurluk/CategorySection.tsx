import { SeverityBadge } from "@/components/gorunurluk/SeverityBadge";
import { InteractiveChecklist } from "@/components/gorunurluk/InteractiveChecklist";
import type { AuditCategory } from "@/lib/gorunurluk/types";

export function CategorySection({
  category,
  pageBreak = false,
}: {
  category: AuditCategory;
  pageBreak?: boolean;
}) {
  return (
    <section
      id={category.id}
      className={`scroll-mt-24 border border-black bg-white p-6 md:p-8 ${
        pageBreak ? "print-break" : ""
      }`}
    >
      <div className="flex flex-col gap-4 border-b border-black pb-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-black/45">
            Bölüm
          </p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight text-black md:text-4xl">
            {category.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-black/65 md:text-base">
            {category.blurb}
          </p>
          {category.rubric ? (
            <p className="mt-3 border-l-2 border-ice bg-ice/25 py-2 pl-3 text-xs leading-relaxed text-black/70">
              <span className="font-medium text-black">Puan ölçütü: </span>
              {category.rubric}
            </p>
          ) : null}
        </div>
        <div className="border border-black bg-ice/40 px-5 py-4 text-right">
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-black/55">
            Puan
          </p>
          <p className="text-4xl font-medium tracking-tight text-black">
            {category.score}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          {category.findings.map((finding) => (
            <article
              key={finding.id}
              className="border border-black bg-ice/15 p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <SeverityBadge severity={finding.severity} />
                <h3 className="text-xl font-medium tracking-tight text-black">
                  {finding.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                {finding.summary}
              </p>
              {finding.evidence && finding.evidence.length > 0 ? (
                <ul className="mt-3 space-y-1 border border-black/15 bg-white px-3 py-2">
                  {finding.evidence.map((item) => (
                    <li
                      key={item}
                      className="text-xs leading-snug text-black/55"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-4 border-l-2 border-black pl-3 text-sm leading-relaxed text-black">
                <span className="font-medium">Ne yapacağız: </span>
                {finding.recommendation}
              </p>
            </article>
          ))}
        </div>

        <InteractiveChecklist items={category.checklist} />
      </div>
    </section>
  );
}
