"use client";

import { MathText } from "@/components/MathText";
import type { Question } from "@/lib/types";

export function QuestionCard({
  question,
  index,
  selectedAnswer,
  submitted,
  onSelect
}: {
  question: Question;
  index: number;
  selectedAnswer: string | undefined;
  submitted: boolean;
  onSelect: (answer: string) => void;
}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-base font-semibold leading-7 text-ink">
          {index + 1}. <MathText>{question.stem}</MathText>
        </h2>
        <span className="rounded-md bg-paper px-2.5 py-1 text-xs text-muted">
          {question.difficulty}
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        {question.options.map((option) => {
          const optionKey = option.slice(0, 1);
          const isSelected = selectedAnswer === optionKey;
          const isCorrect = submitted && question.answer === optionKey;
          const isWrong =
            submitted && isSelected && selectedAnswer !== question.answer;

          return (
            <button
              key={option}
              type="button"
              disabled={submitted}
              onClick={() => onSelect(optionKey)}
              className={[
                "rounded-md border px-4 py-3 text-left text-sm transition",
                isCorrect
                  ? "border-accent bg-accent/10 text-accent"
                  : isWrong
                    ? "border-red-300 bg-red-50 text-red-700"
                    : isSelected
                      ? "border-accent bg-accent/5 text-ink"
                      : "border-line bg-white text-ink hover:border-accent"
              ].join(" ")}
            >
              <MathText>{option}</MathText>
            </button>
          );
        })}
      </div>

      {submitted ? (
        <div className="mt-4 rounded-md bg-paper p-4 text-sm leading-6">
          <p className="font-semibold text-ink">正确答案：{question.answer}</p>
          <div className="mt-3 grid gap-2">
            <p className="font-semibold text-ink">选项判断</p>
            {question.options.map((option) => {
              const optionKey = option.slice(0, 1);
              const savedExplanation = question.option_explanations?.[optionKey];
              const fallbackExplanation =
                optionKey === question.answer
                  ? "正确选项，理由见下方完整解析。"
                  : optionKey === selectedAnswer
                    ? "你的选择不符合题意，请结合完整解析找出误区。"
                    : "不是正确答案，请结合完整解析对照判断。";

              return (
                <p key={option} className="text-muted">
                  <span className="font-medium text-ink">{optionKey}：</span>
                  {savedExplanation ?? fallbackExplanation}
                </p>
              );
            })}
          </div>
          <p className="mt-3 font-semibold text-ink">完整解析</p>
          <p className="mt-1 text-muted">
            <MathText>{question.explanation}</MathText>
          </p>
        </div>
      ) : null}
    </article>
  );
}
