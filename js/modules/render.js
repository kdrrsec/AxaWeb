import { services, projects } from "../data/content.js";
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

  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = icon(el.dataset.icon);
  });

  document.querySelectorAll(".mobile-nav a").forEach((link, index) => {
    link.style.setProperty("--i", String(index));
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}
