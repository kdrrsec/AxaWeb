import { company, companyIdentityLine, companyContactBlockHtml } from "./company.js";

/**
 * Algemene voorwaarden AxaWeb — productieklaar (NL).
 */
export const termsDoc = {
  pageId: "terms",
  filename: "algemene-voorwaarden.html",
  path: "/algemene-voorwaarden",
  title: "Algemene Voorwaarden | AxaWeb",
  description:
    "Algemene voorwaarden van AxaWeb voor websites, webshops, hosting, onderhoud en Website as a Service. Heldere afspraken over samenwerking.",
  h1: "Algemene voorwaarden",
  updatedLabel: company.documentsUpdated,
  dateIso: "2026-07-31",
  intro: [
    {
      type: "p",
      html: `Deze algemene voorwaarden gelden voor alle diensten van <strong>${companyIdentityLine()}</strong>, waaronder het ontwerpen en bouwen van websites en webshops, hosting, onderhoud, support en Website as a Service (WaaS).`,
    },
    {
      type: "p",
      text: "Door een offerte te aanvaarden, een opdracht te verstrekken of een abonnement af te nemen, ga je akkoord met deze voorwaarden, tenzij schriftelijk anders is overeengekomen.",
    },
  ],
  sections: [
    {
      id: "definities",
      title: "1. Definities",
      blocks: [
        {
          type: "ul",
          items: [
            { html: `<strong>AxaWeb / wij / ons:</strong> ${companyIdentityLine()}, gevestigd in ${company.country}.` },
            { html: "<strong>Opdrachtgever / jij / je:</strong> de (rechts)persoon die diensten van AxaWeb afneemt." },
            { html: "<strong>Overeenkomst:</strong> de afspraak tussen AxaWeb en opdrachtgever, inclusief offerte, bevestiging en deze voorwaarden." },
            { html: "<strong>Diensten:</strong> alle werkzaamheden en abonnementen die AxaWeb levert, zoals websites, webshops, hosting, onderhoud, support en WaaS." },
            { html: "<strong>Website as a Service (WaaS):</strong> een abonnementsmodel waarbij AxaWeb een website beschikbaar stelt inclusief hosting en onderhoud volgens het gekozen pakket." },
            { html: "<strong>Meerwerk:</strong> werkzaamheden buiten de overeengekomen scope." },
            { html: "<strong>Schriftelijk:</strong> per brief, e-mail of een andere duurzame digitale vastlegging." },
          ],
        },
      ],
    },
    {
      id: "toepasselijkheid",
      title: "2. Toepasselijkheid",
      blocks: [
        {
          type: "p",
          text: "Deze voorwaarden zijn van toepassing op alle offertes, overeenkomsten en leveringen van AxaWeb, tenzij partijen uitdrukkelijk schriftelijk anders overeenkomen.",
        },
        {
          type: "p",
          text: "Algemene voorwaarden van de opdrachtgever gelden alleen als AxaWeb die schriftelijk uitdrukkelijk heeft aanvaard. Bij strijd tussen documenten geldt deze rangorde: (1) schriftelijke maatwerkafspraken of SLA, (2) offerte/opdrachtbevestiging, (3) deze algemene voorwaarden.",
        },
        {
          type: "p",
          html: `Op persoonsgegevens is daarnaast de <a href="/privacy">privacyverklaring</a> van toepassing. Op het gebruik van de website axaweb.nl is ook de <a href="/disclaimer">disclaimer</a> van toepassing.`,
        },
      ],
    },
    {
      id: "offertes",
      title: "3. Offertes",
      blocks: [
        {
          type: "p",
          text: "Offertes van AxaWeb zijn vrijblijvend, tenzij daarin een uitdrukkelijke aanvaardingstermijn staat. Een offerte is in beginsel 14 dagen geldig, tenzij anders vermeld.",
        },
        {
          type: "p",
          text: "Prijzen op de website zijn vanafprijzen of indicaties. De definitieve prijs, scope, planning en eventuele abonnementsvoorwaarden worden vastgelegd in de offerte of opdrachtbevestiging.",
        },
        {
          type: "p",
          text: "Kennelijke vergissingen of verschrijvingen in een offerte binden AxaWeb niet.",
        },
      ],
    },
    {
      id: "totstandkoming",
      title: "4. Totstandkoming van de overeenkomst",
      blocks: [
        {
          type: "p",
          text: "Een overeenkomst komt tot stand wanneer de opdrachtgever de offerte schriftelijk aanvaardt, of wanneer AxaWeb een opdracht schriftelijk bevestigt, of wanneer AxaWeb met uitvoering begint met instemming van de opdrachtgever.",
        },
        {
          type: "p",
          text: "Mondelinge afspraken zijn pas bindend na schriftelijke bevestiging door AxaWeb.",
        },
      ],
    },
    {
      id: "verplichtingen-opdrachtgever",
      title: "5. Verplichtingen van de opdrachtgever",
      blocks: [
        {
          type: "p",
          text: "De opdrachtgever zorgt tijdig voor alle informatie, content, toegang, feedback en beslissingen die nodig zijn om de diensten uit te voeren. Vertraging aan jouw kant kan de planning en oplevering verschuiven.",
        },
        {
          type: "p",
          text: "Je garandeert dat aangeleverde teksten, beelden, logo’s, merken en andere materialen rechtmatig zijn en geen rechten van derden schenden. Je vrijwaart AxaWeb voor claims van derden die hieruit voortvloeien.",
        },
        {
          type: "p",
          text: "Je bent zelf verantwoordelijk voor de inhoudelijke juistheid van bedrijfsinformatie, prijzen, juridische teksten op jouw website (tenzij AxaWeb die uitdrukkelijk als aparte dienst heeft opgesteld) en naleving van wetgeving die op jouw onderneming van toepassing is.",
        },
      ],
    },
    {
      id: "betalingen",
      title: "6. Betalingen en facturatie",
      blocks: [
        {
          type: "p",
          text: "Prijzen zijn in euro’s en exclusief btw, tenzij uitdrukkelijk anders vermeld. Op de website kan “excl. 21% btw” staan bij pakketten; de offerte is leidend.",
        },
        {
          type: "p",
          text: "Tenzij anders overeengekomen, factureert AxaWeb projecten in termijnen, bijvoorbeeld: aanbetaling bij start, tussentijdse termijn bij oplevering van een concept of milestone, en restant bij oplevering. Abonnementen (hosting, onderhoud, WaaS) worden vooraf per gekozen periode gefactureerd.",
        },
        {
          type: "p",
          text: "Facturen dienen te worden betaald binnen 14 dagen na factuurdatum, tenzij schriftelijk een andere termijn is afgesproken. Bij niet-tijdige betaling is AxaWeb gerechtigd wettelijke (handels)rente en redelijke incassokosten in rekening te brengen.",
        },
        {
          type: "p",
          text: "AxaWeb mag de uitvoering opschorten zolang openstaande, opeisbare facturen onbetaald blijven, na een herinnering.",
        },
      ],
    },
    {
      id: "prijswijzigingen",
      title: "7. Prijswijzigingen",
      blocks: [
        {
          type: "p",
          text: "Voor eenmalige projecten geldt de in de offerte vastgelegde prijs, behoudens meerwerk of scopewijziging.",
        },
        {
          type: "p",
          text: "Voor doorlopende abonnementen mag AxaWeb prijzen jaarlijks of bij verlenging aanpassen. Bij een prijswijziging informeren wij je vooraf. Ben je het niet eens met de wijziging, dan kun je het abonnement opzeggen tegen de datum waarop de nieuwe prijs ingaat, met inachtneming van de opzegtermijn.",
        },
        {
          type: "p",
          text: "Kostprijsstijgingen van derden (bijvoorbeeld domeinregistrars, betaalproviders of infrastructuur) die specifiek voor jouw dienst worden doorbelast, mogen worden doorberekend zodra die zich voordoen, met voorafgaande kennisgeving.",
        },
      ],
    },
    {
      id: "meerwerk",
      title: "8. Meerwerk",
      blocks: [
        {
          type: "p",
          text: "Werkzaamheden buiten de overeengekomen scope gelden als meerwerk. AxaWeb informeert je wanneer iets als meerwerk wordt gezien en geeft waar redelijk een prijsindicatie of vaste meerprijs voordat die werkzaamheden starten.",
        },
        {
          type: "p",
          text: "Meerwerk wordt uitgevoerd na jouw (schriftelijke) akkoord, tenzij spoed of continuïteit dit onredelijk maakt. Meerwerk kan de planning verschuiven.",
        },
      ],
    },
    {
      id: "oplevering",
      title: "9. Oplevering, acceptatie en revisies",
      blocks: [
        {
          type: "p",
          text: "Doorlooptijden worden in overleg vastgesteld en zijn streeftermijnen, tenzij uitdrukkelijk een fatale termijn is overeengekomen. AxaWeb spant zich in om afgesproken mijlpalen te halen, mits jij tijdig aanlevert en feedback geeft.",
        },
        {
          type: "p",
          text: "Tenzij anders overeengekomen omvat een website- of webshoptraject een redelijk aantal revisierondes zoals vermeld in de offerte (bijvoorbeeld ontwerprevisies en opleveringsrevisies). Extra rondes of structurele koerswijzigingen kunnen als meerwerk worden behandeld.",
        },
        {
          type: "p",
          text: "Na oplevering krijg je een acceptatietermijn van 7 dagen om gebreken te melden die binnen de overeengekomen scope vallen. Reageer je niet binnen die termijn, dan geldt de oplevering als geaccepteerd. Kleine openstaande punten staan acceptatie niet in de weg; die worden in redelijkheid nagelopen.",
        },
      ],
    },
    {
      id: "domeinnamen",
      title: "10. Domeinnamen",
      blocks: [
        {
          type: "p",
          text: "Indien AxaWeb een domeinnaam voor je registreert of beheert, gebeurt dat op jouw verzoek en voor jouw rekening. Domeinnamen blijven in beginsel jouw eigendom, behoudens andersluidende afspraken of openstaande betalingsverplichtingen die het beheer tijdelijk blokkeren.",
        },
        {
          type: "p",
          text: "Beschikbaarheid van een domeinnaam kan niet worden gegarandeerd totdat registratie daadwerkelijk is voltooid. Verlengingskosten en registrarvoorwaarden van derden kunnen van toepassing zijn.",
        },
      ],
    },
    {
      id: "hosting",
      title: "11. Hosting",
      blocks: [
        {
          type: "p",
          text: "Hosting omvat het beschikbaar stellen van de overeengekomen webomgeving, inclusief de onderdelen die in het gekozen pakket of de overeenkomst staan (bijvoorbeeld SSL, back-ups of monitoring).",
        },
        {
          type: "p",
          text: "AxaWeb streeft naar een stabiele en veilige omgeving, maar geeft geen absolute uptimegarantie, tenzij schriftelijk een specifieke beschikbaarheid of SLA is overeengekomen. Gepland onderhoud kan plaatsvinden; bij voorkeur buiten piekuren en waar mogelijk met voorafgaande aankondiging.",
        },
        {
          type: "p",
          text: "Back-ups worden gemaakt volgens het voor jouw pakket geldende schema, voor zover overeengekomen. Een back-up is een veiligheidsmaatregel, geen garantie dat elk moment of elk bestand altijd herstelbaar is. Je blijft zelf verantwoordelijk voor het bewaren van belangrijke bronbestanden die je aanlevert.",
        },
        {
          type: "p",
          text: "Hosting kan (deels) via gerenommeerde derden en datacenters lopen. AxaWeb selecteert die partijen met zorg, maar is niet aansprakelijk voor storingen die uitsluitend aan die derden zijn toe te rekenen, voor zover wettelijk toegestaan. Wel zetten wij ons in om storingen te laten verhelpen.",
        },
        {
          type: "p",
          text: "Je mag de hostingomgeving niet gebruiken voor illegale, schadelijke of overmatig belastende activiteiten (waaronder malware, spam of DDoS). Bij misbruik mag AxaWeb de dienst (tijdelijk) opschorten.",
        },
      ],
    },
    {
      id: "onderhoud",
      title: "12. Onderhoudsabonnementen",
      blocks: [
        {
          type: "p",
          text: "Een onderhoudsabonnement omvat de werkzaamheden die in het gekozen pakket of de overeenkomst staan. Typisch kan dit onder meer omvatten: updates van het CMS of frameworks waar relevant, beveiligingsupdates, monitoring van basisproblemen en een afgesproken hoeveelheid kleine aanpassingen.",
        },
        {
          type: "h3",
          text: "Inbegrepen (tenzij anders overeengekomen)",
        },
        {
          type: "ul",
          items: [
            "Beveiligings- en onderhoudsupdates binnen het overeengekomen technisch kader",
            "Controle op evidente storingen binnen de scope van het abonnement",
            "Kleine tekstuele of visuele aanpassingen binnen het afgesproken uren- of requestbudget",
            "Advies over urgente veiligheidsissues die AxaWeb constateert",
          ],
        },
        {
          type: "h3",
          text: "Niet inbegrepen (meerwerk of aparte offerte)",
        },
        {
          type: "ul",
          items: [
            "Nieuwe pagina’s, redesigns of structurele uitbreidingen",
            "Nieuwe functionaliteiten of koppelingen met derden",
            "Contentcreatie (teksten, fotografie, vertalingen) tenzij apart overeengekomen",
            "Herstel na schade door derden, verkeerde inloggegevens of onbevoegd ingrijpen",
            "SEO-campagnes, advertentiebeheer of copywriting tenzij apart overeengekomen",
          ],
        },
        {
          type: "p",
          text: "Reactietijden zijn inspanningsverplichtingen: AxaWeb reageert binnen een redelijke termijn op supportverzoeken tijdens kantooruren op werkdagen in Nederland. Spoedverzoeken (bijvoorbeeld volledige onbereikbaarheid van de live site) krijgen voorrang. Exacte reactietijden kunnen in een pakket of SLA nader worden vastgelegd.",
        },
      ],
    },
    {
      id: "waas",
      title: "13. Website as a Service (WaaS)",
      blocks: [
        {
          type: "p",
          text: "Bij Website as a Service stelt AxaWeb een website beschikbaar op abonnementsbasis. Hosting en onderhoud zijn inbegrepen voor zover dat in het gekozen pakket staat. Functionaliteiten, limieten en eventuele opties verschillen per pakket en staan in de offerte of op de pakketpagina zoals die op het moment van aangaan gold.",
        },
        {
          type: "p",
          text: "Tenzij schriftelijk anders overeengekomen, blijft de WaaS-website (inclusief onderliggende technische opzet, templates en platformcomponenten van AxaWeb) eigendom van AxaWeb zolang het abonnement loopt. Jouw eigen content (teksten, logo’s, productfoto’s die jij aanlevert) blijft jouw eigendom.",
        },
        {
          type: "p",
          text: "Maatwerkmodules, integraties of speciale ontwikkelingen kunnen aanvullende of afwijkende voorwaarden hebben, inclusief aparte eigendoms- of licentieafspraken. Die afspraken prevaleren voor dat onderdeel.",
        },
        {
          type: "h3",
          text: "Beëindiging, migratie en overdracht",
        },
        {
          type: "p",
          text: "Bij beëindiging van een WaaS-abonnement eindigt het recht om de WaaS-website via AxaWeb te gebruiken op de einddatum. Partijen maken in redelijkheid afspraken over:",
        },
        {
          type: "ul",
          items: [
            "export of overdracht van jouw content;",
            "eventuele migratie naar een andere omgeving (meerwerk of vaste migratievergoeding);",
            "domeinkoppeling en DNS-wijzigingen;",
            "definitieve uitschakeling van de WaaS-omgeving.",
          ],
        },
        {
          type: "p",
          text: "Er bestaat geen automatisch recht op kosteloze overdracht van de volledige technische codebase of het AxaWeb-platform, tenzij dat uitdrukkelijk is overeengekomen of je een overdrachts- of buy-outregeling hebt afgenomen.",
        },
      ],
    },
    {
      id: "support",
      title: "14. Support en reactietijden",
      blocks: [
        {
          type: "p",
          text: "Support vindt plaats via de overeengekomen kanalen (in de praktijk vaak e-mail of het contactformulier). AxaWeb streeft ernaar om binnen één tot twee werkdagen te reageren op reguliere verzoeken, en sneller bij spoedeisende storingen aan een live omgeving die wij hosten.",
        },
        {
          type: "p",
          text: "Support omvat geen oneindige consultancy. Uitgebreid advies, strategie of training kan als aparte dienst worden aangeboden.",
        },
      ],
    },
    {
      id: "ie",
      title: "15. Intellectueel eigendom en licenties",
      blocks: [
        {
          type: "p",
          text: "Alle intellectuele eigendomsrechten op door AxaWeb ontwikkelde ontwerpen, code, templates, documentatie en methodieken berusten bij AxaWeb of haar licentiegevers, tenzij schriftelijk anders overeengekomen.",
        },
        {
          type: "p",
          text: "Bij een eenmalig project ontvang je na volledige betaling een gebruiksrecht op het opgeleverde resultaat voor het beoogde gebruik. Overdracht van broncode of exclusieve rechten vindt alleen plaats als dat schriftelijk is afgesproken.",
        },
        {
          type: "p",
          text: "Voor open-source componenten, fonts, plugins of thema’s van derden gelden de bijbehorende licenties. Die blijven van toepassing naast deze voorwaarden.",
        },
        {
          type: "p",
          text: "AxaWeb mag het project opnemen in het portfolio en als referentie gebruiken, tenzij je daar schriftelijk bezwaar tegen maakt om zwaarwegende redenen (bijvoorbeeld geheimhouding).",
        },
      ],
    },
    {
      id: "content",
      title: "16. Content van de opdrachtgever",
      blocks: [
        {
          type: "p",
          text: "Jij blijft verantwoordelijk voor content die je aanlevert of zelf plaatst. AxaWeb is niet verplicht om content vooraf juridisch te toetsen, tenzij dat uitdrukkelijk onderdeel van de opdracht is.",
        },
        {
          type: "p",
          text: "AxaWeb mag content weigeren of verwijderen die duidelijk onrechtmatig is of de dienstverlening of infrastructuur in gevaar brengt, na kennisgeving waar dat redelijkerwijs mogelijk is.",
        },
      ],
    },
    {
      id: "aansprakelijkheid",
      title: "17. Aansprakelijkheid",
      blocks: [
        {
          type: "p",
          text: "AxaWeb levert diensten naar beste inzicht en vermogen (inspanningsverplichting), tenzij uitdrukkelijk een resultaatsverplichting is overeengekomen.",
        },
        {
          type: "p",
          text: "Als AxaWeb aansprakelijk is voor schade, is die aansprakelijkheid beperkt tot directe schade en tot maximaal het bedrag dat de opdrachtgever in de twaalf (12) maanden vóór de schadeveroorzakende gebeurtenis aan AxaWeb heeft betaald voor de betreffende dienst, exclusief btw. Bij een eenmalig project geldt als maximum het voor dat project gefactureerde bedrag.",
        },
        {
          type: "p",
          text: "AxaWeb is niet aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen, reputatieschade, dataverlies (voor zover redelijke back-upmaatregelen zijn genomen of zijn aangeboden), of schade door onjuiste of onvolledige informatie van de opdrachtgever — voor zover de wet dit toelaat.",
        },
        {
          type: "p",
          text: "Deze beperkingen gelden niet bij opzet of bewuste roekeloosheid van AxaWeb, of voor zover dwingend recht anders bepaalt.",
        },
      ],
    },
    {
      id: "overmacht",
      title: "18. Overmacht",
      blocks: [
        {
          type: "p",
          text: "Bij overmacht is AxaWeb niet gehouden tot nakoming zolang de overmacht voortduurt. Onder overmacht vallen onder meer: storingen bij toeleveranciers of hostingproviders, uitval van internet of energie, brand, pandemie, overheidsmaatregelen, DDoS-aanvallen en andere omstandigheden buiten redelijke invloed van AxaWeb.",
        },
        {
          type: "p",
          text: "Duurt de overmacht langer dan zestig (60) dagen, dan mogen beide partijen de overeenkomst voor het getroffen deel ontbinden zonder schadeplicht, onverminderd de verplichting tot betaling voor reeds geleverde diensten.",
        },
      ],
    },
    {
      id: "opschorting-ontbinding",
      title: "19. Opschorting en ontbinding",
      blocks: [
        {
          type: "p",
          text: "AxaWeb mag de overeenkomst opschorten of (gedeeltelijk) ontbinden als de opdrachtgever essentiële verplichtingen niet nakomt — waaronder betalingsverplichtingen — en na ingebrekestelling nalatig blijft, of als voortzetting in redelijkheid niet van AxaWeb kan worden gevergd.",
        },
        {
          type: "p",
          text: "Bij ontbinding blijven reeds gefactureerde en verschuldigde bedragen opeisbaar. Vooruitbetaalde abonnementsperiodes worden niet automatisch gerestitueerd, tenzij de ontbinding het gevolg is van een toerekenbare tekortkoming van AxaWeb of dwingend recht restitutie voorschrijft.",
        },
      ],
    },
    {
      id: "duur-opzegging",
      title: "20. Duur van abonnementen en opzegtermijnen",
      blocks: [
        {
          type: "p",
          text: "Hosting-, onderhouds- en WaaS-abonnementen worden aangegaan voor de in de overeenkomst genoemde initiële periode (bijvoorbeeld maandelijks of jaarlijks) en worden daarna stilzwijgend verlengd met dezelfde periode, tenzij anders overeengekomen.",
        },
        {
          type: "p",
          text: "Opzegging dient schriftelijk te gebeuren, met inachtneming van een opzegtermijn van één (1) maand tegen het einde van de lopende periode, tenzij in de overeenkomst een andere termijn staat.",
        },
        {
          type: "p",
          text: "Na beëindiging kan AxaWeb de omgeving uitschakelen. Zorg zelf tijdig voor export van content of migratieafspraken.",
        },
      ],
    },
    {
      id: "vertrouwelijkheid",
      title: "21. Vertrouwelijkheid",
      blocks: [
        {
          type: "p",
          text: "Partijen gaan vertrouwelijk om met informatie die zij in het kader van de samenwerking ontvangen en die als vertrouwelijk is gemarkeerd of waarvan het vertrouwelijke karakter redelijkerwijs duidelijk is. Dit geldt niet voor informatie die openbaar is, al rechtmatig bekend was, of openbaar moet worden gemaakt op grond van de wet.",
        },
      ],
    },
    {
      id: "privacy",
      title: "22. Privacy",
      blocks: [
        {
          type: "p",
          html: `AxaWeb verwerkt persoonsgegevens zoals beschreven in de <a href="/privacy">privacyverklaring</a>. Waar AxaWeb als verwerker optreedt voor persoonsgegevens in jouw systemen, kunnen aanvullende verwerkersafspraken nodig zijn; die leggen we dan schriftelijk vast.`,
        },
      ],
    },
    {
      id: "wijzigingen-voorwaarden",
      title: "23. Wijzigingen van deze voorwaarden",
      blocks: [
        {
          type: "p",
          text: "AxaWeb mag deze voorwaarden wijzigen. Bij bestaande abonnementen maken we wezenlijke wijzigingen vooraf kenbaar. Als je niet akkoord gaat, kun je het abonnement opzeggen tegen de ingangsdatum van de wijziging, met inachtneming van de opzegtermijn.",
        },
      ],
    },
    {
      id: "recht-geschillen",
      title: "24. Toepasselijk recht en geschillen",
      blocks: [
        {
          type: "p",
          text: `Op deze voorwaarden en alle overeenkomsten met AxaWeb is ${company.governingLaw} van toepassing.`,
        },
        {
          type: "p",
          text: `Geschillen worden bij voorkeur in overleg opgelost. Lukt dat niet, dan is de ${company.disputeForum} bevoegd, onverminderd dwingendrechtelijke regels die een andere bevoegdheid voorschrijven.`,
        },
      ],
    },
    {
      id: "contact-voorwaarden",
      title: "25. Contact",
      blocks: [
        {
          type: "p",
          text: "Vragen over deze voorwaarden aan:",
        },
        { type: "html", html: companyContactBlockHtml() },
      ],
    },
  ],
  related: [
    { href: "/privacy", label: "Privacyverklaring" },
    { href: "/cookies", label: "Cookiebeleid" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/pakketten", label: "Pakketten en Website as a Service" },
    { href: "/hosting", label: "Hosting" },
    { href: "/onderhoud", label: "Onderhoud" },
  ],
};
