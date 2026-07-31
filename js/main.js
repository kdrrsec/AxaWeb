import { renderPageContent } from "./modules/render.js";
import { initHeader } from "./modules/header.js";
import { initAnimations } from "./modules/animations.js";
import { initLanguageSwitcher } from "./modules/language-switcher.js";
import { initCookieConsent } from "./modules/cookie-consent.js";
import { initAnalytics } from "./modules/analytics.js";
import { initTracking } from "./modules/tracking.js";

function init() {
  renderPageContent();
  initHeader();
  initLanguageSwitcher();
  initAnimations();
  initCookieConsent();
  initAnalytics();
  initTracking();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
