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

/** BCP47 hreflang-codes (nl-NL nu; en later eenvoudig toevoegen) */
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
export const defaultOgImageAlt = "AxaWeb — premium berglandschap als visuele identiteit";
export const defaultOgImageWidth = 1920;
export const defaultOgImageHeight = 1280;

export const organizationEmail = "info@axaweb.nl";
export const organizationTelephone = "+31629127575";

export function isLocale(value) {
  return locales.includes(value);
}
