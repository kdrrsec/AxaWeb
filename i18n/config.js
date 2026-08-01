/**
 * Locale-configuratie (next-intl / App Router-achtig).
 * NL is standaard zonder prefix; EN leeft onder /en met Engelse slugs.
 */

export const defaultLocale = "nl";

/** Locales die ondersteund worden */
export const locales = ["nl", "en"];

/**
 * 'as-needed': NL zonder prefix (/), EN onder /en
 * Zelfde strategie als next-intl localePrefix: 'as-needed'
 */
export const localePrefix = "as-needed";

/** Language switcher zichtbaar in header (desktop + mobiel) */
export const languageSwitcherEnabled = true;

/**
 * EN-content is live: hreflang, switcher-links en /en-routes actief.
 */
export const englishLocaleLive = true;

export const localeLabels = {
  nl: "NL",
  en: "EN",
};

export const htmlLang = {
  nl: "nl",
  en: "en",
};

/** BCP47 hreflang-codes */
export const hreflangCode = {
  nl: "nl-NL",
  en: "en",
};

export const ogLocale = {
  nl: "nl_NL",
  en: "en_US",
};

export const siteUrl = "https://axaweb.nl";
export const siteName = "AxaWeb";

/** Één professionele social preview voor alle pagina's (tenzij override) */
export const defaultOgImage = `${siteUrl}/images/background.jpg`;
export const defaultOgImageAlt = "AxaWeb: premium berglandschap als visuele identiteit";
export const defaultOgImageWidth = 1920;
export const defaultOgImageHeight = 1280;

export const organizationEmail = "info@axaweb.nl";
export const organizationTelephone = "+31629127575";

/**
 * Logische route-id → pad per locale.
 * NL behoudt bestaande slugs; EN gebruikt natuurlijke Engelse slugs.
 */
export const routePaths = {
  home: { nl: "/", en: "/" },
  diensten: { nl: "/diensten", en: "/services" },
  websites: { nl: "/websites", en: "/websites" },
  webshops: { nl: "/webshops", en: "/webshops" },
  hosting: { nl: "/hosting", en: "/hosting" },
  onderhoud: { nl: "/onderhoud", en: "/maintenance" },
  pakketten: { nl: "/pakketten", en: "/packages" },
  projecten: { nl: "/projecten", en: "/projects" },
  contact: { nl: "/contact", en: "/contact" },
  offerte: { nl: "/offerte", en: "/quote" },
  privacy: { nl: "/privacy", en: "/privacy" },
  cookies: { nl: "/cookies", en: "/cookies" },
  terms: { nl: "/algemene-voorwaarden", en: "/terms" },
  disclaimer: { nl: "/disclaimer", en: "/disclaimer" },
};

export function isLocale(value) {
  return locales.includes(value);
}
