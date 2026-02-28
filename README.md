# 静态博客网站

这是一个基于 Markdown 的静态博客项目。文章源文件放在 `posts/` 目录，构建脚本在发布前将 Markdown 转换为 HTML，输出到 `_site/`，并通过 GitHub Actions 自动部署到 GitHub Pages。

## 功能特性

- 使用 Markdown + Front Matter 管理文章
- 构建时自动生成首页和文章详情页
- 文章按日期倒序输出
- 支持 `images/` 静态资源复制
- 页面支持亮暗主题自适应
- 推送到 `main` 后自动构建并发布

## 构建与部署流程

1. 提交代码到 `main` 分支。
2. GitHub Actions 执行：
   - `actions/checkout@v4`
   - `actions/setup-node@v4`（Node.js 20）
   - `npm install`
   - `npm run build`
3. 将 `_site/` 发布到 `gh-pages` 分支（`peaceiris/actions-gh-pages@v4`）。

工作流文件：`.github/workflows/deploy.yml`

## 项目结构

```text
sanjusss.github.io/
├── posts/                      # Markdown 文章
│   ├── welcome.md
│   ├── distributed-systems.md
│   └── backend-best-practices.md
├── images/                     # 可选，文章图片资源
├── build.js                    # 构建脚本（Markdown -> HTML）
├── package.json
├── package-lock.json
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions 自动部署
├── _site/                      # 构建产物目录（自动生成，已加入 .gitignore）
└── README.md
```

## 文章格式

文章使用 Markdown，推荐包含 Front Matter：

```markdown
---
title: 文章标题
date: 2025-01-01
description: 文章简介
---

文章内容...
```

## 本地构建与预览

安装依赖并构建：

```bash
npm install
npm run build
```

使用本地静态服务器预览构建产物：

```bash
python -m http.server 8000 --directory _site
```

然后访问 `http://localhost:8000/`。

## 添加新文章

1. 在 `posts/` 目录新增 `.md` 文件（建议包含 Front Matter）。
2. 如果有图片，将图片放到 `images/` 目录，并在文章中使用 `/images/xxx.png` 引用。
3. 本地执行 `npm run build` 验证页面输出。
4. 推送到 `main` 分支后，GitHub Actions 会自动部署，无需手动维护文章列表。
