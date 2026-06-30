# 课程内容包维护说明

更新时间：2026-06-30

## 1. 目录结构

每门课程单独放在 `content-packs/` 下面：

```text
content-packs/
  uestc-linear-algebra/
    course.json
    chapters.json
    knowledge-points.json
    questions.json
  sjtu-advanced-algebra/
    course.json
    chapters.json
    knowledge-points.json
    questions.json
```

当前前端会从这些内容包聚合数据。旧的 `data/*.json` 暂时保留，作为早期 Demo 的兼容参考。

## 2. 新增课程包

复制一个已有课程包目录，然后改名：

```text
content-packs/new-course-id/
```

至少需要 4 个文件：

```text
course.json
chapters.json
knowledge-points.json
questions.json
```

新增课程包后，还需要在 `lib/data.ts` 中导入这 4 个 JSON 文件，并加入对应的聚合数组。当前阶段为了让结构清楚，暂时不做自动扫描脚本。

## 3. course.json

一门课程一个对象。

```json
{
  "id": "uestc-linear-algebra",
  "title": "线性代数",
  "school": "电子科技大学",
  "audience": "工科本科生",
  "level": "standard",
  "focus": ["计算", "矩阵", "方程组"],
  "status": "active",
  "description": "课程说明"
}
```

注意：

- `id` 必须唯一。
- 后续章节、知识点和题目的 `course_id` 都要等于这个 `id`。
- `status` 可用：`active`、`draft`、`coming_soon`。

## 4. chapters.json

一门课可以有多个章节。

```json
[
  {
    "id": "matrix",
    "course_id": "uestc-linear-algebra",
    "title": "矩阵",
    "order": 2,
    "summary": "矩阵运算、初等变换、逆矩阵和秩。"
  }
]
```

注意：

- 同一门课下 `id` 不要重复。
- `order` 控制章节排序。

## 5. knowledge-points.json

知识点挂在某个章节下面。

```json
[
  {
    "id": "elementary-row-operations",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "matrix",
    "title": "矩阵初等变换",
    "one_sentence": "通过行或列的基本变换，把矩阵化成更容易计算的形式。",
    "summary": "矩阵初等变换包括交换两行、某一行乘以非零常数、某一行加上另一行的倍数。",
    "formulas": [],
    "common_mistakes": ["行变换和列变换混用"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "approved"
  }
]
```

注意：

- `chapter_id` 必须对应本课程 `chapters.json` 中的章节。
- `review_status` 可用：`approved`、`draft`。
- AI 生成的知识点总结必须人工审核后再改成 `approved`。

## 6. questions.json

题目挂在某个知识点下面。

```json
[
  {
    "id": "q-row-001",
    "course_id": "uestc-linear-algebra",
    "knowledge_point_id": "elementary-row-operations",
    "type": "single_choice",
    "difficulty": "basic",
    "stem": "下列哪一种操作属于矩阵的初等行变换？",
    "options": ["A. 将某一行乘以 0", "B. 交换矩阵的两行", "C. 删除矩阵的一列", "D. 任意改变矩阵元素位置"],
    "answer": "B",
    "explanation": "矩阵初等行变换包括交换两行、某一行乘以非零常数、某一行加上另一行的倍数。",
    "tags": ["矩阵", "初等变换"],
    "source": "manual",
    "status": "approved"
  }
]
```

当前第一版适合的题型：

```text
single_choice
true_false
```

注意：

- `id` 必须唯一。
- `knowledge_point_id` 必须对应本课程的知识点。
- `answer` 目前使用选项字母，例如 `A`、`B`。
- `status` 为 `approved` 的题目才会出现在自测中。

## 7. 两人协作建议

```text
一人维护一个课程包目录。
改内容时尽量只改自己负责的课程包。
新增题目后先本地运行自测页面检查。
完成一个小批次内容后及时 git commit。
```
