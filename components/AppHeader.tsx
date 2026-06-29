import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b border-line bg-white/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-base font-semibold text-ink sm:text-lg">
          课程自测助手
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/wrong"
            className="rounded-md border border-line px-3 py-2 text-muted transition hover:border-accent hover:text-accent"
          >
            错题本
          </Link>
          <a
            href="mailto:feedback@example.com"
            className="hidden rounded-md px-3 py-2 text-muted transition hover:text-accent sm:inline"
          >
            反馈
          </a>
        </nav>
      </div>
    </header>
  );
}
