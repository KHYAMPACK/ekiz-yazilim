"use client";

import { useState } from "react";
import type { ChecklistItem } from "@/lib/gorunurluk/types";

export function InteractiveChecklist({
  items,
  title,
}: {
  items: ChecklistItem[];
  title?: string;
}) {
  const [state, setState] = useState(items);

  function toggle(id: string) {
    setState((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  const doneCount = state.filter((i) => i.done).length;

  return (
    <div className="border border-black bg-white p-5">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h4 className="text-lg font-medium tracking-tight text-black">
          {title ?? "Yapılacaklar"}
        </h4>
        <p className="text-xs font-medium text-black/55">
          {doneCount}/{state.length} tamam
        </p>
      </div>
      <ul className="space-y-2">
        {state.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-start gap-3 border border-transparent px-2 py-2 text-left transition-colors hover:border-black hover:bg-ice/30"
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border text-[11px] ${
                  item.done
                    ? "border-black bg-black text-white"
                    : "border-black/40 bg-white text-transparent"
                }`}
                aria-hidden
              >
                ✓
              </span>
              <span
                className={`text-sm leading-snug ${
                  item.done ? "text-black/45 line-through" : "text-black"
                }`}
              >
                {item.label}
                {item.note ? (
                  <span className="mt-1 block text-xs text-black/45 no-underline">
                    {item.note}
                  </span>
                ) : null}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
