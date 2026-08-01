/*
 * Genereert de subpagina's van de multipage-site.
 * Iedere pagina definieert eigen secties (content/{locale}/pages.js); per sectietype
 * bestaat hier een eigen renderer. UI-chrome komt uit messages/{locale}.
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const { getPages, getSiteNav } = await import(pathToFileURL(join(root, "js/data/pages.js")).href);
const { getProjects, getNextProject } = await import(pathToFileURL(join(root, "js/data/projects.js")).href);
const { icon } = await import(pathToFileURL(join(root, "js/modules/icons.js")).href);
const { defaultLocale, languageSwitcherEnabled, englishLocaleLive, siteUrl, locales } = await import(
  pathToFileURL(join(root, "i18n/config.js")).href
);
const { getMessages, createTranslator } = await import(pathToFileURL(join(root, "i18n/dictionary.js")).href);
const { localizedPath } = await import(pathToFileURL(join(root, "i18n/routing.js")).href);
const {
  renderHreflangLinks,
  localeMeta,
  canonicalUrl,
  renderSocialMeta,
  renderJsonLdScript,
  buildJsonLdGraph,
  buildOrganizationNode,
  buildWebSiteNode,
  buildBreadcrumbList,
  buildFaqPage,
  buildServiceNode,
  buildContactPageNode,
  buildCreativeWorkNode,
} = await import(pathToFileURL(join(root, "i18n/seo.js")).href);
const { publicEnv } = await import(pathToFileURL(join(root, "js/config/public-env.js")).href);
const {
  pricing: pricingConfig,
  buildPricingRenderers,
  renderModelToggle,
  renderSegmentedControl,
} = await import(pathToFileURL(join(root, "scripts/pricing-render.js")).href);

let locale = defaultLocale;
let messages = getMessages(locale);
let t = createTranslator(messages, "common");
let tf = createTranslator(messages, "form");
let tp = createTranslator(messages, "pricing");
let seoMessages = messages.seo || {};
let pricingView = buildPricingRenderers(tp, icon);
let pages = getPages(locale);
let siteNav = getSiteNav(locale);
let projects = getProjects(locale);

function setLocaleContext(nextLocale) {
  locale = nextLocale;
  messages = getMessages(locale);
  t = createTranslator(messages, "common");
  tf = createTranslator(messages, "form");
  tp = createTranslator(messages, "pricing");
  seoMessages = messages.seo || {};
  pricingView = buildPricingRenderers(tp, icon, pathFor);
  pages = getPages(locale);
  siteNav = getSiteNav(locale);
  projects = getProjects(locale);
}

const serviceSeoKeyBySlug = {
  websites: "websites",
  webshops: "webshops",
  hosting: "hosting",
  onderhoud: "onderhoud",
  maintenance: "onderhoud",
};

function collectFaqItems(page) {
  return (page.sections || [])
    .filter((section) => section.type === "faq")
    .flatMap((section) => section.items || []);
}

function buildPageJsonLd(page, pathname, _canonical) {
  const nodes = [buildOrganizationNode(seoMessages, locale), buildWebSiteNode(seoMessages, locale)];

  if (page.breadcrumb?.length) {
    const crumbs = page.breadcrumb.map((crumb) => ({
      label: crumb.label,
      href: crumb.href || pathname,
    }));
    nodes.push(buildBreadcrumbList(crumbs, pathname));
  }

  if (page.slug === "contact" || page.slug === "offerte" || page.slug === "quote") {
    nodes.push(buildContactPageNode(pathname));
  }

  const serviceSeoKey = serviceSeoKeyBySlug[page.slug];
  if (serviceSeoKey && seoMessages.services?.[serviceSeoKey]) {
    const service = seoMessages.services[serviceSeoKey];
    nodes.push(
      buildServiceNode({
        name: service.name,
        description: service.description,
        url: pathname,
        seoMessages,
      })
    );
  }

  if ((page.slug === "diensten" || page.slug === "services") && seoMessages.services) {
    Object.entries(seoMessages.services).forEach(([key, service]) => {
      nodes.push(
        buildServiceNode({
          name: service.name,
          description: service.description,
          url: pathFor(`/${key}`),
          seoMessages,
        })
      );
    });
  }

  const faqItems = collectFaqItems(page);
  if (faqItems.length) {
    nodes.push(buildFaqPage(faqItems));
  }

  if (page.creativeWork) {
    nodes.push(page.creativeWork);
  }

  return buildJsonLdGraph(nodes);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pathFor(href) {
  if (!href) return localizedPath("/", locale);
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return href;
  }
  return localizedPath(href, locale);
}

function pagePathname(page) {
  if (page.path) return page.path;
  if (page.canonical?.startsWith(siteUrl)) {
    const path = page.canonical.slice(siteUrl.length) || "/";
    return path.startsWith("/") ? path : `/${path}`;
  }
  return page.slug ? `/${page.slug}` : "/";
}

function languageSwitcherMarkup(pathname = "/") {
  const enabled = languageSwitcherEnabled ? "true" : "false";
  const enDisabled = englishLocaleLive ? "false" : "true";
  const nlCurrent = locale === "nl" ? ' aria-current="true"' : "";
  const enCurrent = locale === "en" ? ' aria-current="true"' : "";
  const hiddenAttr = enabled === "true" ? "" : " hidden";
  return `<div class="language-switcher" data-language-switcher data-enabled="${enabled}"${hiddenAttr} aria-hidden="${enabled === "true" ? "false" : "true"}">
        <nav aria-label="${escapeHtml(t("languageSwitcher.ariaLabel"))}">
          <a href="${localizedPath(pathname, "nl")}" data-locale="nl" hreflang="nl"${nlCurrent}>${escapeHtml(t("languageSwitcher.nl"))}</a>
          <span class="language-switcher__sep" aria-hidden="true">|</span>
          <a href="${localizedPath(pathname, "en")}" data-locale="en" hreflang="en"${enCurrent} aria-disabled="${enDisabled}">${escapeHtml(t("languageSwitcher.en"))}</a>
        </nav>
      </div>`;
}

function clientMessagesScript() {
  const payload = {
    locale,
    common: messages.common,
    form: messages.form,
    home: messages.home,
    pricing: messages.pricing,
    cookies: messages.cookies,
  };
  return `<script type="application/json" id="i18n-messages">${JSON.stringify(payload).replace(/</g, "\\u003c")}</script>`;
}

function siteVerificationMeta() {
  const token = publicEnv.GOOGLE_SITE_VERIFICATION;
  if (!token) return "";
  return `<meta name="google-site-verification" content="${escapeHtml(token)}" />`;
}

function consentBootstrapScript() {
  return `<script src="/js/consent-default.js" defer></script>`;
}

/* ---------- Gedeelde schil (header, footer, breadcrumb) ---------- */

function navMarkup(navKey) {
  return siteNav
    .map((link) => {
      const label = t(`nav.${link.key}`) || link.label;
      const attrs = link.key === navKey ? ' aria-current="page" class="is-active"' : "";
      return `<a href="${pathFor(link.href)}"${attrs}>${escapeHtml(label)}</a>`;
    })
    .join("\n        ");
}

function breadcrumbMarkup(breadcrumb) {
  const parts = breadcrumb.map((crumb, index) => {
    const isLast = index === breadcrumb.length - 1;
    if (isLast) return `<span aria-current="page">${escapeHtml(crumb.label)}</span>`;
    return `<a href="${pathFor(crumb.href)}">${escapeHtml(crumb.label)}</a><span aria-hidden="true">/</span>`;
  });
  return `<nav class="page-head__breadcrumb" aria-label="${escapeHtml(t("breadcrumb.ariaLabel"))}">${parts.join("")}</nav>`;
}

function headerMarkup(navKey, pathname = "/") {
  return `  <div class="app-shell">
  <header class="site-header" data-header>
    <span class="scroll-progress" data-scroll-progress aria-hidden="true"></span>
    <div class="container site-header__inner">
      <a class="site-header__logo" href="${pathFor("/")}" aria-label="${escapeHtml(t("nav.homeAria"))}">
        <img src="/logo.png?v=5" srcset="/logo.png?v=5 1x, /logo@2x.png?v=5 2x" alt="AxaWeb" width="320" height="59" decoding="async" />
      </a>
      <nav class="site-nav" aria-label="${escapeHtml(t("nav.ariaLabel"))}">
        ${navMarkup(navKey)}
      </nav>
      <div class="site-header__actions">
        ${languageSwitcherMarkup(pathname)}
        <a class="btn btn--primary site-header__cta" href="${pathFor("/offerte")}">${escapeHtml(t("cta.requestQuote"))}</a>
        <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="${escapeHtml(t("nav.menuOpen"))}">
          <span class="menu-toggle__bars" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </header>

  <nav class="mobile-nav" id="mobile-nav" data-mobile-nav aria-label="${escapeHtml(t("nav.mobileAriaLabel"))}" hidden>
    ${navMarkup(navKey)}
    <a class="btn btn--primary" href="${pathFor("/offerte")}">${escapeHtml(t("cta.requestQuote"))}</a>
  </nav>

  <div class="app-shell__scroll" data-scroll-root>`;
}

