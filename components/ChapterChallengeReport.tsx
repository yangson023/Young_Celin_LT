"use client";

import Link from "next/link";
import { CircleCheck, CircleHelp } from "lucide-react";
import { FeatureMark } from "@/components/FeatureMark";
import type { Chapter, Course, KnowledgePoint, Question } from "@/lib/types";

export function ChapterChallengeReport({
  course,
  chapter,
  knowledgePoints,
  questions,
  answers
}: {
  course: Course;
  chapter: Chapter;
  knowledgePoints: KnowledgePoint[];
  questions: Question[];
  answers: Record<string, string>;
}) {
  const pointResults = knowledgePoints
    .map((point) => {
      const pointQuestions = questions.filter(
        (question) => question.knowledge_point_id === point.id
      );
      if (!pointQuestions.length) return null;
      const correctCount = pointQuestions.filter(
        (question) => answers[question.id] === question.answer
      ).length;
      return { point, correctCount, total: pointQuestions.length };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const needsReview = pointResults.filter((item) => item.correctCount < item.total);
  const mastered = pointResults.filter((item) => item.correctCount === item.total);

  return (
    <section className="border-y border-line bg-white/75 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <FeatureMark name="challenge" />
          <div>
            <p className="text-sm font-medium text-accent">章节挑战回顾</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">把下一次复习缩小到具体知识点</h2>
            <p className="mt-2 text-sm leading-6 text-muted">本次覆盖 {pointResults.length} 个知识点；全部答对的点可先放下，有失分的点建议优先回看。</p>
          </div>
        </div>
        <Link href={`/courses/${course.id}/chapters/${chapter.id}`} className="w-fit shrink-0 text-sm font-semibold text-accent transition hover:text-ink">返回章节目录</Link>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <div className="border-l-2 border-accent/50 pl-4">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink"><CircleCheck className="h-4 w-4 text-accent" /> 本次掌握</p>
          {mastered.length ? <div className="mt-3 flex flex-wrap gap-2">{mastered.map(({ point }) => <span key={point.id} className="rounded-md bg-accent/10 px-2.5 py-1.5 text-xs font-medium text-accent">{point.title}</span>)}</div> : <p className="mt-2 text-sm text-muted">先别着急，本次还没有全部答对的知识点。</p>}
        </div>
        <div className="border-l-2 border-warning/60 pl-4">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink"><CircleHelp className="h-4 w-4 text-warning" /> 建议回看</p>
          {needsReview.length ? <div className="mt-3 grid gap-2">{needsReview.map(({ point, correctCount, total }) => <Link key={point.id} href={`/courses/${course.id}/knowledge/${point.id}`} className="flex items-center justify-between gap-3 rounded-md bg-paper px-3 py-2 text-sm transition hover:text-accent"><span className="font-medium text-ink">{point.title}</span><span className="shrink-0 text-xs text-muted">{correctCount}/{total} 答对</span></Link>)}</div> : <p className="mt-2 text-sm text-muted">这一轮覆盖到的知识点都已答对。</p>}
        </div>
      </div>
    </section>
  );
}
