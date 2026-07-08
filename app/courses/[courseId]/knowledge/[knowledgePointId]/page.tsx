import Link from "next/link";
import { MathText } from "@/components/MathText";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import {
  getChapterById,
  getCourseById,
  getKnowledgePointById
} from "@/lib/data";

export default async function KnowledgePointPage({
  params
}: {
  params: Promise<{ courseId: string; knowledgePointId: string }>;
}) {
  const { courseId, knowledgePointId } = await params;
  const course = getCourseById(courseId);
  const point = getKnowledgePointById(courseId, knowledgePointId);

  if (!course || !point) {
    notFound();
  }

  const chapter = getChapterById(course.id, point.chapter_id);

  return (
    <PageShell>
      <div className="grid gap-6">
        <Link
          href={
            chapter
              ? `/courses/${course.id}/chapters/${chapter.id}`
              : `/courses/${course.id}`
          }
          className="text-sm font-medium text-accent"
        >
          返回知识点列表
        </Link>

        <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm text-muted">
            {course.title}
            {chapter ? ` · ${chapter.title}` : ""}
            {point.section_title ? ` · ${point.section_title}` : ""}
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-ink">
            {point.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-ink">
            {point.one_sentence}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            {point.summary}
          </p>

          <Link
            href={`/courses/${course.id}/quiz/${point.id}`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 sm:w-auto"
          >
            开始自测
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">关键公式</h2>
            {point.formulas.length > 0 ? (
              <ul className="mt-3 grid gap-2 text-sm">
                {point.formulas.map((formula) => (
                  <li
                    key={formula}
                    className="overflow-x-auto rounded-md bg-paper p-3"
                  >
                    <MathText>{formula}</MathText>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted">
                这个知识点暂时没有单独公式，重点看定义和操作条件。
              </p>
            )}
          </div>

          <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">常见易错点</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted">
              {point.common_mistakes.map((mistake) => (
                <li key={mistake} className="rounded-md bg-paper p-3">
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
