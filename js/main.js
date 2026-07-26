import { renderPageContent } from "./modules/render.js";
import { initHeader } from "./modules/header.js";
import { initAnimations } from "./modules/animations.js";

function init() {
  renderPageContent();
  initHeader();
  initAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
