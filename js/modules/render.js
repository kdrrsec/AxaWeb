import {
  services,
  whyItems,
  processSteps,
  projects,
  packages,
  hostingFeatures,
  faqs,
  projectTypes,
  budgetOptions,
} from "../data/content.js";
import { icon } from "./icons.js";

export function renderPageContent() {
  const servicesRoot = document.querySelector("[data-services]");
  if (servicesRoot) {
    servicesRoot.innerHTML = services
      .map(
        (service) => `
        <article class="card reveal" data-spotlight>
          <div class="icon-box card__icon">${icon(service.icon)}</div>
          <h3 class="card__title">${service.title}</h3>
          <p class="card__text">${service.text}</p>
          <ul class="card__list">
            ${service.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
          </ul>
          <a class="card__link" href="${service.href}">
            ${service.cta}
            ${icon("arrow", "icon")}
          </a>
        </article>`
      )
      .join("");
  }

  const whyRoot = document.querySelector("[data-why]");
  if (whyRoot) {
    whyRoot.innerHTML = whyItems
      .map(
        (item, index) => `
        <article class="why-item reveal">
          <span class="why-item__num" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 class="why-item__title">${item.title}</h3>
            <p class="why-item__text">${item.text}</p>
          </div>
        </article>`
      )
      .join("");
  }

  const processRoot = document.querySelector("[data-process]");
  if (processRoot) {
    processRoot.innerHTML = processSteps
      .map(
        (step) => `
        <article class="process__step reveal">
          <div class="process__number">${step.number}</div>
          <h3 class="process__title">${step.title}</h3>
          <p class="process__text">${step.text}</p>
        </article>`
      )
      .join("");
  }

  const projectsRoot = document.querySelector("[data-projects]");
  if (projectsRoot) {
    projectsRoot.innerHTML = projects
      .map(
        (project) => `
        <article class="project-card reveal">
          <div class="project-card__media" aria-hidden="true"><span>Projectpreview</span></div>
          <div class="project-card__body">
            <p class="project-card__category">${project.category}</p>
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__text">${project.text}</p>
            <a class="btn btn--ghost" href="${project.href}">Bekijk project</a>
          </div>
        </article>`
      )
      .join("");
  }

  const packagesRoot = document.querySelector("[data-packages]");
  if (packagesRoot) {
    packagesRoot.innerHTML = packages
      .map(
        (pkg) => `
        <article class="pricing-card${pkg.featured ? " pricing-card--featured" : ""} reveal">
          ${pkg.badge ? `<span class="pricing-card__badge">${pkg.badge}</span>` : ""}
          <h3 class="pricing-card__name">${pkg.name}</h3>
          <p class="pricing-card__price">${pkg.price}</p>
          <p class="pricing-card__audience">${pkg.audience}</p>
          <ul class="pricing-card__list">
            ${pkg.features.map((feature) => `<li>${icon("check")} <span>${feature}</span></li>`).join("")}
          </ul>
          <a class="btn ${pkg.featured ? "btn--primary" : "btn--secondary"} btn--full" href="${pkg.href}">
            ${pkg.cta}
          </a>
        </article>`
      )
      .join("");
  }

  const hostingRoot = document.querySelector("[data-hosting-features]");
  if (hostingRoot) {
    hostingRoot.innerHTML = hostingFeatures
      .map((feature) => `<li>${icon("check")} <span>${feature}</span></li>`)
      .join("");
  }

  const faqRoot = document.querySelector("[data-faq]");
  if (faqRoot) {
    faqRoot.innerHTML = faqs
      .map((faq, index) => {
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return `
          <div class="faq-item" data-faq-item>
            <h3>
              <button
                class="faq-item__button"
                type="button"
                id="${buttonId}"
                data-faq-button
                aria-expanded="false"
                aria-controls="${panelId}"
              >
                <span>${faq.question}</span>
                ${icon("plus", "faq-item__icon")}
              </button>
            </h3>
            <div class="faq-item__panel" id="${panelId}" role="region" aria-labelledby="${buttonId}" data-faq-panel hidden>
              <div class="faq-item__content">
                <p>${faq.answer}</p>
              </div>
            </div>
          </div>`;
      })
      .join("");
  }

  const projectTypeSelect = document.querySelector("#projectType");
  if (projectTypeSelect && projectTypeSelect.options.length <= 1) {
    projectTypes.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      projectTypeSelect.appendChild(option);
    });
  }

  const budgetSelect = document.querySelector("#budget");
  if (budgetSelect && budgetSelect.options.length <= 1) {
    budgetOptions.forEach((optionLabel) => {
      const option = document.createElement("option");
      option.value = optionLabel;
      option.textContent = optionLabel;
      budgetSelect.appendChild(option);
    });
  }

  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = icon(el.dataset.icon);
  });

  document.querySelectorAll(".mobile-nav a").forEach((link, index) => {
    link.style.setProperty("--i", String(index));
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}
