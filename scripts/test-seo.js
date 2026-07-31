import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getSitemapEntries, hreflangLinks, canonicalUrl } from "../i18n/seo.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const seo = JSON.parse(readFileSync(join(root, "messages/nl/seo.json"), "utf8"));

for (const [key, meta] of Object.entries(seo.pages)) {
  assert.ok(meta.title?.length > 10, `Missing title for ${key}`);
  assert.ok(meta.description?.length >= 120, `Description too short for ${key}: ${meta.description.length}`);
  assert.ok(meta.description.length <= 165, `Description too long for ${key}: ${meta.description.length}`);
}

const links = hreflangLinks("/diensten");
assert.equal(links[0].hreflang, "nl-NL");
assert.equal(links.at(-1).hreflang, "x-default");
assert.equal(canonicalUrl("/"), "https://axaweb.nl/");

const entries = getSitemapEntries({ lastmod: "2026-07-31" });
assert.ok(entries.some((e) => e.path === "/"));
assert.ok(entries.some((e) => e.path === "/projecten/bandendepot"));
assert.ok(entries.every((e) => e.lastmod));
assert.ok(!entries.some((e) => e.path.includes(".html")));

const robots = readFileSync(join(root, "robots.txt"), "utf8");
assert.match(robots, /Allow:\s*\//);
assert.match(robots, /Sitemap:\s*https:\/\/axaweb\.nl\/sitemap\.xml/);
assert.match(robots, /Disallow:\s*\/api\//);

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
assert.match(sitemap, /<lastmod>/);
assert.match(sitemap, /https:\/\/axaweb\.nl\/privacy</);

const diensten = readFileSync(join(root, "diensten.html"), "utf8");
assert.match(diensten, /application\/ld\+json/);
assert.match(diensten, /BreadcrumbList/);
assert.match(diensten, /ProfessionalService/);
assert.match(diensten, /hreflang="nl-NL"/);

const contact = readFileSync(join(root, "contact.html"), "utf8");
assert.match(contact, /FAQPage/);
assert.match(contact, /ContactPage/);

console.log("SEO tests passed.");
