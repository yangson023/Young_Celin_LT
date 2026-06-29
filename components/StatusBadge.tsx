import type { CourseStatus } from "@/lib/types";

const statusLabel: Record<CourseStatus, string> = {
  active: "可试用",
  draft: "样例内容",
  coming_soon: "待整理"
};

const statusClass: Record<CourseStatus, string> = {
  active: "border-accent/30 bg-accent/10 text-accent",
  draft: "border-warning/30 bg-warning/10 text-warning",
  coming_soon: "border-line bg-white text-muted"
};

export function StatusBadge({ status }: { status: CourseStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusClass[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}
