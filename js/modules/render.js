import { services, packagesPreview, projects } from "../data/content.js";
import { escapeHtml, safeUrl } from "../lib/escape.js";
import { icon } from "./icons.js";
import { t } from "./i18n.js";

export function renderPageContent() {
  const moreInfo =
    t("common.cta.moreInfo") === "common.cta.moreInfo" ? "Meer informatie" : t("common.cta.moreInfo");
  const viewProject =
    t("common.cta.viewProject") === "common.cta.viewProject"
      ? "Bekijk project"
      : t("common.cta.viewProject");

  const servicesRoot = document.querySelector("[data-services]");
  if (servicesRoot) {
    servicesRoot.innerHTML = services
      .map(
        (service) => `
        <article class="card reveal" data-spotlight>
          <div class="icon-box card__icon">${icon(service.icon)}</div>
          <h3 class="card__title">${escapeHtml(service.title)}</h3>
          <p class="card__text">${escapeHtml(service.text)}</p>
          <ul class="card__list">
            ${service.benefits.map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join("")}
          </ul>
          <a class="card__link" href="${safeUrl(service.href, "/diensten")}">
            ${escapeHtml(service.cta)}
            ${icon("arrow", "icon")}
          </a>
        </article>`
      )
      .join("");
  }

  const packagesRoot = document.querySelector("[data-packages-preview]");
  if (packagesRoot) {
    packagesRoot.innerHTML = packagesPreview
      .map(
        (pkg) => `
        <article class="package-teaser${pkg.featured ? " package-teaser--featured" : ""} reveal">
          ${pkg.badge ? `<span class="package-teaser__badge">${escapeHtml(pkg.badge)}</span>` : ""}
          <h3 class="package-teaser__name">${escapeHtml(pkg.name)}</h3>
          <p class="package-teaser__price">${escapeHtml(pkg.price)}</p>
          <p class="package-teaser__text">${escapeHtml(pkg.text)}</p>
          <a class="card__link" href="/pakketten">
            ${escapeHtml(moreInfo)}
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
          <div class="project-card__media">
            <picture>
              <source srcset="${safeUrl(project.images.desktop, "")}" type="image/webp" />
              <img
                src="${safeUrl(project.images.desktopJpg, "")}"
                alt="${escapeHtml(project.images.altDesktop)}"
                width="800"
                height="500"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <div class="project-card__body">
            <p class="project-card__category">${escapeHtml(project.category)}</p>
            <h3 class="project-card__title">${escapeHtml(project.name)}</h3>
            <p class="project-card__text">${escapeHtml(project.summary)}</p>
            <a class="btn btn--ghost" href="${safeUrl(`/projecten/${project.slug}`, "/projecten")}">${escapeHtml(viewProject)}</a>
          </div>
        </article>`
      )
      .join("");
  }

  document.querySelectorAll(".mobile-nav a").forEach((link, index) => {
    link.style.setProperty("--i", String(index));
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}
