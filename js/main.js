import { renderPageContent } from "./modules/render.js";
import { initHeader } from "./modules/header.js";
import { initFaq } from "./modules/faq.js";
import { initContactForm } from "./modules/form.js";
import { initAnimations } from "./modules/animations.js";

function init() {
  renderPageContent();
  initHeader();
  initFaq();
  initContactForm();
  initAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
