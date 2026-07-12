# 团队交接与下一步分工

更新时间：2026-07-12

这份文档用于两位成员在不同电脑、不同 Git 分支上协作时快速了解项目状态，并明确下一项独立工作。

## 1. 当前项目状态

项目已是一个可本地运行的 Next.js + Tailwind CSS 学习自测 Demo，暂时不接数据库、登录系统或 DeepSeek API。

已经完成：

- 通用课程包框架：课程 -> 章节 -> 知识点 -> 自测 -> 解析 -> 错题再练。
- 首页课程包、电科线性代数与上交高等代数两个课程入口。
- 章节页、知识点速讲页、选择题/判断题自动判分。
- localStorage 学习进度、错题本与“错题再练”。
- KaTeX 公式渲染，题目中的 `$...$` 行内公式可正常显示。
- 电科线性代数第一章“矩阵及其初等变换”和第二章“行列式”已进入网页主线。
- 电科线代正式题库现有 64 道题；其中 10 个首轮核心知识点均有 5 道可自测题。
- 题库已通过 JSON 结构、兼容数据同步和 `npm.cmd run build` 验证。

当前暂不做：

- DeepSeek API 补练题、Supabase、登录、老师端、班级管理、拍照搜题。
- 大范围扩展电科线代第三章及以后内容。

## 2. Git 协作状态

- GitHub 远程仓库：`origin`。
- 当前完整 Demo 所在协作分支：`youngson`，已推送为 `origin/youngson`。
- `main` 分支仍保留，暂时不要直接在 `main` 上开发。
- 每个新任务从 `youngson` 新建独立功能分支，完成后通过 Pull Request 合并回 `youngson`。

建议同伴首次开始时执行：

```powershell
git clone https://github.com/yangson023/Young_Celin_LT.git
cd Young_Celin_LT
npm install
git fetch origin
git switch -c feature/sjtu-polynomial-content origin/youngson
```

完成后推送自己的分支：

```powershell
git add .
git commit -m "Add SJTU polynomial content draft"
git push -u origin feature/sjtu-polynomial-content
```

## 3. 同伴的第一项任务

### 任务名称

上交高等代数“多项式”内容草稿包。

### 为什么先做它

当前 `content-packs/sjtu-advanced-algebra/` 只有 2 个样例知识点和 2 道题。把“多项式”扩成一个可自测的小切片，既能验证通用网页框架，也不会与电科线代主线内容冲突。

### 工作范围

同伴本轮只处理：

```text
content-packs/sjtu-advanced-algebra/
docs/sjtu-advanced-algebra-*.md
```

不要修改：

```text
app/
components/
lib/
content-packs/uestc-linear-algebra/
data/
```

### 具体交付物

1. 根据本人正在使用的高等代数教材、课堂 PPT 或课程大纲，确认“多项式”内容是否是合适的起点；若章节名称或顺序不同，在草稿中标明原因。
2. 新建 `content-packs/sjtu-advanced-algebra/draft-polynomial-content.md`，整理 3 个左右的基础知识点。推荐方向：
   - 多项式整除与带余除法；
   - 最大公因式与辗转相除法；
   - 不可约多项式或因式分解基础。
3. 每个知识点写：一句话理解、核心定义、适用条件、1 至 3 个易错点、适合出的选择/判断题方向。
4. 新建 `content-packs/sjtu-advanced-algebra/draft-polynomial-questions.json`，先为每个知识点写 3 至 5 道 `draft` 题。
5. 所有公式使用 `$...$` 包住；题目只用 `single_choice` 和 `true_false`，不出证明题和长计算题。
6. 草稿题保留 `source: "ai"`、`status: "draft"`，不要直接改正式 `questions.json`。

### 完成标准

```text
3 个左右知识点
9 至 15 道 JSON 格式正确的草稿题
章节归属与教材一致
每题答案唯一、解析说明条件
```

同伴提交后，由 Codex 复核数学正确性、公式显示和 JSON 结构，再决定哪些内容进入正式题库。

## 4. 后续分工

| 角色 | 下一阶段负责内容 |
| --- | --- |
| 你 | 维护 `youngson` 主协作分支；体验页面、收集同学试用反馈；继续审核电科线代内容。 |
| 同伴 | 上交高等代数多项式草稿包；确认本校教材章节和术语；完成后提交功能分支。 |
| Trae | 根据已确认的教材范围批量产出知识点、题目和解析草稿。 |
| Codex | 审核草稿、合并正式 JSON、维护网页逻辑、运行构建验证、处理 Git 合并。 |

## 5. 合并规则

- Trae 或人工生成的内容先放 `draft-*.md`、`draft-*.json`，不要直接覆盖正式题库。
- 正式内容只在审核后写入 `course.json`、`chapters.json`、`knowledge-points.json`、`questions.json`。
- 同一次任务尽量只改一个课程包，避免两人同时编辑同一份 JSON。
- 合并前运行：

```powershell
npm.cmd run build
```

- 稳定成果必须 `git commit`；需要共享给对方时再 `git push`。
