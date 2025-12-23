# 纯前端博客网站

一个基于纯前端技术的博客网站，支持加载和显示 Markdown 文件和图片。

## 功能特性

- 📝 Markdown 文章渲染
- 🖼️ 图片支持
- 📂 自动加载 posts 文件夹中的所有文章
- 📅 文章按时间倒序排列
- 🎨 响应式设计，支持明暗主题
- 🔗 基于 Hash 的路由导航

## 项目结构

```
sanjusss.github.io/
├── index.html          # 首页（文章列表）
├── post.html           # 文章详情页
├── posts/              # 文章文件夹
│   ├── welcome.md
│   ├── distributed-systems.md
│   └── backend-best-practices.md
├── images/             # 图片文件夹
├── css/
│   └── style.css       # 样式文件
└── README.md           # 项目说明
```

## 文章格式

文章使用 Markdown 格式，支持 YAML Frontmatter 元数据：

```markdown
---
title: 文章标题
date: 2025-01-01
description: 文章简介
---

文章内容...
```

## 本地运行

使用 Python 启动本地服务器：

```bash
python -m http.server 8000
```

然后访问 http://localhost:8000/

## 技术栈

- 纯 HTML/CSS/JavaScript
- marked.js - Markdown 解析
- 无需后端服务器

## 添加新文章

1. 在 `posts/` 文件夹中创建新的 `.md` 文件
2. 在 `index.html` 的 `POST_FILES` 数组中添加文件名
3. 图片放在 `images/` 文件夹中，使用相对路径引用
