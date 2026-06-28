# 线性代数 AI 自测 Demo：10 类知识讲解

适用对象：两名非计算机专业本科生，用低成本方式做出一个可试用的线性代数 AI 自测复习网页。

学习主线：

```text
知识点学习 -> 自测练习 -> 自动判分 -> 查看解析 -> 错题记录 -> AI 补练 -> 薄弱点反馈
```

总原则：先做小 Demo，再扩展。第一版优先使用 `Next.js + Tailwind CSS + 本地 JSON + localStorage + DeepSeek API`。Supabase 等数据库能力可以等试点有效后再加。

## 1. HTML + CSS + JavaScript

这一类负责：理解网页最底层由什么组成，以及按钮点击后页面为什么会变化。

这一类不负责：组件化、路由、部署、数据库、AI 接口。

### 最小必学内容

HTML 负责页面结构。你可以把它理解成网页的骨架：

- `h1`：标题
- `p`：段落
- `button`：按钮
- `input`：输入框
- `ul` / `li`：列表
- `div`：分组容器

CSS 负责外观。先只掌握这些：

- 字体大小：`font-size`
- 颜色：`color`、`background`
- 间距：`padding`、`margin`
- 边框：`border`
- 布局：`display: flex`

JavaScript 负责交互。Demo 里最重要的是：

- 变量：保存一个值
- 数组：保存一组题目
- 对象：保存一道题或一个知识点
- 函数：把一段操作包装起来
- 条件判断：判断答案对不对
- 循环：逐个显示知识点或题目
- 点击事件：点击按钮后执行代码

### 一个最小自测例子

```html
<h1>矩阵初等变换自测</h1>
<p id="question">交换矩阵的两行属于初等行变换吗？</p>
<button onclick="checkAnswer(true)">是</button>
<button onclick="checkAnswer(false)">不是</button>
<p id="result"></p>

<script>
  function checkAnswer(userAnswer) {
    const correctAnswer = true;
    const result = document.getElementById("result");

    if (userAnswer === correctAnswer) {
      result.textContent = "答对了：交换两行是初等行变换。";
    } else {
      result.textContent = "再想想：初等行变换包括交换两行。";
    }
  }
</script>
```

先看懂这段代码即可。它已经包含了按钮、函数、变量、条件判断和页面文字更新。

### Demo 中会怎么用

```js
const questions = [
  {
    stem: "下列哪一个属于矩阵初等行变换？",
    options: ["交换两行", "删除一列", "任意移动元素"],
    answer: "交换两行"
  }
];

function isCorrect(userChoice, question) {
  return userChoice === question.answer;
}
```

这里的 `questions` 是数组，一道题是对象，`isCorrect` 是判分函数。

### 3 个小练习

1. 做一个按钮，点击后把页面上的文字改成“开始自测”。
2. 写一个数组，里面放 3 个线性代数知识点名称，然后用循环打印出来。
3. 写一个函数，输入学生选择和正确答案，返回 `true` 或 `false`。

## 2. React 基础

这一类负责：把页面拆成可复用的小块，并让页面根据学生操作自动更新。

这一类不负责：项目路由、后端接口、部署、数据库。

### 为什么需要 React

HTML + JavaScript 可以做简单页面，但自测 Demo 会有很多重复结构：

- 知识点卡片
- 题目卡片
- 选项按钮
- 结果反馈
- 错题列表

React 的核心思路是：把重复界面拆成组件，把会变化的数据放进状态。

### 组件

组件就是一块可以复用的页面。

```jsx
function KnowledgeCard({ title, summary }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{summary}</p>
    </article>
  );
}
```

使用时：

```jsx
<KnowledgeCard
  title="矩阵初等变换"
  summary="通过行变换或列变换，把矩阵化成更容易计算的形式。"
/>
```

### props

`props` 是父组件传给子组件的数据。比如知识点列表页把每个知识点的标题传给 `KnowledgeCard`。

```jsx
function OptionButton({ option, onChoose }) {
  return <button onClick={() => onChoose(option)}>{option}</button>;
}
```

