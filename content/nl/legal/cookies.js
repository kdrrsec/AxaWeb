import { company, companyIdentityLine } from "./company.js";

/**
 * Cookiebeleid AxaWeb, afgestemd op cookie-consent.
 */
export const cookiesDoc = {
  pageId: "cookies",
  filename: "cookies.html",
  path: "/cookies",
  title: "Cookiebeleid | AxaWeb",
  description:
    "Cookiebeleid van AxaWeb: welke cookiecategorieën we gebruiken, Google Analytics, Microsoft Clarity en hoe je toestemming wijzigt.",
  h1: "Cookiebeleid",
  updatedLabel: company.documentsUpdated,
  dateIso: "2026-07-31",
  showCookieSettingsButton: true,
  intro: [
    {
      type: "p",
      html: `Dit cookiebeleid hoort bij de website van ${companyIdentityLine()}. Het legt uit welke cookies en vergelijkbare technieken we gebruiken, waarom, en hoe je je keuze beheert.`,
    },
    {
      type: "p",
      html: `Voor de verwerking van persoonsgegevens zie ook de <a href="/privacy">privacyverklaring</a>.`,
    },
  ],
  sections: [
    {
      id: "wat-zijn-cookies",
      title: "1. Wat zijn cookies?",
      blocks: [
        {
          type: "p",
          text: "Cookies zijn kleine tekstbestanden die je browser kan opslaan wanneer je een website bezoekt. Vergelijkbare technieken, zoals lokale opslag, kunnen hetzelfde doel dienen, bijvoorbeeld het onthouden van je cookietoestemming.",
        },
      ],
    },
    {
      id: "categorieen",
      title: "2. Categorieën die wij hanteren",
      blocks: [
        {
          type: "h3",
          text: "Noodzakelijk",
        },
        {
          type: "p",
          text: "Nodig voor de basiswerking van de site, beveiliging en het opslaan van je cookiekeuze. Deze categorie is altijd actief. Zonder deze opslag zouden we je keuze niet kunnen onthouden.",
        },
        {
          type: "h3",
          text: "Voorkeuren",
        },
        {
          type: "p",
          text: "Voor optionele functionele instellingen die niet strikt noodzakelijk zijn. Op dit moment laden we geen aparte voorkeurs-scripts zolang die niet nodig zijn; de categorie bestaat wel in de banner voor toekomstige functionele uitbreidingen.",
        },
        {
          type: "h3",
          text: "Statistieken",
        },
        {
          type: "p",
          text: "Helpt ons te begrijpen hoe de website wordt gebruikt. Alleen na jouw toestemming laden we Google Analytics 4 en Microsoft Clarity. Zonder toestemming worden deze tools niet geladen.",
        },
        {
          type: "h3",
          text: "Marketing",
        },
        {
          type: "p",
          text: "Gereserveerd voor toekomstige marketingtools (zoals advertentiepixels). Standaard uit. Zonder toestemming laden we geen marketingtools.",
        },
      ],
    },
    {
      id: "consent-mode",
      title: "3. Toestemming",
      blocks: [
        {
          type: "p",
          text: "Bij je eerste bezoek tonen we een cookiebanner. Je kunt alles accepteren, alles weigeren (behalve noodzakelijk), of categorieën apart instellen. Je keuze wordt op dit apparaat onthouden, zodat de banner niet bij elk bezoek terugkomt.",
        },
        {
          type: "p",
          text: "Optionele statistiek- of marketingtools laden pas na jouw toestemming. Je kunt je keuze later wijzigen via Cookievoorkeuren in de footer.",
        },
      ],
    },
    {
      id: "welke-tools",
      title: "4. Welke tools kunnen worden gebruikt?",
      blocks: [
        {
          type: "ul",
          items: [
            {
              html: "<strong>Cookietoestemming (noodzakelijk):</strong> opslag van je keuze op dit apparaat.",
            },
            {
              html: "<strong>Google Analytics 4:</strong> statistieken over websitegebruik, alleen na toestemming.",
            },
            {
              html: "<strong>Microsoft Clarity:</strong> sessie-inzichten, alleen na toestemming.",
            },
            {
              html: "<strong>Google Fonts:</strong> laadt het lettertype Inter voor weergave.",
            },
            {
              html: "<strong>Marketingtools:</strong> niet actief zonder marketingtoestemming.",
            },
          ],
        },
      ],
    },
    {
      id: "bewaartermijnen-cookies",
      title: "5. Bewaartermijnen",
      blocks: [
        {
          type: "ul",
          items: [
            "Je toestemmingskeuze blijft bewaard totdat je die wist via browsergegevens of via Cookievoorkeuren wijzigt.",
            "Cookies van Google Analytics en Microsoft Clarity volgen de instellingen van die diensten.",
            "Zonder toestemming voor Statistieken of Marketing plaatsen die optionele tools geen trackingcookies via onze site.",
          ],
        },
      ],
    },
    {
      id: "beheren",
      title: "6. Cookievoorkeuren wijzigen",
      blocks: [
        {
          type: "p",
          text: "Je kunt je keuze later altijd wijzigen via “Cookievoorkeuren” in de footer van de website, of via de knop hieronder. Je kunt cookies ook verwijderen of blokkeren via de instellingen van je browser. Blokkeer je alle cookies, dan kan de site minder goed werken.",
        },
      ],
    },
    {
      id: "derden",
      title: "7. Externe diensten",
      blocks: [
        {
          type: "p",
          text: "Externe partijen (Google, Microsoft) verwerken gegevens volgens hun eigen voorwaarden wanneer hun diensten worden geladen. Wij laden optionele trackingscripts uitsluitend na de juiste toestemming.",
        },
      ],
    },
    {
      id: "wijzigingen-cookies",
      title: "8. Wijzigingen",
      blocks: [
        {
          type: "p",
          text: "Dit cookiebeleid kan worden bijgewerkt als we tools toevoegen of wetgeving wijzigt. De datum bovenaan toont de laatste update.",
        },
      ],
    },
  ],
  related: [
    { href: "/privacy", label: "Privacyverklaring" },
    { href: "/algemene-voorwaarden", label: "Algemene voorwaarden" },
    { href: "/disclaimer", label: "Disclaimer" },
  ],
};
