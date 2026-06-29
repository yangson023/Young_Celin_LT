"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearWrongQuestions,
  getWrongQuestions
} from "@/lib/storage";
import type { WrongQuestionRecord } from "@/lib/types";

export function WrongQuestionsClient() {
  const [records, setRecords] = useState<WrongQuestionRecord[]>([]);

  useEffect(() => {
    setRecords(getWrongQuestions());
  }, []);

  function handleClear() {
    clearWrongQuestions();
    setRecords([]);
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted">错题本</p>
          <h1 className="mt-1 text-3xl font-semibold text-ink">
            当前浏览器保存了 {records.length} 道错题
          </h1>
        </div>
        <button
          type="button"
          onClick={handleClear}
          disabled={records.length === 0}
          className="inline-flex items-center justify-center rounded-md border border-line px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:text-muted"
        >
          清空错题
        </button>
      </div>

      {records.length === 0 ? (
        <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-ink">还没有错题</h2>
          <p className="mt-2 text-sm text-muted">
            去完成一次自测后，做错的题会出现在这里。
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white"
          >
            返回首页
          </Link>
        </section>
      ) : (
        <div className="grid gap-4">
          {records.map((record) => (
            <article
              key={record.questionId}
              className="rounded-lg border border-line bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm text-muted">
                    {record.courseTitle} · {record.knowledgeTitle}
                  </p>
                  <h2 className="mt-2 text-base font-semibold leading-7 text-ink">
                    {record.stem}
                  </h2>
                </div>
                <Link
                  href={`/courses/${record.courseId}/quiz/${record.knowledgePointId}`}
                  className="rounded-md border border-line px-3 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
                >
                  再练一次
                </Link>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                  你的答案：{record.userAnswer}
                </div>
                <div className="rounded-md bg-accent/10 p-3 text-sm text-accent">
                  正确答案：{record.correctAnswer}
                </div>
              </div>

              <p className="mt-4 rounded-md bg-paper p-4 text-sm leading-6 text-muted">
                {record.explanation}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
