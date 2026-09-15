import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ResourceLibraryClient } from "@/components/ResourceLibraryClient";
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
            <div>
              <p className="text-sm font-medium text-accent">电科线性代数资料图书室</p>
              <h1 className="mt-2 text-3xl font-semibold leading-tight text-ink">
                先按章节，把自己的资料放回该在的位置
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                这里优先收纳你们用于整理课程内容的讲义和答疑资料。选择一份资料后，可直接回到对应章节继续学习与自测。
              </p>
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
            当前资料页展示整理目录与学习入口，不公开托管原始 PDF，也不提供下载按钮。审核完成的自制笔记、公式卡和思维导图可逐步补入。
          </div>
        </section>

        <ResourceLibraryClient materials={materials} />
      </div>
    </PageShell>
  );
}
