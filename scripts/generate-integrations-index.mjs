import fs from "node:fs";
import path from "node:path";
import { sources, categories, popular } from "../integrations/data/sources.mjs";

const root = path.resolve(import.meta.dirname, "..");
const integrationsDir = path.join(root, "integrations");
const templatePath = path.join(integrationsDir, "templates", "integrations.html");
const outputPath = path.join(integrationsDir, "index.html");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, value) {
  fs.writeFileSync(file, value);
}

function publicSource(source) {
  const { detail, slug, ...rest } = source;
  return rest;
}

function renderArray(name, value) {
  return `const ${name}=${JSON.stringify(value, null, 2)};`;
}

let html = read(templatePath);
html = html.replace(/const sources=\[[\s\S]*?\];\nconst categories=/, `${renderArray("sources", sources.map(publicSource))}\nconst categories=`);
html = html.replace(/const categories=\[[\s\S]*?\];\nconst popular=/, `${renderArray("categories", categories)}\nconst popular=`);
html = html.replace(/const popular=\[[\s\S]*?\];\nlet activeCategory=/, `${renderArray("popular", popular)}\nlet activeCategory=`);
write(outputPath, html);

console.log("Generated integrations index page.");
