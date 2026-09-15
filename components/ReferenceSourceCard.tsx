import type { ReferenceSource } from "@/lib/types";

const typeLabels: Record<string, string> = {
  course: "公开课程",
  open_textbook_index: "开放教材",
  open_textbook_collection: "开放教材集合",
  online_course: "在线课程",
  visual_course: "可视化课程"
};

export function ReferenceSourceCard({ source }: { source: ReferenceSource }) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">
            {typeLabels[source.type] ?? source.type} · {source.language}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-ink">{source.title}</h2>
        </div>
        <span className="rounded-md bg-paper px-2.5 py-1 text-xs font-medium text-muted">
          原站阅览
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-ink">适合参考</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {source.best_for.map((item) => (
            <span
              key={item}
              className="rounded-md border border-line bg-paper px-2.5 py-1 text-xs text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted">{source.project_usage}</p>
      <p className="mt-3 text-xs leading-5 text-muted">
        许可提示：{source.license_note}
      </p>

      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
      >
        前往原站阅览
      </a>
    </article>
  );
}
