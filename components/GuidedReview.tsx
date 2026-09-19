"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { MathText } from "@/components/MathText";
import type { KnowledgePoint } from "@/lib/types";

export function GuidedReview({
  items
}: {
  items: NonNullable<KnowledgePoint["guided_review"]>;
}) {
  const [revealed, setRevealed] = useState<number[]>([]);

  function toggle(index: number) {
    setRevealed((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  return (
    <section className="rounded-lg border border-[#d8e6f1] bg-[#f7fbff] p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-accent">先回忆，再看答案</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">用三个问题检查是否真的理解</h2>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {items.map((item, index) => {
          const isRevealed = revealed.includes(index);

          return (
            <article key={item.question} className="rounded-md border border-line bg-white p-4">
              <p className="text-sm font-semibold leading-6 text-ink">
                {index + 1}. <MathText>{item.question}</MathText>
              </p>
              {!isRevealed ? (
                <>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    提示：<MathText>{item.hint}</MathText>
                  </p>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="mt-3 text-sm font-semibold text-accent transition hover:text-ink"
                  >
                    查看回顾要点
                  </button>
                </>
              ) : (
                <>
                  <p className="mt-3 rounded-md bg-accent/5 p-3 text-sm leading-6 text-ink">
                    <MathText>{item.answer}</MathText>
                  </p>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="mt-3 text-sm font-semibold text-accent transition hover:text-ink"
                  >
                    收起答案
                  </button>
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
