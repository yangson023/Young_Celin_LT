import type { ReferenceSource } from "@/lib/types";

const typeDetails: Record<string, { label: string; accent: string }> = {
  course: {
    label: "公开课程",
    accent: "border-[#b7d8d2] bg-[#eff8f5] text-[#24595d]"
  },
  open_textbook_index: {
    label: "开放教材",
    accent: "border-[#e6cf9f] bg-[#fff9ec] text-[#8b5b19]"
  },
  open_textbook_collection: {
    label: "开放教材集合",
    accent: "border-[#d7c8ec] bg-[#f7f2fd] text-[#68478f]"
  },
  online_course: {
    label: "在线课程",
    accent: "border-[#b9d3e5] bg-[#f0f8fc] text-[#2e6683]"
  },
  visual_course: {
    label: "可视化课程",
    accent: "border-[#e8c0bf] bg-[#fff4f3] text-[#9a4d48]"
  }
};

export function ReferenceSourceCard({ source }: { source: ReferenceSource }) {
  const type = typeDetails[source.type] ?? {
    label: source.type,
    accent: "border-line bg-paper text-muted"
  };

  return (
    <article className="group relative overflow-hidden rounded-lg border border-line bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
      <div className="absolute inset-x-0 top-0 h-1 bg-accent/70" />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{source.language}</p>
          <h2 className="mt-1 text-lg font-semibold leading-7 text-ink">
            {source.title}
          </h2>
        </div>
        <span
          className={`rounded-md border px-2.5 py-1 text-xs font-medium ${type.accent}`}
        >
          {type.label}
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
      <p className="mt-3 border-l-2 border-line pl-3 text-xs leading-5 text-muted">
        许可提示：{source.license_note}
      </p>

      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
      >
        前往原站阅览
        <span aria-hidden="true" className="text-base leading-none">→</span>
      </a>
    </article>
  );
}
