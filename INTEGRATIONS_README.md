# AgentKey Integrations 页面说明

本仓库已新增 `integrations` 页面模块，与现有 `renew`、`pricing` 同级。

## 目录结构

```text
integrations/
├── index.html                  # Integrations 一级页
├── {source}/index.html         # Source 二级页
├── {source}/{agent}/index.html # Source + Agent 三级页
├── data/                       # Source 和 Agent 数据
├── templates/                  # 页面模板
└── local-assets/ 等             # 本地图片、logo、字体、素材

scripts/
└── generate-integration-pages.mjs
```

当前生成页面数量：

- 1 个 Integrations 一级页
- 58 个 Source 二级页
- 1392 个 Source + Agent 三级页

## 维护方式

不要直接手动改生成后的页面，否则下次运行脚本会被覆盖。

如果要改 Source / Agent 数据：

```text
integrations/data/sources.mjs
integrations/data/agents.mjs
```

如果要改页面结构、样式或交互：

```text
integrations/templates/integrations.html
integrations/templates/source.html
integrations/templates/source-agent.html
```

修改后运行：

```bash
node scripts/generate-integration-pages.mjs
```

## 预览链接

Integrations 首页：  
https://uubai.github.io/agentkey-new/integrations/

二级页示例：  
https://uubai.github.io/agentkey-new/integrations/twitter/

三级页示例：  
https://uubai.github.io/agentkey-new/integrations/brave-search/workbuddy/
