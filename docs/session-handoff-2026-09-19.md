# 项目深度交接：大学课程 AI 自测与复习助手

更新时间：2026-09-19  
用途：在新的 Codex、Trae 或人工协作对话开始时，先阅读本文件，再继续开发。它记录的是仓库的真实状态；“已实现”和“计划中”必须严格区分。

## 1. 一句话定位

这是一个面向本科生的课程自测与复习网站 Demo。当前以**电子科技大学工科线性代数**为主线，用“知识点速讲 -> 自测 -> 逐题解析 -> 错题 -> 间隔复习 -> 薄弱点回看”验证学习闭环。

团队是两名非计算机专业本科生，因此工程原则是：

```text
小步实现、先能试用、数据可人工维护、每次稳定成果都构建验证并提交 Git。
```

不要把项目提前扩成老师端、班级系统、复杂账号体系、主观证明自动批改或大型在线教育平台。

## 2. 当前 Git 状态

| 项目 | 当前值 |
| --- | --- |
| 本地分支 | `youngson` |
| GitHub 远端 | `https://github.com/yangson023/Young_Celin_LT.git` |
| 最新功能代码基线（写本文档时） | `d613d82 Add distinct icons for study features` |
| 工作区 | 干净 |
| 稳定生产候选分支 | 当前暂定 `youngson` |

近期提交（由新到旧）：

```text
d613d82 Add distinct icons for study features
5d593a4 Add daily review loop and chapter challenges
c510a79 Animate assistant idle expressions
abe558d Add study utilities and collapsible course path
1fbfda4 Add secure AI study assistant shell
646c381 Complete remaining linear algebra chapters
```

### 协作规则

1. 两个人不要同时改同一个 JSON 或同一个 React 组件。
2. 新工作从 `youngson` 新建功能分支，例如 `feature/course-content-audit`。
3. Trae 只生成 Markdown / JSON 草稿，不直接大规模改网页代码或正式题库。
4. 每次合并前运行 `npm.cmd run build`。
5. 成果稳定后执行 `git commit`；需要同伴取得时再明确执行 `git push`。

## 3. 技术架构与运行方式

```text
Next.js 16.2.9 + React 18 + TypeScript + Tailwind CSS 3
KaTeX：数学公式显示
lucide-react：功能图标
本地 JSON：课程、章节、知识点、题目、公告、资料目录
localStorage：学习进度、错题、间隔复习、备忘录、资料投稿元数据
DeepSeek：可选的服务端 AI 助教
```

常用命令：

```powershell
npm install
npm.cmd run dev
npm.cmd run build
```

本地开发地址通常是：

```text
http://localhost:3000
```

构建已在提交 `d613d82` 前通过。任何后续改动仍必须再次构建。

## 4. 代码与数据地图

### 页面路由

```text
/                                      首页
/courses/[courseId]                   课程页
/courses/[courseId]/chapters/[chapterId]       章节页
/courses/[courseId]/chapters/[chapterId]/quiz  章节混合挑战
/courses/[courseId]/knowledge/[knowledgePointId] 知识点详情
/courses/[courseId]/quiz/[knowledgePointId]    知识点自测
/review/today                          今日复习
/wrong                                 错题本
/wrong/retry/[courseId]/[knowledgePointId]     同知识点错题再练
/resources                             课程资料图书室
/updates                               更新公告
/memos                                 学习备忘录
```

### 关键目录

```text
app/                 页面与 API Route
components/          学习卡片、题目、图标、助教、资料与备忘录组件
lib/data.ts          聚合各课程内容包，供前端读取
lib/storage.ts       localStorage 数据与学习进度逻辑
lib/review.ts        错因标签与复习阶段文案
content-packs/       各课程独立的 JSON 内容包
data/                公告、资料索引、来源索引及早期兼容数据
docs/                内容审核、协作、资料与产品说明
public/images/       背景、AI 助教与反馈头像等视觉素材
```

### 课程数据包

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

`lib/data.ts` 目前显式导入这两个内容包。增加新课程时，除了新建 4 个 JSON，还要在此文件导入并加进聚合数组。维护字段规则参见 [content-packs.md](./content-packs.md)。

## 5. 已实现的学生功能

### 学习主线

