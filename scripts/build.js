import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "public");

const cssFiles = [
  "css/tokens.css",
  "css/base.css",
  "css/layout.css",
  "css/components/header.css",
  "css/components/hero.css",
  "css/components/sections.css",
  "css/components/form.css",
  "css/components/footer.css",
];

const requiredFiles = [
  "index.html",
  "privacy.html",
  "algemene-voorwaarden.html",
  "robots.txt",
  "sitemap.xml",
  "favicon.png",
  "apple-touch-icon.png",
  "logo.png",
  "logo@2x.png",
  "images/background.jpg",
  "images/background.webp",
  "js/main.js",
  "css/main.css",
];

function assertExists(relativePath) {
  const fullPath = join(root, relativePath);
  if (!existsSync(fullPath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
}

function bundleCss() {
  return cssFiles
    .map((file) => {
      const css = readFileSync(join(root, file), "utf8");
      return `/* ${file} */\n${css}`;
    })
    .join("\n\n");
}

function validateHtml(filePath) {
  const html = readFileSync(join(root, filePath), "utf8");
  const checks = [
    [/lang="nl"/, "Missing lang=nl"],
    [/<title>.+<\/title>/, "Missing title"],
    [/meta name="description"/, "Missing meta description"],
  ];

  checks.forEach(([pattern, message]) => {
    if (!pattern.test(html)) {
      throw new Error(`${filePath}: ${message}`);
    }
  });
}

requiredFiles.forEach(assertExists);
validateHtml("index.html");
validateHtml("privacy.html");
validateHtml("algemene-voorwaarden.html");

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}

mkdirSync(dist, { recursive: true });

const staticCopies = [
  "index.html",
  "privacy.html",
  "algemene-voorwaarden.html",
  "robots.txt",
  "sitemap.xml",
  "favicon.png",
  "apple-touch-icon.png",
  "logo.png",
  "logo@2x.png",
];

staticCopies.forEach((file) => {
  cpSync(join(root, file), join(dist, file));
});

mkdirSync(join(dist, "images"), { recursive: true });
["background.jpg", "background.webp"].forEach((file) => {
  cpSync(join(root, "images", file), join(dist, "images", file));
});
cpSync(join(root, "js"), join(dist, "js"), { recursive: true });
cpSync(join(root, "css"), join(dist, "css"), { recursive: true });

const bundledCss = bundleCss();
mkdirSync(join(dist, "css"), { recursive: true });
writeFileSync(join(dist, "css/bundle.css"), bundledCss, "utf8");

const indexHtml = readFileSync(join(dist, "index.html"), "utf8").replace(
  'href="css/main.css"',
  'href="css/bundle.css"'
);
writeFileSync(join(dist, "index.html"), indexHtml, "utf8");

console.log("Build completed successfully.");
console.log(`Output: ${dist}`);
