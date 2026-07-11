# Trae 第一轮草稿定向修订提示词

将下面完整提示词发送给 Trae。它只修订草稿文件，不修改网页代码和正式题库。

```text
你是“大学课程 AI 自测与复习助手”项目的内容草稿助手。请根据审核结论，定向修订第一轮线性代数自测题草稿。

先阅读：
1. content-packs/uestc-linear-algebra/draft-first-trial-questions.json
2. docs/trae-first-trial-questions-audit.md
3. content-packs/uestc-linear-algebra/knowledge-points.json

只修改：
content-packs/uestc-linear-algebra/draft-first-trial-questions.json

不要修改：
- content-packs/uestc-linear-algebra/questions.json
- data/questions.json
- 任何网页代码、组件或配置

总规则：
1. 最终仍保留 35 道题，10 个目标知识点各有原计划数量。
2. 保持所有题目的 source 为 ai、status 为 draft、difficulty 为 basic。
3. 保留已有的 $...$ 行内公式包裹；新增或改写的公式也必须使用 $...$。
4. 除下列 7 个题目外，不改动其他题目的题干、选项、答案和解析。
5. 输出必须是合法 JSON 数组，不能夹带 Markdown。

请按以下要求逐题修订：

一、q-gaussian-003
- 题干中的“非零行的首元素”改为“每个非零行的首个非零元素”。
- 解析中同样使用“首个非零元素（主元）”。

二、q-transform-equivalence-003
- 保留题干、选项和答案。
- 解析删除“第五章、第六章、第三章”等章节编号。
- 改为说明：相似、合同、正交是不同的矩阵概念，不适用于只作初等行变换的情形。

三、q-transform-equivalence-004
- 保留题干、选项和答案。
- 解析不要说“k=0 一定改变矩阵的秩”。
- 改为：k=0 的倍乘不可逆，不能作为初等行变换；初等行变换要求 k 不等于 0。

四、q-inverse-row-reduction-003
- 题干改为：
  “若方阵 A 不能经有限次行初等变换化为单位矩阵 $I$，这说明什么？”
- 保留答案 B。
- 解析说明：A 可逆当且仅当 A 能经有限次行初等变换化为 I。

五、q-determinant-properties-004
- 题干改为：
  “若一个行列式有两行中，一行是另一行的数倍，则该行列式的值等于？”
- 保留答案 B。
- 解析可以说明：若其中一行是零行，行列式也为零；不需要讨论“成比例”是否包含零行的术语争议。

六、q-cramer-rule-005
- 题干改为：
  “设 A 为 n 阶方阵且 $\lvert A\rvert\ne0$。用克拉默法则解方程组 $AX=b$ 时，第 3 个未知量 $x_3$ 的表达式是？”
- 保留选项、答案 B 和解析核心结论。

七、q-inverse-def-002
- 不能保留原题“AB=I 则 B 一定是 A 的逆矩阵，答案为错误”。这在同阶方阵条件下是错误命题。
- 用同一个 id 替换为以下安全、基础且不超纲的判断题：
  - stem：按逆矩阵的定义，若要直接验证方阵 B 是方阵 A 的逆矩阵，需要同时验证 $AB=I$ 和 $BA=I$。
  - options：["A. 正确", "B. 错误"]
  - answer：A
  - explanation：逆矩阵的定义要求 $AB=BA=I$。这里讨论的是按定义直接验证；同阶方阵单侧逆可推出双侧逆是额外定理，不作为本题考查内容。
  - tags：保留“逆矩阵”“定义”
  - review_notes：提醒人工确认“按定义直接验证”这一限定语已保留。

完成后执行 JSON 校验，并在聊天回复中只报告：
1. 题目总数；
2. 是否仍为 35 题；
3. 修改的 7 个题目 ID；
4. JSON 校验结果。
```
