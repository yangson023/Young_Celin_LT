export type CourseStatus = "active" | "draft" | "coming_soon";

export type Course = {
  id: string;
  title: string;
  school: string;
  audience: string;
  level: string;
  focus: string[];
  status: CourseStatus;
  description: string;
};

export type Chapter = {
  id: string;
  course_id: string;
  title: string;
  order: number;
  summary: string;
};

export type KnowledgePoint = {
  id: string;
  course_id: string;
  chapter_id: string;
  section_id?: string;
  section_title?: string;
  order?: number;
  title: string;
  one_sentence: string;
  summary: string;
  formulas: string[];
  common_mistakes: string[];
  question_types: string[];
  review_status: "approved" | "draft";
};

export type QuestionType = "single_choice" | "true_false";

export type Question = {
  id: string;
  course_id: string;
  knowledge_point_id: string;
  type: QuestionType;
  difficulty: "basic" | "medium" | "advanced";
  stem: string;
  options: string[];
  answer: string;
  explanation: string;
  tags: string[];
  source: "manual" | "ai";
  status: "approved" | "draft";
};

export type WrongQuestionRecord = {
  questionId: string;
  courseId: string;
  courseTitle: string;
  knowledgePointId: string;
  knowledgeTitle: string;
  stem: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  createdAt: string;
};
