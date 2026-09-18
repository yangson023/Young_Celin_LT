import Link from "next/link";
import { FeatureMark } from "@/components/FeatureMark";
import { PageShell } from "@/components/PageShell";
import { ResourceLibraryClient } from "@/components/ResourceLibraryClient";
import { MaterialSubmissionDialog } from "@/components/MaterialSubmissionDialog";
import { getCourseMaterials } from "@/lib/data";

export default function ResourcesPage() {
  const materials = getCourseMaterials();

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
            <div className="flex items-start gap-3">
              <FeatureMark name="materials" />
              <div>
                <p className="text-sm font-medium text-accent">课程资料图书室</p>
                <h1 className="mt-2 text-3xl font-semibold leading-tight text-ink">
                  先进入一个课程专题，再按章节找资料
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                  线性代数资料先归入同一个专题书架，再按章节筛选。之后的课程也沿用“专题封面 + 章节检索”的结构，避免资料散落成一页清单。
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-line pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div>
                <p className="text-2xl font-semibold text-ink">{materials.length}</p>
                <p className="mt-1 text-xs text-muted">已登记资料</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-ink">2</p>
                <p className="mt-1 text-xs text-muted">已上线章节</p>
              </div>
            </div>
          </div>
          <div className="border-t border-line bg-paper/80 px-5 py-3 text-sm text-muted sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>当前资料页展示整理目录与学习入口，不公开托管原始 PDF，也不提供下载按钮。</span>
              <MaterialSubmissionDialog />
            </div>
          </div>
        </section>

        <ResourceLibraryClient materials={materials} />
      </div>
    </PageShell>
  );
}
