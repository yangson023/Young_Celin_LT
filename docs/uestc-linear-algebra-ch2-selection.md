# 电科线性代数第二章入库说明

更新时间：2026-07-08

## 本次入库范围

电科线性代数内容包已从第一章扩展到第二章：

```text
第二章 行列式
2.1 n阶行列式的定义
2.2 行列式的性质与计算
2.3 拉普拉斯定理
2.4 克拉默法则
2.5 矩阵的秩
```

本次只选择适合当前 Demo 的主线内容，不一次性扩完整门课程。

## 入库知识点

第二章新增 7 个知识点，当前均为 `draft`：

```text
determinant-definition
determinant-properties-calculation
cofactor-expansion
laplace-theorem
cramer-rule
adjoint-matrix-core-properties
matrix-rank-concept-calculation
```

这些知识点承接第一章的逆矩阵、线性方程组和初等变换，同时为后续 n 维向量空间、特征值与特征向量打基础。

## 自测题状态

第二章新增基础题 14 道：

```text
source: manual
status: approved
```

题型只使用当前 Demo 已支持的：

```text
single_choice
true_false
```

暂不加入需要长步骤输入的计算题。

## Trae 草稿修订说明

本次基于 `content-packs/uestc-linear-algebra/next-batch-selection.md` 做了保守修订：

- `n阶行列式的定义` 只保留定义、二阶和三阶基本计算；余子式和展开拆到单独知识点。
- `代数余子式与按行列展开` 单独作为 2.2 小节知识点。
- `伴随矩阵` 第一版只保留定义、`AA*=A*A=|A|I` 和 `|A|≠0` 时的求逆公式。
- `拉普拉斯定理` 只做概念和适用场景，不展开复杂证明。
- `矩阵秩` 保持基础概念和计算方法，暂不加入 Sylvester 秩不等式。

## 暂缓内容

以下内容暂不进入网页主线：

```text
Sylvester 秩不等式
满秩分解
等价标准形的严格证明
高阶行列式技巧大汇总
复杂抽象行列式计算
可逆矩阵等价条件的大型总结
```

这些内容可以后续作为考试提高或章末总结，再由人工审核后加入。
