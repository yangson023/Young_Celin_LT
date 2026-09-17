"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getLearningProgress, type LearningProgressRecord } from "@/lib/storage";
import type { Chapter, KnowledgePoint } from "@/lib/types";

export function CourseLearningPath({
  courseId,
  chapters,
  knowledgePoints
}: {
  courseId: string;
  chapters: Chapter[];
  knowledgePoints: KnowledgePoint[];
}) {
  const [progress, setProgress] = useState<LearningProgressRecord | null>(null);
  const [expandedChapterIds, setExpandedChapterIds] = useState<string[]>([]);

  useEffect(() => {
    setProgress(getLearningProgress());
  }, []);

  const chapterProgress = useMemo(
    () =>
      chapters.map((chapter) => {
        const points = knowledgePoints.filter(
          (point) => point.chapter_id === chapter.id
        );
        const completedPointCount = points.filter(
          (point) =>
            (progress?.knowledgePoints[point.id]?.completedQuizCount ?? 0) > 0
        ).length;

        return { chapter, points, completedPointCount };
      }),
    [chapters, knowledgePoints, progress]
  );

  const nextPoint = knowledgePoints.find(
    (point) => (progress?.knowledgePoints[point.id]?.completedQuizCount ?? 0) === 0
  );

  function toggleChapter(chapterId: string) {
    setExpandedChapterIds((current) =>
      current.includes(chapterId)
        ? current.filter((id) => id !== chapterId)
        : [...current, chapterId]
    );
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted">可点击学习路线</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">
            {nextPoint ? `下一步：${nextPoint.title}` : "本课程的自测已完成"}
          </h2>
        </div>
        {nextPoint ? (
          <Link
            href={`/courses/${courseId}/knowledge/${nextPoint.id}`}
            className="inline-flex w-fit items-center justify-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            开始下一步
          </Link>
        ) : null}
      </div>

      <div className="mt-5 grid gap-5">
        {chapterProgress.map(({ chapter, points, completedPointCount }) => {
          const isExpanded = expandedChapterIds.includes(chapter.id);
          const nextPointInChapter = points.find(
            (point) =>
              (progress?.knowledgePoints[point.id]?.completedQuizCount ?? 0) === 0
          );
          const percentage = points.length
            ? Math.round((completedPointCount / points.length) * 100)
            : 0;
          const status =
            completedPointCount === points.length && points.length > 0
              ? "已完成"
              : completedPointCount > 0
                ? "已开始"
                : "待学习";

          return (
            <div key={chapter.id} className="border-t border-line pt-5 first:border-t-0 first:pt-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => toggleChapter(chapter.id)}
                  aria-expanded={isExpanded}
                  className="group flex min-w-0 flex-1 items-start gap-3 text-left"
                >
                  <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-accent transition-transform ${isExpanded ? "rotate-180" : ""}`} aria-hidden="true" />
                  <span>
                    <span className="block text-xs font-medium text-muted">第 {chapter.order} 章 · {status}</span>
                    <span className="mt-1 block font-semibold text-ink group-hover:text-accent">{chapter.title}</span>
                    <span className="mt-1 block text-sm text-muted">{points.length} 个知识点，已完成 {completedPointCount} 个知识点自测</span>
                  </span>
                </button>
                <Link href={nextPointInChapter ? `/courses/${courseId}/knowledge/${nextPointInChapter.id}` : `/courses/${courseId}/chapters/${chapter.id}`} className="w-fit shrink-0 text-sm font-semibold text-accent transition hover:text-ink">
                  {completedPointCount === points.length && points.length > 0 ? "查看本章" : "继续本章"}
                </Link>
              </div>
              {isExpanded ? (
                <>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper" aria-label={`${chapter.title} 自测完成度 ${percentage}%`}>
                    <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${percentage}%` }} />
                  </div>
                  <div className="relative mt-5 grid gap-3 pl-7">
                    <div className="absolute bottom-4 left-2 top-4 w-px bg-line" />
                    {points.map((point) => {
                  const isCompleted =
                    (progress?.knowledgePoints[point.id]?.completedQuizCount ?? 0) > 0;
                  const isNext = nextPoint?.id === point.id;
                  const pointStatus = isCompleted
                    ? "已自测"
                    : isNext
                      ? "下一步"
                      : "待学习";

                  return (
                    <Link
                      key={point.id}
                      href={`/courses/${courseId}/knowledge/${point.id}`}
                      aria-current={isNext ? "step" : undefined}
                      className="group relative grid gap-1 rounded-md py-1 pr-2 transition hover:bg-paper"
                    >
                      <span
                        className={[
                          "absolute -left-7 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-white text-[10px] font-bold",
                          isCompleted
                            ? "border-accent text-accent"
                            : isNext
                              ? "border-accent bg-accent text-white"
                              : "border-line text-muted"
                        ].join(" ")}
                      >
                        {isCompleted ? "✓" : isNext ? "→" : ""}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold text-ink group-hover:text-accent">
                          {point.section_title ? `${point.section_title} · ` : ""}
                          {point.title}
                        </span>
                        <span
                          className={[
                            "text-xs font-medium",
                            isNext ? "text-accent" : "text-muted"
                          ].join(" ")}
                        >
                          {pointStatus}
                        </span>
                      </div>
                      <span className="text-xs leading-5 text-muted">
                        {point.one_sentence}
                      </span>
                    </Link>
                  );
                    })}
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
