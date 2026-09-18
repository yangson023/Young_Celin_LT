import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  CalendarCheck2,
  ChartNoAxesCombined,
  Compass,
  Crosshair,
  LibraryBig,
  Mail,
  NotebookPen,
  Route,
  ScrollText,
  Sparkles,
  Trophy
} from "lucide-react";

type FeatureName =
  | "guide"
  | "continue"
  | "progress"
  | "weak-points"
  | "challenge"
  | "today-review"
  | "wrong-questions"
  | "materials"
  | "updates"
  | "memos"
  | "feedback"
  | "assistant";

const icons: Record<FeatureName, LucideIcon> = {
  guide: Compass,
  continue: Route,
  progress: ChartNoAxesCombined,
  "weak-points": Crosshair,
  challenge: Trophy,
  "today-review": CalendarCheck2,
  "wrong-questions": ScrollText,
  materials: LibraryBig,
  updates: BellRing,
  memos: NotebookPen,
  feedback: Mail,
  assistant: Sparkles
};

const tones: Record<FeatureName, string> = {
  guide: "border-[#b9d3e5] bg-[#f0f8fc] text-[#2e6683]",
  continue: "border-[#b7d8d2] bg-[#eff8f5] text-[#24595d]",
  progress: "border-[#c9d4eb] bg-[#f1f5fc] text-[#3b6092]",
  "weak-points": "border-[#ebd1b7] bg-[#fff7ed] text-[#9b5b1a]",
  challenge: "border-[#e6cf9f] bg-[#fff9ec] text-[#8b5b19]",
  "today-review": "border-[#b9d8c2] bg-[#eff8f1] text-[#367143]",
  "wrong-questions": "border-[#ebc7c7] bg-[#fff4f4] text-[#9b3c3c]",
  materials: "border-[#cbbfe6] bg-[#f7f3fc] text-[#684991]",
  updates: "border-[#c5d8e2] bg-[#f1f8fa] text-[#2f6f73]",
  memos: "border-[#dfc6d6] bg-[#fcf4f8] text-[#8a476e]",
  feedback: "border-[#efc9c9] bg-[#fff5f5] text-[#a64e57]",
  assistant: "border-[#c7dced] bg-[#f1f7fc] text-[#2e6683]"
};

export function FeatureMark({
  name,
  size = "regular"
}: {
  name: FeatureName;
  size?: "small" | "regular";
}) {
  const Icon = icons[name];
  const dimensions = size === "small" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "small" ? "h-4 w-4" : "h-5 w-5";

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-md border ${dimensions} ${tones[name]}`}
    >
      <Icon className={iconSize} strokeWidth={1.8} />
    </span>
  );
}
