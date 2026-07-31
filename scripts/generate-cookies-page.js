import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getMessages, createTranslator } from "../i18n/dictionary.js";
import { defaultLocale } from "../i18n/config.js";
import { publicEnv } from "../js/config/public-env.js";
import { renderHreflangLinks, renderSocialMeta, canonicalUrl } from "../i18n/seo.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function generateCookiesPage() {
  const messages = getMessages(defaultLocale);
  const tc = createTranslator(messages, "cookies");
  const t = createTranslator(messages, "common");
  const title = tc("page.title");
  const description = tc("page.description");
  const canonical = canonicalUrl("/cookies");
  const items = messages.cookies?.page?.sections?.tools?.items || [];
  const verification = publicEnv.GOOGLE_SITE_VERIFICATION
    ? `<meta name="google-site-verification" content="${escapeHtml(publicEnv.GOOGLE_SITE_VERIFICATION)}" />`
    : "";

  const html = `<!DOCTYPE html>
<html lang="nl" data-locale="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  ${verification}
  <link rel="canonical" href="${canonical}" />
  ${renderHreflangLinks("/cookies")}
  ${renderSocialMeta({ title, description, canonical, locale: defaultLocale })}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
  <style>
    .legal { padding: 2.5rem 0 4rem; }
    .legal__content { max-width: 46rem; }
    .legal__content h1 { font-size: clamp(1.8rem, 3vw, 2.4rem); margin-bottom: 1rem; letter-spacing: -0.02em; }
    .legal__content h2 { margin-top: 2rem; margin-bottom: 0.65rem; font-size: 1.15rem; }
    .legal__content p, .legal__content li { color: var(--text-secondary); line-height: 1.75; margin-bottom: 0.85rem; }
    .legal__content ul { padding-left: 1.2rem; list-style: disc; margin-bottom: 1rem; }
  </style>
</head>
<body data-page="cookies">
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
      <h1>${escapeHtml(tc("page.h1"))}</h1>
      <p>${escapeHtml(tc("page.intro"))}</p>
      <h2>${escapeHtml(tc("page.sections.what.title"))}</h2>
      <p>${escapeHtml(tc("page.sections.what.text"))}</p>
      <h2>${escapeHtml(tc("page.sections.categories.title"))}</h2>
      <p>${escapeHtml(tc("page.sections.categories.text"))}</p>
      <ul>
        <li><strong>${escapeHtml(tc("categories.necessary.title"))}:</strong> ${escapeHtml(tc("categories.necessary.description"))}</li>
        <li><strong>${escapeHtml(tc("categories.preferences.title"))}:</strong> ${escapeHtml(tc("categories.preferences.description"))}</li>
        <li><strong>${escapeHtml(tc("categories.statistics.title"))}:</strong> ${escapeHtml(tc("categories.statistics.description"))}</li>
        <li><strong>${escapeHtml(tc("categories.marketing.title"))}:</strong> ${escapeHtml(tc("categories.marketing.description"))}</li>
      </ul>
      <h2>${escapeHtml(tc("page.sections.tools.title"))}</h2>
      <p>${escapeHtml(tc("page.sections.tools.text"))}</p>
      <ul>
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n        ")}
      </ul>
      <h2>${escapeHtml(tc("page.sections.manage.title"))}</h2>
      <p>${escapeHtml(tc("page.sections.manage.text"))}</p>
      <p><button type="button" class="btn btn--secondary" data-open-cookie-settings>${escapeHtml(t("footer.cookieSettings"))}</button></p>
      <h2>${escapeHtml(tc("page.sections.privacy.title"))}</h2>
      <p>${escapeHtml(tc("page.sections.privacy.text"))} <a href="/privacy">${escapeHtml(t("footer.privacy"))}</a>.</p>
    </div>
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__bottom">
        <p><a href="/privacy">${escapeHtml(t("footer.privacy"))}</a> · <a href="/cookies">${escapeHtml(t("footer.cookiePolicy"))}</a> · <button type="button" class="site-footer__text-btn" data-open-cookie-settings>${escapeHtml(t("footer.cookieSettings"))}</button></p>
      </div>
    </div>
  </footer>
  </div>
  </div>
  <script type="module" src="/js/page-main.js"></script>
</body>
</html>
`;

  writeFileSync(join(root, "cookies.html"), html, "utf8");
}