`option` 是显示内容，`onChoose` 是点击后要执行的函数。

### useState

`useState` 用来保存会变化的数据，比如学生选了哪个答案。

```jsx
"use client";

import { useState } from "react";

function QuizCard() {
  const [selected, setSelected] = useState("");

  return (
    <div>
      <p>交换矩阵两行属于初等行变换吗？</p>
      <button onClick={() => setSelected("是")}>是</button>
      <button onClick={() => setSelected("不是")}>不是</button>
      <p>你选择了：{selected || "还没有选择"}</p>
    </div>
  );
}
```

### 列表渲染

用于显示知识点列表和题目选项。

```jsx
const points = ["行列式", "矩阵", "线性方程组"];

function KnowledgeList() {
  return (
    <ul>
      {points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
}
```

### 条件渲染

用于提交答案后显示结果。

```jsx
{isSubmitted && (
  <p>{selected === answer ? "答对了" : "答错了，请看解析"}</p>
)}
```

### 表单输入

用于输入邀请码、昵称或搜索知识点。

```jsx
const [nickname, setNickname] = useState("");

<input
  value={nickname}
  onChange={(event) => setNickname(event.target.value)}
  placeholder="请输入昵称"
/>;
```

## 3. Next.js 基础

这一类负责：组织项目文件、创建页面路由、读取本地数据、提供简单后端接口。

这一类不负责：复杂服务端渲染理论、数据库设计、AI Prompt 细节。

### 推荐项目结构

```text
app/
  page.jsx
  knowledge/
    page.jsx
    [id]/
      page.jsx
  quiz/
    page.jsx
  result/
    page.jsx
  api/
    generate-practice/
      route.js
components/
  KnowledgeCard.jsx
  QuizCard.jsx
data/
  knowledge-points.json
  questions.json
```

### 页面路由

Next.js App Router 中，文件夹对应网址：

```text
app/page.jsx                    -> /
app/knowledge/page.jsx          -> /knowledge
app/knowledge/[id]/page.jsx     -> /knowledge/matrix-row-operations
app/quiz/page.jsx               -> /quiz
app/result/page.jsx             -> /result
```

### 读取本地 JSON

```jsx
import knowledgePoints from "@/data/knowledge-points.json";

export default function KnowledgePage() {
  return (
    <main>
      <h1>知识点列表</h1>
      {knowledgePoints.map((point) => (
        <article key={point.id}>
          <h2>{point.title}</h2>
          <p>{point.summary}</p>
        </article>
      ))}
    </main>
  );
}
```

### 简单 API Route

Next.js 当前 App Router 推荐用 `app/api/.../route.js` 这种 Route Handler。它使用标准 `Request` 和 `Response` API。

```js
// app/api/generate-practice/route.js
export async function POST(request) {
  const body = await request.json();

  return Response.json({
    message: "收到请求",
    knowledgePoint: body.knowledgePoint,
    wrongQuestionIds: body.wrongQuestionIds
  });
}
```

浏览器访问页面时用：

```text
http://localhost:3000
http://localhost:3000/knowledge
http://localhost:3000/quiz
```

## 4. Tailwind CSS

这一类负责：让页面干净、清楚、适合手机和电脑访问。

这一类不负责：写交互逻辑、路由、数据、AI 接口。

### Tailwind 是什么

Tailwind 把常见 CSS 写成一个个 class。你不用先取类名再写 CSS，而是直接在元素上组合样式。

```jsx
<button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
  提交答案
</button>
```

### 常用 class

布局：

```text
min-h-screen max-w-4xl mx-auto grid flex items-center justify-between gap-4
```

间距：

```text
p-4 p-6 px-4 py-2 mt-4 mb-6 space-y-4
```

字体：

```text
text-sm text-base text-lg text-2xl font-medium font-semibold leading-7
```

颜色：

```text
bg-white bg-slate-50 text-slate-900 text-slate-600 border-slate-200
```

边框和阴影：

```text
border rounded-md shadow-sm
```

响应式：

