import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ResourceLibraryClient } from "@/components/ResourceLibraryClient";
import { getReferenceSources } from "@/lib/data";

export default function ResourcesPage() {
  const sources = getReferenceSources();

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-sm font-medium text-accent transition hover:text-ink"
        >
          返回首页
        </Link>

        <section className="mt-4 overflow-hidden rounded-lg border border-line bg-white/95 shadow-sm">
          <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_210px] md:items-end">
            <div>
              <p className="text-sm font-medium text-accent">线性代数资料图书室</p>
              <h1 className="mt-2 text-3xl font-semibold leading-tight text-ink">
                把零散资料，整理成复习时找得到的书架
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                按课程路径、教材对照和直觉理解挑选资料；阅读完一份资料，回到知识点自测来确认掌握情况。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-line pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div>
                <p className="text-2xl font-semibold text-ink">{sources.length}</p>
                <p className="mt-1 text-xs text-muted">已收录资料</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-ink">3</p>
                <p className="mt-1 text-xs text-muted">浏览方式</p>
              </div>
            </div>
          </div>
          <div className="border-t border-line bg-paper/80 px-5 py-3 text-sm text-muted sm:px-7">
            当前收录均跳转原站阅览。你们自己审核定稿的笔记、公式卡和思维导图可逐步加入这套书架。
          </div>
        </section>

        <ResourceLibraryClient sources={sources} />
      </div>
    </PageShell>
  );
}
