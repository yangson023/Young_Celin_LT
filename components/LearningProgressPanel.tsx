"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getAccuracy,
  getLastLearning,
  getLearningProgress,
  getWrongQuestions,
  type LastLearningRecord,
  type LearningProgressRecord
} from "@/lib/storage";

export function LearningProgressPanel({
  courseId,
  title = "学习进度"
}: {
  courseId?: string;
  title?: string;
}) {
  const [progress, setProgress] = useState<LearningProgressRecord | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [lastLearning, setLastLearning] = useState<LastLearningRecord | null>(
    null
  );

  useEffect(() => {
    const allProgress = getLearningProgress();
    setProgress(allProgress);
    setWrongCount(
      courseId
        ? getWrongQuestions().filter((record) => record.courseId === courseId)
            .length
        : getWrongQuestions().length
    );
    setLastLearning(getLastLearning());
  }, [courseId]);

  const currentProgress = courseId
    ? progress?.courses[courseId] ?? {
        completedQuizCount: 0,
        answeredCount: 0,
        correctCount: 0
      }
    : progress;

  const completedQuizCount = currentProgress?.completedQuizCount ?? 0;
  const answeredCount = currentProgress?.answeredCount ?? 0;
  const correctCount = currentProgress?.correctCount ?? 0;
  const accuracy = getAccuracy(correctCount, answeredCount);
  const hasProgress = completedQuizCount > 0 || wrongCount > 0;
  const showLastLearning =
    lastLearning && (!courseId || lastLearning.courseId === courseId);

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">
            {hasProgress ? "继续保持这个节奏" : "完成一次自测后会出现记录"}
          </h2>
        </div>
        {showLastLearning ? (
          <Link
            href={lastLearning.href}
            className="rounded-md border border-line px-3 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
          >
            最近学习
          </Link>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ProgressNumber label="自测次数" value={`${completedQuizCount} 次`} />
        <ProgressNumber label="已答题" value={`${answeredCount} 道`} />
        <ProgressNumber label="正确率" value={`${accuracy}%`} />
        <ProgressNumber label="错题" value={`${wrongCount} 道`} />
      </div>

      {showLastLearning ? (
        <p className="mt-4 rounded-md bg-paper p-3 text-sm leading-6 text-muted">
          最近学习：{lastLearning.courseTitle} · {lastLearning.knowledgeTitle}
        </p>
      ) : (
        <p className="mt-4 rounded-md bg-paper p-3 text-sm leading-6 text-muted">
          先选一个知识点完成自测，系统会在本机浏览器里记录自测次数、正确率和错题数量。
        </p>
      )}
    </section>
  );
}

function ProgressNumber({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-paper px-3 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}
