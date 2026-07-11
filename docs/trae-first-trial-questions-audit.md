# 第一轮自测题草稿审核

审核对象：`content-packs/uestc-linear-algebra/draft-first-trial-questions.json`

审核范围：第一章与第二章的 10 个核心知识点，共 35 道 AI 草稿题。审核只决定是否适合进入下一轮人工复核，**不等于正式入库**。

## 入库结果

2026-07-11，Trae 已完成 7 处定向修订，Codex 已复核修订内容、题目 ID 和题目数量。这 35 道题现已合并到正式 `content-packs/uestc-linear-algebra/questions.json`，并同步到 `data/questions.json`。

- 正式题库中的这批题保留 `source: "ai"`，如实标记 AI 草稿来源。
- 题目状态已改为 `status: "approved"`，因此可以被网页自测页读取。
- 草稿文件仍保留 `status: "draft"`，作为生成与审核过程记录。

## 结论

| 结论 | 数量 | 处理方式 |
| --- | ---: | --- |
| 可进入人工复核 | 28 | 数学结论、章节归属和题型均合适。 |
| 修改后进入人工复核 | 6 | 先按本文件的改法收紧条件或措辞。 |
| 暂不采用 | 1 | 存在标准答案与题干事实相反的硬错误。 |

这批草稿的章节归属、题目 ID、`source: "ai"` 和 `status: "draft"` 均符合约定。判断题使用两个选项是当前项目的数据格式，不是问题。

## 可进入人工复核的题目

```text
q-matrix-multiplication-002
q-matrix-multiplication-003
q-matrix-multiplication-004
q-matrix-multiplication-005
q-gaussian-002
q-gaussian-004
q-gaussian-005
q-transform-equivalence-002
q-transform-equivalence-005
q-inverse-def-003
q-inverse-def-004
q-inverse-def-005
q-inverse-row-reduction-002
q-inverse-row-reduction-004
q-inverse-row-reduction-005
q-determinant-definition-003
q-determinant-definition-004
q-determinant-definition-005
q-determinant-properties-003
q-determinant-properties-005
q-cofactor-expansion-003
q-cofactor-expansion-004
q-cofactor-expansion-005
q-cramer-rule-003
q-cramer-rule-004
q-matrix-rank-003
q-matrix-rank-004
q-matrix-rank-005
```

## 需要修改的题目

| 题目 ID | 问题 | 修改要求 |
| --- | --- | --- |
| `q-gaussian-003` | “首元素”容易被理解为每行第一个元素。 | 改为“每个非零行的首个非零元素”。 |
| `q-transform-equivalence-003` | 数学判断正确，但解析中标注相似、合同、正交所在章节没有必要，且不同教材的章节安排可能不同。 | 删除章节编号，只保留“这些是不同的矩阵概念”。 |
| `q-transform-equivalence-004` | `k=0` 不一定每次都改变秩，例如原行已经为零行。 | 解释改为“`k=0` 的变换不可逆，不能作为初等行变换，会破坏矩阵等价的可逆性”。 |
| `q-inverse-row-reduction-003` | “最终左边不能化成”可能只是某次计算没有做完，逻辑不够严谨。 | 题干改为“若 `A` 不能经有限次行初等变换化为单位矩阵 `I`”。 |
| `q-determinant-properties-004` | “对应元素成比例”应明确为一个行向量是另一个行向量的数倍。 | 题干改为“若一个行列式有两行（或两列）中，一行是另一行的数倍”。 |
| `q-cramer-rule-005` | 题干没有写明克拉默法则成立的前提。 | 题干补充“设 `A` 为 n 阶方阵且 `$\\lvert A\\rvert\\ne0$`”。 |

## 暂不采用的题目

### `q-inverse-def-002`

题干已明确 `A`、`B` 都是同阶方阵，且 `$AB=I$`。在这个条件下，单侧逆必然也是双侧逆，因此 `B` 确实是 `A` 的逆矩阵。原草稿把答案标为 `B. 错误`，与数学事实相反。

这道题不应以“定义要求同时验证两个方向”为理由判错。定义与定理要分开：初学时可以要求学生按定义验证 `$AB=BA=I$`，但不能否认方阵单侧逆定理。

第一版暂不采用此题，避免引入额外定理证明。若后续需要重写，可改成：

```text
若方阵 A 与 B 满足 AB=BA=I，则 B 是 A 的逆矩阵。
```

## 公式写法约定

自测题中的 LaTeX 公式统一用 `$...$` 包住。例如：

```text
设 A 为 n 阶方阵且 $\lvert A\rvert\ne0$。
$x_i=\frac{\lvert A_i\rvert}{\lvert A\rvert}$
```

网页的 `MathText` 已支持这种行内写法并交给 KaTeX 渲染。没有 `$...$` 的普通中文与简单上、下标仍按原方式显示。

## 下一轮协作

1. Trae 按“需要修改的题目”表修订 6 道题，删除 `q-inverse-def-002`，继续保持 `draft` 状态。
2. 两位项目成员从每个知识点抽查 1 到 2 道题，确认符合电科本课程的术语和考试范围。
3. Codex 只在人工确认后，把通过的题目合并到正式 `questions.json`，同步兼容数据并运行构建测试。
