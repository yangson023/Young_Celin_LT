"use client";

import { useMemo, useState } from "react";
import type { CourseMaterial } from "@/lib/types";
import { CourseMaterialCard } from "./CourseMaterialCard";

const filters = [
  { id: "all", label: "全部资料" },
  { id: "chapter-1", label: "第一章" },
  { id: "chapter-2", label: "第二章" },
  { id: "chapter-3", label: "第三章" },
  { id: "chapter-4", label: "第四章" },
  { id: "overview", label: "课程总览" }
];

function belongsToFilter(material: CourseMaterial, filterId: string) {
  if (filterId === "all") {
    return true;
  }

  if (filterId === "chapter-1") {
    return material.chapter_ids.includes(
      "chapter-1-matrix-elementary-transformations"
    );
  }

  if (filterId === "chapter-2") {
    return material.chapter_ids.includes("chapter-2-determinants");
  }

  if (filterId === "chapter-3") {
    return material.chapter_ids.includes("chapter-3-geometric-space");
  }

  if (filterId === "chapter-4") {
    return material.chapter_ids.includes("chapter-4-n-dimensional-vector-space");
  }

  if (filterId === "overview") {
    return material.coverage.includes("全课程") || material.type === "textbook";
  }

  return false;
}

export function ResourceLibraryClient({
  materials
}: {
  materials: CourseMaterial[];
}) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const visibleMaterials = useMemo(
    () =>
      materials.filter((material) =>
        belongsToFilter(material, selectedFilter)
      ),
    [selectedFilter, materials]
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
            <h2 className="mt-1 text-2xl font-semibold text-ink">课程资料目录</h2>
          </div>
          <p className="text-sm text-muted">{visibleMaterials.length} 份资料</p>
        </div>

        {visibleMaterials.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {visibleMaterials.map((material) => (
              <CourseMaterialCard key={material.id} material={material} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-line bg-white/80 px-5 py-10 text-center text-sm text-muted">
            这一部分还在按章节整理中，先从已经上线的内容开始看看吧。
          </div>
        )}
      </section>
    </>
  );
}
