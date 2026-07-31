/**
 * Locale-aware page loader.
 * NL is volledig; EN valt terug op NL tot content/en is gevuld.
 */
import { defaultLocale } from "../../i18n/config.js";
import * as nl from "../../content/nl/pages.js";
import * as en from "../../content/en/pages.js";

const catalogs = { nl, en };

export function getPages(locale = defaultLocale) {
  const catalog = catalogs[locale];
  if (catalog?.pages) return catalog.pages;
  return nl.pages;
}

export function getSiteNav(locale = defaultLocale) {
  const catalog = catalogs[locale];
  if (catalog?.siteNav) return catalog.siteNav;
  return nl.siteNav;
}

/** Backwards-compatible defaults (NL) voor bestaande imports */
export const pages = nl.pages;
export const siteNav = nl.siteNav;
