import { defaultLocale } from "../../i18n/config.js";
import * as nl from "../../content/nl/projects.js";
import * as en from "../../content/en/projects.js";

const catalogs = { nl, en };

export function getProjects(locale = defaultLocale) {
  const catalog = catalogs[locale];
  if (catalog?.projects?.length) return catalog.projects;
  return nl.projects;
}

export function getProjectBySlug(slug, locale = defaultLocale) {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getNextProject(slug, locale = defaultLocale) {
  const list = getProjects(locale);
  const index = list.findIndex((project) => project.slug === slug);
  if (index === -1) return list[0];
  return list[(index + 1) % list.length];
}

/** Backwards-compatible NL exports */
export const projects = nl.projects;
