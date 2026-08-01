/**
 * Client-side pricing interactions: model toggle + contractduur selectors.
 */
import { t } from "./i18n.js";
import { trackPricingDurationSelect, trackPricingModelSelect } from "./tracking.js";

function formatEuro(amount) {
  const formatted = Number(amount).toLocaleString("nl-NL", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  return `€${formatted}`;
}

function pricingMessage(path, values = {}) {
  const value = t(`pricing.${path}`, values);
  return value === `pricing.${path}` ? "" : value;
}

function termMonths(termId) {
  if (termId === "monthly") return 1;
  if (termId === "yearly") return 12;
  const n = Number(termId);
  return Number.isFinite(n) ? n : 1;
}

function updateCards(scope, termId) {
  scope.querySelectorAll("[data-pricing-card]").forEach((card) => {
    if (card.getAttribute("data-on-request") === "true") return;

    let prices = {};
    try {
      prices = JSON.parse(card.getAttribute("data-prices") || "{}");
    } catch {
      return;
    }

    const baseKey = card.getAttribute("data-base-key") || "monthly";
    const basePrice = Number(card.getAttribute("data-monthly") || prices[baseKey] || 0);
    const nextPrice = prices[termId] ?? prices[baseKey];
    if (nextPrice === undefined || nextPrice === null) return;

    const display = card.querySelector("[data-price-display]");
    const savingsEl = card.querySelector("[data-savings]");

    if (display) {
      display.classList.add("is-updating");
      display.textContent = formatEuro(nextPrice);
      window.requestAnimationFrame(() => display.classList.remove("is-updating"));
    }

    if (!savingsEl) return;

    let text = "";
    if (baseKey === "yearly") {
      if (termId === "24") {
        const amount = (basePrice - nextPrice) * 2;
        if (amount > 0) {
          text = pricingMessage("labels.saveTerm", {
            amount: formatEuro(amount),
            months: "24",
          });
        }
      }
    } else {
      const months = termMonths(termId);
      if (months > 1) {
        const amount = (basePrice - nextPrice) * months;
        if (amount > 0) {
          text =
            months === 12
              ? pricingMessage("labels.saveYear", { amount: formatEuro(amount) })
              : pricingMessage("labels.saveTerm", {
                  amount: formatEuro(amount),
                  months: String(months),
                });
        }
      }
    }

    if (text) {
      savingsEl.textContent = text;
      savingsEl.hidden = false;
    } else {
      savingsEl.textContent = "";
      savingsEl.hidden = true;
    }
  });
}

function initTermGroup(group) {
  const buttons = [...group.querySelectorAll("[data-term]")];
  if (!buttons.length) return;

  const resolveScope = () => {
    const panel = group.closest(".pricing-panel");
    if (panel) return panel;
    const section = group.closest("[data-pricing-section]");
    if (section) return section;
    return group.parentElement || document;
  };

  const setTerm = (termId) => {
    trackPricingDurationSelect(termId, group.getAttribute("data-group") || "");
    buttons.forEach((btn) => {
      const active = btn.getAttribute("data-term") === termId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-checked", String(active));
      btn.tabIndex = active ? 0 : -1;
    });
    updateCards(resolveScope(), termId);
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => setTerm(btn.getAttribute("data-term")));
  });

  group.addEventListener("keydown", (event) => {
    const current = buttons.indexOf(document.activeElement);
    if (current < 0) return;
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % buttons.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (current - 1 + buttons.length) % buttons.length;
    } else return;
    event.preventDefault();
    buttons[next].focus();
    setTerm(buttons[next].getAttribute("data-term"));
  });
}

function initModelToggle(root) {
  const modelGroup = root.querySelector("[data-pricing-model]");
  if (!modelGroup) return;

  const choice = root.querySelector("[data-pricing-choice]");
  const empty = root.querySelector("[data-pricing-empty]");
  const buttons = [...modelGroup.querySelectorAll("[data-model]")];
  const panels = {
    "one-time": root.querySelector('[data-pricing-panel="one-time"]'),
    waas: root.querySelector('[data-pricing-panel="waas"]'),
  };

  const select = (model) => {
    trackPricingModelSelect(model);
    choice?.classList.add("has-selection");
    if (empty) empty.hidden = true;

    buttons.forEach((btn) => {
      const active = btn.getAttribute("data-model") === model;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-checked", String(active));
      btn.tabIndex = active ? 0 : -1;
    });

    Object.entries(panels).forEach(([key, panel]) => {
      if (!panel) return;
      const show = key === model;
      panel.hidden = !show;
      panel.classList.toggle("is-visible", show);
      if (show) {
        panel.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      }
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => select(btn.getAttribute("data-model")));
  });

  modelGroup.addEventListener("keydown", (event) => {
    const current = buttons.indexOf(document.activeElement);
    if (current < 0) return;
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % buttons.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (current - 1 + buttons.length) % buttons.length;
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      select(buttons[current].getAttribute("data-model"));
      return;
    } else return;
    event.preventDefault();
    buttons[next].focus();
    select(buttons[next].getAttribute("data-model"));
  });
}

export function initPricingUI() {
  document.querySelectorAll("[data-pricing-hub]").forEach((hub) => initModelToggle(hub));
  document.querySelectorAll("[data-pricing-terms]").forEach((group) => initTermGroup(group));
}
