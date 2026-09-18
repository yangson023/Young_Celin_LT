"use client";

import type { ChapterChallengeRecord, WrongQuestionRecord } from "./types";

const WRONG_QUESTIONS_KEY = "course-review-demo:wrong-questions";
const LAST_LEARNING_KEY = "course-review-demo:last-learning";
const LEARNING_PROGRESS_KEY = "course-review-demo:learning-progress";
const ONBOARDING_DISMISSED_KEY = "course-review-demo:onboarding-dismissed";
const MEMOS_KEY = "course-review-demo:memos";
const MATERIAL_SUBMISSIONS_KEY = "course-review-demo:material-submissions";
const MEMO_REMINDERS_KEY = "course-review-demo:memo-reminders";
const CHAPTER_CHALLENGES_KEY = "course-review-demo:chapter-challenges";

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

export type KnowledgePointProgressRecord = {
  completedQuizCount: number;
};

export type LearningProgressRecord = {
  completedQuizCount: number;
  answeredCount: number;
  correctCount: number;
  courses: Record<string, CourseProgressRecord>;
  knowledgePoints: Record<string, KnowledgePointProgressRecord>;
};

export type QuizProgressInput = {
  courseId: string;
  knowledgePointId?: string;
  questionCount: number;
  correctCount: number;
};

export type MemoRecord = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  completed: boolean;
};

export type MaterialSubmissionRecord = {
  id: string;
  title: string;
  note: string;
  fileName: string;
  createdAt: string;
  status: "pending_review";
};

const emptyProgress: LearningProgressRecord = {
  completedQuizCount: 0,
  answeredCount: 0,
  correctCount: 0,
  courses: {},
  knowledgePoints: {}
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

    const reviewRecord: WrongQuestionRecord = {
      ...record,
      reviewStage: 0,
      nextReviewAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      next[existingIndex] = reviewRecord;
    } else {
      next.unshift(reviewRecord);
    }
  });

  writeJson(WRONG_QUESTIONS_KEY, next);
}

export function getDueWrongQuestions(now = new Date()) {
  return getWrongQuestions().filter((record) => {
    const nextReviewAt = record.nextReviewAt ?? record.createdAt;
    return new Date(nextReviewAt).getTime() <= now.getTime();
  });
}

export function applyWrongQuestionReview(
  results: Record<string, boolean>
) {
  const now = new Date();
  let masteredCount = 0;
  let scheduledCount = 0;
  let resetCount = 0;

  const next = getWrongQuestions().flatMap((record) => {
    const isCorrect = results[record.questionId];
    if (isCorrect === undefined) {
      return [record];
    }

    if (!isCorrect) {
      resetCount += 1;
      return [{
        ...record,
        reviewStage: 0,
        nextReviewAt: now.toISOString(),
        lastReviewedAt: now.toISOString()
      }];
    }

    const currentStage = record.reviewStage ?? 0;
    if (currentStage >= 2) {
      masteredCount += 1;
      return [];
    }

    const nextStage = currentStage + 1;
    const delayDays = nextStage === 1 ? 3 : 7;
    const nextReviewAt = new Date(now);
    nextReviewAt.setDate(nextReviewAt.getDate() + delayDays);
    scheduledCount += 1;
    return [{
      ...record,
      reviewStage: nextStage,
      nextReviewAt: nextReviewAt.toISOString(),
      lastReviewedAt: now.toISOString()
    }];
  });

  writeJson(WRONG_QUESTIONS_KEY, next);
  return { records: next, masteredCount, scheduledCount, resetCount };
}

export function clearWrongQuestions() {
  writeJson(WRONG_QUESTIONS_KEY, []);
}

export function removeWrongQuestions(questionIds: string[]) {
  const questionIdSet = new Set(questionIds);
  const next = getWrongQuestions().filter(
    (record) => !questionIdSet.has(record.questionId)
  );

  writeJson(WRONG_QUESTIONS_KEY, next);
  return next;
}

export function getLastLearning() {
  return readJson<LastLearningRecord | null>(LAST_LEARNING_KEY, null);
}

export function saveLastLearning(record: LastLearningRecord) {
  writeJson(LAST_LEARNING_KEY, record);
}

export function hasDismissedOnboarding() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.localStorage.getItem(ONBOARDING_DISMISSED_KEY) === "true";
}

export function dismissOnboarding() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ONBOARDING_DISMISSED_KEY, "true");
}

