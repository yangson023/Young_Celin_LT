# AI 助教接入与上线方案

## 1. 这一版已经具备什么

- 网页右下角有“AI 助教”入口，使用三帧卡通形象：开心、可爱、疑惑。
- 每次点击入口会随机切换表情，并通过轻微的位移、倾斜和缩放做平滑过渡。
- 助教知道当前所在的课程、章节或知识点，可回答“如何开始自测”“本章有什么”“错题怎么复习”等问题。
- 浏览器只请求本站 `/api/assistant`；DeepSeek 密钥仅保存在服务端环境变量中。
- `/api/admin/deepseek-balance` 可由开发者携带独立令牌查询余额，并在余额低于 `10` 元时返回 `isLowBalance: true`。

## 2. 先做的安全操作

你曾在聊天中展示过一枚 DeepSeek 密钥。请立即在 DeepSeek 控制台撤销它并创建新密钥；旧密钥不要继续使用。

新的密钥只放在以下两个位置：

```text
本机：.env.local
线上：Vercel Project -> Settings -> Environment Variables
```

不要把真实值写进 `.env.example`、`NEXT_PUBLIC_*` 变量、截图、提交信息或 GitHub。

本机可从 `.env.example` 复制出 `.env.local`，然后填写：

```text
DEEPSEEK_API_KEY=新密钥
DEEPSEEK_MODEL=deepseek-flash
ADMIN_API_TOKEN=另一段随机长字符串
DEEPSEEK_LOW_BALANCE_CNY=10
```

修改 `.env.local` 后需要重启 `npm.cmd run dev`。部署到 Vercel 后，在 Production 和 Preview 环境分别配置变量；密钥只应放 Production，Preview 可不配或使用单独的低额度测试密钥。

## 3. 开发端和使用端如何分离

```text
学生浏览器
  -> 网站前端
  -> /api/assistant
  -> DeepSeek API

开发者
  -> 本机 .env.local / Vercel 环境变量
  -> /api/admin/deepseek-balance（携带 ADMIN_API_TOKEN）
  -> DeepSeek 余额接口
```

学生端只能看到聊天界面，不能拿到 DeepSeek 密钥、余额、管理员令牌或调用余额接口。

推荐 Git 协作方式：

```text
youngson / main：稳定、面向同学的生产版本
develop：两人合并后的下一版测试
feature/*：各自独立开发功能
```

在 Vercel 中将生产分支设为稳定分支；其他分支只产生 Preview 链接。这样同伴可以先在 Preview 测试，确认后再合并，不会直接影响同学正在使用的网址。

## 4. DeepSeek 接入边界

当前助手用官方 Chat Completions 接口，并限制为：

- 单次输入最多 800 字，输出最多 600 tokens。
- 同一来源地址 10 分钟最多 12 次请求。这是 Demo 的基础保护；正式公开试用应换成 Redis/Upstash 计数和邀请码/登录限额。
- 当前只携带当前页面的最小课程上下文，避免把完整教材和整套题库反复发送给模型。
- 不把 AI 回答写进正式题库；正式知识点和题目仍要人工审核。

官方模型名和价格会变动，部署前以 [DeepSeek 模型与价格文档](https://api-docs.deepseek.com/quick_start/pricing) 为准。当前代码的默认模型名是 `deepseek-flash`，也可以用 `DEEPSEEK_MODEL` 单独调整。

## 5. “联网能力”应怎样做

DeepSeek 的普通聊天接口不会自动浏览互联网。正确的链路应是：

```text
学生提问
-> 本站判断是否需要实时资料
-> 搜索服务 API（如 Tavily、Bing 或 Serper）
-> 取 3 至 5 条可信结果的标题、摘要、链接
-> DeepSeek 根据检索结果组织答案，并在回答中列出来源链接
```

建议把联网能力放在第二阶段，并只用于：课程资料检索、公开教学资源、学习方法、实时信息。数学定义、课程范围、标准答案仍优先使用已审核的本地内容。这样既节省两类 API 成本，也更容易避免错误引用。

## 6. 余额低于 10 元的提醒

DeepSeek 官方提供 `GET /user/balance`，项目已封装为开发者接口。不要把它做成公开页面。

本地检查方式：

```powershell
$headers = @{ "x-admin-token" = "你的 ADMIN_API_TOKEN" }
Invoke-RestMethod http://localhost:3000/api/admin/deepseek-balance -Headers $headers
```

返回的 `isLowBalance: true` 即表示总可用人民币余额小于阈值。要变成真正的“自动提醒”，还需选择通知渠道：

1. 最省事：每天手动查看一次开发者接口或 DeepSeek 控制台。
2. 推荐试点方案：GitHub Actions 或 Vercel Cron 每天调用一次接口，余额不足时向邮件/Webhook 服务发送通知。
3. 需要长期运行时：将余额检查、请求统计和通知记录放到一个只给开发者用的 Supabase/数据库表中。

自动发邮件还需要独立的邮件服务密钥或 QQ 邮箱授权码，因此先不把它硬编码进项目。确定提醒渠道后再接入，避免又多一枚暴露风险很高的密钥。

## 7. 腾讯云域名与 Vercel 的推荐组合

第一阶段继续用 Vercel 托管 Next.js，腾讯云只购买和管理域名即可：

```text
腾讯云购买域名并完成实名认证
-> Vercel 项目 Settings -> Domains 添加域名
-> 按 Vercel 给出的记录，在腾讯云 DNS 添加 A/CNAME/TXT
-> 等待验证与 HTTPS 证书签发
```

不要手抄固定 DNS 值，以 Vercel 页面显示的记录为准。Vercel 的官方文档说明，根域名通常使用 A 记录，子域名使用 CNAME；第三方注册商购买的域名则在注册商侧管理 DNS。

如果网站仍部署在 Vercel 的境外节点，通常按 Vercel 的域名绑定流程处理。若以后把网站迁到腾讯云中国内地服务器，则必须先完成 ICP 备案；腾讯云也要求备案域名完成实名认证，且备案主体信息与域名实名信息一致。请在迁移前再按当时的官方规则核验。

## 8. 推荐的下一步顺序

1. 撤销已泄露密钥，创建新密钥。
2. 本机填好 `.env.local`，测试 AI 助教只回答本站学习问题。
3. 在 Vercel 配置 Production 环境变量，先限定给少量同学试用。
4. 观察一周的请求量、常见问题和余额变化，再决定是否接搜索服务。
5. 购买腾讯云域名并绑定 Vercel；不要急着迁移服务器或做复杂后台。

