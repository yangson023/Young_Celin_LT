import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ReferenceSourceCard } from "@/components/ReferenceSourceCard";
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

        <section className="mt-4 rounded-lg border border-line bg-white/95 p-5 shadow-sm sm:p-7">
          <p className="text-sm font-medium text-muted">线性代数资料图书室</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">用资料辅助理解，不替代自己的学习</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            这里先收录可公开访问的资料入口，用于概念交叉验证、直觉理解和学习路径参考。
            点击后会跳转到资料原站，本网站不提供下载文件。
          </p>
        </section>

        <section className="mt-6 rounded-lg border border-accent/20 bg-white/90 p-5">
          <h2 className="text-lg font-semibold text-ink">收录原则</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
            <li>只收录公开可访问或已取得公开展示授权的资料。</li>
            <li>教材、课件和题库仅作为内容整理的参考，不直接大段复制到网页。</li>
            <li>即使页面不放下载按钮，公开展示也仍需要确认版权或授权范围。</li>
          </ul>
        </section>

        <section className="mt-6">
          <div className="mb-4">
            <p className="text-sm font-medium text-muted">当前已收录</p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">公开学习资源</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {sources.map((source) => (
              <ReferenceSourceCard key={source.id} source={source} />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
