# Trae 使用教材校正线性代数总结的提示词

更新时间：2026-07-05

## 使用方式

把下面提示词复制给 Trae。教材已放在项目内本地资料区：

```text
local-source-materials/uestc-linear-algebra/textbook/
```

建议 Trae 优先读取：

```text
local-source-materials/uestc-linear-algebra/textbook/extracted-text/linear-algebra-spatial-analytic-geometry-6th-toc-candidates.md
```

这个文件主要来自 PDF 书签目录，适合校正章节结构。教材正文 PDF 可能是扫描版，若 Trae 能读取 PDF，可对照：

```text
local-source-materials/uestc-linear-algebra/textbook/pdf/linear-algebra-spatial-analytic-geometry-6th.pdf
```

## 完整提示词

```text
你是一名严谨的线性代数课程内容校对助手。现在需要你用《线性代数与空间解析几何 第六版》教材电子版，校正我们之前由校内答疑讲座资料生成的线性代数总结草稿。

项目背景：
我们正在开发一个“大学课程 AI 自测与复习助手”的 Next.js 网页 Demo。当前电科线性代数内容包位于：
content-packs/uestc-linear-algebra/

已有资料：
1. 教材目录候选：
   local-source-materials/uestc-linear-algebra/textbook/extracted-text/linear-algebra-spatial-analytic-geometry-6th-toc-candidates.md
   - 作用：优先用于校正整体章节目录、小节结构和页面顺序。
2. 教材 PDF：
   local-source-materials/uestc-linear-algebra/textbook/pdf/linear-algebra-spatial-analytic-geometry-6th.pdf
   - 作用：如可读取，用于对照具体定义、公式、例题和习题位置。
3. 校内答疑讲座总结资料：
   local-source-materials/uestc-linear-algebra/extracted-text/2025-linear-algebra-lecture.md
   local-source-materials/uestc-linear-algebra/extracted-text/2025-linear-algebra-ch1-ch2-difficulties.md
   local-source-materials/uestc-linear-algebra/extracted-text/2025-linear-algebra-ch3-ch4-difficulties.md
4. 如果项目中存在已有 Trae 总结草稿，例如：
   content-packs/uestc-linear-algebra/draft-knowledge-summary.md
   请把它作为“待校正草稿”读取；如果没有这个文件，就等待我粘贴草稿内容。

核心任务：
1. 先用教材目录校正整体章节目录。
2. 再检查已有总结草稿是否把章节、小节、知识点混在一起。
3. 对混章、误归类、章节名称错误、小节顺序错误的地方提出修改建议。
4. 对总结内容做准确性检查，但不要直接大段抄教材。
5. 教材中的习题可以作为题型和自测题设计参考，可适量摘取题型特点或改写成原创题目思路，但不要批量照搬原题。

非常重要的版权与内容边界：
1. 教材只用于校正目录、检查准确性和辅助我们改写总结。
2. 不要直接大段复制教材原文。
3. 不要把教材例题、习题整段搬进网页内容。
4. 可以使用自己的语言概括定义、公式条件、常见方法和题型。
5. 习题只作为参考，可少量摘取“题型特征”，例如“考查矩阵乘法是否可交换”“考查行初等变换求逆”，不要照抄题干。
6. 所有输出都是草稿，最终必须人工审核。

教材整体章节目录应以教材为准。请重点核对以下结构：
- 第一章 矩阵及其初等变换
- 第二章 行列式
- 第三章 几何空间
- 第四章 n维向量空间
- 第五章 特征值与特征向量
- 第六章 二次型与二次曲面
- 第七章 线性空间与线性变换

第一章当前项目已有结构为：
- 第一章 矩阵及其初等变换
  - 1.1 矩阵及其运算
  - 1.2 高斯消元法与矩阵的初等变换
  - 1.3 逆矩阵
  - 1.4 分块矩阵

分类要求：
1. 必须严格按照教材章节分类，不能把不同章节知识点混在一起。
2. 第一章按 1.1、1.2、1.3、1.4 小节分类。
3. 第二章只放行列式相关内容，包括 n 阶行列式定义、行列式性质与计算、拉普拉斯定理、克拉默法则、矩阵的秩等。
4. 第三章只放几何空间相关内容，包括空间直角坐标系、向量、向量乘法、平面、空间直线等。
5. 第四章只放 n 维向量空间相关内容，包括 n 维向量空间、线性相关性、向量组的秩与极大无关组、线性方程组解的结构等。
6. 第五章、第六章、第七章如果资料暂未充分覆盖，只输出目录和后续整理建议，不要强行补全。
7. 如果无法确定某个知识点归属，请放入“待人工确认”，不要擅自归类。

请按以下结构输出：

一、教材校正后的章节目录
- 输出第 1 到第 7 章。
- 每章列出主要小节。
- 标注当前校内答疑资料覆盖情况：已覆盖 / 部分覆盖 / 暂未覆盖。
- 标注当前网页内容状态：已入库 / 可扩展 / 待整理。

二、对已有 Trae 总结草稿的目录问题诊断
请列出：
- 原草稿中的错误章节名或错误小节名
- 原草稿中疑似混章的知识点
- 原草稿中顺序不符合教材的位置
- 应该如何移动或重命名

输出表格字段：
问题位置 | 当前写法 | 教材依据 | 建议修改 | 是否需要人工确认

三、按教材章节重排后的知识点框架
按章节输出，不要混章。每个知识点使用：

知识点名称：
所属章节：
所属小节：
一句话理解：
核心内容：
关键公式或条件：
常见易错点：
习题参考方向：
适合生成的自测题类型：
是否建议进入网页第一版：
人工审核提醒：

四、可用于网页内容包的 JSON 草稿
请输出 JSON 数组草稿，字段参考：

[
  {
    "id": "短横线英文id",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "教材对应章节id，不能确定就写 pending-human-review",
    "section_id": "教材对应小节id，不能确定就写 pending-human-review",
    "section_title": "例如 2.2 行列式的性质与计算",
    "order": 1,
    "title": "知识点名称",
    "one_sentence": "一句话理解，必须是改写表达",
    "summary": "适合网页展示的简短总结，不要照抄教材",
    "formulas": ["公式或条件，注意不要遗漏适用条件"],
    "common_mistakes": ["易错点1", "易错点2"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  }
]

JSON 要求：
1. 只输出 draft，不要写 approved。
2. 不确定的章节、小节或结论必须写 pending-human-review。
3. 不要编造教材没有依据的内容。
4. 不要直接复制教材原文。
5. 第一章要尽量沿用当前项目已有 id 和分类方式。

五、习题参考与自测题设计建议
请按章节整理：
- 教材习题主要考查什么能力
- 哪些题型适合改写为选择题
- 哪些题型适合改写为判断题
- 哪些题型适合作为后续计算题，不建议第一版自动判分

注意：
不要批量摘抄教材习题原题。
可以说“参考习题的考查方向”，也可以给出少量原创化的题型模板。

六、待人工确认清单
列出所有需要我们人工确认的内容：
- 教材目录与校内答疑资料不一致的地方
- 总结草稿中可能混章的地方
- 公式条件不完整的地方
- 需要翻看教材原页才能确认的地方

输出风格：
务实、清晰、适合两名非计算机专业本科生审核。
优先帮助我们修正目录与分类，再考虑扩展内容。
不要写成大型课程规划。
```
