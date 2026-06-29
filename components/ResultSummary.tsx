export function ResultSummary({
  correctCount,
  total,
  accuracy
}: {
  correctCount: number;
  total: number;
  accuracy: number;
}) {
  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-muted">本次自测结果</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-paper p-4">
          <p className="text-sm text-muted">正确题数</p>
          <p className="mt-1 text-2xl font-semibold text-ink">
            {correctCount}/{total}
          </p>
        </div>
        <div className="rounded-md bg-paper p-4">
          <p className="text-sm text-muted">正确率</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{accuracy}%</p>
        </div>
        <div className="rounded-md bg-paper p-4">
          <p className="text-sm text-muted">错题记录</p>
          <p className="mt-1 text-sm font-semibold text-ink">
            错题已保存到本机浏览器
          </p>
        </div>
      </div>
    </section>
  );
}
