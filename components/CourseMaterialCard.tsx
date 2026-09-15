import Link from "next/link";
import type { CourseMaterial } from "@/lib/types";

const typeDetails = {
  chapter_handout: {
    label: "章节资料",
    accent: "border-[#b7d8d2] bg-[#eff8f5] text-[#24595d]"
  },
  lecture: {
    label: "答疑讲座",
    accent: "border-[#b9d3e5] bg-[#f0f8fc] text-[#2e6683]"
  },
  textbook: {
    label: "目录校对",
    accent: "border-[#e6cf9f] bg-[#fff9ec] text-[#8b5b19]"
  }
};

const statusDetails = {
  organized: "已整理",
  future: "后续章节",
  internal_reference: "内部校对"
};

export function CourseMaterialCard({ material }: { material: CourseMaterial }) {
  const type = typeDetails[material.type];

  return (
    <article className="relative overflow-hidden rounded-lg border border-line bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
      <div className="absolute inset-x-0 top-0 h-1 bg-accent/70" />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{material.coverage}</p>
          <h2 className="mt-1 text-lg font-semibold leading-7 text-ink">
            {material.title}
          </h2>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <span className={`rounded-md border px-2.5 py-1 text-xs font-medium ${type.accent}`}>
            {type.label}
          </span>
          <span className="rounded-md border border-line bg-paper px-2.5 py-1 text-xs text-muted">
            {statusDetails[material.status]}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted">{material.summary}</p>

      <div className="mt-4">
        <p className="text-sm font-medium text-ink">适合用于</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {material.best_for.map((item) => (
            <span
              key={item}
              className="rounded-md border border-line bg-paper px-2.5 py-1 text-xs text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 border-l-2 border-line pl-3 text-xs leading-5 text-muted">
        整理来源：{material.source_file}
      </p>

      {material.action ? (
        <Link
          href={material.action.href}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
        >
          {material.action.label}
          <span aria-hidden="true" className="text-base leading-none">→</span>
        </Link>
      ) : (
        <p className="mt-5 rounded-md border border-dashed border-line bg-paper/70 px-4 py-3 text-center text-sm text-muted">
          {material.status === "future"
            ? "对应章节尚未上线，资料已先归档。"
            : "仅用于内容校对，不在网页公开展示原文件。"}
        </p>
      )}
    </article>
  );
}
