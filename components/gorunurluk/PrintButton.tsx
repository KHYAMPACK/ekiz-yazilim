"use client";

export function PrintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={
        className ??
        "border border-black bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
      }
    >
      PDF indir
    </button>
  );
}
