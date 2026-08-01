/**
 * Genereert privacy, algemene voorwaarden, cookiebeleid en disclaimer.
 * Bron: content/nl/legal/*.js
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getMessages, createTranslator } from "../i18n/dictionary.js";
import { defaultLocale } from "../i18n/config.js";
import { publicEnv } from "../js/config/public-env.js";
import {
  renderHreflangLinks,
  renderSocialMeta,
  canonicalUrl,
  buildOrganizationNode,
  buildBreadcrumbList,
} from "../i18n/seo.js";
import { privacyDoc } from "../content/nl/legal/privacy.js";
import { termsDoc } from "../content/nl/legal/terms.js";
import { cookiesDoc } from "../content/nl/legal/cookies.js";
import { disclaimerDoc } from "../content/nl/legal/disclaimer.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderBlocks(blocks = []) {
  return blocks
    .map((block) => {
      if (!block || !block.type) return "";
      if (block.type === "p") {
        if (block.html) return `<p>${block.html}</p>`;
        return `<p>${escapeHtml(block.text || "")}</p>`;
      }
      if (block.type === "h3") {
        return `<h3>${escapeHtml(block.text || "")}</h3>`;
      }
      if (block.type === "ul" || block.type === "ol") {
        const tag = block.type;
        const items = (block.items || [])
          .map((item) => {
            if (typeof item === "object" && item?.html) return `<li>${item.html}</li>`;
            return `<li>${escapeHtml(item)}</li>`;
          })
          .join("\n        ");
        return `<${tag}>\n        ${items}\n      </${tag}>`;
      }
      if (block.type === "html") {
        return block.html || "";
      }
      return "";
    })
    .filter(Boolean)
    .join("\n      ");
}

function renderSections(sections = []) {
  return sections
    .map((section) => {
      const idAttr = section.id ? ` id="${escapeHtml(section.id)}"` : "";
      const title = `<h2${idAttr}>${escapeHtml(section.title)}</h2>`;
      const body = renderBlocks(section.blocks || []);
      return `${title}\n      ${body}`;
    })
    .join("\n\n      ");
}

function renderRelated(related = [], t) {
  if (!related.length) return "";
  const links = related
    .map((item) => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`)
    .join("\n        ");
  return `
      <div class="legal__related">
        <h2>${escapeHtml(t("legal.relatedTitle"))}</h2>
        <ul>
        ${links}
        </ul>
      </div>`;
}

function jsonLdForDoc(doc, messages) {
  const pageUrl = canonicalUrl(doc.path);
  const org = buildOrganizationNode(messages.seo || {});
  const breadcrumb = buildBreadcrumbList(
    [
      { label: "Home", href: "/" },
      { label: doc.h1, href: doc.path },
    ],
    doc.path
  );
  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: doc.title,
    description: doc.description,
    inLanguage: "nl-NL",
    isPartOf: { "@id": "https://axaweb.nl/#website" },
    about: { "@id": "https://axaweb.nl/#organization" },
    dateModified: doc.dateIso || undefined,
  };
  const graph = {
    "@context": "https://schema.org",
    "@graph": [org, webPage, breadcrumb].filter(Boolean),
  };
  return `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`;
}

function renderLegalPage(doc) {
  const messages = getMessages(defaultLocale);
  const t = createTranslator(messages, "common");
  const title = doc.title;
  const description = doc.description;
  const canonical = canonicalUrl(doc.path);
  const verification = publicEnv.GOOGLE_SITE_VERIFICATION
    ? `<meta name="google-site-verification" content="${escapeHtml(publicEnv.GOOGLE_SITE_VERIFICATION)}" />`
    : "";

  const cookieSettingsBlock =
    doc.showCookieSettingsButton === true
      ? `<p class="legal__actions"><button type="button" class="btn btn--secondary" data-open-cookie-settings>${escapeHtml(t("footer.cookieSettings"))}</button></p>`
      : "";

  const related = renderRelated(doc.related || [], t);

  return `<!DOCTYPE html>
<html lang="nl" data-locale="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  ${verification}
  <link rel="canonical" href="${canonical}" />
  ${renderHreflangLinks(doc.path)}
  ${renderSocialMeta({ title, description, canonical, locale: defaultLocale })}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/main.css" />
  <script src="/js/consent-default.js" defer></script>
  <script type="application/json" id="i18n-messages">${JSON.stringify({
    locale: defaultLocale,
    common: messages.common,
    cookies: messages.cookies,
    form: messages.form,
    home: messages.home,
    pricing: messages.pricing,
  }).replace(/</g, "\\u003c")}</script>
  ${jsonLdForDoc(doc, messages)}
</head>
<body data-page="${escapeHtml(doc.pageId)}">
  <a class="skip-link" href="#main">${escapeHtml(t("skipToContent"))}</a>
  <div class="app-shell">
  <header class="site-header is-scrolled">
    <div class="container site-header__inner">
      <a class="site-header__logo" href="/" aria-label="${escapeHtml(t("nav.homeAria"))}">
        <img src="/logo.png?v=5" srcset="/logo.png?v=5 1x, /logo@2x.png?v=5 2x" alt="AxaWeb" width="320" height="59" decoding="async" />
      </a>
      <div class="site-header__actions">
        <a class="btn btn--primary" href="/contact">${escapeHtml(t("cta.requestQuote"))}</a>
      </div>
    </div>
  </header>
  <div class="app-shell__scroll" data-scroll-root>
  <main id="main" class="legal">
    <div class="container legal__content">
      <h1>${escapeHtml(doc.h1)}</h1>
      <p class="legal__meta">Laatst bijgewerkt: ${escapeHtml(doc.updatedLabel)}</p>
      ${renderBlocks(doc.intro || [])}
      ${renderSections(doc.sections || [])}
      ${cookieSettingsBlock}
      ${related}
    </div>
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__bottom">
        <p>
          <a href="/privacy">${escapeHtml(t("footer.privacy"))}</a> ·
          <a href="/cookies">${escapeHtml(t("footer.cookiePolicy"))}</a> ·
          <a href="/algemene-voorwaarden">${escapeHtml(t("footer.terms"))}</a> ·
          <a href="/disclaimer">${escapeHtml(t("footer.disclaimer"))}</a> ·
          <button type="button" class="site-footer__text-btn" data-open-cookie-settings>${escapeHtml(t("footer.cookieSettings"))}</button>
        </p>
      </div>
    </div>
  </footer>
  </div>
  </div>
  <script type="module" src="/js/page-main.js"></script>
</body>
</html>
`;
}

const docs = [privacyDoc, termsDoc, cookiesDoc, disclaimerDoc];

export function generateLegalPages() {
  for (const doc of docs) {
    const html = renderLegalPage(doc);
    writeFileSync(join(root, doc.filename), html, "utf8");
  }
}

export function generateCookiesPage() {
  generateLegalPages();
}
