# 线性代数开放资料来源库

更新时间：2026-06-25

## 使用原则

本文件只保存公开资料的索引、摘要和使用建议，不保存教材、课程、网页或视频的完整内容。

项目内容生产时遵守：

- 优先使用本校教材、老师 PPT、课堂笔记确定考试范围和讲法。
- 公开资料只作为补充参考，用于交叉验证概念、题型和表达方式。
- 不直接复制大段原文到产品前台。
- 不把第三方资料整本、整页或完整视频文稿存入仓库。
- 生成知识点卡片和题目时，必须用团队自己的语言重写并人工审核。

## 已收录来源

### 1. MIT OpenCourseWare 18.06 Linear Algebra

- URL: https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/
- 类型：大学线性代数公开课程
- 适合用途：课程结构参考、章节顺序参考、题目风格参考、考试和作业资源参考
- 重点覆盖：方程组、向量空间、行列式、特征值、相似、正定矩阵等
- 许可提示：MIT OCW 页面标注 Creative Commons License，具体复用时需要遵守其条款和署名要求
- 项目建议：不要直接搬运题目和解答；可参考课程结构来检查本校线代知识点覆盖是否完整

### 2. Open Textbook Library: Linear Algebra with Applications

- URL: https://open.umn.edu/opentextbooks/textbooks/linear-algebra-with-applications
- 类型：开放教材索引
- 作者：W. Keith Nicholson
- 适合用途：知识体系参考、章节目录参考、概念讲解交叉验证、题型范围参考
- 重点目录：线性方程组、矩阵代数、行列式与对角化、向量几何、向量空间、线性变换、正交性等
- 许可提示：页面标注 CC BY-NC-SA
- 项目建议：适合辅助你们整理知识点地图，但产品展示内容仍应改写成本校风格总结

### 3. Mathematics LibreTexts: Linear Algebra Bookshelves

- URL: https://math.libretexts.org/Bookshelves/Linear_Algebra
- 类型：开放数学教材集合
- 适合用途：查找不同线代教材的定义、例题组织方式、矩阵/行列式/方程组讲解角度
- 重点资源：A First Course in Linear Algebra、Fundamentals of Matrix Algebra、Interactive Linear Algebra 等
- 许可提示：LibreTexts 页面通常有开放许可说明，但不同子书可能需要分别确认
- 项目建议：适合作为“概念解释对照库”，不要直接批量抓取完整章节

### 4. Khan Academy Linear Algebra

- URL: https://www.khanacademy.org/math/linear-algebra
- 类型：在线学习课程
- 适合用途：通俗解释方式参考、学习路径参考、视频化讲解节奏参考
- 许可提示：需遵守 Khan Academy 使用条款，不建议复制其原文、练习题或视频字幕
- 项目建议：适合学习如何把概念讲得更容易懂，不适合直接作为题库来源

### 5. 3Blue1Brown: Essence of Linear Algebra

- URL: https://www.3blue1brown.com/topics/linear-algebra
- 类型：可视化线性代数课程
- 适合用途：概念直觉参考，尤其是向量、矩阵变换、特征值等抽象概念
- 许可提示：使用时需遵守 3Blue1Brown 站点和视频平台的许可/使用规则
- 项目建议：适合帮助你们写“一句话理解”和“直觉解释”，不适合直接复制图像、文案或视频内容

## 建议的资料处理流程

```text
本校教材 / PPT / 课堂笔记
-> 确定本校考试范围和老师讲法
-> 查开放资料做概念交叉验证
-> AI 生成知识点卡片初稿
-> 人工审核、改写、补充例题和易错点
-> 存入项目知识点 JSON / Markdown
```

## 下一步可扩展

后续如果需要更自动化，可以新增：

- `scripts/source_collect.py`：读取白名单 URL 并生成来源索引
- `data/source-index.json`：机器可读资料库
- `data/knowledge-points.seed.json`：由人工审核后的知识点卡片构成的种子数据

当前阶段建议先手动审核来源，不做大规模爬虫。
