import { renderPageContent } from "./modules/render.js";
import { initHeader } from "./modules/header.js";
import { initAnimations } from "./modules/animations.js";
import { initLanguageSwitcher } from "./modules/language-switcher.js";

function init() {
  renderPageContent();
  initHeader();
  initLanguageSwitcher();
  initAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
