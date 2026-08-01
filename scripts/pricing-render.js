/**
 * Server/build-time helpers om pricing-markup te genereren uit data/pricing.js + messages.
 */

import {
  pricing,
  formatEuro,
  calcSavings,
  getWaasBranches,
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

function featureList(keys, tp, icon) {
  return keys
    .map((key) => `<li>${icon("check")} <span>${escapeHtml(tp(`features.${key}`))}</span></li>`)
    .join("\n            ");
}

function badgeMarkup(badgeKey, tp) {
  if (!badgeKey) return "";
  return `<span class="pricing-card__badge">${escapeHtml(tp(`badges.${badgeKey}`))}</span>`;
}

function savingsLabel(tp, savingsObj) {
  if (!savingsObj) return "";
  if (savingsObj.months === 12) {
    return tp("labels.saveYear", { amount: formatEuro(savingsObj.amount) });
  }
  return tp("labels.saveTerm", {
    amount: formatEuro(savingsObj.amount),
    months: String(savingsObj.months),
  });
}

function hostingSavings(baseYearly, termYearly, termId) {
  if (termId !== "24" || !baseYearly || !termYearly) return null;
  const amount = (baseYearly - termYearly) * 2;
  if (amount <= 0) return null;
  return { amount, months: 24 };
}

export function renderSegmentedControl({ name, ariaLabel, terms, defaultTerm, tp }) {
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
        <div class="pricing-choice reveal" data-pricing-choice>
          <p class="pricing-choice__prompt" id="pricing-model-prompt">${escapeHtml(tp("modelToggle.prompt"))}</p>
          <p class="pricing-choice__text">${escapeHtml(tp("modelToggle.promptText"))}</p>
          <p class="pricing-choice__hint">${escapeHtml(tp("modelToggle.hint"))}</p>
          <div
            class="pricing-choice__control"
            role="radiogroup"
            aria-labelledby="pricing-model-prompt"
            aria-label="${escapeHtml(tp("modelToggle.ariaLabel"))}"
            data-pricing-model
          >
            <button type="button" class="pricing-choice__seg" role="radio" aria-checked="false" data-model="one-time" tabindex="0">
              <span class="pricing-choice__seg-label">${escapeHtml(tp("modelToggle.oneTime"))}</span>
            </button>
            <button type="button" class="pricing-choice__seg" role="radio" aria-checked="false" data-model="waas" tabindex="0">
              <span class="pricing-choice__seg-label">${escapeHtml(tp("modelToggle.waas"))}</span>
              <span class="pricing-choice__seg-badge">${escapeHtml(recommended)}</span>
            </button>
          </div>
          <p class="pricing-choice__empty" data-pricing-empty>${escapeHtml(tp("modelToggle.empty"))}</p>
        </div>`;
}

/**
 * @param {(path: string, values?: Record<string, string>) => string} tp
 * @param {(name: string, className?: string) => string} icon
 */
export function buildPricingRenderers(tp, icon) {
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
            <p class="pricing-card__price-was"><s>${escapeHtml(formatEuro(plan.priceWas))}</s></p>
            <p class="pricing-card__price">${escapeHtml(formatEuro(plan.price))}</p>
            <p class="pricing-card__intro-label">${escapeHtml(tp("labels.introPrice"))}</p>
            <p class="pricing-card__meta">${escapeHtml(tp("labels.oneTimeInvestment"))}</p>
            <p class="pricing-card__vat">${escapeHtml(tp("labels.exclVat"))}</p>
          </div>
          <p class="pricing-card__audience">${escapeHtml(audienceOf("oneTime", plan.id))}</p>
          <ul class="pricing-card__list">
            ${featureList(plan.featureKeys, tp, icon)}
          </ul>
          <a class="btn ${plan.featured ? "btn--primary" : "btn--secondary"} btn--full" href="${plan.href}">${escapeHtml(cta)}</a>
        </article>`;
      })
      .join("");
  }

  function renderWaasCards(activeTerm = pricing.waas.defaultTerm) {
    const termMonths = pricing.waas.terms.find((t) => t.id === activeTerm)?.months || 1;

    return getWaasBranches()
      .map((branch) => {
        const pricesJson = escapeHtml(JSON.stringify(branch.prices));
        const monthly = branch.prices.monthly;
        const current = branch.prices[activeTerm] ?? monthly;
        const savings = calcSavings(monthly, current, termMonths);
        const savingsText = savingsLabel(tp, savings);

        const upcoming = branch.upcomingKey
          ? `<li class="pricing-card__upcoming"><span>${escapeHtml(tp(`upcoming.${branch.upcomingKey}`))} <em>– ${escapeHtml(tp("labels.upcoming"))}</em></span></li>`
          : "";

        return `
        <article
          class="pricing-card${branch.featured ? " pricing-card--featured" : ""} reveal"
          data-pricing-card
          data-catalog="waas"
          data-prices='${pricesJson}'
          data-monthly="${monthly}"
        >
          ${badgeMarkup(branch.badgeKey, tp)}
          <div class="pricing-card__icon" aria-hidden="true">${icon(branch.icon)}</div>
          <h3 class="pricing-card__name">${escapeHtml(nameOf("waas", branch.id))}</h3>
          <div class="pricing-card__pricing">
            <p class="pricing-card__from">${escapeHtml(tp("labels.from"))}</p>
            <p class="pricing-card__price">
              <span data-price-display>${escapeHtml(formatEuro(current))}</span>
              <span class="pricing-card__period">${escapeHtml(tp("labels.perMonth"))}</span>
            </p>
            <p class="pricing-card__savings" data-savings ${savingsText ? "" : "hidden"}>${escapeHtml(savingsText)}</p>
            <p class="pricing-card__vat">${escapeHtml(tp("labels.exclVat"))}</p>
          </div>
          <p class="pricing-card__audience">${escapeHtml(audienceOf("waas", branch.id))}</p>
          <ul class="pricing-card__list">
            ${featureList(branch.featureKeys || [], tp, icon)}
            ${upcoming}
          </ul>
          <a class="btn ${branch.featured ? "btn--primary" : "btn--secondary"} btn--full" href="${pricing.waas.href}">${escapeHtml(tp(`cta.${pricing.waas.ctaKey}`))}</a>
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
    const baseKey = isHosting ? "yearly" : "monthly";
    const terms = catalog.terms;

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
          <a class="btn ${plan.featured ? "btn--primary" : "btn--secondary"} btn--full" href="${plan.href}">${escapeHtml(tp(`cta.${plan.ctaKey}`))}</a>
        </article>`;
        }

        const pricesJson = escapeHtml(JSON.stringify(plan.prices));
        const basePrice = plan.prices[baseKey];
        const current = plan.prices[defaultTerm] ?? basePrice;
        const savingsObj = isHosting
          ? hostingSavings(basePrice, current, defaultTerm)
          : calcSavings(basePrice, current, terms.find((t) => t.id === defaultTerm)?.months || 1);
        const savingsText = savingsLabel(tp, savingsObj);

        return `
        <article
          class="pricing-card${plan.featured ? " pricing-card--featured" : ""} reveal"
          data-pricing-card
          data-catalog="${catalogKey}"
          data-prices='${pricesJson}'
          data-base-key="${baseKey}"
          data-monthly="${basePrice}"
        >
          ${badgeMarkup(plan.badgeKey, tp)}
          <h3 class="pricing-card__name">${escapeHtml(nameOf(group, plan.id))}</h3>
          <div class="pricing-card__pricing">
            <p class="pricing-card__price">
              <span data-price-display>${escapeHtml(formatEuro(current))}</span>
              <span class="pricing-card__period">${escapeHtml(periodLabel)}</span>
            </p>
            <p class="pricing-card__savings" data-savings ${savingsText ? "" : "hidden"}>${escapeHtml(savingsText)}</p>
            <p class="pricing-card__vat">${escapeHtml(tp("labels.exclVat"))}</p>
          </div>
          <p class="pricing-card__audience">${escapeHtml(audienceOf(group, plan.id))}</p>
          <ul class="pricing-card__list">
            ${featureList(plan.featureKeys, tp, icon)}
          </ul>
          <a class="btn ${plan.featured ? "btn--primary" : "btn--secondary"} btn--full" href="${plan.href}">${escapeHtml(tp(`cta.${plan.ctaKey}`))}</a>
        </article>`;
      })
      .join("");
  }

  return {
    renderOneTimeCards,
    renderWaasCards,
    renderSubscriptionCards,
  };
}

export { pricing, formatEuro, calcSavings, getWaasBranches };