function footerMarkup() {
  return `  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <a href="${pathFor("/")}" aria-label="${escapeHtml(t("nav.homeAria"))}">
            <img src="/logo.png?v=5" srcset="/logo.png?v=5 1x, /logo@2x.png?v=5 2x" alt="AxaWeb" width="320" height="59" loading="lazy" decoding="async" />
          </a>
          <p class="site-footer__note">${escapeHtml(t("footer.note"))}</p>
        </div>
        <div>
          <p class="site-footer__title">${escapeHtml(t("footer.servicesTitle"))}</p>
          <ul class="site-footer__links">
            <li><a href="${pathFor("/websites")}">${escapeHtml(t("footer.websites"))}</a></li>
            <li><a href="${pathFor("/webshops")}">${escapeHtml(t("footer.webshops"))}</a></li>
            <li><a href="${pathFor("/hosting")}">${escapeHtml(t("footer.hosting"))}</a></li>
            <li><a href="${pathFor("/onderhoud")}">${escapeHtml(t("footer.onderhoud"))}</a></li>
          </ul>
        </div>
        <div>
          <p class="site-footer__title">${escapeHtml(t("footer.navTitle"))}</p>
          <ul class="site-footer__links">
            <li><a href="${pathFor("/diensten")}">${escapeHtml(t("nav.diensten"))}</a></li>
            <li><a href="${pathFor("/pakketten")}">${escapeHtml(t("nav.pakketten"))}</a></li>
            <li><a href="${pathFor("/projecten")}">${escapeHtml(t("nav.projecten"))}</a></li>
            <li><a href="${pathFor("/contact")}">${escapeHtml(t("nav.contact"))}</a></li>
            <li><a href="${pathFor("/privacy")}">${escapeHtml(t("footer.privacy"))}</a></li>
            <li><a href="${pathFor("/cookies")}">${escapeHtml(t("footer.cookiePolicy"))}</a></li>
            <li><a href="${pathFor("/algemene-voorwaarden")}">${escapeHtml(t("footer.terms"))}</a></li>
            <li><a href="${pathFor("/disclaimer")}">${escapeHtml(t("footer.disclaimer"))}</a></li>
            <li><button type="button" class="site-footer__text-btn" data-open-cookie-settings>${escapeHtml(t("footer.cookieSettings"))}</button></li>
          </ul>
        </div>
        <div>
          <p class="site-footer__title">${escapeHtml(t("footer.contactTitle"))}</p>
          <ul class="site-footer__links">
            <li><a href="mailto:info@axaweb.nl">info@axaweb.nl</a></li>
          </ul>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>© <span data-year></span> AxaWeb. ${escapeHtml(t("footer.rights"))}</p>
        <p>${escapeHtml(t("footer.tagline"))}</p>
      </div>
    </div>
  </footer>`;
}

/* ---------- Paginakop-varianten ---------- */

function headActions(actions = []) {
  if (!actions.length) return "";
  const buttons = actions
    .map(
      (action) =>
        `<a class="btn btn--${action.style}" href="${pathFor(action.href)}">${escapeHtml(action.label)}</a>`
    )
    .join("\n          ");
  return `<div class="page-head__actions">
          ${buttons}
        </div>`;
}

function renderHead(page) {
  const head = page.head;
  const eyebrow = `<p class="section__eyebrow">${escapeHtml(head.eyebrow)}</p>`;
  const title = `<h1 id="page-title" class="page-head__title">${escapeHtml(head.title)}</h1>`;
  const text = `<p class="page-head__text">${escapeHtml(head.text)}</p>`;
  const breadcrumb = breadcrumbMarkup(page.breadcrumb);

  if (head.variant === "center") {
    return `    <section class="page-head page-head--center" aria-labelledby="page-title">
      <div class="page-head__inner">
        ${breadcrumb}
        ${eyebrow}
        ${title}
        ${text}
      </div>
    </section>`;
  }

  if (head.variant === "split") {
    const facts = head.facts.items
      .map((item) => `<li>${icon("check")} <span>${escapeHtml(item)}</span></li>`)
      .join("\n            ");
    return `    <section class="page-head page-head--split" aria-labelledby="page-title">
      <div class="page-head__inner page-head__grid">
        <div>
          ${breadcrumb}
          ${eyebrow}
          ${title}
          ${text}
          ${headActions(head.actions)}
        </div>
        <aside class="page-head__facts" aria-label="${escapeHtml(head.facts.title)}">
          <p class="page-head__facts-title">${escapeHtml(head.facts.title)}</p>
          <ul>
            ${facts}
          </ul>
        </aside>
      </div>
    </section>`;
  }

  if (head.variant === "stats") {
    const stats = head.stats
      .map(
        (stat) => `<div class="stat">
            <p class="stat__value">${escapeHtml(stat.value)}</p>
            <p class="stat__label">${escapeHtml(stat.label)}</p>
          </div>`
      )
      .join("\n          ");
    return `    <section class="page-head page-head--stats" aria-labelledby="page-title">
      <div class="page-head__inner">
        ${breadcrumb}
        ${eyebrow}
        ${title}
        ${text}
        ${headActions(head.actions)}
        <div class="stat-strip">
          ${stats}
        </div>
      </div>
    </section>`;
  }

  return `    <section class="page-head" aria-labelledby="page-title">
      <div class="page-head__inner">
        ${breadcrumb}
        ${eyebrow}
        ${title}
        ${text}
        ${headActions(head.actions)}
      </div>
    </section>`;
}

/* ---------- Sectie-renderers ---------- */

function sectionHeader(section, options = {}) {
  const center = options.center ? " section__header--center" : "";
  const intro = section.intro
    ? `\n          <p class="section__intro">${escapeHtml(section.intro)}</p>`
    : "";
  return `<header class="section__header${center} reveal">
          <p class="section__eyebrow">${escapeHtml(section.eyebrow)}</p>
          <h2 id="${section.id}-title" class="section__title">${escapeHtml(section.title)}</h2>${intro}
        </header>`;
}

