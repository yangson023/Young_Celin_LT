import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import {
  getChapterById,
  getCourseById,
  getKnowledgePointsByChapterId,
  getQuestionsByChapterId
} from "@/lib/data";
import type { KnowledgePoint, Question } from "@/lib/types";
import { QuizClient } from "../../../quiz/[knowledgePointId]/quiz-client";

function selectMixedQuestions(
  knowledgePoints: KnowledgePoint[],
  questions: Question[]
) {
  const selected: Question[] = [];
  const selectedIds = new Set<string>();

  knowledgePoints.forEach((point) => {
    const firstQuestion = questions.find(
      (question) => question.knowledge_point_id === point.id
    );

    if (firstQuestion) {
      selected.push(firstQuestion);
      selectedIds.add(firstQuestion.id);
    }
  });

  questions.forEach((question) => {
    if (selected.length < 5 && !selectedIds.has(question.id)) {
      selected.push(question);
    }
  });

  return selected.slice(0, 5);
}

export default async function ChapterQuizPage({
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

  const knowledgePoints = getKnowledgePointsByChapterId(course.id, chapter.id);
  const questions = selectMixedQuestions(
    knowledgePoints,
    getQuestionsByChapterId(course.id, chapter.id)
  );

  return (
    <PageShell>
      <QuizClient
        course={course}
        chapter={chapter}
        chapterTitle={chapter.title}
        knowledgePoints={knowledgePoints}
        questions={questions}
      />
    </PageShell>
  );
}
