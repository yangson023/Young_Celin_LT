"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { dismissOnboarding, hasDismissedOnboarding } from "@/lib/storage";

const guideSteps = ["选择课程", "阅读速讲", "完成自测"];

export function FirstVisitGuide() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasDismissedOnboarding());
  }, []);

  function handleDismiss() {
    dismissOnboarding();
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <section className="rounded-lg border border-accent/30 bg-white/95 p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">第一次使用</p>
          <h1 className="mt-1 text-2xl font-semibold text-ink">从一个知识点开始</h1>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="w-fit text-sm font-medium text-muted transition hover:text-ink"
        >
          跳过引导
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {guideSteps.map((step, index) => (
          <div key={step} className="rounded-md bg-paper px-3 py-3">
            <p className="text-xs font-medium text-accent">第 {index + 1} 步</p>
            <p className="mt-1 text-sm font-semibold text-ink">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/courses/uestc-linear-algebra"
          onClick={handleDismiss}
          className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
        >
          开始线性代数
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          className="inline-flex items-center justify-center rounded-md border border-line px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
        >
          我知道了
        </button>
      </div>
    </section>
  );
}
