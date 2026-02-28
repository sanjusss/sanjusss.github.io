const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT_DIR = path.join(__dirname, '_site');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function scanPosts() {
  const posts = [];
  const files = fs.readdirSync(POSTS_DIR);
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(POSTS_DIR, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      
      content = content.trimStart();
      const firstDashIndex = content.indexOf('---');
      if (firstDashIndex > 0) {
        content = content.slice(firstDashIndex);
      }
      
      const { data, content: markdownContent } = matter(content);
      
      posts.push({
        filename: file,
        slug: file.replace('.md', ''),
        title: data.title || '无标题',
        date: data.date || '',
        description: data.description || '',
        content: markdownContent
      });
    }
  }
  
  return posts.sort((a, b) => new Date(b.date || '1970-01-01') - new Date(a.date || '1970-01-01'));
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

function formatLongDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function generateIndex(posts) {
  const postItems = posts.map(post => `
    <li class="post-item">
      <a href="./posts/${post.slug}.html">
        <h2 class="post-title">${post.title}</h2>
        <div class="post-meta">
          ${formatDate(post.date)}
          ${post.description ? ' · ' + post.description : ''}
        </div>
        <p class="post-description">${post.description || '暂无描述'}</p>
      </a>
    </li>
  `).join('');

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>我的博客</title>
  <meta name="description" content="陈玉鹏的个人博客" />
  <style>
    :root {
      --bg: #0b0c0f;
      --text: #e7e9ee;
      --muted: #9aa2ad;
      --accent: #8ab4ff;
      --accent-hover: #6fa0ff;
      --card-bg: #14161b;
      --border: #2a2d35;
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: #f6f7fb;
        --text: #111827;
        --muted: #6b7280;
        --accent: #1e40af;
        --accent-hover: #1e3a8a;
        --card-bg: #ffffff;
        --border: #e5e7eb;
      }
    }
    * {
      box-sizing: border-box;
    }
    html, body {
      margin: 0;
      padding: 0;
      min-height: 100%;
    }
    body {
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Noto Sans SC", Arial, "Helvetica Neue", Helvetica, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 50px;
      padding-bottom: 30px;
      border-bottom: 1px solid var(--border);
    }
    .header h1 {
      margin: 0 0 12px;
      font-size: clamp(24px, 4vw, 36px);
      letter-spacing: 0.4px;
    }
    .header .desc {
      font-size: clamp(14px, 2.3vw, 16px);
      line-height: 1.75;
      color: var(--muted);
      max-width: 600px;
      margin: 0 auto;
    }
    .post-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .post-item {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .post-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .post-item a {
      text-decoration: none;
      color: inherit;
    }
    .post-title {
      margin: 0 0 8px;
      font-size: 20px;
      font-weight: 600;
      color: var(--text);
    }
    .post-title:hover {
      color: var(--accent);
    }
    .post-meta {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 12px;
    }
    .post-description {
      margin: 0;
      font-size: 15px;
      color: var(--muted);
      line-height: 1.6;
    }
    .footer {
      text-align: center;
      padding: 40px 20px;
      color: var(--muted);
      font-size: 14px;
      border-top: 1px solid var(--border);
      margin-top: 60px;
    }
    .footer a {
      color: var(--accent);
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>你好，我是陈玉鹏。</h1>
      <p class="desc">
        专注于 <strong>后端开发</strong>、<strong>分布式系统</strong> 与 <strong>底层调试</strong> 的实战笔记，记录问题、方案与踩坑过程。
      </p>
    </div>
    <ul class="post-list">
      ${postItems}
    </ul>
    <div class="footer">
      备案号：<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">苏ICP备16005330号-1</a>
    </div>
  </div>
</body>
</html>`;
}

function generatePostPage(post) {
  const htmlContent = marked.parse(post.content);
  
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${post.title} - 陈玉鹏</title>
  <meta name="description" content="陈玉鹏的个人博客文章" />
  <style>
    :root {
      --bg: #0b0c0f;
      --text: #e7e9ee;
      --muted: #9aa2ad;
      --accent: #8ab4ff;
      --accent-hover: #6fa0ff;
      --code-bg: #1a1d24;
      --border: #2a2d35;
      --blockquote-bg: #14161b;
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: #f6f7fb;
        --text: #111827;
        --muted: #6b7280;
        --accent: #1e40af;
        --accent-hover: #1e3a8a;
        --code-bg: #f3f4f6;
        --border: #e5e7eb;
        --blockquote-bg: #ffffff;
      }
    }
    * {
      box-sizing: border-box;
    }
    html, body {
      margin: 0;
      padding: 0;
      min-height: 100%;
    }
    body {
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Noto Sans SC", Arial, "Helvetica Neue", Helvetica, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
    }
    .header h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
    .nav a {
      color: var(--muted);
      text-decoration: none;
      margin-left: 20px;
      font-size: 14px;
      transition: color 0.2s;
    }
    .nav a:hover {
      color: var(--accent);
    }
    .back-link {
      display: inline-block;
      color: var(--muted);
      text-decoration: none;
      font-size: 14px;
      margin-bottom: 20px;
      transition: color 0.2s;
    }
    .back-link:hover {
      color: var(--accent);
    }
    .post-title {
      margin: 0 0 10px;
      font-size: clamp(24px, 4vw, 32px);
      font-weight: 700;
      line-height: 1.3;
    }
    .post-meta {
      font-size: 14px;
      color: var(--muted);
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
    }
    .post-content {
      font-size: 16px;
    }
    .post-content h1,
    .post-content h2,
    .post-content h3,
    .post-content h4,
    .post-content h5,
    .post-content h6 {
      margin-top: 2em;
      margin-bottom: 0.8em;
      font-weight: 600;
      line-height: 1.3;
    }
    .post-content h1 {
      font-size: 28px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.3em;
    }
    .post-content h2 {
      font-size: 24px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.3em;
    }
    .post-content h3 {
      font-size: 20px;
    }
    .post-content h4 {
      font-size: 18px;
    }
    .post-content p {
      margin: 1em 0;
    }
    .post-content a {
      color: var(--accent);
      text-decoration: none;
    }
    .post-content a:hover {
      text-decoration: underline;
    }
    .post-content code {
      background: var(--code-bg);
      padding: 0.2em 0.4em;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 0.9em;
    }
    .post-content pre {
      background: var(--code-bg);
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.5em 0;
    }
    .post-content pre code {
      background: none;
      padding: 0;
      font-size: 14px;
    }
    .post-content blockquote {
      border-left: 4px solid var(--accent);
      padding: 0.5em 1em;
      margin: 1.5em 0;
      background: var(--blockquote-bg);
      color: var(--muted);
    }
    .post-content ul,
    .post-content ol {
      padding-left: 2em;
      margin: 1em 0;
    }
    .post-content li {
      margin: 0.5em 0;
    }
    .post-content img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1.5em 0;
    }
    .post-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5em 0;
    }
    .post-content th,
    .post-content td {
      border: 1px solid var(--border);
      padding: 8px 12px;
      text-align: left;
    }
    .post-content th {
      background: var(--code-bg);
      font-weight: 600;
    }
    .post-content hr {
      border: none;
      border-top: 1px solid var(--border);
      margin: 2em 0;
    }
    .footer {
      text-align: center;
      padding: 40px 20px;
      color: var(--muted);
      font-size: 14px;
      border-top: 1px solid var(--border);
      margin-top: 60px;
    }
    .footer a {
      color: var(--accent);
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>文章</h1>
      <nav class="nav">
        <a href="../index.html">首页</a>
      </nav>
    </div>
    <a href="../index.html" class="back-link">← 返回首页</a>
    <h1 class="post-title">${post.title}</h1>
    <div class="post-meta">
      ${formatLongDate(post.date)}
      ${post.description ? ' · ' + post.description : ''}
    </div>
    <div class="post-content">${htmlContent}</div>
    <div class="footer">
      备案号：<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">苏ICP备16005330号-1</a>
    </div>
  </div>
</body>
</html>`;
}

function copyStaticFiles() {
  const imagesDir = path.join(__dirname, 'images');
  if (fs.existsSync(imagesDir)) {
    const destImagesDir = path.join(OUTPUT_DIR, 'images');
    ensureDir(destImagesDir);
    
    const images = fs.readdirSync(imagesDir);
    for (const image of images) {
      const srcImagePath = path.join(imagesDir, image);
      const destImagePath = path.join(destImagesDir, image);
      fs.copyFileSync(srcImagePath, destImagePath);
    }
  }
}

function build() {
  console.log('开始构建...');
  
  ensureDir(OUTPUT_DIR);
  const postsOutputDir = path.join(OUTPUT_DIR, 'posts');
  ensureDir(postsOutputDir);
  
  const posts = scanPosts();
  console.log(`发现 ${posts.length} 篇文章`);
  
  const indexHtml = generateIndex(posts);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHtml);
  console.log('生成 index.html');
  
  for (const post of posts) {
    const postHtml = generatePostPage(post);
    const outputPath = path.join(postsOutputDir, `${post.slug}.html`);
    fs.writeFileSync(outputPath, postHtml);
    console.log(`生成 posts/${post.slug}.html`);
  }
  
  copyStaticFiles();
  console.log('复制静态资源');
  
  console.log('构建完成！');
}

build();
