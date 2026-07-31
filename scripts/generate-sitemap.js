import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getSitemapEntries, renderSitemapXml } from "../i18n/seo.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export function generateSitemap({ lastmod } = {}) {
  const xml = renderSitemapXml(getSitemapEntries({ lastmod }));
  writeFileSync(join(root, "sitemap.xml"), xml, "utf8");
  return xml;
}