- 首页展示课程包、继续学习、学习进度、薄弱点、章节挑战提示、今日复习、错题快捷入口和最近公告。
- 课程页的章节学习路径支持折叠，避免一开始把所有内容铺满。
- 章节页按教材小节显示知识点；可进入章节混合挑战。
- 知识点详情页包含速讲、关键公式、常见易错点和自测入口。
- 自测支持 `single_choice` 与 `true_false`，用 KaTeX 显示 `$...$` 公式。
- 每答完一道题先展示本题对错和解析，学生再进入下一题；错误选项仅做简洁说明，典型易错项才补充重点解释。
- 错题本可按课程、章节、知识点回看，并能进入“错题再练”。

### 学习记录与复习

- 学习进度记录：自测次数、已答题数、正确题数、正确率、错题数、最近学习位置。
- 错题复习节奏：

```text
初次做错 -> 今日回顾
今日答对 -> 3 天后复习
3 天后答对 -> 7 天后巩固
7 天后答对 -> 从错题本移除
任一轮答错 -> 回到今日回顾
```

- 每道错题可标记一个错因：概念不清、条件漏看、公式记错、计算失误、符号混淆。
- 章节挑战最多 10 题，优先覆盖不同知识点；结束时给出“本次掌握”和“建议回看”。

### 学习工具与体验

- 资料图书室按“课程专题 -> 章节筛选 -> 资料卡片”组织。当前只展示整理后的目录和学习入口，不公开托管教材原始文件，不提供下载。
- “提交资料”窗口目前**只在浏览器保存文件名、标题、说明和待审核状态**，不会上传原文件；这是有意保守的版权与存储边界。
- 更新公告独立页面与首页预览已完成；公告数据在 `data/announcements.json`。
- 备忘录保存在浏览器中；当天创建且未完成的备忘会在网站保持打开时，于 21:00 和 22:00 由助教弹窗提醒。关闭网页后无法可靠提醒。
- 反馈按钮弹出信件式对话框，包含开发者 QQ 邮箱与卡通头像；不需要后端端口或邮件发送服务。
- 右下角 AI 助教有开心、可爱、疑惑三种状态，并会自动做局部肢体与表情循环，不是整张图整体漂浮。

### 图标体系

`components/FeatureMark.tsx` 为每类学习工具定义了稳定的图标与色调：

| 功能 | 图标语义 |
| --- | --- |
| 新手引导 | 罗盘 |
| 继续学习 | 路径 |
| 学习进度 | 图表 |
| 薄弱点 | 准星 |
| 章节挑战 | 奖杯 |
| 今日复习 | 日历勾选 |
| 错题本 | 卷轴 |
| 资料 | 书架 |
| 公告 | 铃铛 |
| 备忘录 | 笔记本 |
| 反馈 | 信件 |
| AI 助教 | 动态角色形象 |

移动端底部导航也已有课程、继续、错题与备忘图标。

## 6. 课程内容现状

### 电科线性代数：当前主线

| 内容 | 数量 / 状态 |
| --- | --- |
| 章节 | 7 章 |
| 知识点 | 42 个 |
| 知识点状态 | 15 个 `approved`，27 个 `draft` |
| 题目 | 166 道 |
| 出题状态 | 166 道 `approved`，均为人工审核后可进入自测 |

已覆盖的章节范围：矩阵及初等变换、行列式、几何空间、n 维向量空间、特征值与特征向量、二次型、线性变换。

内容来源与处理原则：教材与校内答疑讲座用于校对知识体系；前台展示内容必须是团队自己的总结与改写。原始教材、教师 PPT、完整题库均不直接公开。

重点资料与审核草稿：

```text
content-packs/uestc-linear-algebra/layered-knowledge-points.md
content-packs/uestc-linear-algebra/audit-keywords.md
content-packs/uestc-linear-algebra/draft-knowledge-summary.md
content-packs/uestc-linear-algebra/draft-first-trial-questions.json
docs/uestc-linear-algebra-ch1-extraction.md
docs/uestc-linear-algebra-ch2-selection.md
docs/uestc-linear-algebra-ch3-ch4-selection.md
docs/uestc-linear-algebra-ch5-ch7-selection.md
```

注意：`draft` 知识点可以显示在当前 Demo 中，但不应被口头称为“已最终审核”。继续扩展时，优先逐章人工复核公式条件、术语、易错点与题目答案，再改 `review_status`。

### 上交高等代数：仅保留框架样例

| 内容 | 数量 / 状态 |
| --- | --- |
| 章节 | 2 章 |
| 知识点 | 2 个，均 `draft` |
| 题目 | 2 道 `approved` |

