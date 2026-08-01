/**
 * Declared event wiring (no PII). Uses central trackEvent helper.
 */

import { trackEvent } from "./analytics.js";

function pageKind() {
  const bodyPage = document.body?.dataset?.page || "";
  if (bodyPage.startsWith("projecten-")) return "project";
  if (bodyPage === "offerte" || window.location.pathname.includes("/offerte")) return "offerte";
  if (bodyPage === "contact" || window.location.pathname.includes("/contact")) return "contact";
  if (bodyPage === "pakketten" || window.location.pathname.includes("/pakketten")) return "pakketten";
  return bodyPage || "site";
}

function closestTrack(el, selector) {
  return el?.closest?.(selector) || null;
}

export function trackFormSuccess(form) {
  const source =
    form?.querySelector?.("#sourcePage")?.value || window.location.pathname || "";
  const isQuote = source.includes("offerte") || pageKind() === "offerte";
  trackEvent(isQuote ? "quote_form_submit" : "contact_form_submit", {
    form_location: isQuote ? "offerte" : "contact",
  });
}

function bindClickTracking() {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const phone = closestTrack(target, 'a[href^="tel:"], .direct-contact__phone');
      if (phone) {
        trackEvent("phone_click", { link_location: pageKind() });
        return;
      }

      const whatsapp = closestTrack(
        target,
        'a[href*="wa.me"], a[href*="whatsapp.com"], a[href*="api.whatsapp.com"]'
      );
      if (whatsapp) {
        trackEvent("whatsapp_click", { link_location: pageKind() });
        return;
      }

      const primaryCta = closestTrack(
        target,
        '[data-track="primary_cta"], .site-header__cta, .cta-banner .btn--primary, .hero__actions .btn--primary'
      );
      if (primaryCta) {
        trackEvent("primary_cta_click", {
          cta_location: pageKind(),
          cta_href: primaryCta.getAttribute("href") || "",
        });
        return;
      }

      const packageCta = closestTrack(target, "[data-pricing-card] .btn");
      if (packageCta) {
        const card = packageCta.closest("[data-pricing-card]");
        trackEvent("package_cta_click", {
          catalog: card?.getAttribute("data-catalog") || "",
          package_name:
            card?.querySelector(".pricing-card__name")?.textContent?.trim()?.slice(0, 80) || "",
        });
        return;
      }

      const outbound = closestTrack(target, 'a[data-track="outbound_project"], a.case-hero__live');
      if (outbound) {
        trackEvent("outbound_project_click", {
          project: document.body?.dataset?.page || "",
        });
      }
    },
    true
  );
}

function observeWaasPackages() {
  const cards = document.querySelectorAll('[data-catalog="waas"][data-pricing-card]');
  if (!cards.length || typeof IntersectionObserver !== "function") return;

  const seen = new WeakSet();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        const name =
          entry.target.querySelector(".pricing-card__name")?.textContent?.trim()?.slice(0, 80) ||
          "";
        trackEvent("waas_package_view", { package_name: name });
      });
    },
    { threshold: 0.45 }
  );

  cards.forEach((card) => observer.observe(card));
}

export function initTracking() {
  bindClickTracking();

  if (pageKind() === "project") {
    trackEvent("project_view", {
      project: document.body?.dataset?.page?.replace(/^projecten-/, "") || "",
    });
  }

  /* WaaS cards may be in a hidden panel - observe anyway; fires when visible */
  observeWaasPackages();
}

export function trackPricingModelSelect(model) {
  trackEvent("pricing_model_select", { model: String(model || "") });
}

export function trackPricingDurationSelect(term, group) {
  trackEvent("pricing_duration_select", {
    term: String(term || ""),
    group: String(group || ""),
  });
}
