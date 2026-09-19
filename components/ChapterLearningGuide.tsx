import Link from "next/link";
import type { Chapter, KnowledgePoint } from "@/lib/types";

export function ChapterLearningGuide({
  courseId,
  chapter,
  points
}: {
  courseId: string;
  chapter: Chapter;
  points: KnowledgePoint[];
}) {
  const firstPoint = points[0];
  const finalPoint = points.at(-1);

  if (!firstPoint || !finalPoint) {
    return null;
  }

  return (
    <section className="rounded-lg border border-accent/25 bg-accent/5 p-5 shadow-sm">
      <p className="text-sm font-medium text-accent">本章引导回顾</p>
      <h2 className="mt-1 text-xl font-semibold text-ink">先建立问题，再逐点展开</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-md bg-white p-4">
          <p className="text-xs font-semibold text-accent">01 · 先想</p>
          <p className="mt-2 text-sm leading-6 text-ink">不翻公式，试着用一句话说出：{chapter.title} 想解决什么问题？</p>
        </div>
        <div className="rounded-md bg-white p-4">
          <p className="text-xs font-semibold text-accent">02 · 再学</p>
          <p className="mt-2 text-sm leading-6 text-ink">从“{firstPoint.title}”开始，按页面中的条件、回顾题和例题推进。</p>
        </div>
        <div className="rounded-md bg-white p-4">
          <p className="text-xs font-semibold text-accent">03 · 后测</p>
          <p className="mt-2 text-sm leading-6 text-ink">学完“{finalPoint.title}”后再做本章挑战；错题优先回到对应条件。</p>
        </div>
      </div>
      <Link
        href={"/courses/" + courseId + "/knowledge/" + firstPoint.id}
        className="mt-4 inline-flex text-sm font-semibold text-accent transition hover:text-ink"
      >
        从第一个知识点开始 →
      </Link>
    </section>
  );
}
