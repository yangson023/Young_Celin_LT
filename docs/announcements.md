# 更新公告维护说明

网页入口：`/updates`

公告数据保存在 `data/announcements.json`。它是当前试用版的静态公告板，不需要数据库或后台。

## 什么情况下写公告

只记录学生能实际感受到的稳定变化，例如：

- 新增章节、知识点或一批审核后的题目
- 新增资料图书室、错题再练等页面能力
- 修复公式显示、页面跳转、答题流程等明显问题
- 试点中的重要使用说明

单纯改变量名、调整内部文件结构或临时试验，不需要写公告。

## 新增一条公告

在 JSON 数组最前面增加一条记录：

```json
{
  "id": "announcement-short-name",
  "published_at": "2026-09-15",
  "version": "v0.1.0",
  "category": "feature",
  "title": "一句话标题",
  "summary": "用一两句话说明学生会感受到什么变化。",
  "highlights": ["具体变化一", "具体变化二"],
  "is_pinned": false
}
```

`category` 只使用以下四种：

- `feature`：功能更新
- `content`：内容更新
- `fix`：体验修复
- `notice`：使用说明

每次发布前运行 `npm.cmd run build`。通过后，将公告和功能改动一起提交、推送。
