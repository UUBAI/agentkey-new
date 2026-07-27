import fs from "node:fs";
import path from "node:path";
import { sources } from "../integrations/data/sources.mjs";
import { agents } from "../integrations/data/agents.mjs";

const root = path.resolve(import.meta.dirname, "..");
const integrationsDir = path.join(root, "integrations");
const templatePath = path.join(integrationsDir, "templates", "source.html");

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

function sourceLabel(source) {
  return source.name === "Twitter / X" ? "X" : source.name;
}

function sourceSlug(source) {
  if (source.slug) return source.slug;
  if (source.name === "Twitter / X") return "twitter";
  return source.name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toSourcePath(assetPath) {
  return `../${assetPath.replace(/^(\.\.\/)+/, "")}`;
}

function agentsLiteral() {
  return `[\n${agents.map((agent) => {
    const fields = {
      name: agent.name,
      desc: agent.desc,
      logo: toSourcePath(agent.logo),
      href: agent.href
    };
    return `  {${Object.entries(fields).map(([key, value]) => `${key}:${jsString(value)}`).join(",")}}`;
  }).join(",\n")}\n]`;
}

function renderSourcePage(template, source) {
  const slug = sourceSlug(source);
  const detail = source.detail || {};
  const label = detail.breadcrumbLabel || sourceLabel(source);
  const titleSpans = detail.titleSpans?.length
    ? detail.titleSpans
    : [`Connect ${label} to your `, "AI Agent with AgentKey"];
  const titleStyle = detail.titleStyle ? ` style="${htmlEscape(detail.titleStyle)}"` : "";
  const heroInnerStyle = detail.heroInnerStyle ? ` style="${htmlEscape(detail.heroInnerStyle)}"` : "";
  const heroCopy = detail.heroCopy || `Connect ${label} data to your AI workflows with a single API key.`;
  const agentHeadingCopy = detail.agentHeadingCopy || `Select the agent architecture you want to power with ${label} data.`;
  const logo = toSourcePath(detail.heroLogo || source.logo);
  const logoAlt = detail.heroLogoAlt || `${label} logo`;

  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${htmlEscape(source.name)} Integration | AgentKey</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\/>/, `<meta name="description" content="${htmlEscape(`Connect ${source.name} data to AI agents with AgentKey.`)}"/>`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\/>/, `<link rel="canonical" href="https://agentkey.app/integrations/${slug}/"/>`);
  html = html.replace(/<div class="source-hero-inner"[^>]*>/, `<div class="source-hero-inner"${heroInnerStyle}>`);
  html = html.replace(
    /<div class="breadcrumb">[\s\S]*?<\/div>\s*<div class="hero-art"/,
    `<div class="breadcrumb"><a href="../index.html#sources">All sources</a><span class="breadcrumb-separator" aria-hidden="true">/</span><span class="breadcrumb-current">${htmlEscape(label)}</span></div>\n      <div class="hero-art"`
  );
  html = html.replace(/<img class="hero-source-logo" src="[^"]+" alt="[^"]*"\/>/, `<img class="hero-source-logo" src="${logo}" alt="${htmlEscape(logoAlt)}"/>`);
  html = html.replace(
    /<h1[^>]*>[\s\S]*?<\/h1>\s*<p>[\s\S]*?<\/p>/,
    `<h1${titleStyle}>${titleSpans.map((span) => `<span>${htmlEscape(span)}</span>`).join("")}</h1>\n      <p>${htmlEscape(heroCopy)}</p>`
  );
  html = html.replace(
    /<div class="agent-heading">\s*<h2>Choose your AI agent<\/h2>\s*<p>[\s\S]*?<\/p>\s*<\/div>/,
    `<div class="agent-heading">\n        <h2>Choose your AI agent</h2>\n        <p>${htmlEscape(agentHeadingCopy)}</p>\n      </div>`
  );
  html = html.replace(/const agents=\[[\s\S]*?\];\nconst grid=/, `const agents=${agentsLiteral()};\nconst grid=`);

  if (!detail.includeAlignActiveNav) {
    html = html.replace(/function alignActiveNav\(\)\{[\s\S]*?\n\}\nfunction renderAgents\(\)\{/, "function renderAgents(){");
    html = html.replace(/window\.addEventListener\("load",alignActiveNav\);\nwindow\.addEventListener\("resize",alignActiveNav\);\nalignActiveNav\(\);\n/, "");
  }

  return html;
}

const template = read(templatePath);
let count = 0;
for (const source of sources) {
  const file = path.join(integrationsDir, sourceSlug(source), "index.html");
  write(file, renderSourcePage(template, source));
  count += 1;
}

console.log(`Generated ${count} source pages.`);
