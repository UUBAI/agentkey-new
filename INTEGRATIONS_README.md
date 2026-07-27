# AgentKey Integrations 页面说明

本仓库的 `integrations/` 是一套纯静态 HTML 页面，与 `renew/`、`pricing/` 同级。

## 目录结构

```text
integrations/
├── index.html                  # Integrations 一级页
├── {source}/index.html         # Source 二级页
├── {source}/{agent}/index.html # Source + Agent 三级页
└── local-assets/ 等             # 本地图片、logo、字体、素材
```

当前页面数量：

- 1 个一级页
- 58 个 Source 二级页
- 1392 个 Source + Agent 三级页

## 维护方式

直接修改对应页面的 HTML 文件即可。

示例：

```text
integrations/index.html
integrations/twitter/index.html
integrations/twitter/codex/index.html
```

如果只改某一个三级页里的标题、段落、FAQ、按钮文案或局部样式，直接打开对应路径下的 `index.html` 修改。

素材都在 `integrations/` 内部本地目录中，页面预览不依赖远程图片资源。

## 预览链接

Integrations 首页：
https://uubai.github.io/agentkey-new/integrations/

二级页示例：
https://uubai.github.io/agentkey-new/integrations/twitter/

三级页示例：
https://uubai.github.io/agentkey-new/integrations/brave-search/workbuddy/
