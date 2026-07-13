import Link from "next/link";
import { MathText } from "@/components/MathText";
import type { KnowledgePoint } from "@/lib/types";

export function KnowledgeCard({
  courseId,
  point
}: {
  courseId: string;
  point: KnowledgePoint;
}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {point.section_title ? (
            <p className="mb-2 text-xs font-medium text-accent">
              {point.section_title}
            </p>
          ) : null}
          <h2 className="text-lg font-semibold text-ink">{point.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            <MathText>{point.one_sentence}</MathText>
          </p>
        </div>
        <span className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs text-muted">
          {point.review_status === "approved" ? "已审核" : "草稿"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {point.question_types.map((type) => (
          <span key={type} className="rounded-md bg-paper px-2.5 py-1 text-xs">
            {type}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Link
          href={`/courses/${courseId}/knowledge/${point.id}`}
          className="inline-flex flex-1 items-center justify-center rounded-md border border-line px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
        >
          查看知识点
        </Link>
        <Link
          href={`/courses/${courseId}/quiz/${point.id}`}
          className="inline-flex flex-1 items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
        >
          开始自测
        </Link>
      </div>
    </article>
  );
}
