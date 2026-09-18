export function QuickPracticePanel() {
  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-muted">快速自测</p>
      <h2 className="mt-2 text-lg font-semibold text-ink">
        从章节挑战开始检验一章内容
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        章节挑战会覆盖本章不同知识点，最多 10 题。做错的题会自动回到今日复习，不必自己翻找。
      </p>
    </section>
  );
}
