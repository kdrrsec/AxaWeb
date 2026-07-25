import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jsRoot = join(root, "js");

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];

  entries.forEach((entry) => {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.endsWith(".js")) {
      files.push(fullPath);
    }
  });

  return files;
}

function extractImports(source) {
  const matches = source.matchAll(/from\s+["'](\.[^"']+)["']/g);
  return Array.from(matches, (match) => match[1]);
}

const files = walk(jsRoot);
let errors = 0;

if (!files.length) {
  console.error("No JavaScript modules found.");
  process.exit(1);
}

for (const file of files) {
  const source = readFileSync(file, "utf8");

  if (/\bany\b/.test(source) && source.includes(": any")) {
    console.error(`Disallowed any usage in ${file}`);
    errors += 1;
  }

  extractImports(source).forEach((specifier) => {
    const resolved = resolve(dirname(file), specifier);
    if (!existsSync(resolved)) {
      console.error(`Unresolved import in ${file}: ${specifier}`);
      errors += 1;
    }
  });
}

if (errors > 0) {
  process.exit(1);
}

console.log(`Typecheck completed successfully (${files.length} modules validated).`);
