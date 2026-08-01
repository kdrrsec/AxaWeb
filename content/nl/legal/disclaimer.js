import { company, companyIdentityLine, companyContactBlockHtml } from "./company.js";

/**
 * Zakelijke disclaimer voor axaweb.nl
 */
export const disclaimerDoc = {
  pageId: "disclaimer",
  filename: "disclaimer.html",
  path: "/disclaimer",
  title: "Disclaimer | AxaWeb",
  description:
    "Disclaimer van AxaWeb over juistheid van informatie, externe links, aansprakelijkheid, intellectueel eigendom en sitewijzigingen.",
  h1: "Disclaimer",
  updatedLabel: company.documentsUpdated,
  dateIso: "2026-07-31",
  intro: [
    {
      type: "p",
      html: `Deze disclaimer geldt voor de website van ${companyIdentityLine()} (${company.website}). Door deze website te gebruiken, aanvaard je de onderstaande bepalingen.`,
    },
  ],
  sections: [
    {
      id: "juistheid",
      title: "1. Juistheid van informatie",
      blocks: [
        {
          type: "p",
          text: "AxaWeb stelt de inhoud van deze website met zorg samen. Toch kunnen teksten, prijzen, pakketomschrijvingen of andere gegevens onvolledig, verouderd of niet volledig juist zijn. Informatie op de website is algemeen van aard en vormt geen vrijblijvend aanbod, tenzij uitdrukkelijk anders aangegeven.",
        },
        {
          type: "p",
          text: "Vanafprijzen en pakketten op de website zijn indicatief. De offerte of overeenkomst is leidend voor prijs, scope en voorwaarden van een opdracht.",
        },
      ],
    },
    {
      id: "geen-advies",
      title: "2. Geen juridisch of professioneel advies",
      blocks: [
        {
          type: "p",
          html: `Inhoud op deze website, inclusief de <a href="/algemene-voorwaarden">algemene voorwaarden</a>, <a href="/privacy">privacyverklaring</a> en dit document, is bedoeld als duidelijke informatie over onze dienstverlening. Het is geen persoonlijk juridisch advies. Twijfel je over jouw situatie, win dan advies in bij een deskundige.`,
        },
      ],
    },
    {
      id: "externe-links",
      title: "3. Externe links",
      blocks: [
        {
          type: "p",
          text: "Deze website kan links bevatten naar websites van derden (bijvoorbeeld live projecten van klanten of externe diensten). AxaWeb heeft geen zeggenschap over die websites en is niet verantwoordelijk voor hun inhoud, beschikbaarheid of privacypraktijken. Het volgen van een externe link is op eigen risico.",
        },
      ],
    },
    {
      id: "aansprakelijkheid",
      title: "4. Aansprakelijkheid",
      blocks: [
        {
          type: "p",
          text: "AxaWeb is niet aansprakelijk voor schade die voortvloeit uit het gebruik van deze website of uit het vertrouwen op informatie op deze website, voor zover de wet dat toelaat. Dit omvat onder meer schade door storingen, onjuistheden, incomplete informatie of tijdelijke onbereikbaarheid.",
        },
        {
          type: "p",
          html: `Op opdrachten en abonnementen gelden de aansprakelijkheidsbepalingen uit de <a href="/algemene-voorwaarden">algemene voorwaarden</a>.`,
        },
      ],
    },
    {
      id: "ie-disclaimer",
      title: "5. Intellectueel eigendom",
      blocks: [
        {
          type: "p",
          text: "Alle rechten op teksten, vormgeving, logo’s, foto’s, codevoorbeelden en overige content op deze website berusten bij AxaWeb of haar licentiegevers, tenzij anders aangegeven. Niets van deze website mag worden gekopieerd, verspreid of hergebruikt zonder voorafgaande toestemming, behoudens dwingendrechtelijke uitzonderingen.",
        },
      ],
    },
    {
      id: "wijzigingen-site",
      title: "6. Wijzigingen van de website",
      blocks: [
        {
          type: "p",
          text: "AxaWeb mag de inhoud, structuur, prijzen en functionaliteit van de website op elk moment wijzigen of (tijdelijk) onderbreken zonder voorafgaande aankondiging. Aan tijdelijke publicaties of testomgevingen kunnen geen rechten worden ontleend.",
        },
      ],
    },
    {
      id: "beschikbaarheid",
      title: "7. Beschikbaarheid",
      blocks: [
        {
          type: "p",
          text: "We streven naar een goed bereikbare website, maar garanderen geen ononderbroken beschikbaarheid. Onderhoud, storingen bij derden of overmacht kunnen de toegang beperken.",
        },
      ],
    },
    {
      id: "contact-disclaimer",
      title: "8. Contact",
      blocks: [
        {
          type: "p",
          text: "Vragen over deze disclaimer:",
        },
        { type: "html", html: companyContactBlockHtml() },
      ],
    },
  ],
  related: [
    { href: "/algemene-voorwaarden", label: "Algemene voorwaarden" },
    { href: "/privacy", label: "Privacyverklaring" },
    { href: "/cookies", label: "Cookiebeleid" },
  ],
};
