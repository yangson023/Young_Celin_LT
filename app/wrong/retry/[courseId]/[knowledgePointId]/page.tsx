import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getCourseById, getKnowledgePointById } from "@/lib/data";
import { WrongQuestionRetryClient } from "./wrong-question-retry-client";

export default async function WrongQuestionRetryPage({
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

  return (
    <PageShell>
      <WrongQuestionRetryClient course={course} point={point} />
    </PageShell>
  );
}
