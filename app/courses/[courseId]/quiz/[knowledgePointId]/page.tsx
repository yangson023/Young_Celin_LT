import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import {
  getCourseById,
  getChapterById,
  getKnowledgePointById,
  getQuestionsByKnowledgePointId
} from "@/lib/data";
import { QuizClient } from "./quiz-client";

export default async function QuizPage({
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

  const questions = getQuestionsByKnowledgePointId(course.id, point.id).slice(
    0,
    5
  );
  const chapter = getChapterById(course.id, point.chapter_id);

  return (
    <PageShell>
      <QuizClient
        course={course}
        point={point}
        chapterTitle={chapter?.title}
        questions={questions}
      />
    </PageShell>
  );
}
