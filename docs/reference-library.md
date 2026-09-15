# 资料图书室维护说明

网页入口：`/resources`

资料图书室当前使用 `data/source-index.json` 维护。每条资料包含：

- 标题和原站 URL
- 资料类型、语言和许可提示
- 适合的学习用途
- 在本项目中的使用边界

## 收录前检查

学生自行编写、拥有完整公开发布权的内容，可以直接加入网页。其他资料只有满足下列任一条件时，才可以公开收录：

1. 资料本身公开发布，且使用条款允许链接或展示入口。
2. 资料作者或权利方已经明确授权公开展示。
3. 团队拥有该资料的著作权或明确的公开发布权。

不要因为资料已经在同学间流传、课程内发放或是旧版本，就默认可以公开上传。网页不放下载按钮也不能解决公开展示的版权问题。

## 两人资料工作流

推荐把资料分成三个阶段：

```text
个人草稿（Obsidian / Markdown）
-> 双人审核（GitHub Issue 或 Pull Request）
-> 上线定稿（content-packs、data 和 public 目录）
```

- 个人草稿：可以用 Obsidian 写讲义、公式卡和复习清单；它适合本地 Markdown 笔记和 LaTeX 公式。
- 协作审核：在 GitHub Issue 里记录“待校对公式”“待补例题”等事项；每一批资料使用独立分支提交。
- 图解资料：用 Excalidraw 或 draw.io 绘制思维导图，导出 SVG/PNG，再放进 `public/materials/`。
- 网页上线：审核通过后，把资料元数据添加到 `data/source-index.json`；知识点本体仍维护在 `content-packs/`。

## 新增资料

在 `data/source-index.json` 增加一条记录：

```json
{
  "id": "short-unique-id",
  "title": "资料名称",
  "url": "https://example.com",
  "type": "course",
  "language": "zh",
  "license_note": "已核实的许可或授权说明",
  "best_for": ["概念复习", "学习路径参考"],
  "project_usage": "说明它可以怎样帮助学生，以及不能直接复制什么。"
}
```

目前资料页只跳转原站阅览，不托管 PDF，也不提供下载按钮。
