"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getWrongQuestions } from "@/lib/storage";

export function WrongQuestionShortcut() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getWrongQuestions().length);
  }, []);

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-muted">错题本</p>
      <p className="mt-2 text-2xl font-semibold text-ink">{count} 道</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        错题先保存在当前浏览器，后续试点有效后再接数据库。
      </p>
      <Link
        href="/wrong"
        className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-line px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
      >
        查看错题
      </Link>
    </section>
  );
}
