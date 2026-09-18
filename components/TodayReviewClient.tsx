"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FeatureMark } from "@/components/FeatureMark";
import { QuestionCard } from "@/components/QuestionCard";
import { getQuestionsByKnowledgePointId } from "@/lib/data";
import { applyWrongQuestionReview, getDueWrongQuestions } from "@/lib/storage";
import type { Question, WrongQuestionRecord } from "@/lib/types";

type ReviewQuestion = { record: WrongQuestionRecord; question: Question };

export function TodayReviewClient() {
  const [entries, setEntries] = useState<ReviewQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState<{ masteredCount: number; scheduledCount: number; resetCount: number } | null>(null);

  useEffect(() => {
    const nextEntries = getDueWrongQuestions().flatMap((record) => {
      const question = getQuestionsByKnowledgePointId(record.courseId, record.knowledgePointId).find(
        (item) => item.id === record.questionId
      );
      return question ? [{ record, question }] : [];
    });
    setEntries(nextEntries);
  }, []);

  const allAnswered = entries.length > 0 && entries.every((entry) => answers[entry.question.id]);
  const correctCount = useMemo(() => entries.filter((entry) => answers[entry.question.id] === entry.question.answer).length, [answers, entries]);

  function finishReview() {
    if (!allAnswered) return;
    const results = Object.fromEntries(entries.map((entry) => [entry.question.id, answers[entry.question.id] === entry.question.answer]));
    const nextSummary = applyWrongQuestionReview(results);
    setSummary(nextSummary);
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/" className="text-sm font-medium text-accent">返回首页</Link>
      <section className="mt-4 rounded-lg border border-line bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-3">
          <FeatureMark name="today-review" />
          <div>
            <p className="text-sm font-medium text-accent">今日复习</p>
            <h1 className="mt-1 text-3xl font-semibold text-ink">把今天该回看的题做完</h1>
            <p className="mt-3 text-sm leading-6 text-muted">每道题答对后会进入下一次复习安排；再次答错则留在今日回顾，直到概念真正稳定。</p>
          </div>
        </div>
      </section>

      {!entries.length ? <section className="mt-6 rounded-lg border border-dashed border-line bg-white/80 px-5 py-12 text-center"><h2 className="text-xl font-semibold text-ink">今日复习已经清空</h2><p className="mt-2 text-sm text-muted">完成自测后，新错题会自动进入这里。</p><Link href="/courses/uestc-linear-algebra" className="mt-5 inline-flex rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white">继续学习</Link></section> : null}

      {entries.length ? <div className="mt-6 grid gap-4">{entries.map(({ record, question }, index) => <div key={question.id}><p className="mb-2 text-xs font-medium text-muted">{record.courseTitle} · {record.knowledgeTitle}</p><QuestionCard question={question} index={index} selectedAnswer={answers[question.id]} submitted={submitted} onSelect={(answer) => setAnswers((current) => ({ ...current, [question.id]: answer }))} /></div>)}</div> : null}

      {summary ? <section className="mt-6 rounded-lg border border-line bg-white p-5 shadow-sm"><p className="text-sm font-medium text-muted">本轮复习结果</p><h2 className="mt-1 text-2xl font-semibold text-ink">答对 {correctCount}/{entries.length} 道</h2><p className="mt-3 text-sm leading-6 text-muted">{summary.masteredCount ? `有 ${summary.masteredCount} 道题完成了最后一次巩固。` : ""}{summary.scheduledCount ? ` ${summary.scheduledCount} 道题已安排到下一次复习。` : ""}{summary.resetCount ? ` ${summary.resetCount} 道题仍留在今日回顾。` : ""}</p><Link href="/wrong" className="mt-4 inline-flex rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white">查看错题本</Link></section> : null}

      {entries.length && !submitted ? <div className="mt-6 flex items-center justify-between gap-4"><p className="text-sm text-muted">已作答 {Object.keys(answers).length}/{entries.length}</p><button type="button" onClick={finishReview} disabled={!allAnswered} className="rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-muted">完成今日复习</button></div> : null}
    </div>
  );
}