```text
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

hover：

```text
hover:bg-slate-100 hover:border-blue-400
```

### 自测题卡片示例

```jsx
<article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
  <p className="text-sm font-medium text-blue-700">矩阵</p>
  <h2 className="mt-2 text-lg font-semibold text-slate-900">
    下列哪一个属于初等行变换？
  </h2>
  <div className="mt-4 space-y-2">
    {options.map((option) => (
      <button
        key={option}
        className="w-full rounded-md border border-slate-200 px-4 py-2 text-left text-slate-700 hover:border-blue-500 hover:bg-blue-50"
      >
        {option}
      </button>
    ))}
  </div>
</article>
```

### 避免页面杂乱

先定 3 条规则：

1. 一页最多使用 1 个主色，例如蓝色用于按钮和当前状态。
2. 卡片、按钮、输入框的圆角统一用 `rounded-md`。
3. 页面内容宽度用 `max-w-4xl mx-auto` 控制，不要铺满整屏。

## 5. JSON 数据组织

这一类负责：把知识点、题目、答案、解析整理成前端能稳定读取的数据。

这一类不负责：页面样式、React 状态、后端接口、数据库。

### JSON 是什么

JSON 是一种保存结构化数据的文本格式。它长得像 JavaScript 对象，但更严格：

- 字段名必须用双引号
- 字符串必须用双引号
- 不能写注释
- 最外层通常是对象 `{}` 或数组 `[]`

### knowledge-points.json

```json
[
  {
    "id": "determinant-basic",
    "chapter": "行列式",
    "title": "行列式的基本概念",
    "summary": "行列式是由方阵计算出的一个数，可用于判断矩阵是否可逆。",
    "keyFormula": "二阶行列式：ad - bc",
    "commonMistakes": ["把行列式和矩阵混为一谈", "展开时符号出错"],
    "tags": ["行列式", "基础"],
    "status": "approved"
  },
  {
    "id": "matrix-row-operations",
    "chapter": "矩阵",
    "title": "矩阵初等行变换",
    "summary": "通过交换、倍乘、倍加三类操作，把矩阵化成更容易计算的形式。",
    "keyFormula": "R_i <-> R_j, kR_i, R_i + kR_j",
    "commonMistakes": ["把行变换和列变换混用", "倍乘时使用 0"],
    "tags": ["矩阵", "初等变换"],
    "status": "approved"
  },
  {
    "id": "linear-equation-solution",
    "chapter": "线性方程组",
    "title": "线性方程组解的情况",
    "summary": "通过系数矩阵和增广矩阵的秩，判断方程组无解、唯一解或无穷多解。",
    "keyFormula": "rank(A) 与 rank(A|b) 的关系",
    "commonMistakes": ["只看方程个数，不看秩", "忽略增广矩阵"],
    "tags": ["线性方程组", "秩"],
    "status": "draft"
  }
]
```

### questions.json

```json
[
  {
    "id": "q001",
    "knowledgePointId": "determinant-basic",
    "type": "single_choice",
    "difficulty": "basic",
    "stem": "二阶行列式 |a b; c d| 的值是？",
    "options": ["ad - bc", "ab - cd", "ac - bd", "a + d"],
    "answer": "ad - bc",
    "explanation": "二阶行列式按公式计算为主对角线乘积减副对角线乘积，即 ad - bc。",
    "tags": ["行列式", "公式"],
    "source": "manual",
    "status": "approved"
  },
  {
    "id": "q002",
    "knowledgePointId": "matrix-row-operations",
    "type": "single_choice",
    "difficulty": "basic",
    "stem": "下列哪一个属于矩阵初等行变换？",
    "options": ["交换两行", "删除一列", "把某一行乘以 0", "任意移动元素"],
    "answer": "交换两行",
    "explanation": "初等行变换包括交换两行、某一行乘以非零常数、某一行加上另一行的倍数。",
    "tags": ["矩阵", "初等行变换"],
    "source": "manual",
    "status": "approved"
  },
  {
    "id": "q003",
    "knowledgePointId": "linear-equation-solution",
    "type": "single_choice",
    "difficulty": "medium",
    "stem": "若 rank(A) < rank(A|b)，线性方程组 Ax=b 的解的情况是？",
    "options": ["唯一解", "无穷多解", "无解", "无法判断"],
    "answer": "无解",
    "explanation": "系数矩阵的秩小于增广矩阵的秩时，说明方程之间出现矛盾，因此无解。",
    "tags": ["线性方程组", "秩"],
    "source": "manual",
    "status": "approved"
  }
]
```

### 错题记录可以先放 localStorage

```js
const wrongRecord = {
  questionId: "q002",
  selected: "删除一列",
  correctAnswer: "交换两行",
  wrongAt: "2026-06-25T10:00:00.000Z"
};

