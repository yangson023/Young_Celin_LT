"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultSummary } from "@/components/ResultSummary";
import {
  recordQuizProgress,
  saveLastLearning,
  saveWrongQuestions
} from "@/lib/storage";
import type { Course, KnowledgePoint, Question } from "@/lib/types";
import { scoreQuiz, type QuizAnswerMap } from "@/lib/quiz";

export function QuizClient({
  course,
  point,
  questions
}: {
  course: Course;
  point: KnowledgePoint;
  questions: Question[];
}) {
  const [answers, setAnswers] = useState<QuizAnswerMap>({});
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => scoreQuiz(questions, answers), [answers, questions]);
  const allAnswered = questions.every((question) => answers[question.id]);

  function handleSubmit() {
    if (!allAnswered) {
      return;
    }

    const wrongRecords = questions
      .filter((question) => answers[question.id] !== question.answer)
      .map((question) => ({
        questionId: question.id,
        courseId: course.id,
        courseTitle: course.title,
        knowledgePointId: point.id,
        knowledgeTitle: point.title,
        stem: question.stem,
        userAnswer: answers[question.id],
        correctAnswer: question.answer,
        explanation: question.explanation,
        createdAt: new Date().toISOString()
      }));

    saveWrongQuestions(wrongRecords);
    recordQuizProgress({
      courseId: course.id,
      questionCount: result.total,
      correctCount: result.correctCount
    });
    saveLastLearning({
      courseId: course.id,
      courseTitle: course.title,
      knowledgePointId: point.id,
      knowledgeTitle: point.title,
      href: `/courses/${course.id}/knowledge/${point.id}`
    });
    setSubmitted(true);
  }

  if (questions.length === 0) {
    return (
      <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm text-muted">{course.title}</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">
          {point.title} 暂无题目
        </h1>
        <p className="mt-3 text-sm text-muted">
          这个知识点还没有录入题目，可以先返回知识点详情。
        </p>
        <Link
          href={`/courses/${course.id}/knowledge/${point.id}`}
          className="mt-5 inline-flex rounded-md border border-line px-4 py-3 text-sm font-semibold text-ink"
        >
          返回知识点
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6">
      <Link
        href={`/courses/${course.id}/knowledge/${point.id}`}
        className="text-sm font-medium text-accent"
      >
        返回知识点
      </Link>

      <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm text-muted">{course.title}</p>
        <h1 className="mt-1 text-3xl font-semibold text-ink">
          {point.title} 自测
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          先完成所有题目再提交。提交后会显示正确率、答案和解析，错题会保存在当前浏览器。
        </p>
      </section>

      {submitted ? (
        <ResultSummary
          correctCount={result.correctCount}
          total={result.total}
          accuracy={result.accuracy}
        />
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
              setAnswers((current) => ({
                ...current,
                [question.id]: answer
              }))
            }
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          已作答 {Object.keys(answers).length}/{questions.length}
        </p>
        {submitted ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/wrong"
              className="inline-flex items-center justify-center rounded-md border border-line px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              查看错题
            </Link>
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              回到课程
            </Link>
          </div>
        ) : (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-muted"
          >
            提交并查看解析
          </button>
        )}
      </div>
    </div>
  );
}
