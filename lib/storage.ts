"use client";

import type { WrongQuestionRecord } from "./types";

const WRONG_QUESTIONS_KEY = "course-review-demo:wrong-questions";
const LAST_LEARNING_KEY = "course-review-demo:last-learning";

export type LastLearningRecord = {
  courseId: string;
  courseTitle: string;
  knowledgePointId: string;
  knowledgeTitle: string;
  href: string;
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
