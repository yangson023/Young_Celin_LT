import Link from "next/link";

export function AppHeader() {
  const feedbackMailto =
    "mailto:659268625@qq.com?subject=%E8%AF%BE%E7%A8%8B%E8%87%AA%E6%B5%8B%E5%8A%A9%E6%89%8B%E5%8F%8D%E9%A6%88&body=%E8%AF%B7%E7%AE%80%E5%8D%95%E5%86%99%E4%B8%8B%E4%BD%A0%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98%E6%88%96%E5%BB%BA%E8%AE%AE%EF%BC%9A%0A%0A%E9%A1%B5%E9%9D%A2%EF%BC%9A%0A%E9%97%AE%E9%A2%98%EF%BC%9A%0A%E5%BB%BA%E8%AE%AE%EF%BC%9A";

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
            href={feedbackMailto}
            aria-label="发送反馈邮件"
            className="group inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent px-3 py-2 font-medium text-white shadow-sm shadow-accent/20 transition hover:-translate-y-0.5 hover:bg-[#24595d] hover:shadow-md hover:shadow-accent/30"
          >
            <span className="relative flex h-4 w-5 items-center justify-center overflow-hidden rounded-[3px] border border-white/80">
              <span className="absolute top-0 h-3 w-3 rotate-45 border-b border-r border-white/80 transition group-hover:translate-y-0.5" />
              <span className="absolute inset-x-0 bottom-0 h-1.5 bg-white/20" />
            </span>
            <span>反馈</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
