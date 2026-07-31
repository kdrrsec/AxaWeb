/**
 * Locale-configuratie (next-intl / App Router-achtig).
 * NL is standaard; EN is voorbereid maar nog niet actief in routing/UI.
 */

export const defaultLocale = "nl";

/** Locales die in de toekomst ondersteund worden */
export const locales = ["nl", "en"];

/**
 * 'as-needed': NL zonder prefix (/), EN later onder /en
 * Zelfde strategie als next-intl localePrefix: 'as-needed'
 */
export const localePrefix = "as-needed";

/** Of de language switcher zichtbaar is (nu uit) */
export const languageSwitcherEnabled = false;

/**
 * Zet op true zodra /en live content heeft.
 * Beheert o.a. hreflang voor EN en switcher-links.
 */
export const englishLocaleLive = false;

export const localeLabels = {
  nl: "Nederlands",
  en: "English",
};

export const htmlLang = {
  nl: "nl",
  en: "en",
};

export const ogLocale = {
  nl: "nl_NL",
  en: "en_US",
};

export const siteUrl = "https://axaweb.nl";

export function isLocale(value) {
  return locales.includes(value);
}
