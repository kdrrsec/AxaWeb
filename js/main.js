import { renderPageContent } from "./modules/render.js";
import { initHeader } from "./modules/header.js";
import { initAnimations } from "./modules/animations.js";
<<<<<<< HEAD
=======
import { initLanguageSwitcher } from "./modules/language-switcher.js";
import { initCookieConsent } from "./modules/cookie-consent.js";
import { initAnalytics } from "./modules/analytics.js";
import { initTracking } from "./modules/tracking.js";
import { initCursor } from "./modules/cursor.js";
>>>>>>> 93c4276 (Add subtle custom cursor for desktop browsing)

function init() {
  renderPageContent();
  initHeader();
  initAnimations();
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
