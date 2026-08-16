/**
 * Centrale pricing-configuratie voor AxaWeb.
 * Alle bedragen zijn exclusief 21% btw.
 *
 * Terugkerende diensten kennen uitsluitend twee looptijden: `monthly` en `12`.
 * Waar een looptijd nog geen vastgestelde prijs heeft, staat die looptijd in
 * `pendingTerms` en wordt hij niet in de UI aangeboden.
 */

export const pricing = {
  currency: "EUR",
  locale: "nl-NL",

  /** Eenmalige websiteontwikkeling */
  oneTime: {
    id: "one-time",
    plans: [
      {
        id: "start",
        price: 495,
        featured: false,
        featureKeys: ["onepage", "responsive", "contactForm", "basicSeo", "ssl", "delivery"],
        ctaKey: "requestQuote",
        href: "/offerte",
      },
      {
        id: "business",
        price: 795,
        featured: true,
        badgeKey: "mostChosen",
        featureKeys: ["upToFivePages", "customDesign", "portfolio", "maps", "basicSeo", "performance"],
        ctaKey: "discussWebsite",
        href: "/offerte",
      },
      {
        id: "premium",
        price: 1595,
        featured: false,
        featureKeys: ["allBusiness", "morePages", "customFeatures", "api", "animations", "priority"],
        ctaKey: "requestCustom",
        href: "/offerte",
      },
    ],
  },

  /** Website as a Service - branchepakketten (maandbedragen) */
  waas: {
    id: "waas",
    defaultTerm: "12",
    terms: [
      { id: "monthly", months: 1 },
      { id: "12", months: 12, badgeKey: "bestPrice" },
    ],
    /** Maandelijks flexibel is altijd dit bedrag duurder dan het 12-maandentarief */
    monthlySurcharge: 15,
    ctaKey: "planIntro",
    href: "/contact",
    /**
     * Branchepakketten. Prijzen per contracttermijn (per maand, excl. btw).
     * featureKeys = daadwerkelijk inbegrepen functionaliteit.
     * Nieuwe branche: object toevoegen - UI volgt automatisch.
     */
    branches: [
      {
        id: "one-page",
        icon: "layout",
        featured: false,
        prices: { monthly: 54.5, "12": 39.5 },
        featureKeys: [
          "waasOnePageSite",
          "waasOnePageSections",
          "waasContactForm",
          "waasBasicSeo",
          "waasHostingMaintenance",
          "waasSslBackups",
        ],
      },
      {
        id: "business-site",
        icon: "building2",
        featured: false,
        prices: { monthly: 74, "12": 59 },
        featureKeys: [
          "waasCustomSite",
          "waasServicesPages",
          "waasContactQuoteForm",
          "waasBasicSeo",
          "waasHostingMaintenance",
          "waasSslBackups",
          "waasSmallMonthlyEdits",
        ],
      },
      {
        id: "beauty-barber",
        icon: "scissors",
        featured: true,
        badgeKey: "popular",
        prices: { monthly: 94, "12": 79 },
        /** Online afsprakensysteem is inbegrepen in dit pakket */
        includesBooking: "appointments",
        featureKeys: [
          "waasCustomSite",
          "waasOnlineAppointments",
          "waasTreatmentsPrices",
          "waasTeamOverview",
          "waasPhotoGallery",
          "waasHostingMaintenance",
          "waasSslBackups",
        ],
      },
      {
        id: "restaurant",
        icon: "utensils",
        featured: false,
        prices: { monthly: 104, "12": 89 },
        /** Online reserveringssysteem is inbegrepen in dit pakket */
        includesBooking: "reservations",
        featureKeys: [
          "waasCustomSite",
          "waasOnlineReservations",
          "waasDigitalMenu",
          "waasOpeningHours",
          "waasAtmospherePhotos",
          "waasHostingMaintenance",
          "waasSslBackups",
        ],
      },
      {
        id: "gym",
        icon: "dumbbell",
        featured: false,
        prices: { monthly: 104, "12": 89 },
        featureKeys: [
          "waasCustomSite",
          "waasClassSchedule",
          "waasMemberships",
          "waasTrainerOverview",
          "waasTrialForm",
          "waasHostingMaintenance",
          "waasSslBackups",
        ],
      },
      {
        id: "webshop",
        icon: "shoppingBag",
        featured: false,
        prices: { monthly: 144, "12": 129 },
        featureKeys: [
          "waasCustomShop",
          "waasProductCategories",
          "waasOnlinePayments",
          "waasCartCheckout",
          "waasStockOrders",
          "waasHostingMaintenance",
          "waasSslBackups",
          "waasIntegrationsOnRequest",
        ],
      },
    ],
  },

  hosting: {
    id: "hosting",
    defaultTerm: "12",
    terms: [{ id: "12", months: 12, badgeKey: "bestPrice" }],
    /** Maandelijkse hostingtarieven zijn commercieel nog niet vastgesteld. */
    pendingTerms: ["monthly"],
    plans: [
      {
        id: "essential",
        featured: false,
        /** Jaarbedrag bij een looptijd van 12 maanden */
        prices: { "12": 89 },
        featureKeys: ["ssl", "automaticBackups", "businessEmail", "ssd", "emailSupport"],
        ctaKey: "requestEssential",
        href: "/offerte",
      },
      {
        id: "business",
        featured: true,
        badgeKey: "mostChosen",
        prices: { "12": 179 },
        featureKeys: ["allEssential", "moreStorage", "uptime", "prioritySupport", "yearlyCheck"],
        ctaKey: "requestBusiness",
        href: "/offerte",
      },
      {
        id: "managed",
        featured: false,
        onRequest: true,
        featureKeys: ["allBusinessHosting", "updatesIncluded", "proactive", "fixedContact", "sla"],
        ctaKey: "discussOptions",
        href: "/contact",
      },
    ],
  },

  maintenance: {
    id: "maintenance",
    defaultTerm: "12",
    terms: [
      { id: "monthly", months: 1 },
      { id: "12", months: 12, badgeKey: "bestPrice" },
    ],
    plans: [
      {
        id: "basic",
        featured: false,
        prices: { monthly: 39, "12": 32 },
        featureKeys: ["cmsUpdates", "backupCheck", "healthCheck", "emailSupport"],
        ctaKey: "chooseBasic",
        href: "/offerte",
      },
      {
        id: "business",
        featured: true,
        badgeKey: "mostChosen",
        prices: { monthly: 79, "12": 64 },
        featureKeys: ["allBasic", "monitoring", "incidentPriority", "smallEdits", "quarterlyReport"],
        ctaKey: "chooseBusiness",
        href: "/offerte",
      },
      {
        id: "custom",
        featured: false,
        onRequest: true,
        featureKeys: ["allBusinessMaint", "slaResponse", "devHours", "directAdmin"],
        ctaKey: "discussSituation",
        href: "/contact",
      },
    ],
  },
};

