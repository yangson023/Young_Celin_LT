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
import type { Chapter, Course, KnowledgePoint, Question } from "@/lib/types";
import { scoreQuiz, type QuizAnswerMap } from "@/lib/quiz";

export function QuizClient({
  course,
  point,
  nextPoint,
  chapter,
  knowledgePoints = [],
  chapterTitle,
  questions
}: {
  course: Course;
  point?: KnowledgePoint;
  nextPoint?: KnowledgePoint;
  chapter?: Chapter;
  knowledgePoints?: KnowledgePoint[];
  chapterTitle?: string;
  questions: Question[];
}) {
  const [answers, setAnswers] = useState<QuizAnswerMap>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => scoreQuiz(questions, answers), [answers, questions]);
  const allAnswered = questions.every((question) => answers[question.id]);
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;
  const isChapterQuiz = Boolean(chapter);
  const quizTitle = chapter ? `${chapter.title} 混合自测` : `${point!.title} 自测`;
  const backHref = chapter
    ? `/courses/${course.id}/chapters/${chapter.id}`
    : `/courses/${course.id}/knowledge/${point!.id}`;
  const backLabel = chapter ? "返回章节" : "返回知识点";
  const continueHref = nextPoint
    ? `/courses/${course.id}/knowledge/${nextPoint.id}`
    : chapter
      ? `/courses/${course.id}/chapters/${chapter.id}`
      : `/courses/${course.id}`;
  const continueLabel = nextPoint
    ? `继续：${nextPoint.title}`
    : chapter
      ? "回到章节"
      : "回到课程";

  function handleFinishQuiz() {
    if (!allAnswered) {
      return;
    }

    const wrongRecords = questions
      .filter((question) => answers[question.id] !== question.answer)
      .map((question) => {
        const questionPoint = point ?? knowledgePoints.find(
          (item) => item.id === question.knowledge_point_id
        );

        return {
          questionId: question.id,
          courseId: course.id,
          courseTitle: course.title,
          chapterTitle,
          knowledgePointId: questionPoint?.id ?? question.knowledge_point_id,
          knowledgeTitle: questionPoint?.title ?? "未标记知识点",
          stem: question.stem,
          userAnswer: answers[question.id],
          correctAnswer: question.answer,
          explanation: question.explanation,
          createdAt: new Date().toISOString()
        };
      });

    saveWrongQuestions(wrongRecords);
    recordQuizProgress({
      courseId: course.id,
      knowledgePointId: point?.id,
      questionCount: result.total,
      correctCount: result.correctCount
    });
    if (nextPoint) {
      saveLastLearning({
        courseId: course.id,
        courseTitle: course.title,
        knowledgePointId: nextPoint.id,
        knowledgeTitle: nextPoint.title,
        href: `/courses/${course.id}/knowledge/${nextPoint.id}`
      });
    } else if (point) {
      saveLastLearning({
        courseId: course.id,
        courseTitle: course.title,
        knowledgePointId: point.id,
        knowledgeTitle: point.title,
        href: `/courses/${course.id}/knowledge/${point.id}`
      });
    }
    setSubmitted(true);
  }

  function handleCheckAnswer() {
    if (!currentAnswer) {
      return;
    }

    setAnswerChecked(true);
  }

  function handleNextQuestion() {
    setCurrentQuestionIndex((current) => current + 1);
    setAnswerChecked(false);
  }

  if (questions.length === 0) {
    return (
      <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm text-muted">{course.title}</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">
          {quizTitle} 暂无题目
        </h1>
        <p className="mt-3 text-sm text-muted">
          这个知识点还没有录入题目，可以先返回知识点详情。
        </p>
        <Link
          href={backHref}
          className="mt-5 inline-flex rounded-md border border-line px-4 py-3 text-sm font-semibold text-ink"
        >
          {backLabel}
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6">
      <Link
        href={backHref}
        className="text-sm font-medium text-accent"
      >
        {backLabel}
      </Link>

      <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm text-muted">{course.title}</p>
        <h1 className="mt-1 text-3xl font-semibold text-ink">
          {quizTitle}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          {isChapterQuiz
            ? "本轮从本章不同知识点中选取题目。每题确认后立即查看答案与解析，错题仍按原知识点保存。"
            : "每题确认后会立即显示正确答案、选项判断和完整解析；完成本轮后，错题会保存在当前浏览器。"}
        </p>
      </section>

      {submitted ? (
        <ResultSummary
          correctCount={result.correctCount}
          total={result.total}
          accuracy={result.accuracy}
        />
      ) : null}

      {submitted ? (
        <section className="grid gap-4">
          <div>
            <p className="text-sm font-medium text-muted">答题回顾</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">逐题查看答案与解析</h2>
          </div>
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              selectedAnswer={answers[question.id]}
              submitted
              onSelect={() => undefined}
            />
          ))}
        </section>
      ) : (
        <QuestionCard
          question={currentQuestion}
          index={currentQuestionIndex}
          selectedAnswer={currentAnswer}
          submitted={answerChecked}
          onSelect={(answer) =>
            setAnswers((current) => ({
              ...current,
              [currentQuestion.id]: answer
            }))
          }
        />
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {submitted
            ? `已完成 ${questions.length}/${questions.length}`
            : `第 ${currentQuestionIndex + 1}/${questions.length} 题 · 已完成 ${currentQuestionIndex} 题`}
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
              href={continueHref}
              className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              {continueLabel}
            </Link>
          </div>
        ) : answerChecked ? (
          <button
            type="button"
            onClick={
              currentQuestionIndex === questions.length - 1
                ? handleFinishQuiz
                : handleNextQuestion
            }
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            {currentQuestionIndex === questions.length - 1
              ? "查看本次结果"
              : "确认后进入下一题"}
          </button>
        ) : (
          <button
            type="button"
            disabled={!currentAnswer}
            onClick={handleCheckAnswer}
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-muted"
          >
            确认答案并查看解析
          </button>
        )}
      </div>
    </div>
  );
}
