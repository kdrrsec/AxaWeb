import { defaultLocale, localePrefix, locales, isLocale, routePaths } from "./config.js";

function normalizePath(pathname = "/") {
  if (!pathname) return "/";
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

/**
 * Strip locale prefix: "/en/services" -> "/services"
 */
export function stripLocalePrefix(pathname = "/") {
  const path = normalizePath(pathname);
  const parts = path.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0]) && parts[0] !== defaultLocale) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return path;
}

/**
 * Resolve logical route id or project slug from a clean pathname.
 */
export function resolveRoute(pathname = "/") {
  const clean = stripLocalePrefix(pathname);

  for (const [id, paths] of Object.entries(routePaths)) {
    if (paths.nl === clean || paths.en === clean) {
      return { type: "page", id, pathname: clean };
    }
  }

  const nlProject = clean.match(/^\/projecten\/([^/]+)$/);
  if (nlProject) {
    return { type: "project", slug: nlProject[1], pathname: clean };
  }

  const enProject = clean.match(/^\/projects\/([^/]+)$/);
  if (enProject) {
    return { type: "project", slug: enProject[1], pathname: clean };
  }

  return { type: "unknown", pathname: clean };
}

/**
 * Locale-specific pathname for a logical route id (without /en prefix).
 */
export function pathForRoute(routeId, locale = defaultLocale) {
  const paths = routePaths[routeId];
  if (!paths) return "/";
  return paths[locale] || paths[defaultLocale] || "/";
}

/**
 * Project detail path for a locale (without /en prefix).
 */
export function pathForProject(slug, locale = defaultLocale) {
  return locale === "en" ? `/projects/${slug}` : `/projecten/${slug}`;
}

/**
 * Bouw een gelokaliseerd pad inclusief prefix.
 * NL: "/diensten" | EN: "/en/services"
 * Accepteert NL- of EN-slugs en zet om naar de gevraagde locale.
 */
export function localizedPath(pathname = "/", locale = defaultLocale) {
  const clean = stripLocalePrefix(pathname);
  const route = resolveRoute(clean);

  let target = clean;
  if (route.type === "page" && route.id) {
    target = pathForRoute(route.id, locale);
  } else if (route.type === "project") {
    target = pathForProject(route.slug, locale);
  }

  if (localePrefix === "as-needed" && locale === defaultLocale) {
    return target;
  }

  if (target === "/") return `/${locale}`;
  return `/${locale}${target}`;
}

/**
 * Haal locale + clean path uit een URL-pad.
 * "/en/services" -> { locale: "en", pathname: "/services" }
 * "/contact" -> { locale: "nl", pathname: "/contact" }
 */
export function resolveLocaleFromPath(pathname = "/") {
  const path = normalizePath(pathname);
  const parts = path.split("/").filter(Boolean);
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
    pathname: path,
  };
}

export function alternatePathnames(pathname = "/") {
  const { pathname: clean } = resolveLocaleFromPath(pathname);
  return Object.fromEntries(locales.map((locale) => [locale, localizedPath(clean, locale)]));
}

export { locales };
