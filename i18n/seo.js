import {
  defaultLocale,
  englishLocaleLive,
  htmlLang,
  locales,
  ogLocale,
  siteUrl,
} from "./config.js";
import { localizedPath, resolveLocaleFromPath } from "./routing.js";

/**
 * Canonical URL voor een pad + locale.
 */
export function canonicalUrl(pathname = "/", locale = defaultLocale) {
  const path = localizedPath(pathname, locale);
  if (path === "/") return `${siteUrl}/`;
  return `${siteUrl}${path}`;
}

/**
 * hreflang-linktags.
 * Zolang EN niet live is: alleen nl + x-default.
 * Zodra englishLocaleLive=true: ook en naar /en/...
 */
export function hreflangLinks(pathname = "/", { includeInactive = englishLocaleLive } = {}) {
  const { pathname: clean } = resolveLocaleFromPath(pathname);
  const activeLocales = includeInactive ? locales : [defaultLocale];

  const links = activeLocales.map((locale) => ({
    hreflang: htmlLang[locale],
    href: canonicalUrl(clean, locale),
  }));

  links.push({
    hreflang: "x-default",
    href: canonicalUrl(clean, defaultLocale),
  });

  return links;
}

export function renderHreflangLinks(pathname = "/") {
  return hreflangLinks(pathname)
    .map((link) => `<link rel="alternate" hreflang="${link.hreflang}" href="${link.href}" />`)
    .join("\n  ");
}

export function localeMeta(locale = defaultLocale) {
  return {
    htmlLang: htmlLang[locale] || htmlLang[defaultLocale],
    ogLocale: ogLocale[locale] || ogLocale[defaultLocale],
    ogLocaleAlternates: englishLocaleLive
      ? locales.filter((l) => l !== locale).map((l) => ogLocale[l])
      : [],
  };
}
