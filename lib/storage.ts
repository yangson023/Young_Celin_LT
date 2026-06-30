"use client";

import type { WrongQuestionRecord } from "./types";

const WRONG_QUESTIONS_KEY = "course-review-demo:wrong-questions";
const LAST_LEARNING_KEY = "course-review-demo:last-learning";
const LEARNING_PROGRESS_KEY = "course-review-demo:learning-progress";

export type LastLearningRecord = {
  courseId: string;
  courseTitle: string;
  knowledgePointId: string;
  knowledgeTitle: string;
  href: string;
};

export type CourseProgressRecord = {
  completedQuizCount: number;
  answeredCount: number;
  correctCount: number;
};

export type LearningProgressRecord = {
  completedQuizCount: number;
  answeredCount: number;
  correctCount: number;
  courses: Record<string, CourseProgressRecord>;
};

export type QuizProgressInput = {
  courseId: string;
  questionCount: number;
  correctCount: number;
};

const emptyProgress: LearningProgressRecord = {
  completedQuizCount: 0,
  answeredCount: 0,
  correctCount: 0,
  courses: {}
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getWrongQuestions() {
  return readJson<WrongQuestionRecord[]>(WRONG_QUESTIONS_KEY, []);
}

export function saveWrongQuestions(records: WrongQuestionRecord[]) {
  const current = getWrongQuestions();
  const next = [...current];

  records.forEach((record) => {
    const existingIndex = next.findIndex(
      (item) => item.questionId === record.questionId
    );

    if (existingIndex >= 0) {
      next[existingIndex] = record;
    } else {
      next.unshift(record);
    }
  });

  writeJson(WRONG_QUESTIONS_KEY, next);
}

export function clearWrongQuestions() {
  writeJson(WRONG_QUESTIONS_KEY, []);
}

export function getLastLearning() {
  return readJson<LastLearningRecord | null>(LAST_LEARNING_KEY, null);
}

export function saveLastLearning(record: LastLearningRecord) {
  writeJson(LAST_LEARNING_KEY, record);
}

export function getLearningProgress() {
  return readJson<LearningProgressRecord>(
    LEARNING_PROGRESS_KEY,
    emptyProgress
  );
}

export function recordQuizProgress(input: QuizProgressInput) {
  const current = getLearningProgress();
  const courseProgress = current.courses[input.courseId] ?? {
    completedQuizCount: 0,
    answeredCount: 0,
    correctCount: 0
  };

  const next: LearningProgressRecord = {
    completedQuizCount: current.completedQuizCount + 1,
    answeredCount: current.answeredCount + input.questionCount,
    correctCount: current.correctCount + input.correctCount,
    courses: {
      ...current.courses,
      [input.courseId]: {
        completedQuizCount: courseProgress.completedQuizCount + 1,
        answeredCount: courseProgress.answeredCount + input.questionCount,
        correctCount: courseProgress.correctCount + input.correctCount
      }
    }
  };

  writeJson(LEARNING_PROGRESS_KEY, next);
  return next;
}

export function getAccuracy(correctCount: number, answeredCount: number) {
  return answeredCount === 0
    ? 0
    : Math.round((correctCount / answeredCount) * 100);
}
