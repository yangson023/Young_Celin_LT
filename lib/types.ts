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
  option_explanations?: Record<string, string>;
  tags: string[];
  source: "manual" | "ai";
  status: "approved" | "draft";
};

export type ReferenceSource = {
  id: string;
  title: string;
  url: string;
  type: string;
  language: string;
  license_note: string;
  best_for: string[];
  project_usage: string;
};

export type CourseMaterialType = "chapter_handout" | "lecture" | "textbook";

export type CourseMaterialStatus =
  | "organized"
  | "future"
  | "internal_reference";

export type CourseMaterial = {
  id: string;
  course_id: string;
  chapter_ids: string[];
  coverage: string;
  title: string;
  source_file: string;
  type: CourseMaterialType;
  status: CourseMaterialStatus;
  summary: string;
  best_for: string[];
  action?: {
    href: string;
    label: string;
  };
};

export type AnnouncementCategory = "feature" | "content" | "fix" | "notice";

export type Announcement = {
  id: string;
  published_at: string;
  version: string;
  category: AnnouncementCategory;
  title: string;
  summary: string;
  highlights: string[];
  is_pinned?: boolean;
};

export type WrongQuestionRecord = {
  questionId: string;
  courseId: string;
  courseTitle: string;
  chapterTitle?: string;
  knowledgePointId: string;
  knowledgeTitle: string;
  stem: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  createdAt: string;
  mistakeTag?: MistakeTag;
  reviewStage?: number;
  nextReviewAt?: string;
  lastReviewedAt?: string;
};

export type MistakeTag =
  | "concept"
  | "condition"
  | "formula"
  | "calculation"
  | "notation";

export type ChapterChallengeRecord = {
  courseId: string;
  chapterId: string;
  completedAt: string;
  correctCount: number;
  total: number;
  accuracy: number;
};
