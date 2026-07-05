import Link from "next/link";
import { notFound } from "next/navigation";
import { KnowledgeCard } from "@/components/KnowledgeCard";
import { PageShell } from "@/components/PageShell";
import {
  getChapterById,
  getCourseById,
  getKnowledgePointsByChapterId
} from "@/lib/data";

export default async function ChapterPage({
  params
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) {
  const { courseId, chapterId } = await params;
  const course = getCourseById(courseId);
  const chapter = getChapterById(courseId, chapterId);

  if (!course || !chapter) {
    notFound();
  }

  const knowledgePoints = getKnowledgePointsByChapterId(
    course.id,
    chapter.id
  );
  const sectionGroups = knowledgePoints.reduce(
    (groups, point) => {
      const sectionTitle = point.section_title ?? "知识点";
      const currentGroup = groups.find((group) => group.title === sectionTitle);

      if (currentGroup) {
        currentGroup.points.push(point);
        return groups;
      }

      return [...groups, { title: sectionTitle, points: [point] }];
    },
    [] as { title: string; points: typeof knowledgePoints }[]
  );

  return (
    <PageShell>
      <div className="grid gap-6">
        <Link
          href={`/courses/${course.id}`}
          className="text-sm font-medium text-accent"
        >
          返回 {course.title}
        </Link>

        <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm text-muted">{course.school}</p>
          <h1 className="mt-1 text-3xl font-semibold text-ink">
            {chapter.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            {chapter.summary}
          </p>
        </section>

        <section>
          <div className="mb-4">
            <p className="text-sm font-medium text-muted">知识点</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">
              先选一个小点开始
            </h2>
          </div>
          <div className="grid gap-6">
            {sectionGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 text-base font-semibold text-ink">
                  {group.title}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {group.points.map((point) => (
                    <KnowledgeCard
                      key={point.id}
                      courseId={course.id}
                      point={point}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
