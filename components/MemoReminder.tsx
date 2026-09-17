"use client";

import { useEffect, useState } from "react";
import { getDueMemoReminder, markMemoReminderShown, type MemoRecord } from "@/lib/storage";

export function MemoReminder() {
  const [memo, setMemo] = useState<MemoRecord | null>(null);

  useEffect(() => {
    function checkReminder() {
      const dueMemo = getDueMemoReminder(new Date());
      if (dueMemo) {
        markMemoReminderShown(dueMemo.id, new Date().getHours());
        setMemo(dueMemo);
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("课程小助教的晚间提醒", {
            body: `晚上好，别忘了：${dueMemo.title}`
          });
        }
      }
    }

    checkReminder();
    const timer = window.setInterval(checkReminder, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!memo) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/35 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="memo-reminder-title">
      <section className="w-full max-w-sm overflow-hidden rounded-lg border border-line bg-[#fffef9] shadow-2xl">
        <div className="h-1.5 bg-accent" />
        <div className="p-5">
          <div className="flex items-center gap-3">
            <span className="memo-reminder-avatar" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-accent">晚间小提醒</p>
              <h2 id="memo-reminder-title" className="mt-1 text-lg font-semibold text-ink">晚上好，别忘了这件事</h2>
            </div>
          </div>
          <p className="mt-5 rounded-md border border-line bg-white px-3 py-3 text-sm font-semibold leading-6 text-ink">
            {memo.title}
          </p>
          {memo.content ? <p className="mt-3 text-sm leading-6 text-muted">{memo.content}</p> : null}
          <p className="mt-4 text-sm leading-6 text-muted">辛苦啦，处理完记得给自己一点休息时间。</p>
          <button type="button" onClick={() => setMemo(null)} className="mt-5 w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24595d]">
            我知道了
          </button>
        </div>
      </section>
    </div>
  );
}
