import { ContinueLearningPanel } from "@/components/ContinueLearningPanel";
import { CourseCard } from "@/components/CourseCard";
import { LearningProgressPanel } from "@/components/LearningProgressPanel";
import { PageShell } from "@/components/PageShell";
import { QuickPracticePanel } from "@/components/QuickPracticePanel";
import { WrongQuestionShortcut } from "@/components/WrongQuestionShortcut";
import {
  getCourses,
  getKnowledgeCountByCourseId,
  getQuestionCountByCourseId
} from "@/lib/data";

export default function HomePage() {
  const courses = getCourses();

  return (
    <PageShell>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-6">
          <ContinueLearningPanel />
          <LearningProgressPanel title="整体学习进度" />

          <section>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-muted">课程包</p>
                <h1 className="mt-1 text-2xl font-semibold text-ink">
                  选择一门课开始自测
                </h1>
              </div>
              <p className="text-sm text-muted">
                当前先验证少量课程包，共用同一套网页框架。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  knowledgeCount={getKnowledgeCountByCourseId(course.id)}
                  questionCount={getQuestionCountByCourseId(course.id)}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="grid content-start gap-4">
          <QuickPracticePanel />
          <WrongQuestionShortcut />
        </aside>
      </div>
    </PageShell>
  );
}
