"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLastLearning, type LastLearningRecord } from "@/lib/storage";

export function ContinueLearningPanel() {
  const [lastLearning, setLastLearning] = useState<LastLearningRecord | null>(
    null
  );

  useEffect(() => {
    setLastLearning(getLastLearning());
  }, []);

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-muted">当前学习入口</p>
      {lastLearning ? (
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-ink">
              继续学习：{lastLearning.knowledgeTitle}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {lastLearning.courseTitle}
            </p>
          </div>
          <Link
            href={lastLearning.href}
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            继续
          </Link>
        </div>
      ) : (
        <div className="mt-3">
          <h1 className="text-2xl font-semibold text-ink">
            从一门课程开始自测
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            先选择课程包，再进入章节和知识点。当前 Demo 先用本地数据跑通学习、自测、解析和错题流程。
          </p>
        </div>
      )}
    </section>
  );
}
