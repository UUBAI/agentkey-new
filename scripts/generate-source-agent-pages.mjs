import fs from "node:fs";
import path from "node:path";
import { sources } from "../integrations/data/sources.mjs";
import { agents as agentData } from "../integrations/data/agents.mjs";

const root = path.resolve(import.meta.dirname, "..");
const integrationsDir = path.join(root, "integrations");
const sourceTemplatePath = path.join(integrationsDir, "templates", "source-agent.html");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
}

function htmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jsString(value) {
  return JSON.stringify(String(value));
}

function sourceSlug(name) {
  if (name === "Twitter / X") return "twitter";
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sourceLabel(source) {
  return source.name === "Twitter / X" ? "X" : source.name;
}

function estimateHeroTitleWidth(text) {
  let units = 0;
  for (const char of text) {
    if (char === " ") units += 0.28;
    else if ("ilI.,/!|:;`'".includes(char)) units += 0.28;
    else if ("tfjr".includes(char)) units += 0.42;
    else if ("mwMW&@%".includes(char)) units += 0.82;
    else if (/[A-Z]/.test(char)) units += 0.68;
    else if (/[0-9]/.test(char)) units += 0.56;
    else if (/[a-z]/.test(char)) units += 0.55;
    else units += 0.6;
  }
  return units * 48 + Math.max(0, text.length - 1) * -2.28;
}

function shouldSplitHeroTitle(source, agent) {
  const label = sourceLabel(source);
  const title = `${label} API for ${agent.name}`;
  return estimateHeroTitleWidth(title) > 547;
}

function heroTitleHtml(source, agent) {
  const label = sourceLabel(source);
  if (!shouldSplitHeroTitle(source, agent)) {
    return `<h1><span>${htmlEscape(label)} API for ${htmlEscape(agent.name)}</span></h1>`;
  }
  return `<h1 class="hero-title-split"><span>${htmlEscape(label)} API for</span><span>${htmlEscape(agent.name)}</span></h1>`;
}

function possessive(label) {
  return /s$/i.test(label) ? `${label}'` : `${label}'s`;
}

function toComboPath(assetPath) {
  return `../../${assetPath.replace(/^(\.\.\/)+/, "")}`;
}

function buildUseItems(source) {
  const label = sourceLabel(source);
  const category = source.cat;
  const fallback = [
    `Search ${label} for fresh public data that your agent can reason over.`,
    `Summarize results into concise themes, entities, and workflow-ready notes.`,
    `Monitor changes, new records, and useful signals without another API setup.`,
    `Combine ${label} with search, social, finance, scraping, and business data.`,
    `Compare findings across sources to reduce stale or one-sided answers.`,
    `Turn live ${label} context into issues, reports, prompts, and agent tasks.`
  ];
  const byCategory = {
    search: [
      `Search the live web through ${label} from inside your agent workflow.`,
      "Ground answers with source context, citations, and current web results.",
      "Track competitors, products, market narratives, and breaking topics.",
      "Combine search results with social, finance, scraping, and business data.",
      "Summarize result clusters into themes, entities, and next steps.",
      "Turn live web findings into briefs, reports, tickets, and research tasks."
    ],
    scrape: [
      `Fetch and clean public web pages with ${label} for agent-ready reading.`,
      "Extract page content into concise summaries, structured fields, and notes.",
      "Monitor pages for useful changes without custom crawler setup.",
      "Combine scraped pages with search, social, finance, and company context.",
      "Research docs, landing pages, pricing pages, articles, and public sites.",
      "Turn page content into specs, comparisons, datasets, and workflow tasks."
    ],
    social: [
      `Search recent ${label} content by keyword, account, topic, or product.`,
      "Summarize conversations into themes, complaints, requests, and signals.",
      "Monitor mentions of products, competitors, launches, tokens, or projects.",
      `Combine ${label} with web search, Reddit, finance, and business data.`,
      "Research public sentiment, creators, communities, and emerging narratives.",
      "Turn social signals into issues, changelogs, research notes, and tasks."
    ],
    finance: [
      `Pull ${label} market data into agent workflows for current analysis.`,
      "Summarize quotes, indicators, news, assets, events, and market signals.",
      "Monitor instruments, sectors, tokens, wallets, protocols, or narratives.",
      "Combine market data with web search, social discussion, and company data.",
      "Compare signals across assets, exchanges, markets, and time windows.",
      "Turn market context into reports, alerts, models, and research tasks."
    ],
    ecommerce: [
      `Search ${label} product and marketplace data from inside your agent.`,
      "Summarize listings, prices, reviews, shops, and product positioning.",
      "Monitor product changes, pricing moves, category trends, and reviews.",
      "Combine marketplace data with social signals, search, and competitor pages.",
      "Compare products, sellers, demand signals, and customer feedback.",
      "Turn commerce research into sourcing notes, briefs, reports, and tasks."
    ],
    business: [
      `Bring ${label} company intelligence into your agent workflow.`,
      "Summarize funding, founders, investors, acquisitions, and company profiles.",
      "Monitor startup activity, market moves, competitors, and investor signals.",
      "Combine company data with search, social, finance, and web context.",
      "Compare organizations, funding rounds, categories, and ecosystem signals.",
      "Turn business intelligence into memos, watchlists, reports, and tasks."
    ]
  };
  const copy = byCategory[category] || fallback;
  const icons = [
    "use-icon-search.svg",
    "use-icon-summary.svg",
    "use-icon-monitor.svg",
    "use-icon-combine.svg",
    "use-icon-trend.svg",
    "use-icon-task.svg"
  ];
  return copy.map((text, index) => {
    return `<article class="use-item reveal-scale"><img class="use-icon" src="../../local-assets/source-agent-detail/use-section/${icons[index]}" alt=""/><p>${htmlEscape(text)}</p></article>`;
  }).join("\n        ");
}

function buildWhyCards(source, agent) {
  const label = sourceLabel(source);
  const cards = [
    {
      icon: "magic-edit.svg",
      title: "One API for live data",
      body: `Connect ${agent.name} to ${label}, web search, social data, finance, scraping, e-commerce, and business sources through one consistent interface.`
    },
    {
      icon: "robot.svg",
      title: "Built for AI agents",
      body: `AgentKey tools are purpose-built for workflows where ${agent.name} needs to fetch, compare, summarize, and reason over live external data.`
    },
    {
      icon: "zap.svg",
      title: "Less integration work",
      body: `Skip separate ${label} provider setup, authentication flows, response parsing, and tool schema definitions for every agent workflow.`
    },
    {
      icon: "blocks.svg",
      title: "Structured results",
      body: `AgentKey returns cleaner, normalized ${label} data that ${agent.name} can summarize, group, filter, compare, and reuse inside tasks.`
    }
  ];
  return cards.map((card) => {
    return `<article class="why-card reveal-scale"><img class="why-card-icon" src="../../local-assets/source-agent-detail/icons/${card.icon}" alt=""/><h3>${htmlEscape(card.title)}</h3><p>${htmlEscape(card.body)}</p></article>`;
  }).join("\n        ");
}

function buildPrompts(source) {
  const label = sourceLabel(source);
  const category = source.cat;
  const byCategory = {
    search: [
      `Search ${label} for recent results about AgentKey competitors and summarize the key positioning patterns.`,
      `Use ${label} to find current discussions about MCP data tools and group the results by user intent.`,
      `Research the latest news about AI agent infrastructure with ${label} and list the strongest signals.`
    ],
    scrape: [
      `Use ${label} to extract this product page and summarize pricing, positioning, and missing details.`,
      `Crawl the provided docs page with ${label} and turn the content into implementation notes.`,
      `Fetch three competitor pages with ${label} and compare their claims, CTAs, and data-source coverage.`
    ],
    social: [
      `Search recent ${label} content about AgentKey and summarize top discussion themes.`,
      `Find ${label} content mentioning Cursor and live data APIs and group by user intent.`,
      `Track emerging AI agent narratives from ${label} in the last 24 hours.`
    ],
    finance: [
      `Pull recent ${label} market signals for AI infrastructure companies and summarize notable changes.`,
      `Use ${label} to compare current price, volume, and news signals for a watchlist of assets.`,
      `Find market-moving events from ${label} and turn them into a short research brief.`
    ],
    ecommerce: [
      `Search ${label} for products related to AI desk accessories and summarize pricing clusters.`,
      `Use ${label} to compare listings, reviews, and positioning for three competing products.`,
      `Find emerging product demand signals from ${label} and turn them into a sourcing brief.`
    ],
    business: [
      `Use ${label} to research AgentKey-adjacent companies and summarize funding and investor signals.`,
      `Find startup competitors in real-time data infrastructure with ${label} and compare their positioning.`,
      `Build a watchlist from ${label} for companies working on AI agents, APIs, and data tooling.`
    ]
  };
  return byCategory[category] || [
    `Use ${label} to gather fresh data and summarize the most important signals.`,
    `Compare ${label} results with web search and social data for a fuller picture.`,
    `Turn ${label} findings into a concise report with recommended next steps.`
  ];
}

function buildFaqs(source, agent) {
  const label = sourceLabel(source);
  return [
    {
      q: `Can ${agent.name} access ${label} data directly?`,
      a: `No, ${agent.name} needs an integration layer like AgentKey to provide authenticated, structured, and rate-limited access to ${label} data in a format optimized for AI agents.`
    },
    {
      q: `What can I use ${label} data for?`,
      a: `${label} is useful for live research, monitoring, comparison, summarization, and workflows where an agent needs current external context instead of static model knowledge.`
    },
    {
      q: `Is AgentKey the same as the official ${label} API?`,
      a: `AgentKey provides a simplified, agent-optimized interface across multiple data providers. It handles connection details, access control, and response normalization so your agent can focus on the workflow.`
    },
    {
      q: "Can I use the same setup with other data sources?",
      a: `Yes. Once AgentKey is connected to ${agent.name}, you can combine ${label} with search, scraping, social, finance, e-commerce, and business sources through the same integration pattern.`
    },
    {
      q: "Does every workflow need human approval?",
      a: "Research and retrieval workflows can often be automated, but workflows that write data, publish content, or trigger external actions should include a human approval step."
    }
  ];
}

function arrayLiteral(items) {
  return `[\n${items.map((item) => `  {${Object.entries(item).map(([key, value]) => `${key}:${jsString(value)}`).join(",")}}`).join(",\n")}\n]`;
}

function sourceCardsFor(currentSource, sources) {
  const preferred = [
    "Brave Search",
    "Firecrawl",
    "Reddit",
    "YouTube",
    "Perplexity",
    "Market Data",
    "Serper",
    "Alpha Vantage",
    "Crunchbase",
    "Amazon"
  ];
  const ordered = [
    ...preferred.map((name) => sources.find((source) => source.name === name)).filter(Boolean),
    ...sources
  ];
  const seen = new Set();
  return ordered
    .filter((source) => source.name !== currentSource.name)
    .filter((source) => {
      const slug = sourceSlug(source.name);
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .slice(0, 10)
    .map((source) => ({
      name: sourceLabel(source),
      desc: source.desc,
      logo: toComboPath(source.logo),
      href: `../../${sourceSlug(source.name)}/index.html`
    }));
}

function agentCardsFor(currentAgent, agents) {
  const preferred = [
    "Claude code",
    "Codex",
    "ChatGPT",
    "Cursor",
    "OpenCode",
    "Windsurf",
    "Gemini CLI",
    "Qwen Code",
    "WorkBuddy"
  ];
  const ordered = [
    ...preferred.map((name) => agents.find((agent) => agent.name === name)).filter(Boolean),
    ...agents
  ];
  const seen = new Set();
  return ordered
    .filter((agent) => agent.href !== currentAgent.href)
    .filter((agent) => {
      const slug = agent.href.replace(/\/index\.html$/, "");
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .slice(0, 6)
    .map((agent) => ({
      name: agent.name,
      desc: agent.desc,
      logo: toComboPath(agent.logo.replace(/^\.\.\//, "")),
      href: `../${agent.href}`
    }));
}

function normalizeAgent(agent) {
  const slug = agent.slug || agent.href.replace(/\/index\.html$/, "");
  const heroSrc = toComboPath(agent.hero?.src || agent.logo);
  return {
    ...agent,
    slug,
    style: agent.style || "--agent-accent:#6B7280;--agent-bg:#FFFFFF",
    heroMarkup: agent.hero?.type === "frame"
      ? `<div class="agent-hero-frame"><img class="agent-hero-icon" src="${heroSrc}" alt="${htmlEscape(agent.name)} logo"/></div>`
      : `<img class="agent-hero-logo" src="${heroSrc}" alt="${htmlEscape(agent.name)} logo"/>`,
    miniLogo: toComboPath(agent.miniLogo || agent.logo)
  };
}

function renderPage(template, source, agent, sources, agents) {
  const sourceSlugValue = sourceSlug(source.name);
  const label = sourceLabel(source);
  const sourceLogo = toComboPath(source.logo);
  const prompts = buildPrompts(source);
  const faqLiteral = arrayLiteral(buildFaqs(source, agent));
  const otherAgentsLiteral = arrayLiteral(agentCardsFor(agent, agents));
  const otherSourcesLiteral = arrayLiteral(sourceCardsFor(source, sources));
  const useItems = buildUseItems(source);
  const whyCards = buildWhyCards(source, agent);
  const titleMarkup = heroTitleHtml(source, agent);
  const heroCopy = `Connect ${agent.name} to ${label} live data with AgentKey. Fetch fresh results through one API key, with access and response handling built for agent workflows.`;
  const otherAgentDesc = `Use the same ${label} data workflow across Claude, Cursor, OpenCode, and more.`;
  const otherSourceDesc = "Explore more live data sources for search, social, finance, business, scraping, and commerce workflows.";

  let html = template;
  html = html.replace(
    /\.breadcrumb\{position:absolute;left:126px;top:107px;width:328px;display:flex;align-items:center;[^}]*\}/,
    ".breadcrumb{position:absolute;left:126px;top:107px;width:328px;display:flex;align-items:center;flex-wrap:nowrap;min-width:0;overflow-x:auto;overflow-y:hidden;white-space:nowrap;scrollbar-width:none;font-size:16px;line-height:24px;font-weight:500;color:#9ca3af}.breadcrumb::-webkit-scrollbar{display:none}"
  );
  html = html.replace(/(?:\.breadcrumb::-webkit-scrollbar\{display:none\})+/g, ".breadcrumb::-webkit-scrollbar{display:none}");
  html = html.replace(
    /\.breadcrumb a\{color:#9ca3af;transition:color \.18s ease\}/,
    ".breadcrumb a{color:#9ca3af;transition:color .18s ease;white-space:nowrap}"
  );
  html = html.replace(
    /\.breadcrumb-separator\{margin:0 18px;color:#9ca3af\}/,
    ".breadcrumb-separator{flex:0 0 auto;margin:0 18px;color:#9ca3af}"
  );
  html = html.replace(
    /(?:\.breadcrumb a:first-child\{[^}]*\})?(?:\.breadcrumb-link,\.breadcrumb-current\{[^}]*\})?(?:\.breadcrumb-link\{[^}]*\})?\.breadcrumb-current\{[^}]*\}/,
    ".breadcrumb a:first-child{flex:0 0 auto}.breadcrumb-link,.breadcrumb-current{flex:0 0 auto;min-width:0;overflow:visible;text-overflow:clip;white-space:nowrap}.breadcrumb-current{color:#26202f}"
  );
  html = html.replace(
    /\.source-agent-page \.breadcrumb\{top:89px;font-size:14px;line-height:23\.1px\}/,
    ".source-agent-page .breadcrumb{top:89px;width:min(720px,calc(100% - 252px));font-size:14px;line-height:23.1px}"
  );
  html = html.replace(
    /\.source-agent-page \.source-hero h1\.hero-title-split\{font-size:clamp\(30px,8vw,40px\)\}(?:\.source-agent-page \.source-hero h1\.hero-title-split\{font-size:clamp\(30px,8vw,40px\)\})+/g,
    ".source-agent-page .source-hero h1.hero-title-split{font-size:clamp(30px,8vw,40px)}"
  );
  html = html.replace(
    /\.source-agent-page \.source-hero h1\.hero-title-split\{font-size:clamp\(22px,6\.8vw,31px\)\}(?:\.source-agent-page \.source-hero h1\.hero-title-split\{font-size:clamp\(22px,6\.8vw,31px\)\})+/g,
    ".source-agent-page .source-hero h1.hero-title-split{font-size:clamp(22px,6.8vw,31px)}"
  );
  html = html.replace(
    /(\.source-agent-page \.source-hero h1\.hero-title-split\+p,\s*\.source-agent-page \.source-hero h1\.hero-title-split~\.hero-actions\{top:auto\}\s*)+/g,
    ".source-agent-page .source-hero h1.hero-title-split+p,\n  .source-agent-page .source-hero h1.hero-title-split~.hero-actions{top:auto}\n  "
  );
  html = html.replace(
    ".source-agent-page .source-hero h1{top:125px;width:562px;line-height:1.1;letter-spacing:-2.28px}\n.source-agent-page .source-hero p{top:206px;width:562px;line-height:29.7px}",
    ".source-agent-page .source-hero h1{top:125px;width:562px;line-height:1.1;letter-spacing:-2.28px}\n.source-agent-page .source-hero h1.hero-title-split+p{top:253px}\n.source-agent-page .source-hero h1.hero-title-split~.hero-actions{top:432px}\n.source-agent-page .source-hero p{top:206px;width:562px;line-height:29.7px}"
  );
  html = html.replace(
    ".source-agent-page .source-hero{min-height:650px}.source-agent-page .source-hero h1{font-size:clamp(34px,9vw,42px);line-height:1.08}",
    ".source-agent-page .source-hero{min-height:650px}.source-agent-page .source-hero h1{font-size:clamp(34px,9vw,42px);line-height:1.08}.source-agent-page .source-hero h1.hero-title-split{font-size:clamp(30px,8vw,40px)}"
  );
  html = html.replace(
    ".source-agent-page .source-hero{min-height:616px}.source-agent-page .source-hero h1{font-size:31px}",
    ".source-agent-page .source-hero{min-height:616px}.source-agent-page .source-hero h1{font-size:31px}.source-agent-page .source-hero h1.hero-title-split{font-size:clamp(22px,6.8vw,31px)}"
  );
  html = html.replace(
    "  .source-agent-page .breadcrumb,\n  .source-agent-page .source-hero h1,\n  .source-agent-page .source-hero p,\n  .source-agent-page .hero-actions{top:auto}",
    "  .source-agent-page .breadcrumb,\n  .source-agent-page .source-hero h1,\n  .source-agent-page .source-hero p,\n  .source-agent-page .hero-actions{top:auto}\n  .source-agent-page .source-hero h1.hero-title-split+p,\n  .source-agent-page .source-hero h1.hero-title-split~.hero-actions{top:auto}"
  );
  html = html.replace(
    /(\.source-agent-page \.source-hero h1\.hero-title-split\+p,\s*\.source-agent-page \.source-hero h1\.hero-title-split~\.hero-actions\{top:auto\}\s*)+/g,
    ".source-agent-page .source-hero h1.hero-title-split+p,\n  .source-agent-page .source-hero h1.hero-title-split~.hero-actions{top:auto}\n  "
  );
  html = html.replace(/\n\/\* Source-agent breadcrumb nowrap \*\/[\s\S]*?\/\* End source-agent breadcrumb nowrap \*\/\n/g, "\n");
  html = html.replace(
    ".source-agent-page .hero-actions .primary-button{width:145px}",
    ".source-agent-page .hero-actions .primary-button{width:145px}\n/* Source-agent breadcrumb nowrap */\n@media(max-width:1180px){.source-agent-page .breadcrumb{width:100%;max-width:100%;overflow-x:auto}.source-agent-page .breadcrumb-separator{margin:0 12px}.source-agent-page .breadcrumb-link,.source-agent-page .breadcrumb-current{flex:0 0 auto;overflow:visible;text-overflow:clip;white-space:nowrap}}\n@media(max-width:768px){.source-agent-page .breadcrumb{width:100%;max-width:100%;overflow-x:auto}.source-agent-page .breadcrumb-separator{margin:0 8px}}\n/* End source-agent breadcrumb nowrap */"
  );
  html = html.replace(/<title>.*?<\/title>/, `<title>${htmlEscape(label)} API for ${htmlEscape(agent.name)} | AgentKey</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\/>/, `<meta name="description" content="${htmlEscape(`Connect ${agent.name} to ${label} data with AgentKey.`)}"/>`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\/>/, `<link rel="canonical" href="https://agentkey.app/integrations/${sourceSlugValue}/${agent.slug}/"/>`);
  html = html.replace(/\.source-agent-page\{[^}]*\}/, `.source-agent-page{${agent.style}}`);
  html = html.replace(
    /<div class="breadcrumb">[\s\S]*?<\/div>\s*<div class="pair-hero-art"/,
    `<div class="breadcrumb"><a href="../../index.html#sources">All sources</a><span class="breadcrumb-separator" aria-hidden="true">/</span><a href="../index.html" class="breadcrumb-link">${htmlEscape(label)}</a><span class="breadcrumb-separator" aria-hidden="true">/</span><span class="breadcrumb-current">${htmlEscape(agent.name)}</span></div>\n      <div class="pair-hero-art"`
  );
  html = html.replace(/<img class="hero-source-logo" src="[^"]+" alt="[^"]*"\/>/g, `<img class="hero-source-logo" src="${sourceLogo}" alt="${htmlEscape(label)} logo"/>`);
  html = html.replace(/<div class="agent-node">[\s\S]*?<\/div>\s*<\/div>\s*<h1>/, `<div class="agent-node">\n          ${agent.heroMarkup}\n        </div>\n      </div>\n      <h1>`);
  html = html.replace(/<h1(?: class="[^"]+")?><span>[\s\S]*?<\/span>(?:<span>[\s\S]*?<\/span>)?<\/h1>/, titleMarkup);
  html = html.replace(/<h1(?: class="[^"]+")?><span>[\s\S]*?<\/span>(?:<span>[\s\S]*?<\/span>)?<\/h1>\s*<p>[\s\S]*?<\/p>/, `${titleMarkup}\n      <p>${htmlEscape(heroCopy)}</p>`);
  html = html.replace(/<h2 class="section-title">Why use AgentKey for .*?<\/h2>/, `<h2 class="section-title">Why use AgentKey for ${htmlEscape(label)} and ${htmlEscape(agent.name)}?</h2>`);
  html = html.replace(/<div class="why-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*\n\s*<section class="detail-section use-detail">/, `<div class="why-grid">\n        ${whyCards}\n      </div>\n    </div>\n  </section>\n\n  <section class="detail-section use-detail">`);
  html = html.replace(/<h2>What you can do with .*?<\/h2>/, `<h2>What you can do with ${htmlEscape(label)} in ${htmlEscape(agent.name)}</h2>`);
  html = html.replace(/<img class="mini-flow-source-logo" src="[^"]+" alt="[^"]*"\/>/, `<img class="mini-flow-source-logo" src="${sourceLogo}" alt="${htmlEscape(label)} logo"/>`);
  html = html.replace(/<img class="mini-flow-agent-logo" src="[^"]+" alt="[^"]*"\/>/, `<img class="mini-flow-agent-logo" src="${agent.miniLogo}" alt="${htmlEscape(agent.name)} logo"/>`);
  html = html.replace(/<div class="use-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*\n\s*<section class="prompt-detail">/, `<div class="use-grid">\n        ${useItems}\n      </div>\n    </div>\n  </section>\n\n  <section class="prompt-detail">`);
  html = html.replace(/<div class="prompt-titlebar">.*?<\/div>/, `<div class="prompt-titlebar">${htmlEscape(agent.name)}</div>`);
  html = html.replace(
    /<div class="prompt-block">[\s\S]*?<\/div><\/div>\s*<div class="prompt-block">[\s\S]*?<\/div><\/div>\s*<div class="prompt-block">[\s\S]*?<\/div><\/div>/,
    prompts.map((prompt, index) => `<div class="prompt-block"><span class="prompt-label">prompt ${index + 1}</span><div class="prompt-row"><span>"${htmlEscape(prompt)}"</span><button class="copy-btn" type="button" aria-label="Copy prompt"><img src="../../local-assets/source-agent-detail/icons/copy.svg" alt=""/></button></div></div>`).join("\n          ")
  );
  html = html.replace(/<h2 class="section-title">Build this .*? integration with other agents<\/h2><p class="detail-subcopy">[\s\S]*?<\/p><div class="agent-link-grid"/, `<h2 class="section-title">Build this ${htmlEscape(label)} integration with other agents</h2><p class="detail-subcopy">${otherAgentDesc}</p><div class="agent-link-grid"`);
  html = html.replace(/<h2 class="section-title">Explore other AgentKey data sources<\/h2><p class="detail-subcopy">[\s\S]*?<\/p><div class="source-link-grid"/, `<h2 class="section-title">Explore other AgentKey data sources</h2><p class="detail-subcopy">${otherSourceDesc}</p><div class="source-link-grid"`);
  html = html.replace(/const otherAgents=\[[\s\S]*?\];\nconst otherSources=/, `const otherAgents=${otherAgentsLiteral};\nconst otherSources=`);
  html = html.replace(/const otherSources=\[[\s\S]*?\];\nconst faqs=/, `const otherSources=${otherSourcesLiteral};\nconst faqs=`);
  html = html.replace(/const faqs=\[[\s\S]*?\];\nfunction arrowSvg/, `const faqs=${faqLiteral};\nfunction arrowSvg`);
  return html;
}

const agents = agentData.map(normalizeAgent);
const template = read(sourceTemplatePath);

let count = 0;
for (const source of sources) {
  const slug = sourceSlug(source.name);
  for (const agent of agents) {
    const file = path.join(integrationsDir, slug, agent.slug, "index.html");
    write(file, renderPage(template, source, agent, sources, agents));
    count += 1;
  }
}

console.log(`Generated ${count} source-agent pages.`);
