"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getWrongQuestions } from "@/lib/storage";

type WeakPoint = {
  courseId: string;
  courseTitle: string;
  knowledgePointId: string;
  knowledgeTitle: string;
  wrongCount: number;
};

export function WeakPointPanel() {
  const [weakPoints, setWeakPoints] = useState<WeakPoint[]>([]);

  useEffect(() => {
    const groupedPoints = new Map<string, WeakPoint>();

    getWrongQuestions().forEach((record) => {
      const key = `${record.courseId}:${record.knowledgePointId}`;
      const current = groupedPoints.get(key);

      if (current) {
        current.wrongCount += 1;
        return;
      }

      groupedPoints.set(key, {
        courseId: record.courseId,
        courseTitle: record.courseTitle,
        knowledgePointId: record.knowledgePointId,
        knowledgeTitle: record.knowledgeTitle,
        wrongCount: 1
      });
    });

    setWeakPoints(
      [...groupedPoints.values()]
        .sort(
          (a, b) =>
            b.wrongCount - a.wrongCount ||
            a.knowledgeTitle.localeCompare(b.knowledgeTitle)
        )
        .slice(0, 3)
    );
  }, []);

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium text-muted">优先复习</p>
        <h2 className="mt-1 text-xl font-semibold text-ink">
          {weakPoints.length > 0 ? "从当前错题开始补强" : "暂时没有待复习的错题"}
        </h2>
      </div>

      {weakPoints.length > 0 ? (
        <div className="mt-4 grid divide-y divide-line border-y border-line">
          {weakPoints.map((point) => (
            <Link
              key={`${point.courseId}:${point.knowledgePointId}`}
              href={`/courses/${point.courseId}/knowledge/${point.knowledgePointId}`}
              className="flex items-center justify-between gap-4 py-3 text-sm transition hover:text-accent"
            >
              <span>
                <span className="font-semibold text-ink">{point.knowledgeTitle}</span>
                <span className="ml-2 text-xs text-muted">{point.courseTitle}</span>
              </span>
              <span className="shrink-0 font-medium text-accent">
                {point.wrongCount} 题待复习
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-muted">
          完成一次自测后，系统会根据错题本提示优先复习的知识点。
        </p>
      )}
    </section>
  );
}
