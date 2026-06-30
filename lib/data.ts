import sjtuAdvancedAlgebraChapters from "@/content-packs/sjtu-advanced-algebra/chapters.json";
import sjtuAdvancedAlgebraCourse from "@/content-packs/sjtu-advanced-algebra/course.json";
import sjtuAdvancedAlgebraKnowledgePoints from "@/content-packs/sjtu-advanced-algebra/knowledge-points.json";
import sjtuAdvancedAlgebraQuestions from "@/content-packs/sjtu-advanced-algebra/questions.json";
import uestcLinearAlgebraChapters from "@/content-packs/uestc-linear-algebra/chapters.json";
import uestcLinearAlgebraCourse from "@/content-packs/uestc-linear-algebra/course.json";
import uestcLinearAlgebraKnowledgePoints from "@/content-packs/uestc-linear-algebra/knowledge-points.json";
import uestcLinearAlgebraQuestions from "@/content-packs/uestc-linear-algebra/questions.json";
import type { Chapter, Course, KnowledgePoint, Question } from "./types";

const courses = [
  uestcLinearAlgebraCourse,
  sjtuAdvancedAlgebraCourse
] as Course[];

const chapters = [
  ...uestcLinearAlgebraChapters,
  ...sjtuAdvancedAlgebraChapters
] as Chapter[];

const knowledgePoints = [
  ...uestcLinearAlgebraKnowledgePoints,
  ...sjtuAdvancedAlgebraKnowledgePoints
] as KnowledgePoint[];

const questions = [
  ...uestcLinearAlgebraQuestions,
  ...sjtuAdvancedAlgebraQuestions
] as Question[];

export function getCourses() {
  return courses;
}

export function getCourseById(courseId: string) {
  return courses.find((course) => course.id === courseId);
}

export function getChaptersByCourseId(courseId: string) {
  return chapters
    .filter((chapter) => chapter.course_id === courseId)
    .sort((a, b) => a.order - b.order);
}

export function getChapterById(courseId: string, chapterId: string) {
  return chapters.find(
    (chapter) => chapter.course_id === courseId && chapter.id === chapterId
  );
}

export function getKnowledgePointsByCourseId(courseId: string) {
  return knowledgePoints.filter((point) => point.course_id === courseId);
}

export function getKnowledgePointsByChapterId(
  courseId: string,
  chapterId: string
) {
  return knowledgePoints.filter(
    (point) => point.course_id === courseId && point.chapter_id === chapterId
  );
}

export function getKnowledgePointById(
  courseId: string,
  knowledgePointId: string
) {
  return knowledgePoints.find(
    (point) => point.course_id === courseId && point.id === knowledgePointId
  );
}

export function getQuestionsByKnowledgePointId(
  courseId: string,
  knowledgePointId: string
) {
  return questions.filter(
    (question) =>
      question.course_id === courseId &&
      question.knowledge_point_id === knowledgePointId &&
      question.status === "approved"
  );
}

export function getQuestionCountByCourseId(courseId: string) {
  return questions.filter((question) => question.course_id === courseId).length;
}

export function getKnowledgeCountByCourseId(courseId: string) {
  return knowledgePoints.filter((point) => point.course_id === courseId).length;
}
