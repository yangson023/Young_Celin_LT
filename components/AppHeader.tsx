import Link from "next/link";
import { Bell, BookOpenText, NotebookPen, Puzzle, ScrollText } from "lucide-react";
import { FeedbackLetterDialog } from "./FeedbackLetterDialog";

export function AppHeader() {
  return (
    <header className="border-b border-line bg-white/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold text-ink sm:text-lg">
          <Puzzle className="h-5 w-5 text-accent" aria-hidden="true" />
          课程自测助手
        </Link>
        <nav className="flex items-center gap-1.5 text-sm sm:gap-2">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-2 text-muted transition hover:border-accent hover:text-accent sm:px-3"
          >
            <BookOpenText className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">资料</span>
          </Link>
          <Link
            href="/updates"
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-2 text-muted transition hover:border-accent hover:text-accent sm:px-3"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">更新</span>
          </Link>
          <Link
            href="/wrong"
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-2 text-muted transition hover:border-accent hover:text-accent sm:px-3"
          >
            <ScrollText className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">错题本</span>
          </Link>
          <Link
            href="/memos"
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-2 text-muted transition hover:border-accent hover:text-accent sm:px-3"
          >
            <NotebookPen className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">备忘</span>
          </Link>
          <FeedbackLetterDialog />
        </nav>
      </div>
    </header>
  );
}
