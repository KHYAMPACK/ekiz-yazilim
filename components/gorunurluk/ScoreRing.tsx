import { scoreLabel } from "@/lib/gorunurluk/types";

export function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const label = scoreLabel(score);

  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128" aria-hidden>
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-black/15"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="square"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-black transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-medium tracking-tight text-black">
          {score}
        </span>
        <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-black/55">
          {label}
        </span>
      </div>
    </div>
  );
}
