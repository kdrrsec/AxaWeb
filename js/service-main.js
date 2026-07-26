import { initHeader } from "./modules/header.js";
import { initFaq } from "./modules/faq.js";
import { initAnimations } from "./modules/animations.js";

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
  initAnimations();
  initYear();
  initMobileLinkDelay();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
