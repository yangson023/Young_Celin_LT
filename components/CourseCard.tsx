import Link from "next/link";
import type { Course } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function CourseCard({
  course,
  knowledgeCount,
  questionCount
}: {
  course: Course;
  knowledgeCount: number;
  questionCount: number;
}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{course.school}</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">{course.title}</h2>
        </div>
        <StatusBadge status={course.status} />
      </div>

      <p className="mt-3 text-sm leading-6 text-muted">{course.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {course.focus.map((item) => (
          <span
            key={item}
            className="rounded-md bg-paper px-2.5 py-1 text-xs text-muted"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md border border-line bg-paper px-3 py-2">
          <p className="text-muted">知识点</p>
          <p className="mt-1 font-semibold text-ink">{knowledgeCount} 个</p>
        </div>
        <div className="rounded-md border border-line bg-paper px-3 py-2">
          <p className="text-muted">题目</p>
          <p className="mt-1 font-semibold text-ink">{questionCount} 道</p>
        </div>
      </div>

      <Link
        href={`/courses/${course.id}`}
        className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
      >
        进入课程
      </Link>
    </article>
  );
}
