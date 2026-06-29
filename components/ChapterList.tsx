import Link from "next/link";
import type { Chapter, KnowledgePoint } from "@/lib/types";

export function ChapterList({
  courseId,
  chapters,
  knowledgePoints
}: {
  courseId: string;
  chapters: Chapter[];
  knowledgePoints: KnowledgePoint[];
}) {
  return (
    <div className="grid gap-4">
      {chapters.map((chapter) => {
        const count = knowledgePoints.filter(
          (point) => point.chapter_id === chapter.id
        ).length;

        return (
          <Link
            key={chapter.id}
            href={`/courses/${courseId}/chapters/${chapter.id}`}
            className="rounded-lg border border-line bg-white p-5 shadow-sm transition hover:border-accent"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-muted">第 {chapter.order} 章</p>
                <h2 className="mt-1 text-lg font-semibold text-ink">
                  {chapter.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {chapter.summary}
                </p>
              </div>
              <span className="rounded-md bg-paper px-3 py-2 text-sm text-muted">
                {count} 个知识点
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
