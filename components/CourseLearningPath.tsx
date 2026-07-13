"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted">章节学习路径</p>
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

      <div className="mt-5 grid gap-4">
        {chapterProgress.map(({ chapter, points, completedPointCount }) => {
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
            <div key={chapter.id} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium text-muted">第 {chapter.order} 章 · {status}</p>
                  <h3 className="mt-1 font-semibold text-ink">{chapter.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {points.length} 个知识点，已完成 {completedPointCount} 个知识点自测
                  </p>
                </div>
                <Link
                  href={
                    nextPointInChapter
                      ? `/courses/${courseId}/knowledge/${nextPointInChapter.id}`
                      : `/courses/${courseId}/chapters/${chapter.id}`
                  }
                  className="text-sm font-semibold text-accent transition hover:text-ink"
                >
                  {completedPointCount === points.length && points.length > 0
                    ? "查看本章"
                    : "继续本章"}
                </Link>
              </div>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-paper"
                aria-label={`${chapter.title} 自测完成度 ${percentage}%`}
              >
                <div
                  className="h-full rounded-full bg-accent transition-[width]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
