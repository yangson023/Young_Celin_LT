import type { Question } from "./types";

export type QuizAnswerMap = Record<string, string>;

export function isAnswerCorrect(question: Question, userAnswer: string) {
  return userAnswer === question.answer;
}

export function scoreQuiz(questions: Question[], answers: QuizAnswerMap) {
  const correctCount = questions.reduce((count, question) => {
    return count + (isAnswerCorrect(question, answers[question.id]) ? 1 : 0);
  }, 0);

  const total = questions.length;
  const accuracy = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  return {
    correctCount,
    total,
    accuracy
  };
}
