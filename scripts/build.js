import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { injectPublicEnv } from "./inject-public-env.js";
import { generatePages } from "./generate-pages.js";
import { generateLegalPages } from "./generate-legal-pages.js";
import { generateSitemap } from "./generate-sitemap.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "public");

const cssFiles = [
  "css/tokens.css",
  "css/base.css",
  "css/layout.css",
  "css/components/header.css",
  "css/components/hero.css",
  "css/components/page.css",
  "css/components/case.css",
  "css/components/sections.css",
  "css/components/form.css",
  "css/components/footer.css",
  "css/components/cookie-consent.css",
  "css/components/legal.css",
  "css/components/cursor.css",
];

const pageSlugs = [
  "diensten",
  "websites",
  "webshops",
  "hosting",
  "onderhoud",
  "pakketten",
  "projecten",
  "contact",
  "offerte",
];

const caseSlugs = ["bandendepot", "axanet", "viralon"];

const requiredFiles = [
  "index.html",
  "privacy.html",
  "cookies.html",
  "algemene-voorwaarden.html",
  "disclaimer.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "browserconfig.xml",
  "favicon.png",
  "apple-touch-icon.png",
  "logo.png",
  "logo@2x.png",
  "images/background.jpg",
  "images/background.webp",
  "js/main.js",
  "js/page-main.js",
  "js/consent-default.js",
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

function validateHtml(filePath, { allowNoindex = false } = {}) {
  const html = readFileSync(join(root, filePath), "utf8");
  const checks = [
    [/lang="nl"/, "Missing lang=nl"],
    [/<title>.+<\/title>/, "Missing title"],
    [/meta name="description"/, "Missing meta description"],
    [/<h1[\s>]/, "Missing H1"],
    [/rel="canonical"/, "Missing canonical"],
    [/property="og:title"/, "Missing og:title"],
    [/property="og:description"/, "Missing og:description"],
    [/property="og:image"/, "Missing og:image"],
    [/name="twitter:card"/, "Missing twitter:card"],
    [/hreflang="nl-NL"/, "Missing hreflang nl-NL"],
  ];

  checks.forEach(([pattern, message]) => {
    if (!pattern.test(html)) {
      throw new Error(`${filePath}: ${message}`);
    }
  });

  if (!allowNoindex && !/content="index,\s*follow"/.test(html)) {
    throw new Error(`${filePath}: Expected robots index, follow`);
  }

  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) {
    throw new Error(`${filePath}: Expected exactly one H1, found ${h1Count}`);
  }
}

injectPublicEnv();
generatePages();
generateLegalPages();
generateSitemap();

requiredFiles.forEach(assertExists);
pageSlugs.forEach((slug) => assertExists(`${slug}.html`));
caseSlugs.forEach((slug) => assertExists(`projecten/${slug}.html`));
caseSlugs.forEach((slug) => {
  assertExists(`images/projects/${slug}/desktop-hero.webp`);
  assertExists(`images/projects/${slug}/mobile-hero.webp`);
});

validateHtml("index.html");
validateHtml("privacy.html");
validateHtml("cookies.html");
validateHtml("algemene-voorwaarden.html");
validateHtml("disclaimer.html");
validateHtml("404.html", { allowNoindex: true });
pageSlugs.forEach((slug) => validateHtml(`${slug}.html`));
caseSlugs.forEach((slug) => validateHtml(`projecten/${slug}.html`));

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}

mkdirSync(dist, { recursive: true });

const staticCopies = [
  "index.html",
  "privacy.html",
  "cookies.html",
  "algemene-voorwaarden.html",
  "disclaimer.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "browserconfig.xml",
  "favicon.png",
  "apple-touch-icon.png",
  "logo.png",
  "logo@2x.png",
  ...pageSlugs.map((slug) => `${slug}.html`),
];

staticCopies.forEach((file) => {
  cpSync(join(root, file), join(dist, file));
});

mkdirSync(join(dist, "images"), { recursive: true });
["background.jpg", "background.webp"].forEach((file) => {
  cpSync(join(root, "images", file), join(dist, "images", file));
});
cpSync(join(root, "images", "projects"), join(dist, "images", "projects"), { recursive: true });
cpSync(join(root, "projecten"), join(dist, "projecten"), { recursive: true });
cpSync(join(root, "js"), join(dist, "js"), { recursive: true });
cpSync(join(root, "css"), join(dist, "css"), { recursive: true });
cpSync(join(root, "content"), join(dist, "content"), { recursive: true });
mkdirSync(join(dist, "i18n"), { recursive: true });
["config.js", "routing.js"].forEach((file) => {
  cpSync(join(root, "i18n", file), join(dist, "i18n", file));
});
cpSync(join(root, "messages"), join(dist, "messages"), { recursive: true });
cpSync(join(root, "data"), join(dist, "data"), { recursive: true });

const bundledCss = bundleCss();
mkdirSync(join(dist, "css"), { recursive: true });
writeFileSync(join(dist, "css/bundle.css"), bundledCss, "utf8");

function useBundleCss(fileName) {
  const htmlPath = join(dist, fileName);
  const html = readFileSync(htmlPath, "utf8")
    .replace('href="css/main.css"', 'href="css/bundle.css"')
    .replace('href="/css/main.css"', 'href="/css/bundle.css"');
  writeFileSync(htmlPath, html, "utf8");
}

useBundleCss("index.html");
useBundleCss("404.html");
useBundleCss("privacy.html");
useBundleCss("cookies.html");
useBundleCss("algemene-voorwaarden.html");
useBundleCss("disclaimer.html");
pageSlugs.forEach((slug) => useBundleCss(`${slug}.html`));
caseSlugs.forEach((slug) => useBundleCss(`projecten/${slug}.html`));

for (const slug of caseSlugs) {
  const dir = join(dist, "images", "projects", slug);
  if (!existsSync(dir)) continue;
  readdirSync(dir).forEach((file) => {
    if (file.endsWith(".png")) rmSync(join(dir, file), { force: true });
  });
}

console.log("Build completed successfully.");
console.log(`Output: ${dist}`);
