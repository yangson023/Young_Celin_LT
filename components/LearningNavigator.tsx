"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getLastLearning,
  getWrongQuestions,
  type LastLearningRecord
} from "@/lib/storage";

export function LearningNavigator() {
  const [lastLearning, setLastLearning] = useState<LastLearningRecord | null>(
    null
  );
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    setLastLearning(getLastLearning());
    setWrongCount(getWrongQuestions().length);
  }, []);

  const defaultCourseHref = "/courses/uestc-linear-algebra";
  const courseHref = lastLearning
    ? `/courses/${lastLearning.courseId}`
    : defaultCourseHref;
  const continueHref = lastLearning?.href ?? defaultCourseHref;
  const continueLabel = lastLearning ? "继续学习" : "开始学习";

  return (
    <>
      <aside className="fixed right-5 top-24 z-20 hidden w-52 rounded-lg border border-line bg-white/95 p-3 shadow-sm xl:block">
        <p className="px-2 pb-2 text-xs font-medium text-muted">学习导航</p>
        <Link
          href={continueHref}
          className="block rounded-md bg-accent px-3 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
        >
          {continueLabel}
        </Link>
        {lastLearning ? (
          <p className="px-2 pt-2 text-xs leading-5 text-muted">
            {lastLearning.knowledgeTitle}
          </p>
        ) : null}
        <div className="mt-3 grid gap-1 border-t border-line pt-3 text-sm">
          <Link
            href={courseHref}
            className="rounded-md px-2 py-2 font-medium text-ink transition hover:bg-paper hover:text-accent"
          >
            我的课程
          </Link>
          <Link
            href="/wrong"
            className="rounded-md px-2 py-2 font-medium text-ink transition hover:bg-paper hover:text-accent"
          >
            错题本{wrongCount > 0 ? ` · ${wrongCount}` : ""}
          </Link>
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-20 grid grid-cols-3 overflow-hidden rounded-lg border border-line bg-white/95 p-1 shadow-sm xl:hidden">
        <Link
          href={courseHref}
          className="rounded-md px-2 py-2 text-center text-xs font-medium text-muted transition hover:bg-paper hover:text-accent"
        >
          课程
        </Link>
        <Link
          href={continueHref}
          className="rounded-md bg-accent px-2 py-2 text-center text-xs font-semibold text-white transition hover:bg-accent/90"
        >
          {continueLabel}
        </Link>
        <Link
          href="/wrong"
          className="rounded-md px-2 py-2 text-center text-xs font-medium text-muted transition hover:bg-paper hover:text-accent"
        >
          错题{wrongCount > 0 ? ` ${wrongCount}` : ""}
        </Link>
      </nav>
    </>
  );
}
