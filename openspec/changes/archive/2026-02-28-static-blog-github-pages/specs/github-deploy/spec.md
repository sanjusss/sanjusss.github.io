## ADDED Requirements

### Requirement: 监听 main 分支 push 事件触发构建

GitHub Actions 工作流 SHALL 在代码 push 到 main 分支时自动触发，执行构建和部署流程。

#### Scenario: push 到 main 分支触发部署

- **WHEN** 开发者将代码 push 到 main 分支
- **THEN** GitHub Actions 自动运行构建部署工作流

#### Scenario: push 到非 main 分支不触发

- **WHEN** 开发者将代码 push 到 feature 分支
- **THEN** 不触发构建部署工作流

### Requirement: 安装依赖并执行构建

工作流 SHALL 使用 Node.js 20 环境，安装 npm 依赖后执行 `npm run build` 生成静态文件。

#### Scenario: 构建流程正常执行

- **WHEN** 工作流触发后
- **THEN** 依次执行 checkout 代码、安装 Node.js 20、npm install、npm run build，在 `_site/` 目录生成静态文件

### Requirement: 部署到 GitHub Pages

工作流 SHALL 使用 `peaceiris/actions-gh-pages@v4` 将 `_site/` 目录的内容发布到 gh-pages 分支，使用 `GITHUB_TOKEN` 进行认证。

#### Scenario: 构建产物成功部署

- **WHEN** `npm run build` 成功完成且 `_site/` 目录包含生成的 HTML 文件
- **THEN** 工作流将 `_site/` 目录内容推送到 gh-pages 分支，GitHub Pages 从该分支提供站点服务

### Requirement: 工作流在 ubuntu-latest 运行

工作流 SHALL 在 `ubuntu-latest` 运行器上执行，确保构建环境一致性。

#### Scenario: 运行环境正确

- **WHEN** 工作流被触发
- **THEN** 所有步骤在 ubuntu-latest 环境中执行
