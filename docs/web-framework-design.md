# 通用课程自测网页框架设计

更新时间：2026-06-28

## 1. 设计目标

当前阶段先设计一个通用网页框架，而不是只为某一门课写死页面。

产品形态：

```text
通用课程自测复习网页框架 + 少量独立课程内容包
```

第一批课程内容包可以是：

- 电科线性代数
- 上交数学系高等代数

核心原则：

```text
页面框架共用，课程内容独立。
```

## 2. 不做什么

当前阶段不做完整学习平台。

暂时不做：

- 复杂学校系统
- 复杂用户权限
- 教师端
- 班级管理
- 支付系统
- 大规模课程市场
- 拍照搜题
- 证明题完全自动批改

## 3. 通用学习流程

所有课程都共用这一套流程：

```text
选择课程包
-> 选择章节
-> 选择知识点
-> 阅读知识点速讲
-> 完成自测题
-> 查看判分和解析
-> 记录错题
-> AI 生成补练题
-> 查看薄弱点反馈
```

不同课程只改变：

- 章节结构
- 知识点内容
- 题型策略
- 判分方式
- AI Prompt 约束

## 4. 页面结构

第一版页面建议：

```text
/
/courses
/courses/[courseId]
/courses/[courseId]/chapters/[chapterId]
/courses/[courseId]/knowledge/[knowledgePointId]
/courses/[courseId]/quiz/[knowledgePointId]
/result
/wrong
```

页面说明：

| 页面 | 作用 |
|---|---|
| `/` | 进入 Demo，展示课程包入口 |
| `/courses` | 课程包列表 |
| `/courses/[courseId]` | 某门课程的章节和学习概览 |
| `/courses/[courseId]/chapters/[chapterId]` | 章节下的知识点列表 |
| `/courses/[courseId]/knowledge/[knowledgePointId]` | 知识点速讲、公式、例题、易错点 |
| `/courses/[courseId]/quiz/[knowledgePointId]` | 当前知识点自测 |
| `/result` | 本次答题结果和反馈 |
| `/wrong` | 错题本 |

## 5. 主界面设计

主界面指用户打开网页后看到的第一个可操作页面，对应路由：

```text
/
```

第一版主界面不要做成宣传落地页，而是直接做成学习入口。

核心目标：

```text
让学生在 5 秒内知道能选哪门课，并能立刻进入学习或自测。
```

### 5.1 主界面信息层级

主界面从上到下建议分为 5 个区域：

1. 顶部栏
2. 当前学习入口
3. 课程包选择
4. 快速自测入口
5. 最近错题 / 使用提示

### 5.2 桌面端布局

桌面端推荐两栏布局：

```text
┌──────────────────────────────────────────────┐
│ 顶部栏：产品名 / 错题本 / 简单设置            │
├──────────────────────────────────────────────┤
│ 左侧主区域                         │ 右侧窄栏 │
│                                    │          │
│ 当前学习入口                        │ 学习记录 │
│ 课程包选择                          │ 错题入口 │
│ 快速自测入口                        │ 反馈入口 │
└──────────────────────────────────────────────┘
```

主区域宽一些，用来放课程卡片；右侧窄栏只放轻量信息，不做复杂仪表盘。

### 5.3 移动端布局

移动端采用单列布局：

```text
顶部栏
当前学习入口
课程包选择
快速自测入口
错题入口
```

移动端优先保证：

- 课程卡片容易点击
- 按钮高度足够
- 不出现横向滚动
- 不把很多信息挤在一屏

### 5.4 顶部栏

顶部栏内容：

```text
左侧：课程自测助手
右侧：错题本 / 反馈
```

第一版不需要复杂导航，不需要登录头像，不需要学校切换器。

如果必须记录用户，先使用：

```text
邀请码 + 昵称
```

### 5.5 当前学习入口

用于让学生快速继续上次学习。

有记录时显示：

```text
继续学习：电科线性代数 · 矩阵初等变换
按钮：继续
```

没有记录时显示：

```text
从一门课程开始自测
按钮：选择课程
```

第一版可以先用 localStorage 保存最近进入的课程和知识点。

### 5.6 课程包选择

课程卡片是主界面最重要的区域。

第一批课程卡片：

```text
电科线性代数
面向：工科本科生
重点：矩阵运算、高斯消元、逆矩阵、分块矩阵
状态：可试用

上交高等代数
面向：数学系本科生
重点：证明、线性空间、多项式、线性映射
状态：样例内容
```

课程卡片字段：

```text
课程名
学校
适用对象
重点标签
当前状态
知识点数量
题目数量
主按钮：进入课程
```

课程状态建议：

```text
active：可试用
draft：样例内容
coming_soon：待整理
```

### 5.7 快速自测入口

快速自测用于降低使用门槛。

第一版可以提供：

```text
随机 5 题自测
薄弱点复习
最近错题再练
```

