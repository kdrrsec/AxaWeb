/**
 * Locale-aware homepage preview-data (browser-safe: geen Node/fs).
 * Gestructureerde content leeft in content/{locale}/home.js.
 */
import { defaultLocale } from "../../i18n/config.js";
import * as nlHome from "../../content/nl/home.js";
import * as enHome from "../../content/en/home.js";
import { getProjects } from "./projects.js";

const catalogs = { nl: nlHome, en: enHome };

export function getHomeContent(locale = defaultLocale) {
  const catalog = catalogs[locale];
  const fallback = nlHome;

  return {
    services: catalog?.services?.length ? catalog.services : fallback.services,
    packagesPreview: catalog?.packagesPreview?.length
      ? catalog.packagesPreview
      : fallback.packagesPreview,
    projects: getProjects(locale),
  };
}

const defaults = getHomeContent(defaultLocale);

export const services = defaults.services;
export const packagesPreview = defaults.packagesPreview;
export { projects } from "./projects.js";
