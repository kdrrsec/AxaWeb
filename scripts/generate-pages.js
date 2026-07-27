/*
 * Genereert de subpagina's van de multipage-site.
 * Iedere pagina definieert eigen secties (js/data/pages.js); per sectietype
 * bestaat hier een eigen renderer, zodat geen pagina dezelfde opbouw deelt.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const { pages, siteNav } = await import(pathToFileURL(join(root, "js/data/pages.js")).href);
const { icon } = await import(pathToFileURL(join(root, "js/modules/icons.js")).href);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/* ---------- Gedeelde schil (header, footer, breadcrumb) ---------- */

function navMarkup(navKey) {
  return siteNav
    .map((link) => {
      const attrs = link.key === navKey ? ' aria-current="page" class="is-active"' : "";
      return `<a href="${link.href}"${attrs}>${escapeHtml(link.label)}</a>`;
    })
    .join("\n        ");
}

function breadcrumbMarkup(breadcrumb) {
  const parts = breadcrumb.map((crumb, index) => {
    const isLast = index === breadcrumb.length - 1;
    if (isLast) return `<span aria-current="page">${escapeHtml(crumb.label)}</span>`;
    return `<a href="${crumb.href}">${escapeHtml(crumb.label)}</a><span aria-hidden="true">/</span>`;
  });
  return `<nav class="page-head__breadcrumb" aria-label="Broodkruimel">${parts.join("")}</nav>`;
}

function headerMarkup(navKey) {
  return `  <div class="app-shell">
  <header class="site-header" data-header>
    <span class="scroll-progress" data-scroll-progress aria-hidden="true"></span>
    <div class="container site-header__inner">
      <a class="site-header__logo" href="/" aria-label="AxaWeb home">
        <img src="/logo.png?v=5" srcset="/logo.png?v=5 1x, /logo@2x.png?v=5 2x" alt="AxaWeb" width="320" height="59" decoding="async" />
      </a>
      <nav class="site-nav" aria-label="Hoofdnavigatie">
        ${navMarkup(navKey)}
      </nav>
      <div class="site-header__actions">
        <a class="btn btn--primary site-header__cta" href="/contact">Offerte aanvragen</a>
        <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Menu openen">
          <span class="menu-toggle__bars" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </header>

  <nav class="mobile-nav" id="mobile-nav" data-mobile-nav aria-label="Mobiele navigatie" hidden>
    ${navMarkup(navKey)}
    <a class="btn btn--primary" href="/contact">Offerte aanvragen</a>
  </nav>

  <div class="app-shell__scroll" data-scroll-root>`;
}

function footerMarkup() {
  return `  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <a href="/" aria-label="AxaWeb home">
            <img src="/logo.png?v=5" srcset="/logo.png?v=5 1x, /logo@2x.png?v=5 2x" alt="AxaWeb" width="320" height="59" loading="lazy" decoding="async" />
          </a>
          <p class="site-footer__note">Websites, webshops, hosting en onderhoud. Alles onder één dak, met één vast aanspreekpunt.</p>
        </div>
        <div>
          <p class="site-footer__title">Diensten</p>
          <ul class="site-footer__links">
            <li><a href="/websites">Websites</a></li>
            <li><a href="/webshops">Webshops</a></li>
            <li><a href="/hosting">Hosting</a></li>
            <li><a href="/onderhoud">Onderhoud</a></li>
          </ul>
        </div>
        <div>
          <p class="site-footer__title">Navigatie</p>
          <ul class="site-footer__links">
            <li><a href="/diensten">Diensten</a></li>
            <li><a href="/pakketten">Pakketten</a></li>
            <li><a href="/projecten">Projecten</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy.html">Privacyverklaring</a></li>
            <li><a href="/algemene-voorwaarden.html">Algemene voorwaarden</a></li>
          </ul>
        </div>
        <div>
          <p class="site-footer__title">Contact</p>
          <ul class="site-footer__links">
            <li><a href="mailto:info@axaweb.nl">info@axaweb.nl</a></li>
            <li>Reactie binnen één werkdag</li>
          </ul>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>© <span data-year></span> AxaWeb. Alle rechten voorbehouden.</p>
        <p>Digitale partner voor ondernemers</p>
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
        `<a class="btn btn--${action.style}" href="${action.href}">${escapeHtml(action.label)}</a>`
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
            <a class="card__link" href="${row.link.href}">${escapeHtml(row.link.label)} ${icon("arrow", "icon")}</a>
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
  const plans = section.plans
    .map(
      (plan) => `
        <article class="pricing-card${plan.featured ? " pricing-card--featured" : ""} reveal">
          ${plan.badge ? `<span class="pricing-card__badge">${escapeHtml(plan.badge)}</span>` : ""}
          <h3 class="pricing-card__name">${escapeHtml(plan.name)}</h3>
          <p class="pricing-card__price">${escapeHtml(plan.price)}${
            plan.period ? ` <span class="pricing-card__period">${escapeHtml(plan.period)}</span>` : ""
          }</p>
          <p class="pricing-card__audience">${escapeHtml(plan.audience)}</p>
          <ul class="pricing-card__list">
            ${plan.features.map((feature) => `<li>${icon("check")} <span>${escapeHtml(feature)}</span></li>`).join("\n            ")}
          </ul>
          <a class="btn ${plan.featured ? "btn--primary" : "btn--secondary"} btn--full" href="${plan.href}">${escapeHtml(plan.cta)}</a>
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
        ${sectionHeader(section, { center: true })}
        <div class="pricing stagger">${plans}
        </div>
        <p class="pricing-note reveal">${escapeHtml(section.note)}</p>${footer}
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
  const items = section.items
    .map(
      (item, index) => `
        <article class="portfolio-item reveal">
          <div class="portfolio-item__media" aria-hidden="true">
            <span class="portfolio-item__num">${String(index + 1).padStart(2, "0")}</span>
          </div>
          <div class="portfolio-item__body">
            <p class="portfolio-item__category">${escapeHtml(item.category)}</p>
            <h2 class="portfolio-item__title">${escapeHtml(item.title)}</h2>
            <p class="portfolio-item__text">${escapeHtml(item.text)}</p>
            <ul class="portfolio-item__tags">
              ${item.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("\n              ")}
            </ul>
          </div>
        </article>`
    )
    .join("");

  return `    <section class="section${alt}" id="${section.id}" aria-label="Portfolio-overzicht">
      <div class="container">
        <div class="portfolio-grid">${items}
        </div>
        <p class="section-note section-note--center reveal">${escapeHtml(section.note)}</p>
      </div>
    </section>`;
}

