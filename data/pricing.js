/**
 * Centrale pricing-configuratie voor AxaWeb.
 * Bedragen in hele euro's (excl. btw). Nieuwe branches: voeg toe aan `waas.branches`.
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
        priceWas: 495,
        price: 395,
        featured: false,
        featureKeys: ["onepage", "responsive", "contactForm", "basicSeo", "ssl", "delivery"],
        ctaKey: "requestQuote",
        href: "/offerte",
      },
      {
        id: "business",
        priceWas: 795,
        price: 695,
        featured: true,
        badgeKey: "mostChosen",
        featureKeys: ["upToFivePages", "customDesign", "portfolio", "maps", "basicSeo", "performance"],
        ctaKey: "discussWebsite",
        href: "/offerte",
      },
      {
        id: "premium",
        priceWas: 1695,
        price: 1495,
        featured: false,
        featureKeys: ["allBusiness", "morePages", "customFeatures", "api", "animations", "priority"],
        ctaKey: "requestCustom",
        href: "/offerte",
      },
    ],
  },

  /** Website as a Service — branchepakketten */
  waas: {
    id: "waas",
    defaultTerm: "12",
    terms: [
      { id: "monthly", months: 1 },
      { id: "12", months: 12, badgeKey: "recommended" },
      { id: "24", months: 24, badgeKey: "bestPrice" },
    ],
    ctaKey: "planIntro",
    href: "/contact",
    /**
     * Branch-pakketten. Prijzen per contracttermijn (per maand, excl. btw).
     * featureKeys = beschikbare features; upcomingKey = optionele AxaBook-vermelding.
     * Nieuwe branche: object toevoegen — UI volgt automatisch.
     */
    branches: [
      {
        id: "business-site",
        icon: "building2",
        featured: false,
        prices: { monthly: 149, "12": 129, "24": 119 },
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
        id: "barbershop",
        icon: "scissors",
        featured: true,
        badgeKey: "popular",
        prices: { monthly: 169, "12": 149, "24": 139 },
        featureKeys: [
          "waasCustomSite",
          "waasTreatmentsPrices",
          "waasTeamOverview",
          "waasPhotoGallery",
          "waasWhatsapp",
          "waasHostingMaintenance",
          "waasSslBackups",
        ],
        upcomingKey: "axabookAppointments",
      },
      {
        id: "restaurant",
        icon: "utensils",
        featured: false,
        prices: { monthly: 199, "12": 179, "24": 169 },
        featureKeys: [
          "waasCustomSite",
          "waasDigitalMenu",
          "waasOpeningHours",
          "waasTableReservation",
          "waasAtmospherePhotos",
          "waasHostingMaintenance",
          "waasSslBackups",
        ],
        upcomingKey: "axabookRestaurants",
      },
      {
        id: "gym",
        icon: "dumbbell",
        featured: false,
        prices: { monthly: 199, "12": 179, "24": 169 },
        featureKeys: [
          "waasCustomSite",
          "waasClassSchedule",
          "waasMemberships",
          "waasTrainerOverview",
          "waasTrialForm",
          "waasHostingMaintenance",
          "waasSslBackups",
        ],
        upcomingKey: "axabookAppointments",
      },
      {
        id: "webshop",
        icon: "shoppingBag",
        featured: false,
        prices: { monthly: 229, "12": 199, "24": 189 },
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
      /* Voorbeelden voor latere uitbreiding (uitgeschakeld tot live):
      { id: "dentist", icon: "shield", featured: false, prices: { monthly: 179, "12": 159, "24": 149 }, featureKeys: [], enabled: false },
      */
    ],
  },

  hosting: {
    id: "hosting",
    defaultTerm: "24",
    terms: [
      { id: "yearly", months: 12 },
      { id: "24", months: 24, badgeKey: "bestPrice" },
    ],
    plans: [
      {
        id: "essential",
        featured: false,
        /** Jaarprijs bij 12-maanden- en 24-maandencontract */
        prices: { yearly: 99, "24": 89 },
        featureKeys: ["ssl", "dailyBackups", "businessEmail", "ssd", "emailSupport"],
        ctaKey: "requestEssential",
        href: "/offerte",
      },
      {
        id: "business",
        featured: true,
        badgeKey: "mostChosen",
        prices: { yearly: 199, "24": 179 },
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
      { id: "12", months: 12, badgeKey: "recommended" },
      { id: "24", months: 24, badgeKey: "bestPrice" },
    ],
    plans: [
      {
        id: "basic",
        featured: false,
        prices: { monthly: 39, "12": 35, "24": 32 },
        featureKeys: ["cmsUpdates", "backupCheck", "healthCheck", "emailSupport"],
        ctaKey: "chooseBasic",
        href: "/offerte",
      },
      {
        id: "business",
        featured: true,
        badgeKey: "mostChosen",
        prices: { monthly: 79, "12": 69, "24": 64 },
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

/**
 * Format bedrag als €395 / €1.495 (nl-NL, zonder spaties na €).
 */
export function formatEuro(amount) {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) return "";
  const formatted = Number(amount).toLocaleString("nl-NL", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  return `€${formatted}`;
}

/**
 * Besparing t.o.v. maandelijkse prijs.
 * @returns {{ amount: number, months: number } | null}
 */
export function calcSavings(monthlyPrice, termPrice, termMonths) {
  if (!monthlyPrice || !termPrice || !termMonths || termMonths <= 1) return null;
  const amount = (monthlyPrice - termPrice) * termMonths;
  if (amount <= 0) return null;
  return { amount, months: termMonths };
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

/** Laagste WaaS-vanafprijs (12-maanden tarief) voor vergelijkingstabellen */
export function getWaasFromPrice() {
  const prices = getWaasBranches().map((b) => b.prices["12"] ?? b.prices.monthly);
  return Math.min(...prices);
}

export function getOneTimeFromPrice() {
  return Math.min(...pricing.oneTime.plans.map((p) => p.price));
}

export function getHostingFromPrice() {
  const priced = pricing.hosting.plans.filter((p) => !p.onRequest);
  return Math.min(...priced.map((p) => p.prices.yearly));
}

export function getMaintenanceFromPrice() {
  const priced = pricing.maintenance.plans.filter((p) => !p.onRequest);
  return Math.min(...priced.map((p) => p.prices.monthly));
}