当前团队决定：**近期不继续开发上交高等代数内容**，先把电科线性代数完成一次可靠试用。除非用户明确改变方向，不要擅自扩写高代内容。

## 7. AI 助教：已实现与未实现

### 已实现

- 前端入口：`components/StudyAssistant.tsx`。
- 服务端接口：`app/api/assistant/route.ts`。
- 仅把当前页面的课程、章节或知识点概要带给模型，不发送整本教材或完整题库。
- DeepSeek 密钥只从服务端 `DEEPSEEK_API_KEY` 读取，浏览器无法直接拿到。
- 单一来源 10 分钟最多 12 次请求；单次输入限 800 字，模型最多输出 600 tokens。
- 开发者余额接口：`app/api/admin/deepseek-balance/route.ts`；余额低于 `DEEPSEEK_LOW_BALANCE_CNY`（默认 10 元）会返回 `isLowBalance: true`。

### 尚未实现，不能误称为已有

- AI 自动生成补练题并写入题库。
- AI 的实时互联网搜索能力。
- 余额低于 10 元时自动发邮件、QQ 或站内通知。
- 公开的管理员余额页面。
- 基于用户身份的长期限额、统计或审核后台。

### 环境变量与安全

复制 `.env.example` 为仅本地使用的 `.env.local`，再填写真实值：

```text
DEEPSEEK_API_KEY=新建且未泄露的密钥
DEEPSEEK_MODEL=deepseek-flash
ADMIN_API_TOKEN=与 DeepSeek 密钥不同的随机长字符串
DEEPSEEK_LOW_BALANCE_CNY=10
```

不要把真实密钥写到 Git、聊天记录、前端变量（尤其不要使用 `NEXT_PUBLIC_` 前缀）、截图或公告中。历史对话中曾出现过一枚密钥，必须确认它已在 DeepSeek 控制台撤销；新密钥才可用于部署。

当前 AI 助教本身会明确说明未接入联网检索。这是正确行为，不要为了“看似联网”让它编造实时网页、新闻或价格。

## 8. 部署与域名：当前真实状态

### 已完成

- 域名已经购买，正在等待相关审核/实名流程完成。
- GitHub 的 `youngson` 分支已有最新稳定代码。
- 团队决定后续以**腾讯云国内站**为主，不再把 Vercel 当作长期部署目标。

### 决策：使用腾讯云 EdgeOne Pages

在腾讯云页面预设里会看到 `Next` 与 `Next SSG`：

```text
必须选择 Next
不要选择 Next SSG
```

原因：项目存在 `/api/assistant` 与 `/api/admin/deepseek-balance` 两个服务端 API Route；`Next SSG` 是纯静态模式，会破坏这些能力。

### 待执行的部署步骤

1. 腾讯云控制台搜索并进入 `EdgeOne Pages`。
2. 创建项目，连接 GitHub，选仓库 `Young_Celin_LT`。
3. 生产分支先设为 `youngson`；未来稳定后再讨论是否以 `main` 为生产分支。
4. 框架预设选 `Next`，根目录为仓库根目录；优先采用平台自动识别的构建配置。
5. 首次部署后，先用平台给出的临时地址检查：首页、课程页、一次自测、错题、AI 助教空配置提示是否正常。
6. 在 Pages 项目环境变量中安全填入本节所列变量。未准备好新密钥时，可先不填，网站仍可运行，只是助教会显示“等待管理员配置”。
7. 进入“项目设置 -> 域名管理 -> 添加自定义域名”。先添加 `www.你的域名`，以弹窗给出的实际 `CNAME` 值为准，去腾讯云“云解析 DNS”新增记录；不要自行猜记录值。
8. 验证成功并自动签发免费 HTTPS 证书后，再添加根域名 `你的域名`，设置主域名和跳转策略。

### ICP 备案提醒

目标用户是中国大陆同学，因此要稳定提供大陆访问，EdgeOne Pages 的“中国大陆可用区”或“全球可用区”自定义域名需要 ICP 备案。未备案时，只能选择“不含中国大陆”的区域，不适合作为正式校内试用入口。

备案、DNS 验证、SSL 签发与网站部署是不同步骤。不要购买付费 DNS 专业版或付费 SSL；当前 Demo 的免费 DNS 记录和平台自动 SSL 已足够。

## 9. 当前限制与产品边界

