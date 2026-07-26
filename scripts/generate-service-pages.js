import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const { servicePages, sharedWhy } = await import(
  pathToFileURL(join(root, "js/data/service-pages.js")).href
);
const { icon } = await import(pathToFileURL(join(root, "js/modules/icons.js")).href);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function navMarkup(activeSlug) {
  const links = [
    { label: "Diensten", href: "/diensten", match: "diensten" },
    { label: "Werkwijze", href: "/#werkwijze" },
    { label: "Projecten", href: "/#projecten" },
    { label: "Pakketten", href: "/#pakketten" },
    { label: "Contact", href: "/#contact" },
  ];

  return links
    .map((link) => {
      const current =
        link.match &&
        (activeSlug === link.match ||
          ["websites", "webshops", "hosting", "onderhoud"].includes(activeSlug));
      const attrs = current ? ' aria-current="page" class="is-active"' : "";
      return `<a href="${link.href}"${attrs}>${link.label}</a>`;
    })
    .join("\n        ");
}

function benefitCards(items) {
  return items
    .map(
      (item) => `
        <article class="card reveal"${item.href ? "" : ' data-spotlight'}>
          <div class="icon-box card__icon">${icon(item.icon)}</div>
          <h3 class="card__title">${escapeHtml(item.title)}</h3>
          <p class="card__text">${escapeHtml(item.text)}</p>
          ${
            item.href
              ? `<a class="card__link" href="${item.href}">Meer informatie ${icon("arrow", "icon")}</a>`
              : ""
          }
        </article>`
    )
    .join("");
}

function processSteps(steps) {
  return steps
    .map(
      (step) => `
        <article class="process__step reveal">
          <div class="process__number">${escapeHtml(step.number)}</div>
          <h3 class="process__title">${escapeHtml(step.title)}</h3>
          <p class="process__text">${escapeHtml(step.text)}</p>
        </article>`
    )
    .join("");
}

function whyItems(items) {
  return items
    .map(
      (item, index) => `
        <article class="why-item reveal">
          <span class="why-item__num" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 class="why-item__title">${escapeHtml(item.title)}</h3>
            <p class="why-item__text">${escapeHtml(item.text)}</p>
          </div>
        </article>`
    )
    .join("");
}

