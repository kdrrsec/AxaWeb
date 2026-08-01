import { company, companyIdentityLine, companyContactBlockHtml } from "./company.js";

/**
 * Privacyverklaring AxaWeb: AVG-proof op basis van feitelijke sitefunctionaliteit.
 */
export const privacyDoc = {
  pageId: "privacy",
  filename: "privacy.html",
  path: "/privacy",
  title: "Privacyverklaring | AxaWeb",
  description:
    "Privacyverklaring van AxaWeb: welke gegevens we verwerken via formulieren, cookies, Analytics en Clarity, en welke rechten je hebt.",
  h1: "Privacyverklaring",
  updatedLabel: company.documentsUpdated,
  dateIso: "2026-08-01",
  intro: [
    {
      type: "p",
      html: `${companyIdentityLine()} respecteert je privacy. In deze verklaring leggen we uit welke persoonsgegevens we verwerken wanneer je onze website bezoekt of contact met ons opneemt, waarom we dat doen, hoe lang we gegevens bewaren en welke rechten je hebt.`,
    },
    {
      type: "p",
      html: `Deze verklaring geldt voor <a href="${company.website}">${company.website}</a> en bijbehorende contact- en offerteformulieren. We beschrijven alleen verwerkingen die bij AxaWeb daadwerkelijk plaatsvinden of kunnen plaatsvinden met de huidige website.`,
    },
  ],
  sections: [
    {
      id: "verantwoordelijke",
      title: "1. Verantwoordelijke",
      blocks: [
        {
          type: "p",
          text: "Verantwoordelijke voor de verwerking van persoonsgegevens:",
        },
        { type: "html", html: companyContactBlockHtml() },
        {
          type: "p",
          text: "Voor privacyvragen kun je het beste e-mailen naar het bovenstaande adres.",
        },
      ],
    },
    {
      id: "welke-gegevens",
      title: "2. Welke persoonsgegevens verwerken wij?",
      blocks: [
        {
          type: "h3",
          text: "Contact- en offerteformulieren",
        },
        {
          type: "p",
          text: "Wanneer je het contactformulier of het offerteformulier gebruikt, kunnen wij de volgende gegevens ontvangen:",
        },
        {
          type: "ul",
          items: [
            "naam;",
            "bedrijfsnaam (indien ingevuld);",
            "e-mailadres;",
            "telefoonnummer (indien ingevuld);",
            "project- of dienstkeuze;",
            "budgetindicatie (indien ingevuld);",
            "berichtinhoud / projectinformatie;",
            "bronpagina van waaruit het formulier is verzonden;",
            "tijdstip van indiening;",
            "technische antispamgegevens die nodig zijn om misbruik te beperken (zoals tijdstip van starten van het formulier);",
            "IP-adres, voor rate limiting en misbruikpreventie bij het versturen van formulieren.",
          ],
        },
        {
          type: "h3",
          text: "Direct contact",
        },
        {
          type: "p",
          html: `Neem je contact op via e-mail (<a href="mailto:${company.email}">${company.email}</a>) of telefoon (<a href="${company.phoneHref}">${company.phoneDisplay}</a>), dan verwerken we de gegevens die je daarbij deelt, voor zover nodig om je te helpen.`,
        },
        {
          type: "h3",
          text: "Websitegebruik en cookies",
        },
        {
          type: "p",
          html: `Afhankelijk van je cookietoestemming kunnen technische en statistische gegevens worden verwerkt, zoals cookie-identifiers, apparaat- of browserinformatie, IP-adres (mogelijk ingekort), paginaweergaven en interacties. Zie het <a href="/cookies">cookiebeleid</a> voor details.`,
        },
        {
          type: "h3",
          text: "Lettertypen",
        },
        {
          type: "p",
          text: "Voor typografie laden we het lettertype Manrope via Google Fonts. Daarbij kan Google technisch je IP-adres verwerken.",
        },
      ],
    },
    {
      id: "doelen-grondslagen",
      title: "3. Doelen en rechtsgronden",
      blocks: [
        {
          type: "p",
          text: "We verwerken persoonsgegevens alleen voor duidelijke doelen:",
        },
        {
          type: "ul",
          items: [
            {
              html: "<strong>Contact en offertes afhandelen:</strong> om te reageren op je aanvraag, vragen te beantwoorden en een offerte of voorstel te doen. Rechtsgrond: gerechtvaardigd belang en/of uitvoering van precontractuele stappen op jouw verzoek (AVG art. 6 lid 1 sub b en f).",
            },
            {
              html: "<strong>Overeenkomst en dienstverlening:</strong> als je klant wordt, voor uitvoering van de overeenkomst. Rechtsgrond: uitvoering overeenkomst (art. 6 lid 1 sub b).",
            },
            {
              html: "<strong>Beveiliging en misbruikpreventie:</strong> bijvoorbeeld rate limiting en spamfilters op formulieren. Rechtsgrond: gerechtvaardigd belang (art. 6 lid 1 sub f).",
            },
            {
              html: "<strong>Statistieken en verbetering van de website:</strong> via Google Analytics 4 en Microsoft Clarity, alleen na toestemming voor de categorie Statistieken. Rechtsgrond: toestemming (art. 6 lid 1 sub a).",
            },
            {
              html: "<strong>Noodzakelijke cookies / opslag:</strong> om de site te laten werken en je cookiekeuze te onthouden. Rechtsgrond: gerechtvaardigd belang / noodzakelijk voor de gevraagde dienst (en waar nodig toestemming volgens de cookieregels).",
            },
            {
              html: "<strong>Wettelijke verplichtingen:</strong> bijvoorbeeld bewaarplichten voor administratie. Rechtsgrond: wettelijke verplichting (art. 6 lid 1 sub c).",
            },
          ],
        },
        {
          type: "p",
          text: "Marketingcookies of advertentiepixels laden we niet zonder jouw toestemming voor Marketing. Op dit moment worden er geen aparte marketingtools actief geladen zolang die toestemming ontbreekt.",
        },
      ],
    },
    {
      id: "bewaartermijnen",
      title: "4. Bewaartermijnen",
      blocks: [
        {
          type: "ul",
          items: [
            "Contact- en offerteaanvragen bewaren we niet langer dan nodig is voor afhandeling en eventuele opvolging, doorgaans tot maximaal 24 maanden na het laatste relevante contact, tenzij een lopende samenwerking of wettelijke plicht langer bewaren vereist.",
            "Administratieve en contractgegevens bewaren we zolang de wet dat voorschrijft (onder meer fiscale bewaartermijnen).",
            "Cookievoorkeuren worden lokaal in je browser opgeslagen totdat je ze wist of wijzigt.",
            "Statistische gegevens bij Google Analytics en Microsoft Clarity volgen de bewaarinstellingen van die diensten en jouw toestemming; zonder toestemming worden die scripts niet geladen.",
          ],
        },
      ],
    },
    {
      id: "ontvangers",
      title: "5. Delen met derden / verwerkers",
      blocks: [
        {
          type: "p",
          text: "We verkopen je gegevens niet. We delen gegevens alleen met partijen die nodig zijn voor onze dienstverlening of waartoe we wettelijk verplicht zijn.",
        },
        {
          type: "ul",
          items: [
            {
              html: "<strong>Vercel:</strong> hosting van de website en de server-side API voor het contact- en offerteformulier.",
            },
            {
              html: "<strong>Resend:</strong> e-mailverzending van formulieraanvragen wanneer deze dienst is geconfigureerd.",
            },
            {
              html: "<strong>FormSubmit:</strong> alternatieve afhandeling van formulieraanvragen wanneer Resend niet is geconfigureerd; de browser kan de aanvraag dan via FormSubmit afronden.",
            },
            {
              html: "<strong>Google (Fonts, en optioneel Analytics):</strong> Google Fonts voor lettertypen; Google Analytics 4 alleen na toestemming voor Statistieken.",
            },
            {
              html: "<strong>Microsoft Clarity:</strong> alleen na toestemming voor Statistieken, voor gebruiks- en sessie-inzichten (inclusief sessie-opnamen).",
            },
          ],
        },
        {
          type: "p",
          text: "Sommige van deze partijen kunnen gegevens (ook) buiten de EER verwerken. Waar dat het geval is, doen we dat op basis van passende waarborgen zoals standaardcontractbepalingen van de Europese Commissie, voor zover van toepassing, en bij niet-noodzakelijke tracking ook op basis van jouw toestemming.",
        },
      ],
    },
    {
      id: "cookies-analytics",
      title: "6. Cookies en analytics",
      blocks: [
        {
          type: "p",
          html: `We gebruiken een cookiebanner met categorieën: noodzakelijk, voorkeuren, statistieken en marketing. Optionele statistiekstools laden pas na toestemming. Meer details staan in het <a href="/cookies">cookiebeleid</a>.`,
        },
        {
          type: "p",
          text: "Bij statistiektoestemming kunnen Google Analytics 4 en Microsoft Clarity gebruiksgegevens meten, zoals paginaweergaven, klikken en (bij Clarity) sessiegedrag. Dat is geen volledig anonieme meting: er kunnen technische identifiers en gebruiksgegevens worden verwerkt.",
        },
        {
          type: "p",
          text: "Voor Microsoft Clarity maskeren we gevoelige formuliervelden op het contact- en offerteformulier (via data-clarity-mask), zodat namen, e-mailadressen, telefoonnummers, berichten en vergelijkbare invoer niet in Clarity-opnamen zichtbaar zijn. Overige paginatekst wordt niet standaard volledig gemaskeerd.",
        },
      ],
    },
    {
      id: "axabook",
      title: "7. Toekomstige diensten (zoals AxaBook)",
      blocks: [
        {
          type: "p",
          text: "Op de website kunnen toekomstige producten of modules worden genoemd (bijvoorbeeld AxaBook als “binnenkort”). Zolang zo’n dienst niet live is gekoppeld aan deze website, verwerken we daar via axaweb.nl geen aparte persoonsgegevens voor. Als dat later wel gebeurt, passen we deze verklaring aan of verwijzen we naar een aanvullende privacytoelichting.",
        },
      ],
    },
    {
      id: "beveiliging",
      title: "8. Beveiliging",
      blocks: [
        {
          type: "p",
          text: "We nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen, waaronder HTTPS, beveiligingsheaders, origin-controles en spambeperkingen op het contactformulier, en toegangsbeperking tot mailboxen. Absolute veiligheid kan niemand garanderen; we verbeteren maatregelen waar nodig.",
        },
      ],
    },
    {
      id: "rechten",
      title: "9. Jouw rechten",
      blocks: [
        {
          type: "p",
          text: "Voor zover de AVG van toepassing is, heb je onder meer recht op:",
        },
        {
          type: "ul",
          items: [
            "inzage in je persoonsgegevens;",
            "rectificatie van onjuiste gegevens;",
            "verwijdering (“recht op vergetelheid”) in de gevallen die de wet noemt;",
            "beperking van de verwerking;",
            "overdraagbaarheid van gegevens die je ons hebt verstrekt, waar van toepassing;",
            "bezwaar tegen verwerking op basis van gerechtvaardigd belang;",
            "intrekken van toestemming, zonder dat dit de rechtmatigheid van eerdere verwerking aantast.",
          ],
        },
        {
          type: "p",
          html: `Je kunt een verzoek sturen naar <a href="mailto:${company.email}">${company.email}</a>. We reageren binnen de wettelijke termijnen. We kunnen om aanvullende informatie vragen om je identiteit te verifiëren.`,
        },
      ],
    },
    {
      id: "klachten",
      title: "10. Klachten",
      blocks: [
        {
          type: "p",
          html: `Heb je een klacht over hoe wij met persoonsgegevens omgaan? Neem eerst contact met ons op via <a href="mailto:${company.email}">${company.email}</a>. Je hebt ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens: <a href="https://www.autoriteitpersoonsgegevens.nl" rel="noopener noreferrer" target="_blank">www.autoriteitpersoonsgegevens.nl</a>.`,
        },
      ],
    },
    {
      id: "wijzigingen-privacy",
      title: "11. Wijzigingen",
      blocks: [
        {
          type: "p",
          text: "We kunnen deze privacyverklaring aanpassen als onze diensten of wetgeving wijzigen. De datum “Laatst bijgewerkt” bovenaan geeft de actuele versie aan. Bij ingrijpende wijzigingen informeren we waar dat passend is via de website.",
        },
      ],
    },
  ],
  related: [
    { href: "/cookies", label: "Cookiebeleid" },
    { href: "/algemene-voorwaarden", label: "Algemene voorwaarden" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/contact", label: "Contact" },
  ],
};