function renderContact(section, alt) {
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

  const projectOptions = section.projectTypes
    .map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`)
    .join("\n                  ");

  const budgetOptions = section.budgetOptions
    .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
    .join("\n                  ");

  return `    <section class="section${alt}" id="${section.id}" aria-label="Contactformulier">
      <div class="container">
        <div class="contact-layout">
          <div class="contact-side">
            <aside class="contact-info reveal" aria-label="Contactgegevens">${info}
            </aside>
            <div class="next-steps reveal">
              <p class="next-steps__title">${escapeHtml(section.steps.title)}</p>
              <ol>
              ${steps}
              </ol>
            </div>
          </div>

          <form class="contact-form reveal" id="contactForm" novalidate>
            <div class="form-row">
              <div class="field">
                <label for="name">Naam <span class="req" aria-hidden="true">*</span></label>
                <input class="field__control" type="text" id="name" name="name" autocomplete="name" required />
                <p class="field__error" id="nameError" hidden></p>
              </div>
              <div class="field">
                <label for="company">Bedrijfsnaam <span class="opt">(optioneel)</span></label>
                <input class="field__control" type="text" id="company" name="company" autocomplete="organization" />
              </div>
            </div>

            <div class="form-row">
              <div class="field">
                <label for="email">E-mailadres <span class="req" aria-hidden="true">*</span></label>
                <input class="field__control" type="email" id="email" name="email" autocomplete="email" inputmode="email" required />
                <p class="field__error" id="emailError" hidden></p>
              </div>
              <div class="field">
                <label for="phone">Telefoonnummer <span class="opt">(optioneel)</span></label>
                <input class="field__control" type="tel" id="phone" name="phone" autocomplete="tel" inputmode="tel" />
                <p class="field__error" id="phoneError" hidden></p>
              </div>
            </div>

            <div class="form-row">
              <div class="field">
                <label for="projectType">Type project <span class="req" aria-hidden="true">*</span></label>
                <select class="field__control" id="projectType" name="projectType" required>
                  <option value="">Selecteer een optie</option>
                  ${projectOptions}
                </select>
                <p class="field__error" id="projectTypeError" hidden></p>
              </div>
              <div class="field">
                <label for="budget">Indicatief budget <span class="opt">(optioneel)</span></label>
                <select class="field__control" id="budget" name="budget">
                  <option value="">Selecteer een optie</option>
                  ${budgetOptions}
                </select>
              </div>
            </div>

            <div class="field">
              <label for="message">Bericht <span class="req" aria-hidden="true">*</span></label>
              <textarea class="field__control" id="message" name="message" rows="5" placeholder="Vertel ons over jouw project, wensen of vragen..." required></textarea>
              <p class="field__error" id="messageError" hidden></p>
            </div>

            <div class="field">
              <label class="checkbox" for="privacy">
                <input type="checkbox" id="privacy" name="privacy" required />
                <span>Ik ga akkoord met de <a href="/privacy.html">privacyverklaring</a>.</span>
              </label>
              <p class="field__error" id="privacyError" hidden></p>
            </div>

            <button type="submit" class="btn btn--primary btn--full" id="submitBtn">Verstuur bericht</button>

            <p class="form-status" id="formStatus" role="status" aria-live="polite" hidden></p>
          </form>
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
            <p class="section__eyebrow">Volgende stap</p>
            <h2 id="cta-title" class="cta-banner__title">${escapeHtml(section.title)}</h2>
            <p class="cta-banner__text">${escapeHtml(section.text)}</p>
          </div>
          <a class="btn btn--primary" href="${section.button.href}">${escapeHtml(section.button.label)}</a>
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

${headerMarkup(page.navKey)}

  <main id="main">
${renderHead(page)}

${renderSections(page.sections)}
  </main>

${footerMarkup()}

  </div>
  </div>

  <script type="module" src="/js/page-main.js"></script>
</body>
</html>
`;
}

export function generatePages() {
  Object.values(pages).forEach((page) => {
    const filePath = join(root, `${page.slug}.html`);
    writeFileSync(filePath, renderPage(page), "utf8");
    console.log(`Generated ${page.slug}.html`);
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  generatePages();
}
