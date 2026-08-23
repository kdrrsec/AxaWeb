/**
 * Server/build-time helpers om pricing-markup te genereren uit data/pricing.js + messages.
 */

import {
  pricing,
  formatEuro,
  calcSavings,
  getAvailableTerms,
  getWaasPlans,
  getWaasAddons,
  getWaasIndustries,
  getOneTimePlans,
  getHostingPlans,
  getMaintenancePlans,
} from "../data/pricing.js";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function featureList(keys, tp, icon, values = {}) {
  return keys
    .map((key) => `<li>${icon("check")} <span>${escapeHtml(tp(`features.${key}`, values))}</span></li>`)
    .join("\n            ");
}

/** Prijslabel voor een add-on: eenmalig of per maand */
function addonPriceLabel(addon, tp, locale) {
  const amount = formatEuro(addon.price, locale);
  return addon.billing === "oneTime"
    ? tp("labels.addonOneTime", { amount })
    : tp("labels.addonPerMonth", { amount });
}

function addonList(planId, tp, icon, locale) {
  const addons = getWaasAddons(planId);
  if (!addons.length) return "";

  const items = addons
    .map(
      (addon) => `<li>${icon("plus")} <span>${escapeHtml(tp(`addons.${addon.id}.name`))} <em>${escapeHtml(
        addonPriceLabel(addon, tp, locale)
      )}</em></span></li>`
    )
    .join("\n              ");

  return `
          <div class="pricing-card__addons">
            <p class="pricing-card__addons-title">${escapeHtml(tp("labels.addonsTitle"))}</p>
            <ul class="pricing-card__addon-list">
              ${items}
            </ul>
          </div>`;
}

function badgeMarkup(badgeKey, tp) {
  if (!badgeKey) return "";
  return `<span class="pricing-card__badge">${escapeHtml(tp(`badges.${badgeKey}`))}</span>`;
}

function savingsLabel(tp, savingsObj, locale) {
  if (!savingsObj) return "";
  if (savingsObj.months === 12) {
    return tp("labels.saveYear", { amount: formatEuro(savingsObj.amount, locale) });
  }
  return tp("labels.saveTerm", {
    amount: formatEuro(savingsObj.amount, locale),
    months: String(savingsObj.months),
  });
}

export function renderSegmentedControl({ name, ariaLabel, terms, defaultTerm, tp }) {
  /* Eén beschikbare looptijd: geen keuze tonen in plaats van een schijnkeuze */
  if (!terms || terms.length < 2) return "";

  const options = terms
    .map((term) => {
      const selected = term.id === defaultTerm;
      const badge = term.badgeKey
        ? `<span class="segmented__badge">${escapeHtml(tp(`badges.${term.badgeKey}`))}</span>`
        : "";
      return `
          <button
            type="button"
            class="segmented__btn${selected ? " is-active" : ""}"
            role="radio"
            aria-checked="${selected ? "true" : "false"}"
            data-term="${escapeHtml(term.id)}"
            tabindex="${selected ? "0" : "-1"}"
          >
            <span class="segmented__label">${escapeHtml(tp(`terms.${term.id}`))}</span>
            ${badge}
          </button>`;
    })
    .join("");

  return `
        <div
          class="segmented"
          role="radiogroup"
          aria-label="${escapeHtml(ariaLabel)}"
          data-pricing-terms
          data-group="${escapeHtml(name)}"
          data-default-term="${escapeHtml(defaultTerm || "")}"
        >${options}
        </div>`;
}

