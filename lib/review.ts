import type { MistakeTag } from "./types";

export const mistakeTagOptions: { id: MistakeTag; label: string; hint: string }[] = [
  { id: "concept", label: "概念不清", hint: "定义或对象没分清" },
  { id: "condition", label: "条件漏看", hint: "忽略了适用前提" },
  { id: "formula", label: "公式记错", hint: "公式结构或符号有误" },
  { id: "calculation", label: "计算失误", hint: "思路正确但算错" },
  { id: "notation", label: "符号混淆", hint: "转置、下标、矩阵符号等混淆" }
];

export function getMistakeTagLabel(tag?: MistakeTag) {
  return mistakeTagOptions.find((item) => item.id === tag)?.label ?? "未标记错因";
}

export function getReviewStageLabel(stage = 0) {
  if (stage <= 0) return "今日回顾";
  if (stage === 1) return "3 天后复习";
  return "7 天后巩固";
}
