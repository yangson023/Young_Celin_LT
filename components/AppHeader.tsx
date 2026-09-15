import Link from "next/link";
import { FeedbackLetterDialog } from "./FeedbackLetterDialog";

export function AppHeader() {
  return (
    <header className="border-b border-line bg-white/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-base font-semibold text-ink sm:text-lg">
          课程自测助手
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/resources"
            className="rounded-md border border-line px-3 py-2 text-muted transition hover:border-accent hover:text-accent"
          >
            资料
          </Link>
          <Link
            href="/updates"
            className="rounded-md border border-line px-3 py-2 text-muted transition hover:border-accent hover:text-accent"
          >
            更新
          </Link>
          <Link
            href="/wrong"
            className="rounded-md border border-line px-3 py-2 text-muted transition hover:border-accent hover:text-accent"
          >
            错题本
          </Link>
          <FeedbackLetterDialog />
        </nav>
      </div>
    </header>
  );
}
