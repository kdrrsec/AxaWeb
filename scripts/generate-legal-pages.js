/**
 * Genereert privacy, voorwaarden, cookiebeleid en disclaimer (NL + EN).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getMessages, createTranslator } from "../i18n/dictionary.js";
import {
  defaultLocale,
  englishLocaleLive,
  hreflangCode,
  languageSwitcherEnabled,
  locales,
} from "../i18n/config.js";
import { localizedPath } from "../i18n/routing.js";
import { publicEnv } from "../js/config/public-env.js";
import {
  renderHreflangLinks,
  renderSocialMeta,
  canonicalUrl,
  buildOrganizationNode,
  buildBreadcrumbList,
} from "../i18n/seo.js";
import { privacyDoc as nlPrivacy } from "../content/nl/legal/privacy.js";
import { termsDoc as nlTerms } from "../content/nl/legal/terms.js";
import { cookiesDoc as nlCookies } from "../content/nl/legal/cookies.js";
import { disclaimerDoc as nlDisclaimer } from "../content/nl/legal/disclaimer.js";
import { privacyDoc as enPrivacy } from "../content/en/legal/privacy.js";
import { termsDoc as enTerms } from "../content/en/legal/terms.js";
import { cookiesDoc as enCookies } from "../content/en/legal/cookies.js";
import { disclaimerDoc as enDisclaimer } from "../content/en/legal/disclaimer.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const catalogs = {
  nl: {
    privacy: nlPrivacy,
    terms: nlTerms,
    cookies: nlCookies,
    disclaimer: nlDisclaimer,
  },
  en: {
    privacy: enPrivacy,
    terms: enTerms,
    cookies: enCookies,
    disclaimer: enDisclaimer,
  },
};

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

function renderRelated(related = [], t, locale) {
  if (!related.length) return "";
  const links = related
    .map((item) => {
      const href = localizedPath(item.href, locale);
      return `<li><a href="${escapeHtml(href)}">${escapeHtml(item.label)}</a></li>`;
    })
    .join("\n        ");
  return `
      <div class="legal__related">
        <h2>${escapeHtml(t("legal.relatedTitle"))}</h2>
        <ul>
        ${links}
        </ul>
      </div>`;
}

function languageSwitcherMarkup(pathname, locale, t) {
  const enabled = languageSwitcherEnabled ? "true" : "false";
  const enDisabled = englishLocaleLive ? "false" : "true";
  const nlCurrent = locale === "nl" ? ' aria-current="true"' : "";
  const enCurrent = locale === "en" ? ' aria-current="true"' : "";
  return `<div class="language-switcher" data-language-switcher data-enabled="${enabled}"${enabled === "false" ? " hidden" : ""} aria-hidden="${enabled === "false" ? "true" : "false"}">
        <nav aria-label="${escapeHtml(t("languageSwitcher.ariaLabel"))}">
          <a href="${localizedPath(pathname, "nl")}" data-locale="nl" hreflang="nl"${nlCurrent}>${escapeHtml(t("languageSwitcher.nl"))}</a>
          <span class="language-switcher__sep" aria-hidden="true">|</span>
          <a href="${localizedPath(pathname, "en")}" data-locale="en" hreflang="en"${enCurrent} aria-disabled="${enDisabled}">${escapeHtml(t("languageSwitcher.en"))}</a>
        </nav>
      </div>`;
}

function jsonLdForDoc(doc, messages, locale) {
  const pageUrl = canonicalUrl(doc.path, locale);
  const org = buildOrganizationNode(messages.seo || {}, locale);
  const homeLabel = locale === "en" ? "Home" : "Home";
  const breadcrumb = buildBreadcrumbList(
    [
      { label: homeLabel, href: localizedPath("/", locale) },
      { label: doc.h1, href: localizedPath(doc.path, locale) },
    ],
    localizedPath(doc.path, locale)
  );
  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: doc.title,
    description: doc.description,
    inLanguage: hreflangCode[locale] || locale,
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

function renderLegalPage(doc, locale) {
  const messages = getMessages(locale);
  const t = createTranslator(messages, "common");
  const title = doc.title;
  const description = doc.description;
  const canonical = canonicalUrl(doc.path, locale);
  const updatedPrefix = locale === "en" ? "Last updated:" : "Laatst bijgewerkt:";
  const verification = publicEnv.GOOGLE_SITE_VERIFICATION
    ? `<meta name="google-site-verification" content="${escapeHtml(publicEnv.GOOGLE_SITE_VERIFICATION)}" />`
    : "";

  const cookieSettingsBlock =
    doc.showCookieSettingsButton === true
      ? `<p class="legal__actions"><button type="button" class="btn btn--secondary" data-open-cookie-settings>${escapeHtml(t("footer.cookieSettings"))}</button></p>`
      : "";

  const related = renderRelated(doc.related || [], t, locale);
  const homeHref = localizedPath("/", locale);
  const quoteHref = localizedPath("/offerte", locale);

  return `<!DOCTYPE html>
<html lang="${locale === "en" ? "en" : "nl"}" data-locale="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  ${verification}
  <link rel="canonical" href="${canonical}" />
  ${renderHreflangLinks(doc.path)}
  ${renderSocialMeta({ title, description, canonical, locale, ogImageAlt: messages.seo?.defaultOgImageAlt })}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/main.css" />
  <script src="/js/consent-default.js" defer></script>
  <script type="application/json" id="i18n-messages">${JSON.stringify({
    locale,
    common: messages.common,
    cookies: messages.cookies,
    form: messages.form,
    home: messages.home,
    pricing: messages.pricing,
  }).replace(/</g, "\\u003c")}</script>
  ${jsonLdForDoc(doc, messages, locale)}
</head>
<body data-page="${escapeHtml(doc.pageId)}">
  <a class="skip-link" href="#main">${escapeHtml(t("skipToContent"))}</a>
  <div class="app-shell">
  <header class="site-header is-scrolled">
    <div class="container site-header__inner">
      <a class="site-header__logo" href="${homeHref}" aria-label="${escapeHtml(t("nav.homeAria"))}">
        <img src="/logo.png?v=5" srcset="/logo.png?v=5 1x, /logo@2x.png?v=5 2x" alt="AxaWeb" width="320" height="59" decoding="async" />
      </a>
      <div class="site-header__actions">
        ${languageSwitcherMarkup(doc.path, locale, t)}
        <a class="btn btn--primary" href="${quoteHref}">${escapeHtml(t("cta.requestQuote"))}</a>
      </div>
    </div>
  </header>
  <div class="app-shell__scroll" data-scroll-root>
  <main id="main" class="legal">
    <div class="container legal__content">
      <h1>${escapeHtml(doc.h1)}</h1>
      <p class="legal__meta">${escapeHtml(updatedPrefix)} ${escapeHtml(doc.updatedLabel)}</p>
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
          <a href="${localizedPath("/privacy", locale)}">${escapeHtml(t("footer.privacy"))}</a> ·
          <a href="${localizedPath("/cookies", locale)}">${escapeHtml(t("footer.cookiePolicy"))}</a> ·
          <a href="${localizedPath("/algemene-voorwaarden", locale)}">${escapeHtml(t("footer.terms"))}</a> ·
          <a href="${localizedPath("/disclaimer", locale)}">${escapeHtml(t("footer.disclaimer"))}</a> ·
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

function outputPathForDoc(doc, locale) {
  const filename = doc.filename || `${doc.pageId}.html`;
  if (locale === "en") {
    return join(root, "en", filename);
  }
  return join(root, filename);
}

export function generateLegalPages() {
  const activeLocales = englishLocaleLive ? locales : [defaultLocale];

  for (const locale of activeLocales) {
    const docs = catalogs[locale];
    if (!docs) continue;
    if (locale === "en") mkdirSync(join(root, "en"), { recursive: true });

    for (const doc of Object.values(docs)) {
      if (!doc) continue;
      const html = renderLegalPage(doc, locale);
      const out = outputPathForDoc(doc, locale);
      writeFileSync(out, html, "utf8");
      console.log(`Generated ${locale === "en" ? "en/" : ""}${doc.filename}`);
    }
  }
}

export function generateCookiesPage() {
  generateLegalPages();
}
