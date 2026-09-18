"use client";

import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import { getChapterChallenge } from "@/lib/storage";
import type { ChapterChallengeRecord } from "@/lib/types";

export function ChapterChallengeStatus({ courseId, chapterId }: { courseId: string; chapterId: string }) {
  const [record, setRecord] = useState<ChapterChallengeRecord | null>(null);
  useEffect(
    () => setRecord(getChapterChallenge(courseId, chapterId) ?? null),
    [courseId, chapterId]
  );

  return (
    <div className="mt-4 flex items-center gap-3 rounded-md bg-paper px-3 py-3 text-sm">
      <Target className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      {record ? <p className="text-muted">最近一次挑战：<span className="font-semibold text-ink">{record.correctCount}/{record.total}，正确率 {record.accuracy}%</span></p> : <p className="text-muted">完成本章挑战后，会在这里保留最近一次结果。</p>}
    </div>
  );
}
