import Link from "next/link";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { PageShell } from "@/components/PageShell";
import { getAnnouncements } from "@/lib/data";

export default function UpdatesPage() {
  const announcements = getAnnouncements();

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-sm font-medium text-accent transition hover:text-ink"
        >
          返回首页
        </Link>

        <section className="mt-4 rounded-lg border border-line bg-white/95 p-5 shadow-sm sm:p-7">
          <p className="text-sm font-medium text-accent">课程自测助手</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">更新公告</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            这里记录影响学习体验的功能、内容和修复。每次稳定更新后，我们会把变化写清楚。
          </p>
        </section>

        <section className="mt-6">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted">试用版记录</p>
              <h2 className="mt-1 text-2xl font-semibold text-ink">版本时间线</h2>
            </div>
            <p className="text-sm text-muted">{announcements.length} 条公告</p>
          </div>

          <div className="grid gap-4">
            {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
