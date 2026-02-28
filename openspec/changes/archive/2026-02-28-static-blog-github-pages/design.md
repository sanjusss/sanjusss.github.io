## Context

当前博客站点 `sanjusss.github.io` 采用纯客户端渲染：`index.html`、`blog.html`、`post.html` 三个页面通过 JavaScript 在浏览器中使用 fetch 加载 `posts/` 目录下的 Markdown 文件，再用 marked.js 解析渲染。文章列表硬编码在 HTML 的 `POST_FILES` 数组中，新增文章需要手动修改多处代码。

仓库名为 `sanjusss.github.io`，属于 GitHub Pages 用户站点，部署分支为 gh-pages。

## Goals / Non-Goals

**Goals:**

- 将博客从客户端渲染迁移为构建时静态生成，提升 SEO 和加载性能
- 实现自动化构建部署：push 到 main 分支即可自动构建并发布
- 保持写作流程简单：只需在 `posts/` 目录添加 Markdown 文件
- 文章自动按日期倒序排列，无需手动维护列表
- 保持现有的暗色/亮色主题自适应设计风格

**Non-Goals:**

- 不引入 Hugo/Jekyll/Hexo 等现有静态站点生成器，使用自研轻量构建脚本
- 不实现标签、分类、搜索、分页等高级功能（后续可扩展）
- 不实现评论系统
- 不实现 RSS 订阅

## Decisions

### 决策 1：使用 Node.js 自研构建脚本而非成熟 SSG 框架

**选择**：自研 `build.js`，使用 gray-matter 解析 front matter + marked 转换 Markdown

**理由**：博客需求简单（首页 + 文章详情页），自研脚本代码量小、依赖少、构建速度快、完全可控。Hugo/Jekyll 等框架虽然功能丰富，但引入了不必要的复杂度和学习成本。

**备选方案**：
- Hugo：Go 编写，速度极快，但需要学习其模板语法和目录约定
- Jekyll：GitHub Pages 原生支持，但 Ruby 生态维护成本高
- 11ty：JavaScript 生态，更灵活，但对此项目来说仍然过重

### 决策 2：HTML 模板内联在构建脚本中

**选择**：使用 JavaScript 模板字符串直接在 `build.js` 中定义页面结构和样式

**理由**：只有两种页面模板（首页列表和文章详情），内联方式直观简单，无需额外模板引擎。CSS 通过 `<style>` 标签内联，避免额外的静态资源管理。

**备选方案**：
- 外部模板文件 + 模板引擎（EJS/Handlebars）：更灵活但增加复杂度
- CSS 独立文件：需要额外处理资源路径和复制逻辑

### 决策 3：使用 peaceiris/actions-gh-pages 部署

**选择**：GitHub Actions 中使用 `peaceiris/actions-gh-pages@v4` 将 `_site/` 发布到 gh-pages 分支

**理由**：该 Action 成熟稳定、配置简单，自动处理 gh-pages 分支创建和更新。使用 `GITHUB_TOKEN` 无需额外配置密钥。

**备选方案**：
- 手动 git push 到 gh-pages 分支：需要更多 workflow 配置
- GitHub Pages 官方 deploy action：需要配置 Pages 使用 Actions 作为源

### 决策 4：构建产物目录为 `_site/`

**选择**：输出目录为项目根下的 `_site/`

**理由**：与 Jekyll 等工具约定一致，名称直观。加入 `.gitignore` 避免提交构建产物。

## Risks / Trade-offs

- **[模板维护成本]** 内联模板意味着修改样式需要编辑 build.js -> 当前页面类型少（2 种），风险可接受。页面类型增多时再考虑抽取模板。
- **[无增量构建]** 每次构建都全量重新生成所有页面 -> 文章数量少时构建速度完全可接受（毫秒级）。
- **[无本地预览服务器]** 构建后需要手动打开 HTML 文件或使用第三方 HTTP 服务器预览 -> 可通过 `npx serve _site` 临时解决。
- **[部署延迟]** 从 push 到页面更新需要等待 GitHub Actions 运行（通常 1-2 分钟）-> 对博客场景可接受。
