"use client";

import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
import { getDueWrongQuestions } from "@/lib/storage";
import { useEffect, useState } from "react";

export function TodayReviewPanel() {
  const [count, setCount] = useState(0);

  useEffect(() => setCount(getDueWrongQuestions().length), []);

  return (
    <section className="rounded-lg border border-accent/25 bg-white p-5 shadow-sm">
      <p className="inline-flex items-center gap-2 text-sm font-medium text-accent"><CalendarCheck2 className="h-4 w-4" /> 今日复习</p>
      <h2 className="mt-2 text-xl font-semibold text-ink">{count ? `有 ${count} 道题等你回顾` : "今天没有到期复习"}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">答错后先进入今日回顾；答对会在 3 天后、7 天后再次出现，帮助把短期理解变成长期记忆。</p>
      <Link href="/review/today" className={`mt-4 inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition ${count ? "bg-accent text-white hover:bg-accent/90" : "border border-line text-ink hover:border-accent hover:text-accent"}`}>{count ? "开始今日复习" : "查看复习计划"}</Link>
    </section>
  );
}