localStorage.setItem("wrongQuestions", JSON.stringify([wrongRecord]));
```

## 6. GitHub

这一类负责：两个人保存代码版本、同步进度、避免互相覆盖。

这一类不负责：网页功能、样式、API、部署平台本身。

### 必学概念

- 仓库：项目代码的家。
- clone：把远程仓库复制到本地。
- commit：保存一次明确的小修改。
- push：把本地提交推到 GitHub。
- pull：把 GitHub 上的新代码拉到本地。
- branch：分支，用来各做各的功能。
- README：告诉别人项目是什么、怎么运行。

### 每天协作流程

```bash
git pull
git checkout -b feature/quiz-page
# 写代码
git status
git add .
git commit -m "add quiz page"
git push -u origin feature/quiz-page
```

然后在 GitHub 上开 Pull Request，让队友看一眼再合并。

### 避免覆盖队友代码

1. 每天开始先 `git pull`。
2. 不要两个人同时改同一个文件的大段内容。
3. 一个功能一个分支，比如 `feature/knowledge-list`。
4. 提交信息写清楚，不要全写 `update`。
5. 冲突时先读懂两边代码，再决定保留哪些内容。

### 冲突时怎么处理

冲突文件通常会出现：

```text
<<<<<<< HEAD
你的代码
=======
队友的代码
>>>>>>> branch-name
```

处理方式：

1. 打开文件。
2. 删除这些标记。
3. 手动合并成正确代码。
4. 运行项目检查。
5. 再 `git add` 和 `git commit`。

## 7. API 调用

这一类负责：前端如何向后端发送请求，后端如何返回结果。

这一类不负责：DeepSeek 具体 Key 管理和 Prompt 设计，那是第 8 类。

### API 是什么

API 可以理解成网页和后端之间约定好的“点单窗口”。前端告诉后端：“我要为这个知识点生成补练题。”后端处理后返回：“这是生成好的题目。”

### 前端 fetch 示例

```js
async function generatePractice() {
  const response = await fetch("/api/generate-practice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      knowledgePointId: "matrix-row-operations",
      wrongQuestionIds: ["q002"]
    })
  });

  if (!response.ok) {
    throw new Error("生成失败，请稍后再试");
  }

  const data = await response.json();
  return data.questions;
}
```

### Next.js API Route 示例

```js
// app/api/generate-practice/route.js
export async function POST(request) {
  const body = await request.json();

  if (!body.knowledgePointId) {
    return Response.json(
      { error: "缺少 knowledgePointId" },
      { status: 400 }
    );
  }

  return Response.json({
    questions: [
      {
        stem: "下列哪一个属于矩阵初等行变换？",
        type: "single_choice",
        options: ["交换两行", "删除一列", "把某一行乘以 0"],
        answer: "交换两行",
        explanation: "交换两行是初等行变换。"
      }
    ]
  });
}
```

### 常见错误排查

- `404`：接口路径写错，检查是不是 `/api/generate-practice`。
- `405`：请求方法不对，后端写的是 `POST`，前端也要用 `POST`。
- `500`：后端代码报错，去终端或部署平台日志看错误。
- `Unexpected token`：后端返回的不是 JSON，检查 `Response.json()`。
- 浏览器没反应：检查按钮有没有绑定 `onClick`。

## 8. DeepSeek API 接入

这一类负责：让后端安全调用 DeepSeek，生成同类补练题。

这一类不负责：普通 fetch 概念、数据库保存、部署平台选择。

### API Key 放在哪里

放在 `.env.local`：

```text
DEEPSEEK_API_KEY=你的 key
```

不要放进前端代码，不要命名成 `NEXT_PUBLIC_DEEPSEEK_API_KEY`。`NEXT_PUBLIC_` 开头的变量会暴露给浏览器。

### 安装 SDK

DeepSeek API 兼容 OpenAI SDK，用 Node.js 可以这样安装：

```bash
npm install openai
```

### 最小可运行后端示例

DeepSeek 官方文档当前示例使用 `https://api.deepseek.com` 作为 base URL，并推荐新模型名如 `deepseek-v4-pro`。截至 2026-06-25，官方文档说明 `deepseek-chat` 和 `deepseek-reasoner` 将在 2026-07-24 15:59 UTC 废弃，所以新代码建议优先用新模型名。

