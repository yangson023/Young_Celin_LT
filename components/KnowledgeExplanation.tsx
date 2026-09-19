import Image from "next/image";
import { ConceptDiagram } from "@/components/ConceptDiagram";
import { GuidedReview } from "@/components/GuidedReview";
import { MathText } from "@/components/MathText";
import type { KnowledgePoint } from "@/lib/types";

export function KnowledgeExplanation({ point }: { point: KnowledgePoint }) {
  const example = point.worked_example;
  const reviewItems = point.guided_review ?? [
    {
      question: "不用看公式，用一句话说明“" + point.title + "”在解决什么问题？",
      hint: "先回到页面顶部的一句话理解。",
      answer: point.one_sentence
    },
    {
      question: "做相关题目前，最容易遗漏的检查是什么？",
      hint: point.common_mistakes[0] ?? "从定义与对象范围开始检查。",
      answer: point.common_mistakes[0]
        ? "优先避免这个误区：" + point.common_mistakes[0]
        : "先确认对象、符号与适用条件，再代入公式。"
    },
    {
      question: "这一个点与后续学习有什么关系？",
      hint: "想一想它提供的是定义、工具还是判断条件。",
      answer: point.summary
    }
  ];

  return (
    <section className="grid gap-4">
      {point.learning_goal ? (
        <div className="rounded-lg border border-accent/25 bg-accent/5 p-5 shadow-sm">
          <p className="text-sm font-medium text-accent">学完要会什么</p>
          <p className="mt-2 text-sm leading-6 text-ink">
            <MathText>{point.learning_goal}</MathText>
          </p>
        </div>
      ) : null}

      {point.conditions?.length ? (
        <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">先检查这些条件</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
            {point.conditions.map((condition) => (
              <li key={condition} className="rounded-md bg-paper p-3">
                <MathText>{condition}</MathText>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <GuidedReview items={reviewItems} />

      {point.visual ? (
        <figure className="overflow-hidden rounded-lg border border-line bg-white p-3 shadow-sm">
          <Image
            src={point.visual.src}
            alt={point.visual.alt}
            width={1728}
            height={941}
            className="h-auto w-full rounded-md"
          />
          <figcaption className="px-2 pb-1 pt-3 text-sm leading-6 text-muted">
            {point.visual.caption}
          </figcaption>
        </figure>
      ) : null}

      {!point.visual ? <ConceptDiagram point={point} /> : null}

      {example ? (
        <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-accent">跟着做一个小例子</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">{example.title}</h2>
          <p className="mt-3 rounded-md bg-paper p-3 text-sm leading-6 text-ink">
            <MathText>{example.prompt}</MathText>
          </p>

          <ol className="mt-4 grid gap-3">
            {example.steps.map((step, index) => (
              <li key={step.title} className="flex gap-3 rounded-md border border-line p-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    <MathText>{step.detail}</MathText>
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-4 rounded-md border border-accent/20 bg-accent/5 p-3 text-sm leading-6 text-ink">
            <span className="font-semibold text-accent">这题要带走的结论：</span>{" "}
            <MathText>{example.takeaway}</MathText>
          </p>
        </section>
      ) : null}
    </section>
  );
}
