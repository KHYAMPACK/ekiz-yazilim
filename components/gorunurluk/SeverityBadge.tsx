import type { Severity } from "@/lib/gorunurluk/types";
import { severityLabel } from "@/lib/gorunurluk/types";

const styles: Record<Severity, string> = {
  critical: "border-black bg-black text-white",
  high: "border-black bg-black/80 text-white",
  medium: "border-black bg-ice/60 text-black",
  low: "border-black/30 bg-white text-black/70",
  ok: "border-black bg-ice text-black",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase ${styles[severity]}`}
    >
      {severityLabel(severity)}
    </span>
  );
}
