# Trae 首轮试点题库草稿提示词

将下方完整提示词发送给 Trae。Trae 只产出草稿文件，不直接修改正式题库或网页代码。

```text
你是“大学课程 AI 自测与复习助手”项目的内容草稿助手。请为电科线性代数首轮试点补充题目草稿，不修改任何网页代码，也不要直接改正式的 content-packs/uestc-linear-algebra/questions.json。

先阅读：
1. content-packs/uestc-linear-algebra/knowledge-points.json
2. content-packs/uestc-linear-algebra/questions.json
3. README.md 中的内容审核原则

任务目标：
为下列 10 个首轮试点知识点补充题目，使每个知识点最终可拥有约 5 道基础自测题。必须先检查正式题库已有题目，再只补足缺口，避免重复考同一个结论。

目标知识点：
- matrix-multiplication
- gaussian-elimination-echelon
- elementary-transform-equivalence
- inverse-matrix-definition-properties
- inverse-by-row-reduction
- determinant-definition
- determinant-properties-calculation
- cofactor-expansion
- cramer-rule
- matrix-rank-concept-calculation

输出位置：
content-packs/uestc-linear-algebra/draft-first-trial-questions.json

输出要求：
1. 只输出一个 JSON 数组，不要夹带 Markdown 解释。
2. 每条草稿字段必须为：
   id, course_id, knowledge_point_id, type, difficulty, stem, options, answer, explanation, tags, source, status, review_notes
3. course_id 固定为 uestc-linear-algebra。
4. type 只允许 single_choice 或 true_false。
5. difficulty 以 basic 为主，最多少量 medium。
6. options 使用 A/B/C/D 风格；判断题使用 A. 正确、B. 错误。
7. answer 只填写选项字母。
8. source 固定为 ai，status 固定为 draft。
9. review_notes 用一句话标出人工审核时最该检查的数学条件或符号。
10. 题干、选项、解析必须用自己的话写，不照抄教材、PPT 或既有题目。
11. 行内公式必须用 $...$ 包住，并使用 LaTeX 风格，例如 $A^{-1}$、$\\lvert A\\rvert$、$\\frac{A^*}{\\lvert A\\rvert}$；含中文说明时把公式放在自然句子中。
12. 不出证明题、长计算题、超纲题；不使用 Sylvester 秩不等式、满秩分解或伴随矩阵秩规律。
13. 每题必须能由对应知识点的速讲、公式或易错点解释清楚。
14. 生成前逐题检查：答案唯一、答案与解析一致、适用条件完整、错误选项具有迷惑性但不含歧义。

特别数学约束：
- 行列式只对方阵定义；三阶对角线法则不能推广到四阶及以上。
- 克拉默法则要求 A 为 n 阶方阵且 |A| 不等于 0，A_i 替换的是第 i 列。
- 初等行变换中，某行乘以的常数必须非零；解方程组不能随意作列变换。
- 伴随矩阵和矩阵秩的内容只引用当前知识点已明确给出的性质。

写入草稿文件时只保留 JSON 数组；完成后的聊天回复只报告草稿题目总数、各知识点补充数量和需要人工重点复核的题目 id。
```
