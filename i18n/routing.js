import { defaultLocale, localePrefix, locales, isLocale } from "./config.js";

/**
 * Bouw een gelokaliseerd pad.
 * NL (default, as-needed): "/contact"
 * EN (later): "/en/contact"
 */
export function localizedPath(pathname = "/", locale = defaultLocale) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const normalized = path === "" ? "/" : path;

  if (localePrefix === "as-needed" && locale === defaultLocale) {
    return normalized;
  }

  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

/**
 * Haal locale + clean path uit een URL-pad.
 * "/en/contact" -> { locale: "en", pathname: "/contact" }
 * "/contact" -> { locale: "nl", pathname: "/contact" }
 */
export function resolveLocaleFromPath(pathname = "/") {
  const parts = pathname.split("/").filter(Boolean);
  const maybeLocale = parts[0];

  if (maybeLocale && isLocale(maybeLocale) && maybeLocale !== defaultLocale) {
    const rest = parts.slice(1).join("/");
    return {
      locale: maybeLocale,
      pathname: rest ? `/${rest}` : "/",
    };
  }

  return {
    locale: defaultLocale,
    pathname: pathname.startsWith("/") ? pathname : `/${pathname}`,
  };
}

export function alternatePathnames(pathname = "/") {
  const { pathname: clean } = resolveLocaleFromPath(pathname);
  return Object.fromEntries(locales.map((locale) => [locale, localizedPath(clean, locale)]));
}