function renderServiceRows(section, alt) {
  const rows = section.rows
    .map(
      (row, index) => `
        <article class="service-row reveal">
          <div class="service-row__intro">
            <span class="service-row__num" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
            <h3 class="service-row__title">${escapeHtml(row.title)}</h3>
            <p class="service-row__text">${escapeHtml(row.text)}</p>
            <a class="card__link" href="${pathFor(row.link.href)}">${escapeHtml(row.link.label)} ${icon("arrow", "icon")}</a>
          </div>
          <ul class="service-row__points">
            ${row.points.map((point) => `<li>${icon("check")} <span>${escapeHtml(point)}</span></li>`).join("\n            ")}
          </ul>
        </article>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <div class="service-rows">${rows}
        </div>
      </div>
    </section>`;
}

function renderCompare(section, alt) {
  const headCells = section.columns
    .map((column) => `<th scope="col">${escapeHtml(column)}</th>`)
    .join("");
  const bodyRows = section.rows
    .map(
      (row) => `
            <tr>
              <th scope="row">${escapeHtml(row.label)}</th>
              ${row.values.map((value) => `<td>${escapeHtml(value)}</td>`).join("")}
            </tr>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <div class="compare-wrap reveal" role="region" aria-label="Vergelijking van diensten" tabindex="0">
          <table class="compare-table">
            <thead>
              <tr>
                <td></td>
                ${headCells}
              </tr>
            </thead>
            <tbody>${bodyRows}
            </tbody>
          </table>
        </div>
        <p class="section-note reveal">${escapeHtml(section.note)}</p>
      </div>
    </section>`;
}

function renderFeatures(section, alt) {
  const items = section.items
    .map(
      (item) => `
        <article class="feature reveal">
          <div class="icon-box icon-box--sm">${icon(item.icon)}</div>
          <div>
            <h3 class="feature__title">${escapeHtml(item.title)}</h3>
            <p class="feature__text">${escapeHtml(item.text)}</p>
          </div>
        </article>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <div class="feature-list stagger">${items}
        </div>
      </div>
    </section>`;
}

function renderTimeline(section, alt) {
  const steps = section.steps
    .map(
      (step, index) => `
          <li class="timeline__step reveal">
            <span class="timeline__marker" aria-hidden="true">${index + 1}</span>
            <div class="timeline__body">
              <p class="timeline__meta">${escapeHtml(step.meta)}</p>
              <h3 class="timeline__title">${escapeHtml(step.title)}</h3>
              <p class="timeline__text">${escapeHtml(step.text)}</p>
            </div>
          </li>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <ol class="timeline">${steps}
        </ol>
      </div>
    </section>`;
}

function renderPricing(section, alt) {
  /* Legacy: websites-pagina toont eenmalige plannen uit centrale config */
  const catalog = section.catalog || "oneTime";
  let cards = "";
  let termsMarkup = "";

  if (catalog === "oneTime") {
    cards = pricingView.renderOneTimeCards();
  } else if (catalog === "hosting") {
    termsMarkup = renderSegmentedControl({
      name: "hosting",
      ariaLabel: tp("terms.hostingAria"),
      terms: pricingConfig.hosting.terms,
      defaultTerm: pricingConfig.hosting.defaultTerm,
      tp,
    });
    cards = pricingView.renderSubscriptionCards("hosting", pricingConfig.hosting.defaultTerm);
  } else if (catalog === "maintenance") {
    termsMarkup = renderSegmentedControl({
      name: "maintenance",
      ariaLabel: tp("terms.maintenanceAria"),
      terms: pricingConfig.maintenance.terms,
      defaultTerm: pricingConfig.maintenance.defaultTerm,
      tp,
    });
    cards = pricingView.renderSubscriptionCards("maintenance", pricingConfig.maintenance.defaultTerm);
  }

  const sectionCopy = section.i18nKey ? {
    eyebrow: tp(`sections.${section.i18nKey}.eyebrow`),
    title: tp(`sections.${section.i18nKey}.title`),
    intro: tp(`sections.${section.i18nKey}.intro`),
    note: tp(`sections.${section.i18nKey}.note`),
  } : section;

  const footer = section.footerLink
    ? `\n        <div class="section__footer reveal">
          <a class="btn btn--secondary" href="${section.footerLink.href}">${escapeHtml(
            section.footerLink.i18nKey ? tp(`cta.${section.footerLink.i18nKey}`) : section.footerLink.label
          )}</a>
        </div>`
    : "";

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title" data-pricing-section data-catalog="${catalog}">
      <div class="container">
        ${sectionHeader({ ...section, ...sectionCopy }, { center: true })}
        ${termsMarkup ? `<div class="pricing-toolbar reveal">${termsMarkup}</div>` : ""}
        <div class="pricing stagger" data-pricing-grid>${cards}
        </div>
        <p class="pricing-note reveal">${escapeHtml(sectionCopy.note || "")}</p>${footer}
      </div>
    </section>`;
}

function renderPricingHub(section, alt) {
  const copy = {
    eyebrow: tp("sections.websiteHub.eyebrow"),
    title: tp("sections.websiteHub.title"),
    intro: tp("sections.websiteHub.intro"),
  };

  const oneTimeCopy = {
    eyebrow: tp("sections.oneTime.eyebrow"),
    title: tp("sections.oneTime.title"),
    intro: tp("sections.oneTime.intro"),
    note: tp("sections.oneTime.note"),
  };

  const waasCopy = {
    eyebrow: tp("sections.waas.eyebrow"),
    title: tp("sections.waas.title"),
    intro: tp("sections.waas.intro"),
    note: tp("sections.waas.note"),
  };

  const waasTerms = renderSegmentedControl({
    name: "waas",
    ariaLabel: tp("terms.ariaLabel"),
    terms: pricingConfig.waas.terms,
    defaultTerm: pricingConfig.waas.defaultTerm,
    tp,
  });

  const footer = section.footerLink
    ? `\n            <div class="section__footer reveal">
              <a class="btn btn--secondary" href="${section.footerLink.href}">${escapeHtml(
                section.footerLink.i18nKey ? tp(`cta.${section.footerLink.i18nKey}`) : section.footerLink.label
              )}</a>
            </div>`
    : "";

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title" data-pricing-hub>
      <div class="container">
        ${sectionHeader({ id: section.id, ...copy }, { center: true })}
        ${renderModelToggle(tp)}

        <div class="pricing-panels">
          <div class="pricing-panel" data-pricing-panel="one-time" hidden>
            <header class="section__header section__header--center reveal">
              <p class="section__eyebrow">${escapeHtml(oneTimeCopy.eyebrow)}</p>
              <h3 class="section__title">${escapeHtml(oneTimeCopy.title)}</h3>
              <p class="section__intro">${escapeHtml(oneTimeCopy.intro)}</p>
            </header>
            <div class="pricing stagger" data-pricing-grid>${pricingView.renderOneTimeCards()}
            </div>
            <p class="pricing-note reveal">${escapeHtml(oneTimeCopy.note)}</p>${footer}
          </div>

          <div class="pricing-panel" data-pricing-panel="waas" hidden>
            <header class="section__header section__header--center reveal">
              <p class="section__eyebrow">${escapeHtml(waasCopy.eyebrow)}</p>
              <h3 class="section__title">${escapeHtml(waasCopy.title)}</h3>
              <p class="section__intro">${escapeHtml(waasCopy.intro)}</p>
            </header>
            <div class="pricing-toolbar reveal">${waasTerms}</div>
            <div class="pricing pricing--waas stagger" data-pricing-grid data-catalog="waas">${pricingView.renderWaasCards()}
            </div>
            <p class="pricing-note reveal">${escapeHtml(waasCopy.note)}</p>
          </div>
        </div>
      </div>
    </section>`;
}

function renderPricingTerms(section, alt) {
  const title = tp("termsInfo.title");
  const items = (messages.pricing.termsInfo.items || [])
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("\n          ");

  return `    <section class="section${alt}" aria-labelledby="pricing-terms-title">
      <div class="container">
        <aside class="pricing-info reveal">
          <div class="pricing-info__head">
            <span class="icon-box" aria-hidden="true">${icon("info")}</span>
            <h2 id="pricing-terms-title" class="pricing-info__title">${escapeHtml(title)}</h2>
          </div>
          <ul class="pricing-info__list">
          ${items}
          </ul>
        </aside>
      </div>
    </section>`;
}

function renderCases(section, alt) {
  const items = section.items
    .map(
      (item) => `
        <article class="case reveal">
          <div>
            <p class="case__tag">${escapeHtml(item.tag)}</p>
            <h3 class="case__title">${escapeHtml(item.title)}</h3>
            <p class="case__text">${escapeHtml(item.text)}</p>
          </div>
          <ul class="case__results">
            ${item.results.map((result) => `<li>${icon("check")} <span>${escapeHtml(result)}</span></li>`).join("\n            ")}
          </ul>
        </article>`
    )
    .join("");

  const footer = section.footerLink
    ? `\n        <div class="section__footer reveal">
          <a class="btn btn--secondary" href="${section.footerLink.href}">${escapeHtml(section.footerLink.label)}</a>
        </div>`
    : "";

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <div class="case-list">${items}
        </div>${footer}
      </div>
    </section>`;
}

function renderIntegrations(section, alt) {
  const items = section.items
    .map(
      (item) => `
        <article class="integration reveal">
          <h3 class="integration__title">${escapeHtml(item.title)}</h3>
          <p class="integration__text">${escapeHtml(item.text)}</p>
        </article>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <div class="integration-grid stagger">${items}
        </div>
      </div>
    </section>`;
}

function renderSpecs(section, alt) {
  const items = section.items
    .map(
      (item) => `
          <div class="spec reveal">
            <dt>${escapeHtml(item.term)}</dt>
            <dd>${escapeHtml(item.detail)}</dd>
          </div>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <dl class="spec-list">${items}
        </dl>
      </div>
    </section>`;
}

function renderPanels(section, alt) {
  const items = section.items
    .map(
      (item) => `
        <article class="panel reveal">
          <div class="icon-box">${icon(item.icon)}</div>
          <h3 class="panel__title">${escapeHtml(item.title)}</h3>
          <ul class="panel__points">
            ${item.points.map((point) => `<li>${icon("check")} <span>${escapeHtml(point)}</span></li>`).join("\n            ")}
          </ul>
        </article>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <div class="panel-grid stagger">${items}
        </div>
      </div>
    </section>`;
}

function renderChecklists(section, alt) {
  const groups = section.groups
    .map(
      (group) => `
        <div class="check-group reveal">
          <h3 class="check-group__title">${escapeHtml(group.title)}</h3>
          <ul>
            ${group.items.map((item) => `<li>${icon("check")} <span>${escapeHtml(item)}</span></li>`).join("\n            ")}
          </ul>
        </div>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <div class="check-columns">${groups}
        </div>
      </div>
    </section>`;
}

function renderSla(section, alt) {
  const rows = section.rows
    .map(
      (row) => `
            <tr>
              <th scope="row">${escapeHtml(row.level)}</th>
              <td>${escapeHtml(row.example)}</td>
              <td>${escapeHtml(row.response)}</td>
            </tr>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <div class="compare-wrap reveal" role="region" aria-label="Reactietijden" tabindex="0">
          <table class="compare-table compare-table--sla">
            <thead>
              <tr>
                <th scope="col">Prioriteit</th>
                <th scope="col">Voorbeeld</th>
                <th scope="col">Reactietijd</th>
              </tr>
            </thead>
            <tbody>${rows}
            </tbody>
          </table>
        </div>
        <p class="section-note reveal">${escapeHtml(section.note)}</p>
      </div>
    </section>`;
}

function renderPortfolio(section, alt) {
  const items = projects
    .map(
      (project) => `
        <article class="case-card reveal">
          <a class="case-card__link" href="${pathFor(`/projecten/${project.slug}`)}" aria-label="${escapeHtml(t("cta.viewProject"))} ${escapeHtml(project.name)}">
            <div class="case-card__stage">
              <div class="device device--desktop">
                <div class="device__chrome" aria-hidden="true"><span></span><span></span><span></span></div>
                <div class="device__screen">
                  <picture>
                    <source srcset="${project.images.desktop}" type="image/webp" />
                    <img
                      src="${project.images.desktopJpg}"
                      alt="${escapeHtml(project.images.altDesktop)}"
                      width="1600"
                      height="1000"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              </div>
              <div class="device device--mobile">
                <div class="device__screen">
                  <picture>
                    <source srcset="${project.images.mobile}" type="image/webp" />
                    <img
                      src="${project.images.mobileJpg}"
                      alt="${escapeHtml(project.images.altMobile)}"
                      width="780"
                      height="1688"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              </div>
            </div>
            <div class="case-card__body">
              <p class="case-card__category">${escapeHtml(project.category)}</p>
              <h2 class="case-card__title">${escapeHtml(project.name)}</h2>
              <p class="case-card__text">${escapeHtml(project.summary)}</p>
              <ul class="case-card__tags">
                ${project.services.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("\n                ")}
              </ul>
              <span class="case-card__cta">${escapeHtml(t("cta.viewProject"))} ${icon("arrow")}</span>
            </div>
          </a>
        </article>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-label="${escapeHtml(t("nav.projecten"))}">
      <div class="container">
        <div class="case-grid">${items}
        </div>
        <p class="section-note section-note--center reveal">${escapeHtml(section.note)}</p>
      </div>
    </section>`;
}

function renderDirectContact() {
  const title = t("directContact.title");
  const text = t("directContact.text");
  const phoneDisplay = t("directContact.phoneDisplay");
  const phoneHref = t("directContact.phoneHref");
  const phoneAria = t("directContact.phoneAria");

  return `
          <aside class="direct-contact reveal" aria-labelledby="direct-contact-title">
            <div class="direct-contact__icon" aria-hidden="true">${icon("phone")}</div>
            <div class="direct-contact__body">
              <h2 id="direct-contact-title" class="direct-contact__title">${escapeHtml(title)}</h2>
              <p class="direct-contact__text">${escapeHtml(text)}</p>
              <a class="direct-contact__phone" href="${escapeHtml(phoneHref)}" aria-label="${escapeHtml(phoneAria)}">
                <span class="direct-contact__phone-icon" aria-hidden="true">${icon("phone", "icon icon--sm")}</span>
                <span>${escapeHtml(phoneDisplay)}</span>
              </a>
            </div>
          </aside>`;
}

function renderContact(section, alt) {
  const formMessages = messages.form;
  const sourcePage = section.sourcePage || "/contact";
  const info = section.info
    .map(
      (item) => `
            <div class="contact-info__item">
              <span class="icon-box" aria-hidden="true">${icon(item.icon)}</span>
              <div>
                <p class="contact-info__label">${escapeHtml(item.label)}</p>
                <p class="contact-info__value">${
                  item.href ? `<a href="${item.href}">${escapeHtml(item.value)}</a>` : escapeHtml(item.value)
                }</p>
              </div>
            </div>`
    )
    .join("");

  const steps = section.steps.items
    .map((step) => `<li>${escapeHtml(step)}</li>`)
    .join("\n              ");

  const projectOptions = (formMessages.options?.projectTypes || [])
    .map(
      (item) =>
        `<option value="${escapeHtml(item.value)}">${escapeHtml(item.label)}</option>`
    )
    .join("\n                  ");

  const budgetOptions = (formMessages.options?.budget || [])
    .map(
      (item) =>
        `<option value="${escapeHtml(item.value)}">${escapeHtml(item.label)}</option>`
    )
    .join("\n                  ");

  const privacyHtml = escapeHtml(tf("labels.privacy")).replace(
    "{privacyLink}",
    `<a href="${pathFor("/privacy")}">${escapeHtml(tf("labels.privacyLink"))}</a>`
  );

  const reqMark = `<span class="req" aria-hidden="true">${escapeHtml(tf("labels.required"))}</span>`;
  const optMark = `<span class="opt">${escapeHtml(tf("labels.optional"))}</span>`;

  return `    <section class="section${alt}" id="${section.id}" aria-label="${escapeHtml(tf("aria.form"))}">
      <div class="container">
        <div class="contact-layout">
          <div class="contact-side">
            <aside class="contact-info reveal" aria-label="${escapeHtml(tf("aria.contactInfo"))}">${info}
            </aside>
            <div class="next-steps reveal">
              <p class="next-steps__title">${escapeHtml(section.steps.title)}</p>
              <ol>
              ${steps}
              </ol>
            </div>
          </div>

          <div class="contact-main">
          <form class="contact-form reveal" id="contactForm" novalidate data-contact-form data-clarity-mask="True">
            <input type="hidden" name="formStartedAt" id="formStartedAt" value="" />
            <input type="hidden" name="sourcePage" id="sourcePage" value="${escapeHtml(sourcePage)}" />
            <div class="hp-field" aria-hidden="true">
              <label for="website">Website</label>
              <input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
            </div>

            <div class="form-row">
              <div class="field">
                <label for="name">${escapeHtml(tf("labels.name"))} ${reqMark}</label>
                <input class="field__control" type="text" id="name" name="name" autocomplete="name" required maxlength="120" aria-required="true" aria-describedby="nameError" />
                <p class="field__error" id="nameError" role="alert" hidden></p>
              </div>
              <div class="field">
                <label for="company">${escapeHtml(tf("labels.company"))} ${optMark}</label>
                <input class="field__control" type="text" id="company" name="company" autocomplete="organization" maxlength="160" />
              </div>
            </div>

            <div class="form-row">
              <div class="field">
                <label for="email">${escapeHtml(tf("labels.email"))} ${reqMark}</label>
                <input class="field__control" type="email" id="email" name="email" autocomplete="email" inputmode="email" required maxlength="254" aria-required="true" aria-describedby="emailError" />
                <p class="field__error" id="emailError" role="alert" hidden></p>
              </div>
              <div class="field">
                <label for="phone">${escapeHtml(tf("labels.phone"))} ${optMark}</label>
                <input class="field__control" type="tel" id="phone" name="phone" autocomplete="tel" inputmode="tel" maxlength="40" aria-describedby="phoneError" />
                <p class="field__error" id="phoneError" role="alert" hidden></p>
              </div>
            </div>

            <div class="form-row">
              <div class="field">
                <label for="projectType">${escapeHtml(tf("labels.projectType"))} ${reqMark}</label>
                <select class="field__control" id="projectType" name="projectType" required aria-required="true" aria-describedby="projectTypeError">
                  <option value="">${escapeHtml(tf("placeholders.select"))}</option>
                  ${projectOptions}
                </select>
                <p class="field__error" id="projectTypeError" role="alert" hidden></p>
              </div>
              <div class="field">
                <label for="budget">${escapeHtml(tf("labels.budget"))} ${optMark}</label>
                <select class="field__control" id="budget" name="budget" aria-describedby="budgetError">
                  <option value="">${escapeHtml(tf("placeholders.select"))}</option>
                  ${budgetOptions}
                </select>
                <p class="field__error" id="budgetError" role="alert" hidden></p>
              </div>
            </div>

            <div class="field">
              <label for="message">${escapeHtml(tf("labels.message"))} ${reqMark}</label>
              <textarea class="field__control" id="message" name="message" rows="5" maxlength="5000" placeholder="${escapeHtml(tf("placeholders.message"))}" required aria-required="true" aria-describedby="messageError"></textarea>
              <p class="field__error" id="messageError" role="alert" hidden></p>
            </div>

            <div class="field">
              <label class="checkbox" for="privacy">
                <input type="checkbox" id="privacy" name="privacy" required aria-required="true" aria-describedby="privacyError" />
                <span>${privacyHtml}</span>
              </label>
              <p class="field__error" id="privacyError" role="alert" hidden></p>
            </div>

            <button type="submit" class="btn btn--primary btn--full" id="submitBtn" data-label-default="${escapeHtml(tf("actions.submit"))}" data-label-loading="${escapeHtml(tf("actions.submitting"))}">
              ${escapeHtml(tf("actions.submit"))}
            </button>

            <p class="form-status" id="formStatus" role="status" aria-live="polite" aria-atomic="true" tabindex="-1" hidden></p>
          </form>
${renderDirectContact()}
          </div>
        </div>
      </div>
    </section>`;
}

function renderFaq(section, alt) {
  const items = section.items
    .map((faq, index) => {
      const panelId = `faq-panel-${index}`;
      const buttonId = `faq-button-${index}`;
      return `
          <div class="faq-item" data-faq-item>
            <h3>
              <button class="faq-item__button" type="button" id="${buttonId}" data-faq-button aria-expanded="false" aria-controls="${panelId}">
                <span>${escapeHtml(faq.question)}</span>
                ${icon("plus", "faq-item__icon")}
              </button>
            </h3>
            <div class="faq-item__panel" id="${panelId}" role="region" aria-labelledby="${buttonId}" data-faq-panel hidden>
              <div class="faq-item__content">
                <p>${escapeHtml(faq.answer)}</p>
              </div>
            </div>
          </div>`;
    })
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-labelledby="${section.id}-title">
      <div class="container">
        ${sectionHeader(section)}
        <div class="faq-list reveal">${items}
        </div>
      </div>
    </section>`;
}

function renderCta(section) {
  return `    <section class="section" aria-labelledby="cta-title">
      <div class="container">
        <div class="cta-banner reveal">
          <div>
            <p class="section__eyebrow">${escapeHtml(t("case.nextStep"))}</p>
            <h2 id="cta-title" class="cta-banner__title">${escapeHtml(section.title)}</h2>
            <p class="cta-banner__text">${escapeHtml(section.text)}</p>
          </div>
          <a class="btn btn--primary" href="${pathFor(section.button.href)}">${escapeHtml(section.button.label)}</a>
        </div>
      </div>
    </section>`;
}

const sectionRenderers = {
  serviceRows: renderServiceRows,
  compare: renderCompare,
  features: renderFeatures,
  timeline: renderTimeline,
  pricing: renderPricing,
  pricingHub: renderPricingHub,
  pricingTerms: renderPricingTerms,
  cases: renderCases,
  integrations: renderIntegrations,
  specs: renderSpecs,
  panels: renderPanels,
  checklists: renderChecklists,
  sla: renderSla,
  portfolio: renderPortfolio,
  contact: renderContact,
  faq: renderFaq,
  cta: renderCta,
};

function renderSections(sections) {
  // Afwisselende achtergrond (section--alt) voor visueel ritme.
  let altToggle = true;
  return sections
    .map((section) => {
      const renderer = sectionRenderers[section.type];
      if (!renderer) throw new Error(`Onbekend sectietype: ${section.type}`);
      if (section.type === "cta") return renderCta(section);
      const alt = altToggle ? " section--alt" : "";
      altToggle = !altToggle;
      return renderer(section, alt);
    })
    .join("\n\n");
}

/* ---------- Pagina ---------- */

function renderPage(page) {
  const pathname = pagePathname(page);
  const meta = localeMeta(locale);
  const canonical = page.canonical || canonicalUrl(pathname, locale);
  const ogImageAlt = page.ogImageAlt || seoMessages.defaultOgImageAlt || "";
  const jsonLd =
    page.jsonLd ||
    buildPageJsonLd(page, pathname, canonical);
  const robots = page.robots || "index, follow";

  return `<!DOCTYPE html>
<html lang="${meta.htmlLang}" data-locale="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}" />
  <meta name="robots" content="${escapeHtml(robots)}" />
  ${siteVerificationMeta()}
  <link rel="canonical" href="${canonical}" />
  ${renderHreflangLinks(pathname)}

  ${renderSocialMeta({
    title: page.title,
    description: page.description,
    canonical,
    ogImage: page.ogImage,
    ogImageAlt,
    ogType: page.ogType || "website",
    locale,
  })}

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/main.css" />
  ${consentBootstrapScript()}
  ${renderJsonLdScript(jsonLd)}
  ${clientMessagesScript()}
</head>
<body data-page="${page.slug}">
  <a class="skip-link" href="#main">${escapeHtml(t("skipToContent"))}</a>

${headerMarkup(page.navKey, pathname)}

  <main id="main">
${page.head ? `${renderHead(page)}\n\n` : ""}${page.customMain || renderSections(page.sections)}
  </main>

${footerMarkup()}

  </div>
  </div>

  <script type="module" src="/js/page-main.js"></script>
</body>
</html>
`;
}

function renderCaseMain(project) {
  const next = getNextProject(project.slug, locale);
  const block = (section, extraClass = "") => `
    <section class="section${extraClass}" aria-labelledby="${section.id}-title">
      <div class="container case-prose">
        <header class="section__header reveal">
          <p class="section__eyebrow">${escapeHtml(section.eyebrow || "")}</p>
          <h2 id="${section.id}-title" class="section__title">${escapeHtml(section.title)}</h2>
        </header>
        <p class="case-prose__text reveal">${escapeHtml(section.text)}</p>
        ${
          section.points
            ? `<ul class="case-prose__list reveal">
          ${section.points.map((point) => `<li>${icon("check")} <span>${escapeHtml(point)}</span></li>`).join("\n          ")}
        </ul>`
            : ""
        }
        ${
          section.items
            ? `<ul class="case-prose__list reveal">
          ${section.items.map((item) => `<li>${icon("check")} <span>${escapeHtml(item)}</span></li>`).join("\n          ")}
        </ul>`
            : ""
        }
      </div>
    </section>`;

  return `    <section class="case-hero" aria-labelledby="page-title">
      <div class="container">
        <nav class="page-head__breadcrumb reveal" aria-label="${escapeHtml(t("breadcrumb.ariaLabel"))}">
          <a href="${pathFor("/")}">${escapeHtml(t("breadcrumb.home"))}</a><span aria-hidden="true">/</span>
          <a href="${pathFor("/projecten")}">${escapeHtml(t("nav.projecten"))}</a><span aria-hidden="true">/</span>
          <span aria-current="page">${escapeHtml(project.name)}</span>
        </nav>
        <p class="section__eyebrow reveal">${escapeHtml(project.eyebrow)}</p>
        <h1 id="page-title" class="case-hero__title reveal">${escapeHtml(project.title)}</h1>
        <p class="case-hero__intro reveal">${escapeHtml(project.intro)}</p>
        <div class="case-hero__meta reveal">
          <p><span>${escapeHtml(t("case.category"))}</span> ${escapeHtml(project.category)}</p>
          <p><span>${escapeHtml(t("case.live"))}</span> <a class="case-hero__live" href="${project.url}" rel="noopener noreferrer" target="_blank" data-track="outbound_project">${escapeHtml(project.url.replace(/^https?:\/\//, ""))}</a></p>
        </div>
        <ul class="case-hero__services reveal">
          ${project.services.map((service) => `<li>${escapeHtml(service)}</li>`).join("\n          ")}
        </ul>
        <div class="case-hero__devices reveal">
          <div class="device device--desktop device--hero">
            <div class="device__chrome" aria-hidden="true"><span></span><span></span><span></span></div>
            <div class="device__screen">
              <picture>
                <source srcset="${project.images.desktop}" type="image/webp" />
                <img
                  src="${project.images.desktopJpg}"
                  alt="${escapeHtml(project.images.altDesktop)}"
                  width="1600"
                  height="1000"
                  fetchpriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
          <div class="device device--mobile device--hero-mobile">
            <div class="device__screen">
              <picture>
                <source srcset="${project.images.mobile}" type="image/webp" />
                <img
                  src="${project.images.mobileJpg}"
                  alt="${escapeHtml(project.images.altMobile)}"
                  width="780"
                  height="1688"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>

${block({ id: "klant", eyebrow: t("case.client"), ...project.client }, " section--alt")}

${block({ id: "uitdaging", eyebrow: t("case.context"), ...project.challenge })}

${block({ id: "aanpak", eyebrow: t("case.approach"), ...project.approach }, " section--alt")}

${block({ id: "design", eyebrow: t("case.design"), ...project.design })}

${block({ id: "ontwikkeling", eyebrow: t("case.development"), ...project.development }, " section--alt")}

${block({ id: "responsive", eyebrow: t("case.responsive"), ...project.responsive })}

${block({ id: "techniek", eyebrow: t("case.tech"), ...project.tech }, " section--alt")}

${project.hosting ? block({ id: "hosting", eyebrow: t("case.hosting"), ...project.hosting }) : ""}

${block({ id: "resultaat", eyebrow: t("case.result"), ...project.result }, project.hosting ? " section--alt" : "")}

    <section class="section" aria-labelledby="screenshots-title">
      <div class="container">
        <header class="section__header section__header--center reveal">
          <p class="section__eyebrow">${escapeHtml(t("case.screenshots"))}</p>
          <h2 id="screenshots-title" class="section__title">${escapeHtml(t("case.screenshotsTitle"))}</h2>
        </header>
        <div class="case-shots">
          <figure class="case-shot reveal">
            <div class="device device--desktop">
              <div class="device__chrome" aria-hidden="true"><span></span><span></span><span></span></div>
              <div class="device__screen">
                <picture>
                  <source srcset="${project.images.mid}" type="image/webp" />
                  <img src="${project.images.midJpg}" alt="${escapeHtml(project.images.altMid)}" width="1600" height="1000" loading="lazy" decoding="async" />
                </picture>
              </div>
            </div>
            <figcaption>${escapeHtml(t("case.captionDesktop"))}</figcaption>
          </figure>
          <figure class="case-shot reveal">
            <div class="device device--mobile device--shot">
              <div class="device__screen">
                <picture>
                  <source srcset="${project.images.mobile}" type="image/webp" />
                  <img src="${project.images.mobileJpg}" alt="${escapeHtml(project.images.altMobile)}" width="780" height="1688" loading="lazy" decoding="async" />
                </picture>
              </div>
            </div>
            <figcaption>${escapeHtml(t("case.captionMobile"))}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="section section--alt" aria-labelledby="next-project-title">
      <div class="container">
        <article class="case-next reveal">
          <div>
            <p class="section__eyebrow">${escapeHtml(t("case.nextProject"))}</p>
            <h2 id="next-project-title" class="case-next__title">${escapeHtml(next.name)}</h2>
            <p class="case-next__text">${escapeHtml(next.summary)}</p>
            <a class="btn btn--secondary" href="${pathFor(`/projecten/${next.slug}`)}">${escapeHtml(t("case.viewNamed", { name: next.name }))}</a>
          </div>
          <a class="case-next__preview" href="${pathFor(`/projecten/${next.slug}`)}" tabindex="-1" aria-hidden="true">
            <picture>
              <source srcset="${next.images.desktop}" type="image/webp" />
              <img src="${next.images.desktopJpg}" alt="" width="800" height="500" loading="lazy" decoding="async" />
            </picture>
          </a>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="cta-title">
      <div class="container">
        <div class="cta-banner reveal">
          <div>
            <p class="section__eyebrow">${escapeHtml(t("case.nextStep"))}</p>
            <h2 id="cta-title" class="cta-banner__title">${escapeHtml(t("case.ctaTitle"))}</h2>
            <p class="cta-banner__text">${escapeHtml(t("case.ctaLead"))}</p>
          </div>
          <a class="btn btn--primary" href="${pathFor("/offerte")}">${escapeHtml(t("case.ctaButton"))}</a>
        </div>
      </div>
    </section>`;
}

function buildCasePage(project) {
  const pathname = `/projecten/${project.slug}`;
  const breadcrumb = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("nav.projecten"), href: "/projecten" },
    { label: project.name },
  ];

  return renderPage({
    slug: `projecten-${project.slug}`,
    navKey: "projecten",
    title: project.meta.title,
    description: project.meta.description,
    canonical: canonicalUrl(pathname, locale),
    ogImage: project.images.og,
    ogImageAlt: project.images.altDesktop || project.meta.title,
    ogType: "article",
    breadcrumb,
    creativeWork: buildCreativeWorkNode(project, locale),
    customMain: renderCaseMain(project),
  });
}

/**
 * Injecteert/update het client-side messages-blok + SEO-head in index.html.
 */
function syncIndexMessages() {
  const indexPath = join(root, "index.html");
  let html = readFileSync(indexPath, "utf8");
  const script = clientMessagesScript();
  const pattern = /<script type="application\/json" id="i18n-messages">[\s\S]*?<\/script>\n?/;

  if (pattern.test(html)) {
    html = html.replace(pattern, `${script}\n`);
  } else {
    html = html.replace("</head>", `  ${script}\n</head>`);
  }

  if (!html.includes('data-locale="')) {
    html = html.replace('<html lang="nl">', '<html lang="nl" data-locale="nl">');
  }

  const homeMeta = seoMessages.pages?.home || messages.home?.meta || {};
  const title = homeMeta.title || messages.home?.meta?.title;
  const description = homeMeta.description || messages.home?.meta?.description;
  const ogAlt = seoMessages.defaultOgImageAlt || messages.home?.meta?.ogImageAlt || "";
  const canonical = canonicalUrl("/", locale);

  if (title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  }
  if (description) {
    html = html.replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    );
  }

  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  /* hreflang: vervang bestaande alternate-blok of voeg toe na canonical */
  if (/<link rel="alternate" hreflang=/.test(html)) {
    html = html.replace(
      /(?:\s*<link rel="alternate" hreflang="[^"]+" href="[^"]*"\s*\/>)+/,
      `\n  ${renderHreflangLinks("/")}`
    );
  } else {
    html = html.replace(
      /<link rel="canonical"[^>]*>/,
      (match) => `${match}\n  ${renderHreflangLinks("/")}`
    );
  }

  const social = renderSocialMeta({
    title,
    description,
    canonical,
    ogImageAlt: ogAlt,
    locale,
  });

  if (/<meta property="og:type"/.test(html)) {
    html = html.replace(
      /<meta property="og:type"[\s\S]*?(?=\n\s*<link rel="preconnect")/,
      `${social}\n`
    );
  }

  /* Remove legacy relative icon tags if absolute variants already exist */
  if (html.includes('href="/favicon.png')) {
    html = html.replace(/\n\s*<link rel="icon"[^>]*href="favicon\.png[^"]*"[^>]*>/g, "");
  }
  if (html.includes('href="/apple-touch-icon.png')) {
    html = html.replace(/\n\s*<link rel="apple-touch-icon"[^>]*href="apple-touch-icon\.png[^"]*"[^>]*>/g, "");
  }
  if ((html.match(/rel="manifest"/g) || []).length > 1) {
    let seenManifest = false;
    html = html.replace(/\n\s*<link rel="manifest"[^>]*>/g, (match) => {
      if (seenManifest) return "";
      seenManifest = true;
      return match;
    });
  }

  const homeJsonLd = buildJsonLdGraph([
    buildOrganizationNode(seoMessages),
    buildWebSiteNode(seoMessages),
  ]);
  const jsonLdScript = renderJsonLdScript(homeJsonLd);
  if (/<script type="application\/ld\+json">[\s\S]*?<\/script>/.test(html)) {
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      jsonLdScript
    );
  } else {
    html = html.replace("</head>", `  ${jsonLdScript}\n</head>`);
  }

  /* Footer legal links → clean URLs */
  html = html
    .replaceAll('href="privacy.html"', 'href="/privacy"')
    .replaceAll('href="algemene-voorwaarden.html"', 'href="/algemene-voorwaarden"')
    .replaceAll('href="/privacy.html"', 'href="/privacy"')
    .replaceAll('href="/algemene-voorwaarden.html"', 'href="/algemene-voorwaarden"');

  /* Consent Mode bootstrap */
  if (!html.includes("/js/consent-default.js")) {
    html = html.replace(
      /<link rel="stylesheet" href="[^"]*css\/(?:main|bundle)\.css"\s*\/>/,
      (match) => `${match}\n  ${consentBootstrapScript()}`
    );
  }

  /* Google Search Console verification (only when configured) */
  if (publicEnv.GOOGLE_SITE_VERIFICATION) {
    if (/name="google-site-verification"/.test(html)) {
      html = html.replace(
        /<meta name="google-site-verification" content="[^"]*"\s*\/>/,
        siteVerificationMeta()
      );
    } else {
      html = html.replace(
        /<meta name="robots"[^>]*>/,
        (match) => `${match}\n  ${siteVerificationMeta()}`
      );
    }
  } else {
    html = html.replace(/\n?\s*<meta name="google-site-verification"[^>]*>/g, "");
  }

  /* Site font: keep index.html aligned with generated pages */
  html = html.replace(
    /https:\/\/fonts\.googleapis\.com\/css2\?family=[^"]+/,
    "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
  );

  /* Cookie + legal footer controls */
  if (!html.includes('data-open-cookie-settings')) {
    html = html.replace(
      /<li><a href="\/privacy">[^<]*<\/a><\/li>\s*(?:<li><a href="\/cookies">[^<]*<\/a><\/li>\s*)?<li><a href="\/algemene-voorwaarden">[^<]*<\/a><\/li>/,
      `<li><a href="/privacy">${escapeHtml(t("footer.privacy"))}</a></li>
            <li><a href="/cookies">${escapeHtml(t("footer.cookiePolicy"))}</a></li>
            <li><a href="/algemene-voorwaarden">${escapeHtml(t("footer.terms"))}</a></li>
            <li><a href="/disclaimer">${escapeHtml(t("footer.disclaimer"))}</a></li>
            <li><button type="button" class="site-footer__text-btn" data-open-cookie-settings>${escapeHtml(t("footer.cookieSettings"))}</button></li>`
    );
  }

  /* Enable language switcher on NL homepage */
  html = html.replace(
    /<div class="language-switcher"[\s\S]*?<\/div>/,
    languageSwitcherMarkup("/")
  );

  writeFileSync(indexPath, html, "utf8");
  console.log("Synced i18n messages and SEO head into index.html");
}


