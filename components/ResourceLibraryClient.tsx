"use client";

import { useMemo, useState } from "react";
import type { ReferenceSource } from "@/lib/types";
import { ReferenceSourceCard } from "./ReferenceSourceCard";

const filters = [
  { id: "all", label: "全部资料" },
  { id: "course", label: "课程路径" },
  { id: "open_textbook", label: "教材对照" },
  { id: "online_course", label: "直觉理解" }
];

function belongsToFilter(source: ReferenceSource, filterId: string) {
  if (filterId === "all") {
    return true;
  }

  if (filterId === "open_textbook") {
    return source.type.startsWith("open_textbook");
  }

  return source.type === filterId ||
    (filterId === "online_course" && source.type === "visual_course");
}

export function ResourceLibraryClient({
  sources
}: {
  sources: ReferenceSource[];
}) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const visibleSources = useMemo(
    () => sources.filter((source) => belongsToFilter(source, selectedFilter)),
    [selectedFilter, sources]
  );

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2" aria-label="资料分类">
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setSelectedFilter(filter.id)}
              aria-pressed={isSelected}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                isSelected
                  ? "bg-accent text-white shadow-sm"
                  : "border border-line bg-white text-muted hover:border-accent/50 hover:text-accent"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <section className="mt-5">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-muted">当前书架</p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">公开学习资源</h2>
          </div>
          <p className="text-sm text-muted">{visibleSources.length} 份资料</p>
        </div>

        {visibleSources.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {visibleSources.map((source) => (
              <ReferenceSourceCard key={source.id} source={source} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-line bg-white/80 px-5 py-10 text-center text-sm text-muted">
            这一类资料正在整理中，先从其他书架开始看看吧。
          </div>
        )}
      </section>
    </>
  );
}
