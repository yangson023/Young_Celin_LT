"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MathText } from "@/components/MathText";
import {
  clearWrongQuestions,
  getWrongQuestions
} from "@/lib/storage";
import type { WrongQuestionRecord } from "@/lib/types";

type KnowledgePointGroup = {
  knowledgePointId: string;
  knowledgeTitle: string;
  records: WrongQuestionRecord[];
};

type ChapterGroup = {
  chapterTitle: string;
  knowledgePoints: KnowledgePointGroup[];
};

type CourseGroup = {
  courseId: string;
  courseTitle: string;
  chapters: ChapterGroup[];
};

function groupWrongQuestions(records: WrongQuestionRecord[]) {
  return records.reduce<CourseGroup[]>((courses, record) => {
    const course = courses.find((item) => item.courseId === record.courseId);
    const chapterTitle = record.chapterTitle ?? "暂未标记章节";
    const currentCourse = course ?? {
      courseId: record.courseId,
      courseTitle: record.courseTitle,
      chapters: []
    };
    const chapter = currentCourse.chapters.find(
      (item) => item.chapterTitle === chapterTitle
    );
    const currentChapter = chapter ?? {
      chapterTitle,
      knowledgePoints: []
    };
    const knowledgePoint = currentChapter.knowledgePoints.find(
      (item) => item.knowledgePointId === record.knowledgePointId
    );

    if (knowledgePoint) {
      knowledgePoint.records.push(record);
    } else {
      currentChapter.knowledgePoints.push({
        knowledgePointId: record.knowledgePointId,
        knowledgeTitle: record.knowledgeTitle,
        records: [record]
      });
    }

    if (!chapter) {
      currentCourse.chapters.push(currentChapter);
    }

    if (!course) {
      courses.push(currentCourse);
    }

    return courses;
  }, []);
}

export function WrongQuestionsClient() {
  const [records, setRecords] = useState<WrongQuestionRecord[]>([]);

  useEffect(() => {
    setRecords(getWrongQuestions());
  }, []);

  function handleClear() {
    clearWrongQuestions();
    setRecords([]);
  }

  const courseGroups = groupWrongQuestions(records);

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
        <div className="grid gap-8">
          {courseGroups.map((course) => (
            <section key={course.courseId}>
              <h2 className="text-xl font-semibold text-ink">{course.courseTitle}</h2>
              <div className="mt-4 grid gap-6">
                {course.chapters.map((chapter) => (
                  <div key={chapter.chapterTitle}>
                    <p className="text-sm font-medium text-muted">
                      {chapter.chapterTitle}
                    </p>
                    <div className="mt-3 grid gap-4">
                      {chapter.knowledgePoints.map((knowledgePoint) => (
                        <article
                          key={knowledgePoint.knowledgePointId}
                          className="rounded-lg border border-line bg-white p-5 shadow-sm"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3 className="text-base font-semibold text-ink">
                                {knowledgePoint.knowledgeTitle}
                              </h3>
                              <p className="mt-1 text-sm text-muted">
                                {knowledgePoint.records.length} 道待复习错题
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Link
                                href={`/wrong/retry/${course.courseId}/${knowledgePoint.knowledgePointId}`}
                                className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white transition hover:bg-accent/90"
                              >
                                错题再练
                              </Link>
                              <Link
                                href={`/courses/${course.courseId}/quiz/${knowledgePoint.knowledgePointId}`}
                                className="rounded-md border border-line px-3 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
                              >
                                完整自测
                              </Link>
                            </div>
                          </div>

                          <div className="mt-5 grid gap-4">
                            {knowledgePoint.records.map((record) => (
                              <div key={record.questionId} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                                <h4 className="text-sm font-semibold leading-6 text-ink">
                                  <MathText>{record.stem}</MathText>
                                </h4>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                                    你的答案：{record.userAnswer}
                                  </div>
                                  <div className="rounded-md bg-accent/10 p-3 text-sm text-accent">
                                    正确答案：{record.correctAnswer}
                                  </div>
                                </div>
                                <p className="mt-3 rounded-md bg-paper p-3 text-sm leading-6 text-muted">
                                  <MathText>{record.explanation}</MathText>
                                </p>
                              </div>
                            ))}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
