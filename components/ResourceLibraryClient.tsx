"use client";

import { useMemo, useState } from "react";
import { BookMarked, ChevronRight, LibraryBig } from "lucide-react";
import type { CourseMaterial } from "@/lib/types";
import { CourseMaterialCard } from "./CourseMaterialCard";

const filters = [
  { id: "all", label: "全部资料" },
  { id: "chapter-1", label: "第一章" },
  { id: "chapter-2", label: "第二章" },
  { id: "chapter-3", label: "第三章" },
  { id: "chapter-4", label: "第四章" },
  { id: "chapter-5", label: "第五章" },
  { id: "chapter-6", label: "第六章" },
  { id: "chapter-7", label: "第七章" },
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

  if (filterId === "chapter-5") {
    return material.chapter_ids.includes("chapter-5-eigenvalues-eigenvectors");
  }

  if (filterId === "chapter-6") {
    return material.chapter_ids.includes("chapter-6-quadratic-forms-quadrics");
  }

  if (filterId === "chapter-7") {
    return material.chapter_ids.includes("chapter-7-linear-spaces-transformations");
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
      <section className="mt-6 overflow-hidden rounded-lg border border-accent/20 bg-white/95 shadow-sm">
        <div className="grid gap-5 p-5 sm:grid-cols-[110px_minmax(0,1fr)] sm:p-6">
          <div className="resource-course-cover" aria-hidden="true">
            <LibraryBig className="h-10 w-10" />
            <span>LA</span>
          </div>
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-accent"><BookMarked className="h-4 w-4" /> 课程专题</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">电科线性代数资料书架</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">讲义、答疑与自己的整理笔记都先归到这一张课程封面下。下方可以按章节缩小范围，并随时回到相应学习内容。</p>
            <button type="button" onClick={() => setSelectedFilter("all")} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent transition hover:text-ink">浏览全部线性代数资料 <ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>
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
