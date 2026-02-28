## Purpose

Node.js 构建脚本，自动扫描 `posts/*.md`，解析 front matter，生成首页文章列表和独立文章页面到 `_site/`，并复制图片等静态资源。

## Requirements

### Requirement: 构建脚本读取 Markdown 文章

构建脚本 SHALL 扫描 `posts/` 目录下所有 `.md` 文件，使用 gray-matter 解析 front matter 元数据（title、date、description），使用 marked 将 Markdown 正文转换为 HTML。

#### Scenario: 扫描包含多篇文章的 posts 目录

- **WHEN** `posts/` 目录下存在 `welcome.md`、`distributed-systems.md`、`backend-best-practices.md` 三个 Markdown 文件
- **THEN** 构建脚本读取全部三个文件并成功解析出 title、date、description 和正文内容

#### Scenario: 处理缺少 front matter 字段的文章

- **WHEN** 某篇 Markdown 文件缺少 title 字段
- **THEN** 构建脚本使用默认值"无标题"作为文章标题，构建不中断

### Requirement: 生成首页 HTML

构建脚本 SHALL 生成 `_site/index.html` 文件，包含所有文章的列表，按日期倒序排列。每篇文章显示标题、日期和描述，链接指向对应的文章详情页。

#### Scenario: 首页文章列表按日期倒序

- **WHEN** 存在 2025-12-23、2025-12-20、2025-12-18 三篇文章
- **THEN** 生成的 `_site/index.html` 中文章按 2025-12-23、2025-12-20、2025-12-18 的顺序排列

#### Scenario: 首页文章链接正确

- **WHEN** 存在文件名为 `welcome.md` 的文章
- **THEN** 首页中该文章的链接指向 `./posts/welcome.html`

### Requirement: 生成文章详情页 HTML

构建脚本 SHALL 为每篇 Markdown 文章生成独立的 HTML 文件到 `_site/posts/<slug>.html`，包含完整的文章标题、发布日期、HTML 格式正文，以及返回首页的导航链接。

#### Scenario: 文章详情页内容完整

- **WHEN** 文章 `welcome.md` 包含标题"欢迎来到我的博客"、日期 2025-12-23 和 Markdown 正文
- **THEN** 生成 `_site/posts/welcome.html`，页面显示标题、格式化日期和转换后的 HTML 正文

#### Scenario: 文章详情页包含返回首页链接

- **WHEN** 访问任意文章详情页
- **THEN** 页面顶部显示返回首页的导航链接，指向 `../index.html`

### Requirement: 复制静态资源

构建脚本 SHALL 将 `images/` 目录（如存在）中的所有文件复制到 `_site/images/`，保持文章中图片引用路径可用。

#### Scenario: images 目录存在时复制文件

- **WHEN** 项目根目录存在 `images/` 文件夹且包含图片文件
- **THEN** 构建后 `_site/images/` 目录包含相同的图片文件

#### Scenario: images 目录不存在时正常构建

- **WHEN** 项目根目录不存在 `images/` 文件夹
- **THEN** 构建正常完成，不报错

### Requirement: 页面支持亮暗主题自适应

生成的所有 HTML 页面 SHALL 使用 CSS 变量和 `prefers-color-scheme` 媒体查询，自动适配浏览器的亮色/暗色模式设置。

#### Scenario: 暗色模式下的页面显示

- **WHEN** 浏览器系统设置为暗色模式
- **THEN** 页面使用深色背景和浅色文字渲染

#### Scenario: 亮色模式下的页面显示

- **WHEN** 浏览器系统设置为亮色模式
- **THEN** 页面使用浅色背景和深色文字渲染

### Requirement: 构建输出到 _site 目录

构建脚本 SHALL 将所有生成的文件输出到 `_site/` 目录。如果目录不存在则自动创建。

#### Scenario: 首次构建创建输出目录

- **WHEN** `_site/` 目录不存在时执行构建
- **THEN** 自动创建 `_site/` 目录及 `_site/posts/` 子目录，生成所有页面文件