function generateEnHomePage() {
  setLocaleContext("en");
  const indexPath = join(root, "index.html");
  let html = readFileSync(indexPath, "utf8");
  const home = messages.home || {};
  const seo = seoMessages.pages?.home || home.meta || {};
  const title = seo.title || home.meta?.title || "AxaWeb";
  const description = seo.description || home.meta?.description || "";
  const ogAlt = seoMessages.defaultOgImageAlt || home.meta?.ogImageAlt || "";
  const canonical = canonicalUrl("/", "en");

  html = html
    .replace(/<html[^>]*>/, '<html lang="en" data-locale="en">')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    )
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);

  if (/<link rel="alternate" hreflang=/.test(html)) {
    html = html.replace(
      /(?:\s*<link rel="alternate" hreflang="[^"]+" href="[^"]*"\s*\/>)+/,
      `\n  ${renderHreflangLinks("/")}`
    );
  }

  const social = renderSocialMeta({
    title,
    description,
    canonical,
    ogImageAlt: ogAlt,
    locale: "en",
  });
  if (/<meta property="og:type"/.test(html)) {
    html = html.replace(
      /<meta property="og:type"[\s\S]*?(?=\n\s*<link rel="preconnect")/,
      `${social}\n`
    );
  }

  html = html.replace(
    /<script type="application\/json" id="i18n-messages">[\s\S]*?<\/script>/,
    clientMessagesScript()
  );

  const homeJsonLd = buildJsonLdGraph([
    buildOrganizationNode(seoMessages, "en"),
    buildWebSiteNode(seoMessages, "en"),
  ]);
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    renderJsonLdScript(homeJsonLd)
  );

  /* Chrome + visible homepage copy */
  const replacements = [
    [">Ga naar inhoud<", `>${escapeHtml(t("skipToContent"))}<`],
    ['aria-label="Hoofdnavigatie"', `aria-label="${escapeHtml(t("nav.ariaLabel"))}"`],
    ['aria-label="Mobiele navigatie"', `aria-label="${escapeHtml(t("nav.mobileAriaLabel"))}"`],
    ['aria-label="AxaWeb home"', `aria-label="${escapeHtml(t("nav.homeAria"))}"`],
    ['aria-label="Menu openen"', `aria-label="${escapeHtml(t("nav.menuOpen"))}"`],
    ['aria-label="Taal kiezen"', `aria-label="${escapeHtml(t("languageSwitcher.ariaLabel"))}"`],
    [">Diensten<", `>${escapeHtml(t("nav.diensten"))}<`],
    [">Pakketten<", `>${escapeHtml(t("nav.pakketten"))}<`],
    [">Projecten<", `>${escapeHtml(t("nav.projecten"))}<`],
    [">Contact<", `>${escapeHtml(t("nav.contact"))}<`],
    [">Offerte aanvragen<", `>${escapeHtml(t("cta.requestQuote"))}<`],
    [">Bekijk onze diensten<", `>${escapeHtml(t("cta.viewServices"))}<`],
    [">Bekijk alle diensten<", `>${escapeHtml(t("cta.viewAllServices"))}<`],
    [">Bekijk alle pakketten<", `>${escapeHtml(t("cta.viewAllPackages"))}<`],
    [">Alle projecten bekijken<", `>${escapeHtml(t("cta.viewAllProjects"))}<`],
    ['href="/diensten"', `href="${pathFor("/diensten")}"`],
    ['href="/pakketten"', `href="${pathFor("/pakketten")}"`],
    ['href="/projecten"', `href="${pathFor("/projecten")}"`],
    ['href="/contact"', `href="${pathFor("/contact")}"`],
    ['href="/offerte"', `href="${pathFor("/offerte")}"`],
    ['href="/"', `href="${pathFor("/")}"`],
    ['href="/privacy"', `href="${pathFor("/privacy")}"`],
    ['href="/cookies"', `href="${pathFor("/cookies")}"`],
    ['href="/algemene-voorwaarden"', `href="${pathFor("/algemene-voorwaarden")}"`],
    ['href="/disclaimer"', `href="${pathFor("/disclaimer")}"`],
    ['href="/websites"', `href="${pathFor("/websites")}"`],
    ['href="/webshops"', `href="${pathFor("/webshops")}"`],
    ['href="/hosting"', `href="${pathFor("/hosting")}"`],
    ['href="/onderhoud"', `href="${pathFor("/onderhoud")}"`],
  ];

  for (const [from, to] of replacements) {
    html = html.split(from).join(to);
  }

  /* Hero + sections from home messages */
  if (home.hero?.title) {
    html = html.replace(
      /(<h1 id="hero-title"[^>]*>)([\s\S]*?)(<\/h1>)/,
      `$1${escapeHtml(home.hero.title)}$3`
    );
  }
  if (home.hero?.text) {
    html = html.replace(
      /(<p class="hero__text">)([\s\S]*?)(<\/p>)/,
      `$1\n            ${escapeHtml(home.hero.text)}\n          $3`
    );
  }
  if (home.hero?.scroll) {
    html = html.replace(
      /(<p class="hero__scroll-hint"[^>]*>)([\s\S]*?)(<\/p>)/,
      `$1${escapeHtml(home.hero.scroll)}$3`
    );
  }
  if (home.intro?.eyebrow) {
    html = html.replace(
      /(<section class="section section--alt" id="introductie"[\s\S]*?<p class="section__eyebrow">)([\s\S]*?)(<\/p>)/,
      `$1${escapeHtml(home.intro.eyebrow)}$3`
    );
  }
  if (home.intro?.title) {
    html = html.replace(
      /(<h2 id="introductie-title"[^>]*>)([\s\S]*?)(<\/h2>)/,
      `$1${escapeHtml(home.intro.title)}$3`
    );
  }
  if (home.intro?.p1 && home.intro?.p2) {
    html = html.replace(
      /(<div class="intro__body reveal">)([\s\S]*?)(<\/div>\s*<ul class="intro__facts)/,
      `$1
            <p>${escapeHtml(home.intro.p1)}</p>
            <p>${escapeHtml(home.intro.p2)}</p>
          $3`
    );
  }
  if (Array.isArray(home.intro?.facts) && home.intro.facts.length >= 3) {
    const factsHtml = home.intro.facts
      .map(
        (fact) => `          <li>
            <span class="intro__fact-title">${escapeHtml(fact.title)}</span>
            <span class="intro__fact-text">${escapeHtml(fact.text)}</span>
          </li>`
      )
      .join("\n");
    html = html.replace(
      /(<ul class="intro__facts reveal">)([\s\S]*?)(<\/ul>)/,
      `$1\n${factsHtml}\n        $3`
    );
  }
  if (home.services) {
    html = html.replace(
      /(<section class="section" id="diensten"[\s\S]*?<p class="section__eyebrow">)([\s\S]*?)(<\/p>\s*<h2 id="diensten-title"[^>]*>)([\s\S]*?)(<\/h2>\s*<p class="section__intro">)([\s\S]*?)(<\/p>)/,
      `$1${escapeHtml(home.services.eyebrow)}$3${escapeHtml(home.services.title)}$5${escapeHtml(home.services.intro)}$7`
    );
  }
  if (home.packages) {
    html = html.replace(
      /(<section class="section section--alt" id="pakketten"[\s\S]*?<p class="section__eyebrow">)([\s\S]*?)(<\/p>\s*<h2 id="pakketten-title"[^>]*>)([\s\S]*?)(<\/h2>\s*<p class="section__intro">)([\s\S]*?)(<\/p>)/,
      `$1${escapeHtml(home.packages.eyebrow)}$3${escapeHtml(home.packages.title)}$5${escapeHtml(home.packages.intro)}$7`
    );
  }
  if (home.projects) {
    html = html.replace(
      /(<section class="section" id="projecten"[\s\S]*?<p class="section__eyebrow">)([\s\S]*?)(<\/p>\s*<h2 id="projecten-title"[^>]*>)([\s\S]*?)(<\/h2>\s*<p class="section__intro">)([\s\S]*?)(<\/p>)/,
      `$1${escapeHtml(home.projects.eyebrow)}$3${escapeHtml(home.projects.title)}$5${escapeHtml(home.projects.intro)}$7`
    );
  }
  if (home.cta) {
    html = html.replace(
      /(<section[^>]*id="cta"[^>]*>[\s\S]*?<p class="section__eyebrow">)([\s\S]*?)(<\/p>\s*<h2 id="cta-title"[^>]*>)([\s\S]*?)(<\/h2>\s*<p class="cta-banner__text">)([\s\S]*?)(<\/p>)/,
      `$1${escapeHtml(home.cta.eyebrow)}$3${escapeHtml(home.cta.title)}$5${escapeHtml(home.cta.text)}$7`
    );
  }

  /* Replace footer with locale-aware markup */
  html = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footerMarkup());

  /* Noscript fallback */
  if (home.noscript?.title && home.noscript?.text) {
    html = html.replace(
      /<noscript>[\s\S]*?<\/noscript>/,
      `<noscript>
    <div class="container section">
      <h2>${escapeHtml(home.noscript.title)}</h2>
      <p>${escapeHtml(home.noscript.text)}</p>
    </div>
  </noscript>`
    );
  }

  /* Language switcher enabled for EN home */
  html = html.replace(
    /<div class="language-switcher"[\s\S]*?<\/div>/,
    languageSwitcherMarkup("/")
  );

  /* Asset paths from /en/ */
  html = html
    .replaceAll('src="images/', 'src="/images/')
    .replaceAll('srcset="images/', 'srcset="/images/')
    .replaceAll('src="logo.png', 'src="/logo.png')
    .replaceAll('srcset="logo.png', 'srcset="/logo.png')
    .replaceAll('srcset="logo@2x.png', 'srcset="/logo@2x.png')
    .replaceAll(', logo@2x.png', ', /logo@2x.png')
    .replaceAll('href="css/', 'href="/css/')
    .replaceAll('src="js/', 'src="/js/')
    .replaceAll('href="js/', 'href="/js/');

  mkdirSync(join(root, "en"), { recursive: true });
  writeFileSync(join(root, "en", "index.html"), html, "utf8");
  console.log("Generated en/index.html");
}

