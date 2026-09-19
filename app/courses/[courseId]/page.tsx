import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseLearningPath } from "@/components/CourseLearningPath";
import { LectureInsightPanel } from "@/components/LectureInsightPanel";
import { LearningProgressPanel } from "@/components/LearningProgressPanel";
import { PageShell } from "@/components/PageShell";
import { StatusBadge } from "@/components/StatusBadge";
import {
  getChaptersByCourseId,
  getCourseById,
  getLectureInsightsByCourseId,
  getKnowledgePointsByCourseId
} from "@/lib/data";

export default async function CoursePage({
  params
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const chapters = getChaptersByCourseId(course.id);
  const knowledgePoints = getKnowledgePointsByCourseId(course.id);
  const lectureInsights = getLectureInsightsByCourseId(course.id);

  return (
    <PageShell>
      <div className="grid gap-6">
        <Link href="/" className="text-sm font-medium text-accent">
          返回课程选择
        </Link>

        <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-muted">{course.school}</p>
              <h1 className="mt-1 text-3xl font-semibold text-ink">
                {course.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                {course.description}
              </p>
            </div>
            <StatusBadge status={course.status} />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {course.focus.map((item) => (
              <span
                key={item}
                className="rounded-md bg-paper px-2.5 py-1 text-xs text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <LearningProgressPanel
          courseId={course.id}
          title={`${course.title} 学习进度`}
        />

        <LectureInsightPanel insights={lectureInsights} />

        <CourseLearningPath
          courseId={course.id}
          chapters={chapters}
          knowledgePoints={knowledgePoints}
        />

      </div>
    </PageShell>
  );
}