```js
// app/api/generate-practice/route.js
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY
});

export async function POST(request) {
  const body = await request.json();

  const prompt = `
请根据下面的线性代数知识点生成 2 道同类补练题。
必须返回 json，不要返回 Markdown。

知识点：${body.knowledgePointTitle}
错题摘要：${body.wrongSummary}

JSON 格式：
{
  "questions": [
    {
      "stem": "题干",
      "type": "single_choice",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "解析",
      "difficulty": "basic",
      "tags": ["矩阵"]
    }
  ]
}
`;

  try {
    const completion = await client.chat.completions.create({
      model: "deepseek-v4-pro",
      messages: [
        {
          role: "system",
          content: "你是线性代数助教，只生成经过人工审核前的练习题草稿。请输出 json。"
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      stream: false
    });

    const content = completion.choices[0].message.content;
    return Response.json(JSON.parse(content));
  } catch (error) {
    return Response.json(
      { error: "AI 生成失败，请稍后重试" },
      { status: 500 }
    );
  }
}
```

### Prompt 设计要点

1. 明确角色：线性代数助教。
2. 明确任务：生成同类补练题，不是讲整章课。
3. 明确范围：只围绕当前知识点和错题。
4. 明确格式：必须返回 JSON。
5. 明确限制：AI 题目是草稿，需人工审核。

### 失败和格式错误处理

- API Key 错：检查环境变量名字和部署平台环境变量。
- 超时：减少题目数量，先生成 1 到 2 道。
- 返回不是 JSON：提示词里写 `json`，并设置 `response_format`。
- JSON 被截断：增加 `max_tokens` 或缩短题干要求。
- 内容不准：不要直接进正式题库，先人工审核。

## 9. 部署到 Vercel / Cloudflare Pages

这一类负责：把本地 Demo 变成同学能访问的网址。

这一类不负责：写页面功能、写题库、设计数据库。

### Vercel 基本流程

Vercel 对 Next.js 支持最省心，适合第一版试点。

1. 把项目推到 GitHub。
2. 登录 Vercel。
3. New Project，选择 GitHub 仓库。
4. Framework 选择 Next.js。
5. 如果使用 DeepSeek，添加环境变量 `DEEPSEEK_API_KEY`。
6. 点击 Deploy。
7. 部署成功后得到一个 `vercel.app` 网址。
8. 之后每次 push 到 GitHub，Vercel 会自动重新部署。

查看问题：进入 Vercel 项目 Dashboard，看 Deployments 和 Logs。

### Cloudflare Pages / Workers 基本流程

如果只是静态页面，Cloudflare Pages 很合适；但你们的 Demo 有 Next.js API Route 和 DeepSeek 后端接口，当前 Cloudflare 官方文档更强调通过 Cloudflare Workers + OpenNext adapter 部署 Next.js。初学阶段如果要少踩坑，优先 Vercel；如果团队想用 Cloudflare，再按官方 Next.js on Workers 流程走。

大致步骤：

