import type { LectureInsight } from "@/lib/types";

export function LectureInsightPanel({
  insights,
  compact = false
}: {
  insights: LectureInsight[];
  compact?: boolean;
}) {
  if (!insights.length) {
    return null;
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-accent">讲座提炼</p>
      <h2 className="mt-1 text-xl font-semibold text-ink">把“听过”变成可复习的线索</h2>
      <div className={"mt-4 grid gap-4 " + (compact ? "" : "lg:grid-cols-2")}>
        {insights.map((insight) => (
          <article key={insight.id} className="rounded-md border border-line bg-paper/60 p-4">
            <h3 className="text-base font-semibold text-ink">{insight.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{insight.focus}</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink">
              {insight.takeaways.map((takeaway) => (
                <li key={takeaway} className="rounded bg-white px-3 py-2">{takeaway}</li>
              ))}
            </ul>
            <div className="mt-3 border-l-2 border-accent/40 pl-3 text-sm leading-6 text-muted">
              <span className="font-semibold text-ink">微型例题：</span>{insight.example.prompt}<br />
              <span className="font-semibold text-ink">切入点：</span>{insight.example.approach}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
