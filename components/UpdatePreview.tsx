import Link from "next/link";
import { FeatureMark } from "@/components/FeatureMark";
import { getAnnouncements } from "@/lib/data";
import { AnnouncementCard } from "./AnnouncementCard";

export function UpdatePreview() {
  const recentAnnouncements = getAnnouncements().slice(0, 2);

  return (
    <section className="rounded-lg border border-line bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <FeatureMark name="updates" size="small" />
          <div>
            <p className="text-sm font-medium text-muted">更新公告</p>
            <h2 className="mt-1 text-lg font-semibold text-ink">最近有什么变化</h2>
          </div>
        </div>
        <Link
          href="/updates"
          className="text-sm font-medium text-accent transition hover:text-ink"
        >
          全部
        </Link>
      </div>

      <div className="mt-4 grid gap-3">
        {recentAnnouncements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} compact />
        ))}
      </div>
    </section>
  );
}