1. 连接 GitHub 仓库。
2. 选择 Next.js 项目。
3. 配置 build 命令，例如 `npm run build`。
4. 配置环境变量和 secrets。
5. 部署后查看构建日志。
6. 更新代码后 push，平台自动重新构建。

### 常见部署失败原因

- 本地能跑，线上失败：环境变量没配。
- API 报错：部署平台日志里看后端错误。
- 找不到 JSON：文件路径或导入方式不对。
- build 失败：有语法错误或依赖没安装。
- Cloudflare 上行为不同：生产运行时不是普通 Node.js，需要按官方适配方式预览。

## 10. Supabase 数据库

这一类负责：后续保存真实学生、答题记录和错题数据。

这一类不负责：第一版本地 JSON 题库、localStorage 错题记录、AI 生成逻辑。

### 什么时候接 Supabase

先不要一开始就接数据库。建议满足这些条件后再接：

- 本地 Demo 已跑通知识点、自测、判分、解析。
- 已经有 10 到 30 名同学试用。
- 你们确实需要跨设备保存数据。
- localStorage 已经不够用。

### 表设计

```sql
create table students (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  invite_code text,
  created_at timestamptz default now()
);

create table knowledge_points (
  id text primary key,
  chapter text not null,
  title text not null,
  summary text not null,
  tags text[] default '{}'
);

create table questions (
  id text primary key,
  knowledge_point_id text references knowledge_points(id),
  type text not null,
  difficulty text not null,
  stem text not null,
  options jsonb,
  answer text not null,
  explanation text not null,
  tags text[] default '{}',
  status text default 'approved'
);

create table answer_records (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id),
  question_id text references questions(id),
  selected_answer text,
  is_correct boolean,
  answered_at timestamptz default now()
);

create table wrong_questions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id),
  question_id text references questions(id),
  wrong_count int default 1,
  last_wrong_at timestamptz default now()
);
```

### Next.js 读取数据

Supabase 官方 Next.js 快速开始会使用环境变量保存项目 URL 和 publishable key。

```text
NEXT_PUBLIC_SUPABASE_URL=你的项目地址
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=你的 publishable key
```

```js
// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);
```

```js
const { data, error } = await supabase
  .from("knowledge_points")
  .select("*");

if (error) {
  console.error(error);
}
```

### 写入答题记录

```js
await supabase.from("answer_records").insert({
  student_id: studentId,
  question_id: questionId,
  selected_answer: selectedAnswer,
  is_correct: selectedAnswer === correctAnswer
});
```

### 注意事项

1. 数据库会增加学习成本，不要抢在核心 Demo 前面做。
2. 真实学生数据要谨慎处理，少收集个人信息。
3. 题库和答案必须人工审核。
4. 一开始可以只把答题记录迁移到 Supabase，知识点和题目仍用 JSON。
5. 如果要公开读写表，必须理解 RLS 策略，不要把表完全裸露出去。

## 推荐学习顺序

```text
HTML/CSS/JS
-> React
-> JSON 数据组织
-> Next.js
-> Tailwind CSS
-> GitHub 协作
-> API 调用
-> DeepSeek API
-> 部署
-> Supabase
```

为什么 JSON 放在 Next.js 前面：因为你们的 Demo 很依赖题库和知识点数据，先把数据形状想清楚，后面页面会好写很多。

为什么 Supabase 放最后：因为第一版目标是验证学习闭环，不是先做复杂系统。

## 官方文档核对记录

核对日期：2026-06-25。

- Next.js Route Handlers：`https://nextjs.org/docs/app/getting-started/route-handlers`
- DeepSeek API Quick Start：`https://api-docs.deepseek.com/`
- DeepSeek JSON Output：`https://api-docs.deepseek.com/guides/json_mode`
- Vercel Next.js 部署：`https://vercel.com/docs/frameworks/full-stack/nextjs`
- Cloudflare Next.js on Workers：`https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/`
- Supabase Next.js Quickstart：`https://supabase.com/docs/guides/getting-started/quickstarts/nextjs`