export function renderModelToggle(tp) {
  const recommended = tp("badges.recommended");
  return `
        <div class="pricing-choice" data-pricing-choice>
          <div class="pricing-choice__intro reveal">
            <p class="pricing-choice__prompt" id="pricing-model-prompt">${escapeHtml(tp("modelToggle.prompt"))}</p>
            <p class="pricing-choice__text">${escapeHtml(tp("modelToggle.promptText"))}</p>
            <p class="pricing-choice__hint">${escapeHtml(tp("modelToggle.hint"))}</p>
          </div>
          <div
            class="pricing-choice__control segmented segmented--choice"
            role="radiogroup"
            aria-labelledby="pricing-model-prompt"
            aria-label="${escapeHtml(tp("modelToggle.ariaLabel"))}"
            data-pricing-model
          >
            <button type="button" class="segmented__btn" role="radio" aria-checked="false" data-model="one-time" tabindex="0">
              <span class="pricing-choice__radio" aria-hidden="true"></span>
              <span class="segmented__label">${escapeHtml(tp("modelToggle.oneTime"))}</span>
            </button>
            <button type="button" class="segmented__btn" role="radio" aria-checked="false" data-model="waas" tabindex="0">
              <span class="pricing-choice__radio" aria-hidden="true"></span>
              <span class="segmented__label">${escapeHtml(tp("modelToggle.waas"))}</span>
              <span class="segmented__badge">${escapeHtml(recommended)}</span>
            </button>
          </div>
          <p class="pricing-choice__empty" data-pricing-empty>${escapeHtml(tp("modelToggle.empty"))}</p>
        </div>`;
}

/**
 * @param {(path: string, values?: Record<string, string>) => string} tp
 * @param {(name: string, className?: string) => string} icon
 */
