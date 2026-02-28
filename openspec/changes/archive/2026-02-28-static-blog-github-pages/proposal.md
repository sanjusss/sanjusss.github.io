## Why

当前博客使用客户端渲染方式（index.html/blog.html/post.html 通过 JavaScript 在浏览器中动态加载和解析 Markdown），存在 SEO 不友好、首屏加载慢、需要手动维护文章列表等问题。需要将博客迁移为构建时静态生成方案，推送代码到 GitHub 后由 GitHub Actions 自动将 Markdown 转为静态 HTML 页面并部署到 GitHub Pages。

## What Changes

- 新增 Node.js 构建脚本（`build.js`），在构建时读取 `posts/` 目录中的 Markdown 文件，解析 front matter 元数据，使用 marked 库转换为 HTML，输出完整静态页面到 `_site/` 目录
- 新增 `package.json` 管理构建依赖（gray-matter、marked）
- 新增 GitHub Actions 工作流（`.github/workflows/deploy.yml`），在 push 到 main 分支时自动执行构建并部署到 GitHub Pages
- 移除客户端渲染页面（`index.html`、`blog.html`、`post.html`、`marked.min.js`），由构建脚本生成的静态页面替代
- 更新 `.gitignore`，排除构建产物 `_site/` 和 `node_modules/`

## Capabilities

### New Capabilities

- `static-build`: Node.js 构建脚本，自动扫描 `posts/*.md`，解析 front matter，生成首页文章列表和独立文章页面到 `_site/`，并复制图片等静态资源
- `github-deploy`: GitHub Actions CI/CD 工作流，监听 main 分支 push 事件，安装依赖、执行构建、部署 `_site/` 到 GitHub Pages

### Modified Capabilities

（无需修改已有 spec）

## Impact

- **代码变更**：移除 `index.html`、`blog.html`、`post.html`、`marked.min.js` 四个客户端渲染文件；新增 `build.js`、`package.json`、`.github/workflows/deploy.yml`
- **依赖**：新增 Node.js 运行时依赖（gray-matter ^4.0.3、marked ^12.0.0）
- **部署方式**：从直接托管静态文件改为 GitHub Actions 自动构建部署，部署分支从 main 改为 gh-pages
- **写作流程**：新增文章只需在 `posts/` 目录添加带 front matter 的 Markdown 文件并 push，无需再手动编辑文章列表