export function getLearningProgress() {
  const progress = readJson<Partial<LearningProgressRecord>>(
    LEARNING_PROGRESS_KEY,
    emptyProgress
  );

  return {
    ...emptyProgress,
    ...progress,
    courses: progress.courses ?? {},
    knowledgePoints: progress.knowledgePoints ?? {}
  };
}

export function recordQuizProgress(input: QuizProgressInput) {
  const current = getLearningProgress();
  const courseProgress = current.courses[input.courseId] ?? {
    completedQuizCount: 0,
    answeredCount: 0,
    correctCount: 0
  };
  const knowledgePointProgress = input.knowledgePointId
    ? current.knowledgePoints[input.knowledgePointId] ?? {
        completedQuizCount: 0
      }
    : null;

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
    },
    knowledgePoints: input.knowledgePointId
      ? {
          ...current.knowledgePoints,
          [input.knowledgePointId]: {
            completedQuizCount: knowledgePointProgress!.completedQuizCount + 1
          }
        }
      : current.knowledgePoints
  };

  writeJson(LEARNING_PROGRESS_KEY, next);
  return next;
}

export function getAccuracy(correctCount: number, answeredCount: number) {
  return answeredCount === 0
    ? 0
    : Math.round((correctCount / answeredCount) * 100);
}

export function getMemos() {
  return readJson<MemoRecord[]>(MEMOS_KEY, []);
}

export function addMemo(input: Pick<MemoRecord, "title" | "content">) {
  const nextMemo: MemoRecord = {
    id: `memo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: input.title,
    content: input.content,
    createdAt: new Date().toISOString(),
    completed: false
  };
  const next = [nextMemo, ...getMemos()];
  writeJson(MEMOS_KEY, next);
  return next;
}

export function toggleMemoCompleted(memoId: string) {
  const next = getMemos().map((memo) =>
    memo.id === memoId ? { ...memo, completed: !memo.completed } : memo
  );
  writeJson(MEMOS_KEY, next);
  return next;
}

export function removeMemo(memoId: string) {
  const next = getMemos().filter((memo) => memo.id !== memoId);
  writeJson(MEMOS_KEY, next);
  return next;
}

function sameLocalDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export function getDueMemoReminder(now: Date) {
  if (now.getHours() !== 21 && now.getHours() !== 22) {
    return null;
  }

  const reminderIds = readJson<string[]>(MEMO_REMINDERS_KEY, []);
  const reminderKeySuffix = `:${now.getFullYear()}-${now.getMonth()}-${now.getDate()}:${now.getHours()}`;

  return (
    getMemos().find((memo) => {
      const wasCreatedToday = sameLocalDay(new Date(memo.createdAt), now);
      const hasShown = reminderIds.includes(`${memo.id}${reminderKeySuffix}`);
      return wasCreatedToday && !memo.completed && !hasShown;
    }) ?? null
  );
}

export function markMemoReminderShown(memoId: string, hour: number) {
  const now = new Date();
  const key = `${memoId}:${now.getFullYear()}-${now.getMonth()}-${now.getDate()}:${hour}`;
  const current = readJson<string[]>(MEMO_REMINDERS_KEY, []);
  writeJson(MEMO_REMINDERS_KEY, [...current.slice(-100), key]);
}

export function saveMaterialSubmission(
  input: Pick<MaterialSubmissionRecord, "title" | "note" | "fileName">
) {
  const record: MaterialSubmissionRecord = {
    id: `material-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...input,
    createdAt: new Date().toISOString(),
    status: "pending_review"
  };
  const next = [record, ...readJson<MaterialSubmissionRecord[]>(MATERIAL_SUBMISSIONS_KEY, [])];
  writeJson(MATERIAL_SUBMISSIONS_KEY, next);
  return next;
}

export function saveChapterChallenge(record: ChapterChallengeRecord) {
  const current = readJson<ChapterChallengeRecord[]>(CHAPTER_CHALLENGES_KEY, []);
  const next = [
    record,
    ...current.filter(
      (item) =>
        item.courseId !== record.courseId || item.chapterId !== record.chapterId
    )
  ];
  writeJson(CHAPTER_CHALLENGES_KEY, next);
  return next;
}

export function getChapterChallenge(courseId: string, chapterId: string) {
  return readJson<ChapterChallengeRecord[]>(CHAPTER_CHALLENGES_KEY, []).find(
    (item) => item.courseId === courseId && item.chapterId === chapterId
  );
}
