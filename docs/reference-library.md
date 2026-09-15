# 资料图书室维护说明

网页入口：`/resources`

资料图书室优先使用 `data/course-materials.json` 维护你们已经提供、已经用于课程整理的资料目录。每条资料包含：

- 标题、原始文件名和对应章节
- 资料类型、整理状态和适合的学习用途
- 回到课程章节或课程目录的学习入口

`data/source-index.json` 仍保留作后续开放参考来源库，但不再是资料页的主书架。

当前已登记的电科线性代数资料按下列方式归类：

- 第一章：`1.1.pdf`、`1.2.pdf`、`1.3.pdf`、`1.4和小结.pdf`
- 第一、二章：`2025线性代数第一二章疑难解析.pdf`
- 课程总览：`2025 线性代数讲座 PDF.pdf`
- 后续章节：`2025线性代数与空间解析几何(第3-4章 疑难分析) (1).pdf`
- 内部目录校对：`线性代数与空间解析几何 第六版.pdf`

原始 PDF 不放入 `public/`，资料页也不提供下载按钮；当前页面只展示分类目录和已上线课程内容的入口。这样能先让资料服务于学习路径，同时避免把原始文件直接部署到公开网站。

旧的开放来源库每条资料包含：

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

自制、已审核的课程资料先增加到 `data/course-materials.json`。推荐格式：

```json
{
  "id": "short-unique-id",
  "course_id": "uestc-linear-algebra",
  "chapter_ids": ["chapter-id"],
  "coverage": "第一章 · 1.1",
  "title": "资料名称",
  "source_file": "原始文件名.pdf",
  "type": "chapter_handout",
  "status": "organized",
  "summary": "用自己的话说明它服务哪一部分学习。",
  "best_for": ["概念复习"],
  "action": {
    "href": "/courses/uestc-linear-algebra/chapters/chapter-id",
    "label": "进入对应章节"
  }
}
```

需要登记开放网页来源时，再在 `data/source-index.json` 增加一条记录：

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
