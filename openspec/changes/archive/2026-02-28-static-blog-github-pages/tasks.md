## 1. 项目基础配置

- [x] 1.1 创建 `package.json`，声明项目名称、构建脚本（`npm run build` -> `node build.js`）和依赖（gray-matter ^4.0.3、marked ^12.0.0）
- [x] 1.2 更新 `.gitignore`，添加 `_site/` 和 `node_modules/` 排除规则

## 2. 构建脚本核心实现

- [x] 2.1 创建 `build.js`，实现 `scanPosts()` 函数：扫描 `posts/` 目录所有 `.md` 文件，使用 gray-matter 解析 front matter（title、date、description），使用 marked 转换正文为 HTML，按日期倒序排序返回文章列表
- [x] 2.2 实现 `generateIndex(posts)` 函数：生成首页 HTML 模板，包含文章列表（标题、日期、描述），链接指向 `./posts/<slug>.html`，内联 CSS 支持亮暗主题自适应
- [x] 2.3 实现 `generatePostPage(post)` 函数：生成文章详情页 HTML 模板，包含标题、格式化日期、HTML 正文内容和返回首页导航链接，内联 CSS 支持亮暗主题自适应
- [x] 2.4 实现 `copyStaticFiles()` 函数：若 `images/` 目录存在则复制到 `_site/images/`
- [x] 2.5 实现 `build()` 主函数：创建 `_site/` 和 `_site/posts/` 目录，调用上述函数生成所有文件，输出构建日志

## 3. 清理旧客户端渲染文件

- [x] 3.1 删除 `index.html`（客户端渲染首页，将由构建脚本生成替代）
- [x] 3.2 删除 `blog.html`（客户端渲染文章列表页）
- [x] 3.3 删除 `post.html`（客户端渲染文章详情页）
- [x] 3.4 删除 `marked.min.js`（客户端 Markdown 解析库，已改为构建时依赖）

## 4. GitHub Actions 部署工作流

- [x] 4.1 创建 `.github/workflows/deploy.yml`，配置监听 main 分支 push 事件
- [x] 4.2 配置工作流步骤：checkout 代码、安装 Node.js 20、npm install、npm run build
- [x] 4.3 配置使用 `peaceiris/actions-gh-pages@v4` 将 `_site/` 部署到 gh-pages 分支，使用 GITHUB_TOKEN 认证

## 5. 验证

- [x] 5.1 本地执行 `npm install` 和 `npm run build`，确认 `_site/` 目录正确生成 index.html 和 posts/*.html
- [x] 5.2 检查生成的页面包含正确的文章内容、日期格式化、导航链接和亮暗主题样式
