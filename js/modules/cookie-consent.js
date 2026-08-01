/**
 * AVG cookie banner + preferences panel.
 * All visible copy from messages via i18n `cookies.*`.
 */

import { localizedPath } from "../../i18n/routing.js";
import { getLocale, t } from "./i18n.js";
import {
  acceptAllConsent,
  getConsent,
  hasStoredConsent,
  rejectAllConsent,
  saveConsent,
} from "../lib/consent-store.js";

function tx(path, fallback = "") {
  const value = t(`cookies.${path}`);
  return value === `cookies.${path}` ? fallback : value;
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

function buildBanner() {
  const root = document.createElement("div");
  root.className = "cookie-consent";
  root.hidden = true;
  root.innerHTML = `
    <div class="cookie-consent__dialog" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title" aria-describedby="cookie-consent-text">
      <div class="cookie-consent__main">
        <h2 id="cookie-consent-title" class="cookie-consent__title"></h2>
        <p id="cookie-consent-text" class="cookie-consent__text"></p>
        <p class="cookie-consent__policy">
          <a href="${localizedPath("/cookies", getLocale())}" class="cookie-consent__policy-link"></a>
        </p>
        <div class="cookie-consent__actions">
          <button type="button" class="btn btn--primary cookie-consent__btn" data-cookie-accept-all></button>
          <button type="button" class="btn btn--secondary cookie-consent__btn" data-cookie-reject-all></button>
          <button type="button" class="btn btn--ghost cookie-consent__btn" data-cookie-customize></button>
        </div>
      </div>
      <div class="cookie-consent__prefs" data-cookie-prefs hidden>
        <h3 class="cookie-consent__prefs-title" id="cookie-prefs-title"></h3>
        <p class="cookie-consent__prefs-intro"></p>
        <ul class="cookie-consent__categories">
          <li class="cookie-consent__category">
            <div class="cookie-consent__category-head">
              <span class="cookie-consent__category-title" data-cat-title="necessary"></span>
              <span class="cookie-consent__always" data-cat-always></span>
            </div>
            <p class="cookie-consent__category-text" data-cat-desc="necessary"></p>
          </li>
          <li class="cookie-consent__category">
            <label class="cookie-consent__switch">
              <input type="checkbox" name="preferences" data-cookie-cat="preferences" />
              <span data-cat-title="preferences"></span>
            </label>
            <p class="cookie-consent__category-text" data-cat-desc="preferences"></p>
          </li>
          <li class="cookie-consent__category">
            <label class="cookie-consent__switch">
              <input type="checkbox" name="statistics" data-cookie-cat="statistics" />
              <span data-cat-title="statistics"></span>
            </label>
            <p class="cookie-consent__category-text" data-cat-desc="statistics"></p>
          </li>
          <li class="cookie-consent__category">
            <label class="cookie-consent__switch">
              <input type="checkbox" name="marketing" data-cookie-cat="marketing" />
              <span data-cat-title="marketing"></span>
            </label>
            <p class="cookie-consent__category-text" data-cat-desc="marketing"></p>
          </li>
        </ul>
        <div class="cookie-consent__actions cookie-consent__actions--prefs">
          <button type="button" class="btn btn--primary cookie-consent__btn" data-cookie-save></button>
          <button type="button" class="btn btn--ghost cookie-consent__btn" data-cookie-close-prefs></button>
        </div>
      </div>
    </div>
  `;
  return root;
}

function fillCopy(root) {
  root.querySelector(".cookie-consent__title").textContent = tx("banner.title");
  root.querySelector(".cookie-consent__text").textContent = tx("banner.text");
  root.querySelector(".cookie-consent__policy-link").textContent = tx("banner.policyLink");
  root.querySelector("[data-cookie-accept-all]").textContent = tx("banner.acceptAll");
  root.querySelector("[data-cookie-reject-all]").textContent = tx("banner.rejectAll");
  root.querySelector("[data-cookie-customize]").textContent = tx("banner.customize");
  root.querySelector("[data-cookie-save]").textContent = tx("banner.save");
  root.querySelector("[data-cookie-close-prefs]").textContent = tx("banner.closePreferences");
  root.querySelector(".cookie-consent__prefs-title").textContent = tx("banner.preferencesTitle");
  root.querySelector(".cookie-consent__prefs-intro").textContent = tx("banner.preferencesIntro");
  root.querySelector("[data-cat-always]").textContent = tx(
    "categories.necessary.alwaysOn",
    "Altijd actief"
  );

  ["necessary", "preferences", "statistics", "marketing"].forEach((key) => {
    root.querySelectorAll(`[data-cat-title="${key}"]`).forEach((el) => {
      el.textContent = tx(`categories.${key}.title`);
    });
    root.querySelectorAll(`[data-cat-desc="${key}"]`).forEach((el) => {
      el.textContent = tx(`categories.${key}.description`);
    });
  });

  root.querySelector(".cookie-consent__dialog").setAttribute("aria-label", tx("banner.ariaLabel"));
}

function syncToggles(root, state) {
  root.querySelectorAll("[data-cookie-cat]").forEach((input) => {
    const key = input.getAttribute("data-cookie-cat");
    input.checked = Boolean(state[key]);
  });
}

function hideBanner(root) {
  root.hidden = true;
  root.classList.remove("is-open", "is-prefs");
  document.body.classList.remove("cookie-consent-open");
}

function showBanner(root, { preferences = false } = {}) {
  root.hidden = false;
  root.classList.add("is-open");
  root.classList.toggle("is-prefs", preferences);
  const prefs = root.querySelector("[data-cookie-prefs]");
  if (prefs) prefs.hidden = !preferences;
  document.body.classList.add("cookie-consent-open");

  if (!prefersReducedMotion()) {
    root.classList.add("is-animate");
  }

  const focusTarget = preferences
    ? root.querySelector("[data-cookie-cat='statistics']")
    : root.querySelector("[data-cookie-accept-all]");
  focusTarget?.focus();
}

export function openCookieSettings() {
  const root = document.querySelector("[data-cookie-consent]");
  if (!root) return;
  syncToggles(root, getConsent());
  showBanner(root, { preferences: true });
}

export function initCookieConsent() {
  if (document.querySelector("[data-cookie-consent]")) return;

  const root = buildBanner();
  root.setAttribute("data-cookie-consent", "");
  fillCopy(root);
  document.body.appendChild(root);

  const prefsPanel = root.querySelector("[data-cookie-prefs]");

  root.querySelector("[data-cookie-accept-all]")?.addEventListener("click", () => {
    acceptAllConsent();
    hideBanner(root);
  });

  root.querySelector("[data-cookie-reject-all]")?.addEventListener("click", () => {
    rejectAllConsent();
    hideBanner(root);
  });

  root.querySelector("[data-cookie-customize]")?.addEventListener("click", () => {
    syncToggles(root, getConsent());
    root.classList.add("is-prefs");
    if (prefsPanel) prefsPanel.hidden = false;
    root.querySelector("[data-cookie-cat='statistics']")?.focus();
  });

  root.querySelector("[data-cookie-close-prefs]")?.addEventListener("click", () => {
    if (!hasStoredConsent()) {
      root.classList.remove("is-prefs");
      if (prefsPanel) prefsPanel.hidden = true;
      root.querySelector("[data-cookie-customize]")?.focus();
      return;
    }
    hideBanner(root);
  });

  root.querySelector("[data-cookie-save]")?.addEventListener("click", () => {
    const preferences = Boolean(root.querySelector('[data-cookie-cat="preferences"]')?.checked);
    const statistics = Boolean(root.querySelector('[data-cookie-cat="statistics"]')?.checked);
    const marketing = Boolean(root.querySelector('[data-cookie-cat="marketing"]')?.checked);
    saveConsent({ preferences, statistics, marketing });
    hideBanner(root);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && root.classList.contains("is-open") && hasStoredConsent()) {
      hideBanner(root);
    }
  });

  document.querySelectorAll("[data-open-cookie-settings]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      openCookieSettings();
    });
  });

  if (!hasStoredConsent()) {
    syncToggles(root, getConsent());
    showBanner(root, { preferences: false });
  }
}