- 所有学习记录、备忘录、错题、投稿元数据都只在本机浏览器 `localStorage`。换设备、清浏览器或无痕模式会丢失。
- 没有登录、数据库、老师端、班级管理、真实文件上传、用户反馈后台或推送服务。
- 资料投稿不是上传功能；原文件没有离开用户设备。
- 数学题只支持客观题，不支持主观证明自动批改。
- 题库已经较多，但 `draft` 知识点仍需逐步人工确认。
- AI 的限流计数存储在当前 Next 进程内；无服务器环境多实例时不能当作生产级风控，需要后续换 Redis/KV 或账号限额。

## 10. 推荐的下一步计划

按现在的投入产出比，优先级如下：

### P0：完成腾讯云上线与真实试用

1. 等待域名审核 / 实名完成。
2. EdgeOne Pages 部署 `youngson`，选 `Next`。
3. 绑定域名、完成 DNS 验证、自动 SSL；若面向大陆，启动 ICP 备案流程。
4. 使用电脑、手机浏览器与不同网络各测一次；微信内置浏览器的兼容性单独记录，不把它误判为网站整体不可用。
5. 只邀请 5 至 10 名同学进行第二轮试用，收集“是否知道下一步点哪里”“题目难度”“公式显示”“错题复习是否愿意再用”等反馈。

### P1：安全启用 AI 助教

1. 确认旧 DeepSeek 密钥已撤销，创建新密钥。
2. 仅在腾讯云 Pages 环境变量配置密钥和独立管理员令牌。
3. 先测试三类问题：网站怎么用、当前知识点如何复习、超出网站范围的实时问题。
4. 用管理员接口手动核对余额；先不要接自动邮件提醒或联网搜索。

### P2：提高线代内容可信度

1. 按章节复审 27 个 `draft` 知识点。
2. 对高错率或同学反馈难的知识点补充 1 至 2 道中等难度题，而不是无限叠加基础判断题。
3. 人工审核每条公式的适用条件、符号、答案与解析；数学文本使用 `$...$` 包住行内公式。
4. 每批内容更新先放 `draft-*` 文件，审核后再写正式 JSON。

### 暂缓

```text
Supabase / 登录 / 真正文件上传 / 教师后台 / 多校课程大规模扩张 /
AI 联网检索 / 主观题自动批改 / 自动余额通知
```

这些需求都会显著扩大成本、权限和运维风险；当前试用数据不足以证明它们值得优先做。

## 11. 新对话启动提示词

把下面整段发给新的 Codex 对话即可：

```text
请先阅读以下文件，并把它们作为本次开发的真实上下文：

1. README.md
2. docs/web-framework-design.md
3. .codex/skills/linear-algebra-demo/SKILL.md
4. skills/web-ui-qa/SKILL.md（涉及页面修改或验收时）
5. docs/session-handoff-2026-09-19.md

项目是“大学课程 AI 自测与复习助手”，当前主线是电科线性代数。请严格遵守：小步修改、适合两名非计算机专业学生维护、不擅自把项目扩成大型平台、不要把计划误说成已实现。

当前 Git 分支是 youngson。请先用 `git status` 与 `git log -1 --oneline` 核对实际最新提交；功能代码基线是 d613d82，之后可能已有文档或部署相关提交。每次稳定成果必须运行 npm.cmd run build，并在我确认后或我明确要求时 git commit / git push。

当前优先任务是：先完成腾讯云 EdgeOne Pages 部署与自定义域名绑定。部署预设必须选 Next，不要选 Next SSG，因为项目有 /api/assistant 和 /api/admin/deepseek-balance 服务端接口。不要将任何 DeepSeek 密钥写入代码、Git、前端变量或聊天记录；只通过部署平台环境变量配置。

在开始改动前，先检查 git status 和相关文件。若我没有明确要求，不要开发 Supabase、登录、老师端、真实文件上传、AI 联网搜索或复杂后台。
```

## 12. 推荐阅读顺序

```text
README.md
-> docs/session-handoff-2026-09-19.md
-> docs/content-packs.md
-> docs/review-loop-and-challenge.md
-> docs/memo-and-material-workflow.md
-> docs/ai-assistant-rollout.md
```

旧的 [team-handoff-2026-07-12.md](./team-handoff-2026-07-12.md) 主要反映前两章阶段的计划；它可以作为历史参考，但本文件优先级更高。