function generateEnNotFoundPage() {
  setLocaleContext("en");
  const src = join(root, "404.html");
  if (!existsSync(src)) return;
  let html = readFileSync(src, "utf8");
  const seo = seoMessages.pages?.notFound || {};
  const title = seo.title || "Page Not Found | AxaWeb";
  const description = seo.description || "";
  const ogAlt = seoMessages.defaultOgImageAlt || "";
  const canonical = `${siteUrl}/en/404`;

  html = html
    .replace(/<html[^>]*>/, '<html lang="en" data-locale="en">')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    )
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(
      /(?:\s*<link rel="alternate" hreflang="[^"]+" href="[^"]*"\s*\/>)+/,
      `
  <link rel="alternate" hreflang="nl-NL" href="${siteUrl}/404" />
  <link rel="alternate" hreflang="en" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${siteUrl}/404" />`
    );

  const social = renderSocialMeta({
    title,
    description,
    canonical,
    ogImageAlt: ogAlt,
    locale: "en",
  });
  if (/<meta property="og:type"/.test(html)) {
    html = html.replace(
      /<meta property="og:type"[\s\S]*?(?=\n\s*<meta name="theme-color")/,
      `${social}\n\n  `
    );
  }

  html = html
    .replaceAll('href="/"', `href="${pathFor("/")}"`)
    .replaceAll('href="/diensten"', `href="${pathFor("/diensten")}"`)
    .replaceAll('href="/projecten"', `href="${pathFor("/projecten")}"`)
    .replaceAll('href="/pakketten"', `href="${pathFor("/pakketten")}"`)
    .replaceAll('href="/contact"', `href="${pathFor("/contact")}"`)
    .replaceAll('href="/offerte"', `href="${pathFor("/offerte")}"`)
    .replaceAll(">Offerte aanvragen<", `>${escapeHtml(t("cta.requestQuote"))}<`)
    .replaceAll(">Contact<", `>${escapeHtml(t("nav.contact"))}<`)
    .replaceAll(">Diensten<", `>${escapeHtml(t("nav.diensten"))}<`)
    .replaceAll(">Projecten<", `>${escapeHtml(t("nav.projecten"))}<`)
    .replaceAll(">Pakketten<", `>${escapeHtml(t("nav.pakketten"))}<`)
    .replaceAll(">Ga naar inhoud<", `>${escapeHtml(t("skipToContent"))}<`)
    .replaceAll(">Fout 404<", ">Error 404<")
    .replaceAll(">Deze pagina bestaat niet<", ">This page does not exist<")
    .replaceAll(
      "De pagina die je zoekt is verplaatst of bestaat niet meer. Gebruik de links hieronder om verder te gaan.",
      "The page you are looking for has moved or no longer exists. Use the links below to continue."
    )
    .replaceAll(">Naar homepage<", ">Back to homepage<")
    .replaceAll(
      "AxaWeb: websites, webshops, hosting en onderhoud.",
      "AxaWeb: websites, web shops, hosting, and maintenance."
    )
    .replaceAll(
      'content="AxaWeb: premium berglandschap als visuele identiteit"',
      `content="${escapeHtml(ogAlt)}"`
    );

  writeFileSync(join(root, "en", "404.html"), html, "utf8");
  console.log("Generated en/404.html");
}

export function generatePages() {
  const activeLocales = englishLocaleLive ? locales : [defaultLocale];

  for (const nextLocale of activeLocales) {
    setLocaleContext(nextLocale);
    const outRoot = nextLocale === "en" ? join(root, "en") : root;
    mkdirSync(outRoot, { recursive: true });

    Object.values(pages).forEach((page) => {
      const filePath = join(outRoot, `${page.slug}.html`);
      writeFileSync(filePath, renderPage(page), "utf8");
      console.log(`Generated ${nextLocale === "en" ? "en/" : ""}${page.slug}.html`);
    });

    const caseDir = nextLocale === "en" ? join(outRoot, "projects") : join(root, "projecten");
    mkdirSync(caseDir, { recursive: true });
    projects.forEach((project) => {
      const filePath = join(caseDir, `${project.slug}.html`);
      writeFileSync(filePath, buildCasePage(project), "utf8");
      console.log(`Generated ${nextLocale === "en" ? "en/projects" : "projecten"}/${project.slug}.html`);
    });

    if (nextLocale === "nl") {
      syncIndexMessages();
    } else {
      generateEnHomePage();
      generateEnNotFoundPage();
    }
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  generatePages();
}