function faqItems(faqs) {
  return faqs
    .map((faq, index) => {
      const panelId = `faq-panel-${index}`;
      const buttonId = `faq-button-${index}`;
      return `
          <div class="faq-item" data-faq-item>
            <h3>
              <button
                class="faq-item__button"
                type="button"
                id="${buttonId}"
                data-faq-button
                aria-expanded="false"
                aria-controls="${panelId}"
              >
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
}

function relatedLinks(links = []) {
  if (!links.length) return "";
  return `
        <div class="related-links reveal">
          ${links
            .map(
              (link) =>
                `<a href="${link.href}">${escapeHtml(link.label)} ${icon("arrow", "icon")}</a>`
            )
            .join("")}
        </div>`;
}

function renderPage(page) {
  const label =
    page.slug === "diensten"
      ? "Diensten"
      : page.slug.charAt(0).toUpperCase() + page.slug.slice(1);

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${page.canonical}" />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="nl_NL" />
  <meta property="og:site_name" content="AxaWeb" />
  <meta property="og:title" content="${escapeHtml(page.title)}" />
  <meta property="og:description" content="${escapeHtml(page.description)}" />
  <meta property="og:url" content="${page.canonical}" />
  <meta property="og:image" content="https://axaweb.nl/images/background.jpg" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(page.title)}" />
  <meta name="twitter:description" content="${escapeHtml(page.description)}" />
  <meta name="twitter:image" content="https://axaweb.nl/images/background.jpg" />

  <meta name="theme-color" content="#06101D" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=3" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/main.css" />
</head>
<body data-page="${page.slug}">
  <a class="skip-link" href="#main">Ga naar inhoud</a>

  <header class="site-header" data-header>
    <span class="scroll-progress" data-scroll-progress aria-hidden="true"></span>
    <div class="container site-header__inner">
      <a class="site-header__logo" href="/" aria-label="AxaWeb home">
        <img src="/logo.png?v=5" srcset="/logo.png?v=5 1x, /logo@2x.png?v=5 2x" alt="AxaWeb" width="320" height="59" decoding="async" />
      </a>
      <nav class="site-nav" aria-label="Hoofdnavigatie">
        ${navMarkup(page.slug)}
      </nav>
      <div class="site-header__actions">
        <a class="btn btn--primary site-header__cta" href="/#contact">Offerte aanvragen</a>
        <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Menu openen">
          <span class="menu-toggle__bars" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </header>

  <nav class="mobile-nav" id="mobile-nav" data-mobile-nav aria-label="Mobiele navigatie" hidden>
    ${navMarkup(page.slug)}
    <a class="btn btn--primary" href="/#contact">Offerte aanvragen</a>
  </nav>

  <main id="main">
    <section class="page-hero" aria-labelledby="page-hero-title">
      <div class="page-hero__media" aria-hidden="true">
        <picture>
          <source srcset="/images/background.webp" type="image/webp" />
          <img src="/images/background.jpg" alt="" width="1920" height="1280" decoding="async" />
        </picture>
      </div>
      <div class="page-hero__overlay" aria-hidden="true"></div>
      <div class="page-hero__inner">
        <nav class="page-hero__breadcrumb" aria-label="Broodkruimel">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          ${
            page.slug === "diensten"
              ? `<span aria-current="page">Diensten</span>`
              : `<a href="/diensten">Diensten</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(label)}</span>`
          }
        </nav>
        <h1 id="page-hero-title" class="page-hero__title reveal is-visible">${escapeHtml(page.hero.title)}</h1>
        <p class="page-hero__text reveal is-visible">${escapeHtml(page.hero.text)}</p>
        <div class="page-hero__actions reveal is-visible">
          <a class="btn btn--primary" href="${page.hero.primaryCta.href}">${escapeHtml(page.hero.primaryCta.label)}</a>
          <a class="btn btn--secondary" href="${page.hero.secondaryCta.href}">${escapeHtml(page.hero.secondaryCta.label)}</a>
        </div>
      </div>
    </section>

    <section class="section section--alt" id="introductie" aria-labelledby="intro-title">
      <div class="container">
        <header class="section__header reveal">
          <p class="section__eyebrow">${escapeHtml(page.intro.eyebrow)}</p>
          <h2 id="intro-title" class="section__title">${escapeHtml(page.intro.title)}</h2>
          <p class="section__intro">${escapeHtml(page.intro.text)}</p>
        </header>
        ${relatedLinks(page.related)}
      </div>
    </section>

    <section class="section" id="voordelen" aria-labelledby="voordelen-title">
      <div class="container">
        <header class="section__header reveal">
          <p class="section__eyebrow">${escapeHtml(page.benefits.eyebrow)}</p>
          <h2 id="voordelen-title" class="section__title">${escapeHtml(page.benefits.title)}</h2>
        </header>
        <div class="grid-4 stagger">
          ${benefitCards(page.benefits.items)}
        </div>
      </div>
    </section>

    <section class="section section--alt" id="werkwijze" aria-labelledby="werkwijze-title">
      <div class="container">
        <header class="section__header reveal">
          <p class="section__eyebrow">${escapeHtml(page.process.eyebrow)}</p>
          <h2 id="werkwijze-title" class="section__title">${escapeHtml(page.process.title)}</h2>
        </header>
        <div class="process stagger">
          ${processSteps(page.process.steps)}
        </div>
      </div>
    </section>

    <section class="section" id="waarom" aria-labelledby="waarom-title">
      <div class="container">
        <header class="section__header reveal">
          <p class="section__eyebrow">Waarom AxaWeb</p>
          <h2 id="waarom-title" class="section__title">Geen losse leverancier, maar een digitale partner.</h2>
          <p class="section__intro">Wij denken mee vanaf het eerste idee en blijven ook na de oplevering bereikbaar voor hosting, onderhoud en technische ondersteuning.</p>
        </header>
        <div class="why-grid stagger">
          ${whyItems(sharedWhy)}
        </div>
      </div>
    </section>

    <section class="section section--alt" id="faq" aria-labelledby="faq-title">
      <div class="container">
        <header class="section__header reveal">
          <p class="section__eyebrow">Veelgestelde vragen</p>
          <h2 id="faq-title" class="section__title">Duidelijke antwoorden vooraf.</h2>
        </header>
        <div class="faq-list reveal">
          ${faqItems(page.faqs)}
        </div>
      </div>
    </section>

    <section class="section" id="cta" aria-labelledby="cta-title">
      <div class="container">
        <div class="cta-banner reveal">
          <div>
            <p class="section__eyebrow">Volgende stap</p>
            <h2 id="cta-title" class="cta-banner__title">${escapeHtml(page.cta.title)}</h2>
            <p class="cta-banner__text">${escapeHtml(page.cta.text)}</p>
          </div>
          <a class="btn btn--primary" href="${page.cta.button.href}">${escapeHtml(page.cta.button.label)}</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <a href="/" aria-label="AxaWeb home">
            <img src="/logo.png?v=5" srcset="/logo.png?v=5 1x, /logo@2x.png?v=5 2x" alt="AxaWeb" width="320" height="59" loading="lazy" decoding="async" />
          </a>
          <p class="site-footer__note">AxaWeb is onderdeel van AxaNet.</p>
        </div>
        <div>
          <p class="site-footer__title">Navigatie</p>
          <ul class="site-footer__links">
            <li><a href="/diensten">Diensten</a></li>
            <li><a href="/websites">Websites</a></li>
            <li><a href="/webshops">Webshops</a></li>
            <li><a href="/hosting">Hosting</a></li>
            <li><a href="/onderhoud">Onderhoud</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <p class="site-footer__title">Juridisch</p>
          <ul class="site-footer__links">
            <li><a href="/privacy.html">Privacyverklaring</a></li>
            <li><a href="/algemene-voorwaarden.html">Algemene voorwaarden</a></li>
          </ul>
        </div>
        <div>
          <p class="site-footer__title">Contact</p>
          <ul class="site-footer__links">
            <li><a href="mailto:info@axaweb.nl">info@axaweb.nl</a></li>
            <li>Dieren, Nederland</li>
          </ul>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>© <span data-year></span> AxaWeb. Alle rechten voorbehouden.</p>
        <p>Digitale partner voor ondernemers</p>
      </div>
    </div>
  </footer>

  <script type="module" src="/js/service-main.js"></script>
</body>
</html>
`;
}

export function generateServicePages() {
  const outDir = root;
  Object.values(servicePages).forEach((page) => {
    const filePath = join(outDir, `${page.slug}.html`);
    writeFileSync(filePath, renderPage(page), "utf8");
    console.log(`Generated ${page.slug}.html`);
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateServicePages();
}
