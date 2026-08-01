import { initHeader } from "./modules/header.js";
import { initFaq } from "./modules/faq.js";
import { initContactForm } from "./modules/form.js";
import { initAnimations } from "./modules/animations.js";
<<<<<<< HEAD
=======
import { initLanguageSwitcher } from "./modules/language-switcher.js";
import { initPricingUI } from "./modules/pricing-ui.js";
import { initCookieConsent } from "./modules/cookie-consent.js";
import { initAnalytics } from "./modules/analytics.js";
import { initTracking } from "./modules/tracking.js";
import { initCursor } from "./modules/cursor.js";
>>>>>>> 93c4276 (Add subtle custom cursor for desktop browsing)

function initYear() {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

function initMobileLinkDelay() {
  document.querySelectorAll(".mobile-nav a").forEach((link, index) => {
    link.style.setProperty("--i", String(index));
  });
}

function init() {
  initHeader();
  initFaq();
  initContactForm();
  initAnimations();
  initYear();
  initMobileLinkDelay();
<<<<<<< HEAD
=======
  initCookieConsent();
  initAnalytics();
  initTracking();
  initCursor();
>>>>>>> 93c4276 (Add subtle custom cursor for desktop browsing)
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
