"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { getQuestionsByKnowledgePointId } from "@/lib/data";
import { getWrongQuestions, removeWrongQuestions } from "@/lib/storage";
import type { Course, KnowledgePoint, Question } from "@/lib/types";
import { scoreQuiz, type QuizAnswerMap } from "@/lib/quiz";

export function WrongQuestionRetryClient({
  course,
  point
}: {
  course: Course;
  point: KnowledgePoint;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<QuizAnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const wrongQuestionIds = new Set(
      getWrongQuestions()
        .filter(
          (record) =>
            record.courseId === course.id && record.knowledgePointId === point.id
        )
        .map((record) => record.questionId)
    );
    const retryQuestions = getQuestionsByKnowledgePointId(course.id, point.id).filter(
      (question) => wrongQuestionIds.has(question.id)
    );

    setQuestions(retryQuestions);
    setLoaded(true);
  }, [course.id, point.id]);

  const result = useMemo(() => scoreQuiz(questions, answers), [answers, questions]);
  const allAnswered = questions.length > 0 && questions.every(
    (question) => answers[question.id]
  );

  function handleSubmit() {
    if (!allAnswered) {
      return;
    }

    const correctedQuestionIds = questions
      .filter((question) => answers[question.id] === question.answer)
      .map((question) => question.id);

    removeWrongQuestions(correctedQuestionIds);
    setResolvedCount(correctedQuestionIds.length);
    setSubmitted(true);
  }

  if (!loaded) {
    return <p className="text-sm text-muted">正在读取本机错题…</p>;
  }

  if (questions.length === 0) {
    return (
      <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-ink">暂时没有可再练的错题</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          可能这组错题已经练对，或题库内容已更新。可以回到错题本继续复习。
        </p>
        <Link
          href="/wrong"
          className="mt-5 inline-flex rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white"
        >
          返回错题本
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6">
      <Link href="/wrong" className="text-sm font-medium text-accent">
        返回错题本
      </Link>

      <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm text-muted">{course.title}</p>
        <h1 className="mt-1 text-3xl font-semibold text-ink">
          {point.title} 错题再练
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          只练本知识点此前答错的题。重新答对后，题目会从错题本移除。
        </p>
      </section>

      {submitted ? (
        <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-muted">本轮错题再练</p>
          <h2 className="mt-1 text-2xl font-semibold text-ink">
            答对 {result.correctCount}/{result.total} 道
          </h2>
          <p className="mt-3 rounded-md bg-paper p-3 text-sm leading-6 text-muted">
            本次已移除 {resolvedCount} 道已掌握错题；仍答错的题会继续保留在错题本。
          </p>
        </section>
      ) : null}

      <div className="grid gap-4">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            selectedAnswer={answers[question.id]}
            submitted={submitted}
            onSelect={(answer) =>
              setAnswers((current) => ({ ...current, [question.id]: answer }))
            }
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          已作答 {Object.keys(answers).length}/{questions.length}
        </p>
        {submitted ? (
          <Link
            href="/wrong"
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            返回错题本
          </Link>
        ) : (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-muted"
          >
            提交再练结果
          </button>
        )}
      </div>
    </div>
  );
}