如果数据不足，先只做：

```text
进入课程后再自测
```

不要为了快速自测提前增加复杂推荐算法。

### 5.8 最近错题 / 轻量记录

主界面可以显示一个轻量错题入口：

```text
错题本：3 道待复习
按钮：查看错题
```

第一版只统计 localStorage 中的错题数量即可。

### 5.9 主界面组件

建议组件：

```text
AppHeader
ContinueLearningPanel
CourseCard
CourseGrid
QuickPracticePanel
WrongQuestionShortcut
```

不要一开始做复杂组件库。组件只要能支撑当前页面即可。

### 5.10 主界面首版验收标准

主界面完成的最低标准：

```text
能看到产品名
能看到至少 2 个课程包
能区分课程状态
能点击进入课程详情
能在手机宽度下正常显示
没有文字重叠或按钮过小
```

## 6. 数据文件结构

第一版先使用本地 JSON：

```text
data/
  courses.json
  chapters.json
  knowledge-points.json
  questions.json
```

后续再考虑：

```text
Supabase / PostgreSQL
```

## 7. 课程数据结构

`courses.json` 示例：

```json
[
  {
    "id": "uestc-linear-algebra",
    "title": "线性代数",
    "school": "电子科技大学",
    "audience": "工科本科生",
    "level": "standard",
    "focus": ["矩阵运算", "高斯消元", "逆矩阵", "分块矩阵"],
    "status": "active"
  },
  {
    "id": "sjtu-advanced-algebra",
    "title": "高等代数",
    "school": "上海交通大学",
    "audience": "数学系本科生",
    "level": "advanced",
    "focus": ["证明", "抽象结构", "线性空间", "多项式"],
    "status": "draft"
  }
]
```

## 8. 章节数据结构

`chapters.json` 示例：

```json
[
  {
    "id": "matrix",
    "course_id": "uestc-linear-algebra",
    "title": "矩阵",
    "order": 2,
    "summary": "矩阵运算、初等变换、逆矩阵和秩。"
  },
  {
    "id": "vector-space",
    "course_id": "sjtu-advanced-algebra",
    "title": "线性空间",
    "order": 3,
    "summary": "线性空间、子空间、基、维数和坐标。"
  }
]
```

## 9. 知识点数据结构

`knowledge-points.json` 示例：

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
    "common_mistakes": ["行变换和列变换混用", "求逆时忘记同步变换单位矩阵"],
    "question_types": ["single_choice", "true_false", "fill_blank"],
    "review_status": "approved"
  }
]
```

## 10. 题目数据结构

`questions.json` 示例：

```json
[
  {
    "id": "q001",
    "course_id": "uestc-linear-algebra",
    "knowledge_point_id": "elementary-row-operations",
    "type": "single_choice",
    "difficulty": "basic",
    "stem": "下列哪一种操作属于矩阵的初等行变换？",
    "options": ["A. 将某一行乘以 0", "B. 交换矩阵的两行", "C. 删除矩阵的一列", "D. 任意改变元素位置"],
    "answer": "B",
    "explanation": "初等行变换包括交换两行、某一行乘以非零常数、某一行加上另一行的倍数。",
    "tags": ["矩阵", "初等变换"],
    "source": "manual",
    "status": "approved"
  }
]
```

## 11. 不同课程的题型策略

### 线性代数

优先支持：

- 单选题
- 判断题
- 简单填空题
- 结果唯一的计算题

适合自动判分。

### 高等代数

优先支持：

- 概念判断题
- 单选题
- 填空题
- 证明思路题

证明题第一版不做完全自动判分，建议采用：

```text
学生提交思路
-> AI 给出参考证明结构
-> 学生对照检查
-> 自我标记掌握情况
```

## 12. 组件设计

建议组件：

```text
AppHeader
ContinueLearningPanel
CourseCard
CourseGrid
QuickPracticePanel
WrongQuestionShortcut
ChapterList
KnowledgeCard
KnowledgeDetail
QuestionCard
OptionButton
QuizProgress
ResultSummary
WrongQuestionItem
AiPracticePanel
```

第一版避免过度抽象。组件只服务当前页面，不急着做复杂组件库。

## 13. 首个可运行版本

最小版本目标：

```text
能打开网页
-> 看到课程包列表
-> 进入一门课程
-> 选择一个知识点
-> 做 5 道题
-> 自动判分
-> 查看解析
```

这个版本先不需要：

- 登录
- 数据库
- AI
- 部署

等最小闭环跑通后再加入：

```text
localStorage 错题记录
DeepSeek API 补练题
部署试用链接
Supabase 数据库
```

## 14. 当前建议

先做一个通用壳子，但内容不要铺太开。

第一轮推荐：

```text
电科线性代数：做完整闭环
上交高等代数：先放少量样例知识点，用来验证多课程结构
```

这样既能证明框架可扩展，又不会被内容量拖住。