export function buildPricingRenderers(
  tp,
  icon,
  localizeHref = (href) => href,
  locale = "nl",
  pricingMessages = {}
) {
  const nameOf = (group, id) => tp(`${group}.${id}.name`);
  const audienceOf = (group, id) => tp(`${group}.${id}.audience`);

  function renderOneTimeCards() {
    return getOneTimePlans()
      .map((plan) => {
        const cta = tp(`cta.${plan.ctaKey}`);
        return `
        <article class="pricing-card${plan.featured ? " pricing-card--featured" : ""} reveal">
          ${badgeMarkup(plan.badgeKey, tp)}
          <h3 class="pricing-card__name">${escapeHtml(nameOf("oneTime", plan.id))}</h3>
          <div class="pricing-card__pricing">
            <p class="pricing-card__price">${escapeHtml(formatEuro(plan.price, locale))}</p>
            <p class="pricing-card__meta">${escapeHtml(tp("labels.oneTimeInvestment"))}</p>
            <p class="pricing-card__vat">${escapeHtml(tp("labels.exclVat"))}</p>
          </div>
          <p class="pricing-card__audience">${escapeHtml(audienceOf("oneTime", plan.id))}</p>
          <ul class="pricing-card__list">
            ${featureList(plan.featureKeys, tp, icon)}
          </ul>
          <a class="btn ${plan.featured ? "btn--primary" : "btn--secondary"} btn--full" href="${localizeHref(plan.href)}">${escapeHtml(cta)}</a>
        </article>`;
      })
      .join("");
  }

  function renderWaasCards(activeTerm = pricing.waas.defaultTerm) {
    const termMonths = pricing.waas.terms.find((t) => t.id === activeTerm)?.months || 1;

    return getWaasPlans()
      .map((plan) => {
        const pricesJson = escapeHtml(JSON.stringify(plan.prices));
        const monthly = plan.prices.monthly;
        const current = plan.prices[activeTerm] ?? monthly;
        const savings = calcSavings(monthly, current, termMonths);
        const savingsText = savingsLabel(tp, savings, locale);

        return `
        <article
          class="pricing-card${plan.featured ? " pricing-card--featured" : ""} reveal"
          data-pricing-card
          data-catalog="waas"
          data-plan="${escapeHtml(plan.id)}"
          data-prices='${pricesJson}'
          data-monthly="${monthly}"
        >
          ${badgeMarkup(plan.badgeKey, tp)}
          <div class="pricing-card__icon" aria-hidden="true">${icon(plan.icon)}</div>
          <h3 class="pricing-card__name">${escapeHtml(nameOf("waas", plan.id))}</h3>
          <div class="pricing-card__pricing">
            <p class="pricing-card__from">${escapeHtml(tp("labels.from"))}</p>
            <p class="pricing-card__price">
              <span data-price-display>${escapeHtml(formatEuro(current, locale))}</span>
              <span class="pricing-card__period">${escapeHtml(tp("labels.perMonth"))}</span>
            </p>
            <p class="pricing-card__savings" data-savings ${savingsText ? "" : "hidden"}>${escapeHtml(savingsText)}</p>
            <p class="pricing-card__vat">${escapeHtml(tp("labels.exclVat"))}</p>
          </div>
          <p class="pricing-card__audience">${escapeHtml(audienceOf("waas", plan.id))}</p>
          <ul class="pricing-card__list">
            ${featureList(plan.featureKeys || [], tp, icon, { count: String(plan.mailboxes) })}
          </ul>${addonList(plan.id, tp, icon, locale)}
          <a class="btn ${plan.featured ? "btn--primary" : "btn--secondary"} btn--full" href="${localizeHref(pricing.waas.href)}">${escapeHtml(tp(`cta.${pricing.waas.ctaKey}`))}</a>
        </article>`;
      })
      .join("");
  }

  /** Vergelijkingstabel Start | Business | Premium, gevoed vanuit de centrale data */
  function renderWaasCompareTable() {
    const plans = getWaasPlans();
    const included = tp("labels.included");
    const emailAddon = getWaasAddons("start").find((a) => a.id === "businessEmail");
    const bookingAddon = getWaasAddons("start").find((a) => a.id === "booking");

    const perMonth = (amount) => `${formatEuro(amount, locale)} ${tp("labels.perMonth")}`;
    const valueOf = (plan, key) => tp(`compare.values.${plan.id}.${key}`);

    const rows = [
      { key: "price12", values: plans.map((p) => perMonth(p.prices["12"])) },
      { key: "priceMonthly", values: plans.map((p) => perMonth(p.prices.monthly)) },
      {
        key: "pages",
        values: plans.map((p) =>
          p.pages === 1 ? tp("labels.pagesOne") : tp("labels.pagesUpTo", { count: String(p.pages) })
        ),
      },
      { key: "responsive", values: plans.map(() => included) },
      { key: "hosting", values: plans.map(() => included) },
      { key: "ssl", values: plans.map(() => included) },
      { key: "backups", values: plans.map(() => included) },
      { key: "maintenance", values: plans.map(() => included) },
      { key: "seo", values: plans.map(() => included) },
      { key: "form", values: plans.map((p) => valueOf(p, "form")) },
      {
        key: "mailboxes",
        values: plans.map((p) =>
          p.mailboxes > 0
            ? tp("labels.mailboxesIncluded", { count: String(p.mailboxes) })
            : addonPriceLabel(emailAddon, tp, locale)
        ),
      },
      {
        key: "booking",
        values: plans.map((p) =>
          p.includesBooking ? included : addonPriceLabel(bookingAddon, tp, locale)
        ),
      },
      { key: "content", values: plans.map((p) => valueOf(p, "content")) },
      { key: "integrations", values: plans.map((p) => valueOf(p, "integrations")) },
      { key: "support", values: plans.map((p) => valueOf(p, "support")) },
    ];

    const head = plans
      .map(
        (plan) =>
          `<th scope="col">${escapeHtml(nameOf("waas", plan.id))}${
            plan.featured ? ` <span class="compare-table__badge">${escapeHtml(tp(`badges.${plan.badgeKey}`))}</span>` : ""
          }</th>`
      )
      .join("");

    const body = rows
      .map(
        (row) => `
            <tr>
              <th scope="row">${escapeHtml(tp(`compare.rows.${row.key}`))}</th>
              ${row.values.map((value) => `<td>${escapeHtml(value)}</td>`).join("")}
            </tr>`
      )
      .join("");

    return `<div class="compare-wrap reveal" role="region" aria-label="${escapeHtml(
      tp("compare.ariaLabel")
    )}" tabindex="0">
          <table class="compare-table compare-table--waas">
            <thead>
              <tr>
                <td></td>
                ${head}
              </tr>
            </thead>
            <tbody>${body}
            </tbody>
          </table>
        </div>`;
  }

  /** Branchevoorbeelden; positionering zonder eigen prijzen */
  function renderIndustryCards() {
    return getWaasIndustries()
      .map((industry) => {
        const examples = pricingMessages.industries?.[industry.id]?.examples;
        const pills = Array.isArray(examples) && examples.length
          ? `
            <ul class="industry-card__examples">
              ${examples.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n              ")}
            </ul>`
          : "";

        const booking = industry.bookingKey
          ? `<p class="industry-card__booking">${icon("check")} <span>${escapeHtml(
              tp(`highlights.${industry.bookingKey}`)
            )}</span></p>`
          : "";

        return `
        <article class="industry-card reveal">
          <div class="industry-card__icon" aria-hidden="true">${icon(industry.icon)}</div>
          <h3 class="industry-card__title">${escapeHtml(tp(`industries.${industry.id}.name`))}</h3>
          <p class="industry-card__text">${escapeHtml(tp(`industries.${industry.id}.text`))}</p>
          ${booking}${pills}
        </article>`;
      })
      .join("");
  }

  function renderSubscriptionCards(catalogKey, defaultTerm) {
    const isHosting = catalogKey === "hosting";
    const catalog = isHosting ? pricing.hosting : pricing.maintenance;
    const plans = isHosting ? getHostingPlans() : getMaintenancePlans();
    const group = isHosting ? "hosting" : "maintenance";
    const periodLabel = isHosting ? tp("labels.perYear") : tp("labels.perMonth");
    const baseKey = "monthly";
    const terms = getAvailableTerms(catalog);

    return plans
      .map((plan) => {
        if (plan.onRequest) {
          return `
        <article class="pricing-card${plan.featured ? " pricing-card--featured" : ""} reveal" data-pricing-card data-catalog="${catalogKey}" data-on-request="true">
          ${badgeMarkup(plan.badgeKey, tp)}
          <h3 class="pricing-card__name">${escapeHtml(nameOf(group, plan.id))}</h3>
          <div class="pricing-card__pricing">
            <p class="pricing-card__price">${escapeHtml(tp("labels.onRequest"))}</p>
          </div>
          <p class="pricing-card__audience">${escapeHtml(audienceOf(group, plan.id))}</p>
          <ul class="pricing-card__list">
            ${featureList(plan.featureKeys, tp, icon)}
          </ul>
          <a class="btn ${plan.featured ? "btn--primary" : "btn--secondary"} btn--full" href="${localizeHref(plan.href)}">${escapeHtml(tp(`cta.${plan.ctaKey}`))}</a>
        </article>`;
        }

        const pricesJson = escapeHtml(JSON.stringify(plan.prices));
        const basePrice = plan.prices[baseKey];
        const current = plan.prices[defaultTerm] ?? basePrice;
        const savingsObj = calcSavings(
          basePrice,
          current,
          terms.find((t) => t.id === defaultTerm)?.months || 1
        );
        const savingsText = savingsLabel(tp, savingsObj, locale);

        return `
        <article
          class="pricing-card${plan.featured ? " pricing-card--featured" : ""} reveal"
          data-pricing-card
          data-catalog="${catalogKey}"
          data-prices='${pricesJson}'
          data-base-key="${baseKey}"
          data-monthly="${basePrice ?? ""}"
        >
          ${badgeMarkup(plan.badgeKey, tp)}
          <h3 class="pricing-card__name">${escapeHtml(nameOf(group, plan.id))}</h3>
          <div class="pricing-card__pricing">
            <p class="pricing-card__price">
              <span data-price-display>${escapeHtml(formatEuro(current, locale))}</span>
              <span class="pricing-card__period">${escapeHtml(periodLabel)}</span>
            </p>
            <p class="pricing-card__savings" data-savings ${savingsText ? "" : "hidden"}>${escapeHtml(savingsText)}</p>
            <p class="pricing-card__vat">${escapeHtml(tp("labels.exclVat"))}</p>
          </div>
          <p class="pricing-card__audience">${escapeHtml(audienceOf(group, plan.id))}</p>
          <ul class="pricing-card__list">
            ${featureList(plan.featureKeys, tp, icon)}
          </ul>
          <a class="btn ${plan.featured ? "btn--primary" : "btn--secondary"} btn--full" href="${localizeHref(plan.href)}">${escapeHtml(tp(`cta.${plan.ctaKey}`))}</a>
        </article>`;
      })
      .join("");
  }

  return {
    renderOneTimeCards,
    renderWaasCards,
    renderWaasCompareTable,
    renderIndustryCards,
    renderSubscriptionCards,
  };
}

export { pricing, formatEuro, calcSavings, getAvailableTerms, getWaasPlans };
