/**
 * Centrale analytics helper: Consent Mode updates, GA4, Clarity, events.
 * Laadt scripts alleen na statistiektoestemming en alleen wanneer IDs gezet zijn.
 */

import { publicEnv } from "../config/public-env.js";
import {
  CONSENT_CHANGED_EVENT,
  allowsMarketing,
  allowsStatistics,
  getConsent,
} from "../lib/consent-store.js";

let gaLoaded = false;
let clarityLoaded = false;
let pageViewBound = false;
let listenersBound = false;

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
  return window.gtag;
}

export function applyConsentToGoogle(state = getConsent()) {
  const gtag = ensureGtag();
  gtag("consent", "update", {
    analytics_storage: allowsStatistics(state) ? "granted" : "denied",
    ad_storage: allowsMarketing(state) ? "granted" : "denied",
    ad_user_data: allowsMarketing(state) ? "granted" : "denied",
    ad_personalization: allowsMarketing(state) ? "granted" : "denied",
  });
}

function loadGa4() {
  const id = publicEnv.GA_MEASUREMENT_ID;
  if (!id || gaLoaded || !allowsStatistics()) return;

  const gtag = ensureGtag();
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.dataset.axaAnalytics = "ga4";
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", id, {
    anonymize_ip: true,
    send_page_view: true,
  });
  gaLoaded = true;
}

function loadClarity() {
  const id = publicEnv.CLARITY_PROJECT_ID;
  if (!id || clarityLoaded || !allowsStatistics()) return;

  /* Official Clarity bootstrap; project id from env only */
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    t.dataset.axaAnalytics = "clarity";
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", id);

  if (typeof window.clarity === "function") {
    window.clarity("set", "mask_all_text", false);
    window.clarity("consent");
  }

  clarityLoaded = true;
}

function unloadStatisticsSideEffects() {
  /* Scripts blijven in DOM na revoke (browserbeperking); consent denied stopt GA storage.
     Clarity stopt nieuwe opnames via ontbrekende her-init + consent denied waar mogelijk. */
  if (typeof window.clarity === "function" && !allowsStatistics()) {
    try {
      window.clarity("consent", false);
    } catch {
      /* ignore */
    }
  }
}

export function syncAnalyticsForConsent(state = getConsent()) {
  applyConsentToGoogle(state);

  if (allowsStatistics(state)) {
    loadGa4();
    loadClarity();
  } else {
    unloadStatisticsSideEffects();
  }
}

/**
 * Stuur een event naar GA4 wanneer statistieken zijn toegestaan.
 * Geen PII in params.
 * @param {string} name snake_case event name
 * @param {Record<string, string|number|boolean|undefined>} [params]
 */
export function trackEvent(name, params = {}) {
  if (!allowsStatistics()) return;
  if (!publicEnv.GA_MEASUREMENT_ID) return;
  if (!name || typeof name !== "string") return;

  const safe = {};
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      safe[key] = value;
    }
  });

  ensureGtag()("event", name, safe);
}

export function trackPageView(path = window.location.pathname) {
  if (!allowsStatistics() || !publicEnv.GA_MEASUREMENT_ID) return;
  ensureGtag()("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function initAnalytics() {
  syncAnalyticsForConsent(getConsent());

  if (!listenersBound) {
    window.addEventListener(CONSENT_CHANGED_EVENT, (event) => {
      syncAnalyticsForConsent(event.detail || getConsent());
    });
    listenersBound = true;
  }

  if (!pageViewBound) {
    /* SPA-achtige navigatie is beperkt; popstate dekt history.back */
    window.addEventListener("popstate", () => {
      trackPageView();
    });
    pageViewBound = true;
  }
}
