"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ilhamEntries,
  SEKTORLER,
  VIBES,
  sektorLabel,
  vibeLabel,
  type IlhamEntry,
  type SektorId,
  type VibeId,
} from "@/lib/ilham";

function parseList(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toggleIn(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function matchesFilters(
  entry: IlhamEntry,
  vibes: string[],
  sektorler: string[],
): boolean {
  const vibeOk =
    vibes.length === 0 ||
    vibes.some((v) => entry.vibes.includes(v as VibeId));
  const sektorOk =
    sektorler.length === 0 ||
    sektorler.some((s) => entry.sektorler.includes(s as SektorId));
  return vibeOk && sektorOk;
}

function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={[
        "border px-3 py-1.5 text-xs font-medium tracking-wide transition-colors",
        pressed
          ? "border-black bg-black text-white"
          : "border-black/25 bg-white text-black hover:border-black",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function IlhamGallery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [vibes, setVibes] = useState<string[]>(() =>
    parseList(searchParams.get("vibe")).filter((id) =>
      VIBES.some((v) => v.id === id),
    ),
  );
  const [sektorler, setSektorler] = useState<string[]>(() =>
    parseList(searchParams.get("sektor")).filter((id) =>
      SEKTORLER.some((s) => s.id === id),
    ),
  );

  // Keep local state in sync when user hits back/forward
  useEffect(() => {
    setVibes(
      parseList(searchParams.get("vibe")).filter((id) =>
        VIBES.some((v) => v.id === id),
      ),
    );
    setSektorler(
      parseList(searchParams.get("sektor")).filter((id) =>
        SEKTORLER.some((s) => s.id === id),
      ),
    );
  }, [searchParams]);

  const syncUrl = useCallback(
    (nextVibes: string[], nextSektor: string[]) => {
      const params = new URLSearchParams();
      if (nextVibes.length) params.set("vibe", nextVibes.join(","));
      if (nextSektor.length) params.set("sektor", nextSektor.join(","));
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  function toggleVibe(id: string) {
    const next = toggleIn(vibes, id);
    setVibes(next);
    syncUrl(next, sektorler);
  }

  function toggleSektor(id: string) {
    const next = toggleIn(sektorler, id);
    setSektorler(next);
    syncUrl(vibes, next);
  }

  function clearFilters() {
    setVibes([]);
    setSektorler([]);
    syncUrl([], []);
  }

  const filtered = useMemo(
    () => ilhamEntries.filter((e) => matchesFilters(e, vibes, sektorler)),
    [vibes, sektorler],
  );

  const hasFilters = vibes.length > 0 || sektorler.length > 0;

  return (
    <div>
      <div className="flex flex-col gap-6 border border-black bg-white p-5 sm:p-6">
        <div>
          <p className="mb-2 text-xs font-medium tracking-[0.18em] uppercase text-black/45">
            Vibe
          </p>
          <div className="flex flex-wrap gap-2">
            {VIBES.map((v) => (
              <FilterChip
                key={v.id}
                pressed={vibes.includes(v.id)}
                onClick={() => toggleVibe(v.id)}
              >
                {v.label}
              </FilterChip>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium tracking-[0.18em] uppercase text-black/45">
            Sektör
          </p>
          <div className="flex flex-wrap gap-2">
            {SEKTORLER.map((s) => (
              <FilterChip
                key={s.id}
                pressed={sektorler.includes(s.id)}
                onClick={() => toggleSektor(s.id)}
              >
                {s.label}
              </FilterChip>
            ))}
          </div>
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="self-start text-xs font-medium tracking-wide text-black/55 underline-offset-2 hover:text-black hover:underline"
          >
            Filtreleri temizle
          </button>
        )}
      </div>

      <p className="mt-6 text-sm text-black/50">
        {filtered.length} site
        {hasFilters ? " (filtreli)" : ""}
      </p>

      <ul className="mt-4 grid gap-0 border border-black">
        {filtered.length === 0 && (
          <li className="px-5 py-10 text-sm text-black/60 sm:px-6">
            Bu kombinasyonda kayıt yok. Filtreleri gevşetin veya temizleyin.
          </li>
        )}
        {filtered.map((entry, i) => (
          <li
            key={entry.id}
            className={
              i > 0 ? "border-t border-black" : undefined
            }
          >
            <article className="group grid gap-0 sm:grid-cols-[minmax(0,12rem)_1fr]">
              <div className="relative aspect-[16/10] border-b border-black bg-ice/25 sm:aspect-auto sm:min-h-[9.5rem] sm:border-b-0 sm:border-r">
                {entry.image ? (
                  <Image
                    src={entry.image}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 12rem"
                  />
                ) : (
                  <div className="flex h-full min-h-[9.5rem] items-end p-4 sm:absolute sm:inset-0">
                    <span className="text-lg font-medium tracking-tight text-black/80">
                      {entry.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-xl font-medium tracking-tight text-black">
                    {entry.name}
                  </h2>
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex border border-black px-3 py-1.5 text-xs font-medium tracking-wide text-black transition-colors hover:bg-black hover:text-white"
                  >
                    Siteye git
                  </a>
                </div>
                <p className="text-sm leading-relaxed text-black/70">
                  {entry.note}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {entry.vibes.map((v) => (
                    <span
                      key={v}
                      className="border border-black/20 px-2 py-0.5 text-[11px] tracking-wide text-black/55"
                    >
                      {vibeLabel(v)}
                    </span>
                  ))}
                  {entry.sektorler.map((s) => (
                    <span
                      key={s}
                      className="border border-black/20 bg-ice/40 px-2 py-0.5 text-[11px] tracking-wide text-black/55"
                    >
                      {sektorLabel(s)}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
