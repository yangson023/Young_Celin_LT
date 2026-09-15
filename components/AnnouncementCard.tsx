import type { Announcement } from "@/lib/types";

const categoryLabels: Record<Announcement["category"], string> = {
  feature: "功能更新",
  content: "内容更新",
  fix: "体验修复",
  notice: "使用说明"
};

const categoryStyles: Record<Announcement["category"], string> = {
  feature: "border-[#b7d8d2] bg-[#eff8f5] text-[#24595d]",
  content: "border-[#e6cf9f] bg-[#fff9ec] text-[#8b5b19]",
  fix: "border-[#b9d3e5] bg-[#f0f8fc] text-[#2e6683]",
  notice: "border-[#d7c8ec] bg-[#f7f2fd] text-[#68478f]"
};

export function AnnouncementCard({
  announcement,
  compact = false
}: {
  announcement: Announcement;
  compact?: boolean;
}) {
  return (
    <article
      className={`rounded-lg border border-line bg-white shadow-sm ${
        compact ? "p-4" : "p-5 sm:p-6"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`rounded-md border px-2.5 py-1 text-xs font-medium ${categoryStyles[announcement.category]}`}
        >
          {categoryLabels[announcement.category]}
        </span>
        <p className="text-xs text-muted">
          {announcement.published_at.replaceAll("-", ".")} · {announcement.version}
        </p>
      </div>

      <h2
        className={`font-semibold text-ink ${
          compact ? "mt-3 text-base leading-6" : "mt-4 text-xl leading-7"
        }`}
      >
        {announcement.title}
      </h2>
      <p className={`text-sm leading-6 text-muted ${compact ? "mt-1" : "mt-2"}`}>
        {announcement.summary}
      </p>

      {!compact && announcement.highlights.length > 0 ? (
        <ul className="mt-4 grid gap-2 border-t border-line pt-4 text-sm leading-6 text-muted">
          {announcement.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span aria-hidden="true" className="font-semibold text-accent">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