/** Actieve WaaS-branches (enabled !== false) */
export function getWaasBranches() {
  return pricing.waas.branches.filter((branch) => branch.enabled !== false);
}

/** Cijfernotatie per taal; de bedragen zelf zijn in beide talen identiek. */
const numberLocales = { nl: "nl-NL", en: "en-GB" };

/**
 * Format bedrag als €495 / €1.595 / €39,50 (nl) of €1,595 / €39.50 (en).
 * Decimalen alleen tonen wanneer het bedrag ze werkelijk heeft.
 */
export function formatEuro(amount, locale = "nl") {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) return "";
  const value = Number(amount);
  const fractionDigits = Number.isInteger(value) ? 0 : 2;
  const formatted = value.toLocaleString(numberLocales[locale] || locale || "nl-NL", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  });
  return `€${formatted}`;
}

/**
 * Besparing t.o.v. maandelijks flexibel betalen over de contractduur.
 * @returns {{ amount: number, months: number } | null}
 */
export function calcSavings(monthlyPrice, termPrice, termMonths) {
  if (!monthlyPrice || !termPrice || !termMonths || termMonths <= 1) return null;
  const amount = Math.round((monthlyPrice - termPrice) * termMonths * 100) / 100;
  if (amount <= 0) return null;
  return { amount, months: termMonths };
}

/** Looptijden die daadwerkelijk een prijs hebben en dus getoond mogen worden */
export function getAvailableTerms(catalog) {
  const pending = new Set(catalog.pendingTerms || []);
  return (catalog.terms || []).filter((term) => !pending.has(term.id));
}

export function getOneTimePlans() {
  return pricing.oneTime.plans;
}

export function getHostingPlans() {
  return pricing.hosting.plans;
}

export function getMaintenancePlans() {
  return pricing.maintenance.plans;
}

/** Laagste WaaS-vanafprijs: One Page bij een looptijd van 12 maanden */
export function getWaasFromPrice() {
  const prices = getWaasBranches().map((b) => b.prices["12"] ?? b.prices.monthly);
  return Math.min(...prices);
}

export function getOneTimeFromPrice() {
  return Math.min(...pricing.oneTime.plans.map((p) => p.price));
}

/** Laagste hosting-vanafprijs (jaarbedrag) */
export function getHostingFromPrice() {
  const priced = pricing.hosting.plans.filter((p) => !p.onRequest);
  return Math.min(...priced.flatMap((p) => Object.values(p.prices)));
}

/** Laagste onderhouds-vanafprijs (maandbedrag) */
export function getMaintenanceFromPrice() {
  const priced = pricing.maintenance.plans.filter((p) => !p.onRequest);
  return Math.min(...priced.flatMap((p) => Object.values(p.prices)));
}
