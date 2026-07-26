/*
 * Paginadefinities voor de multipage-site.
 * Iedere pagina heeft een eigen doel, een eigen kop-variant en unieke secties.
 * De generator (scripts/generate-pages.js) rendert per sectietype andere markup.
 */

export const siteNav = [
  { label: "Diensten", href: "/diensten", key: "diensten" },
  { label: "Projecten", href: "/projecten", key: "projecten" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export const pages = {
  diensten: {
    slug: "diensten",
    navKey: "diensten",
    title: "Diensten | AxaWeb",
    description:
      "Websites, webshops, hosting en onderhoud. Ontdek welke dienst van AxaWeb past bij jouw bedrijf en vergelijk het aanbod in één oogopslag.",
    canonical: "https://axaweb.nl/diensten",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Diensten" }],
    head: {
      variant: "center",
      eyebrow: "Diensten",
      title: "Eén partner voor alles wat je online nodig hebt.",
      text: "Van ontwerp en ontwikkeling tot hosting en onderhoud. Vier diensten die los sterk zijn en samen een complete online basis vormen.",
    },
    sections: [
      {
        type: "serviceRows",
        id: "overzicht",
        eyebrow: "Het aanbod",
        title: "Vier diensten, één aanspreekpunt.",
        rows: [
          {
            icon: "layout",
            title: "Websites",
            text: "Maatwerkwebsites die vertrouwen uitstralen en bezoekers omzetten in aanvragen.",
            points: [
              "Uniek ontwerp op basis van jouw merk",
              "Responsive en geoptimaliseerd voor snelheid",
              "SEO-basis en heldere structuur",
            ],
            link: { label: "Alles over websites", href: "/websites" },
          },
          {
            icon: "cart",
            title: "Webshops",
            text: "Conversiegerichte webshops met soepel beheer en betrouwbare betalingen.",
            points: [
              "Soepele checkout met iDEAL en meer",
              "Eenvoudig product- en voorraadbeheer",
              "Schaalbaar naar assortiment en groei",
            ],
            link: { label: "Alles over webshops", href: "/webshops" },
          },
          {
            icon: "server",
            title: "Hosting",
            text: "Snelle en veilige hosting met alles erop en eraan, zonder technisch gedoe.",
            points: [
              "SSL, dagelijkse back-ups en monitoring",
              "Zakelijke e-mail op je eigen domein",
              "Persoonlijke support, geen ticketstraat",
            ],
            link: { label: "Alles over hosting", href: "/hosting" },
          },
          {
            icon: "wrench",
            title: "Onderhoud",
            text: "Updates, monitoring en support die problemen vóór zijn in plaats van achteraf oplossen.",
            points: [
              "Periodieke updates en controles",
              "Uptime- en foutmonitoring",
              "Duidelijke afspraken over reactietijden",
            ],
            link: { label: "Alles over onderhoud", href: "/onderhoud" },
          },
        ],
      },
      {
        type: "compare",
        id: "vergelijking",
        eyebrow: "Vergelijking",
        title: "Welke dienst past bij jouw situatie?",
        intro:
          "In één oogopslag zien waar iedere dienst voor bedoeld is en wat je kunt verwachten.",
        columns: ["Websites", "Webshops", "Hosting", "Onderhoud"],
        rows: [
          {
            label: "Voor wie",
            values: [
              "Bedrijven die online vertrouwen willen wekken",
              "Ondernemers die online willen verkopen",
              "Iedereen met een website of webshop",
              "Eigenaren die zorgeloos online willen zijn",
            ],
          },
          {
            label: "Resultaat",
            values: [
              "Professionele website op maat",
              "Webshop met soepel bestelproces",
              "Snelle en veilige omgeving",
              "Stabiele, up-to-date website",
            ],
          },
          {
            label: "Vanafprijs",
            values: ["€495 eenmalig", "Op aanvraag", "€99 per jaar", "€39 per maand"],
          },
          {
            label: "Doorlooptijd",
            values: ["Vanaf 5 werkdagen", "In overleg", "Directe activering", "Doorlopend"],
          },
          {
            label: "Combineert goed met",
            values: [
              "Hosting en onderhoud",
              "Hosting en onderhoud",
              "Onderhoud",
              "Hosting",
            ],
          },
        ],
        note: "Twijfel je of wil je diensten combineren? We denken graag mee over de opzet die bij jouw situatie past.",
      },
      {
        type: "cta",
        title: "Niet zeker waar je moet beginnen?",
        text: "Vertel ons waar je naartoe wilt. We adviseren vrijblijvend de opzet die daarbij past.",
        button: { label: "Plan een kennismaking", href: "/contact" },
      },
    ],
  },

  websites: {
    slug: "websites",
    navKey: "diensten",
    title: "Websites op maat | AxaWeb",
    description:
      "Maatwerkwebsites die vertrouwen wekken en klanten opleveren. Bekijk functionaliteiten, het proces, prijzen vanaf €495 en cases.",
    canonical: "https://axaweb.nl/websites",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Diensten", href: "/diensten" },
      { label: "Websites" },
    ],
    head: {
      variant: "split",
      eyebrow: "Websites",
      title: "Websites die vertrouwen wekken en klanten opleveren.",
      text: "Geen standaardthema dat overal terugkomt, maar een maatwerkwebsite die jouw merk scherp neerzet en bezoekers in beweging brengt.",
      actions: [
        { label: "Offerte aanvragen", href: "/contact", style: "primary" },
        { label: "Bekijk ons werk", href: "/projecten", style: "secondary" },
      ],
      facts: {
        title: "In het kort",
        items: [
          "100% maatwerk, geen standaardthema's",
          "Responsive op ieder scherm",
          "SEO- en performancebasis inbegrepen",
          "Pakketten vanaf €495",
        ],
      },
    },
    sections: [
      {
        type: "features",
        id: "functionaliteiten",
        eyebrow: "Functionaliteiten",
        title: "Alles wat een moderne website nodig heeft.",
        items: [
          {
            icon: "craft",
            title: "Maatwerk ontwerp",
            text: "Een uniek ontwerp dat past bij jouw merk, doelgroep en doelen.",
          },
          {
            icon: "layout",
            title: "Duidelijke structuur",
            text: "Logische opbouw van pagina's en navigatie, zodat bezoekers direct vinden wat ze zoeken.",
          },
          {
            icon: "search",
            title: "SEO-basis",
            text: "Nette semantiek, metadata en indexeerbaarheid als fundament voor vindbaarheid.",
          },
          {
            icon: "gauge",
            title: "Hoge snelheid",
            text: "Geoptimaliseerde afbeeldingen, minimale scripts en slimme caching voor korte laadtijden.",
          },
          {
            icon: "plug",
            title: "Formulieren en koppelingen",
            text: "Contactformulieren, kaarten of planningskoppelingen, afgestemd op jouw werkwijze.",
          },
          {
            icon: "bolt",
            title: "Klaar voor groei",
            text: "Schaalbare opzet waardoor extra pagina's en functionaliteiten later eenvoudig toe te voegen zijn.",
          },
        ],
      },
      {
        type: "timeline",
        id: "proces",
        eyebrow: "Het proces",
        title: "Van kennismaking tot livegang.",
        intro: "Een helder traject met vaste stappen, zodat je altijd weet waar je aan toe bent.",
        steps: [
          {
            title: "Kennismaking",
            text: "We bespreken je bedrijf, doelgroep en doelen. Jij vertelt, wij luisteren en stellen scherpe vragen.",
            meta: "Stap 1 · vrijblijvend",
          },
          {
            title: "Voorstel en offerte",
            text: "Je ontvangt een concreet voorstel met structuur, planning en een vaste vanafprijs.",
            meta: "Stap 2",
          },
          {
            title: "Ontwerp",
            text: "We ontwerpen de belangrijkste pagina's en stemmen af tot alles klopt met jouw merk.",
            meta: "Stap 3",
          },
          {
            title: "Ontwikkeling",
            text: "We bouwen de website responsive, snel en technisch netjes, klaar voor de toekomst.",
            meta: "Stap 4",
          },
          {
            title: "Livegang en nazorg",
            text: "Na een laatste controle gaat de site live. Daarna blijven we beschikbaar voor hosting en onderhoud.",
            meta: "Stap 5",
          },
        ],
      },
      {
        type: "pricing",
        id: "prijzen",
        eyebrow: "Prijzen",
        title: "Heldere pakketten, vaste vanafprijzen.",
        intro:
          "Ieder project is anders. Daarom zijn dit vanafprijzen en ontvang je altijd vooraf een duidelijke offerte.",
        plans: [
          {
            name: "Start",
            price: "Vanaf €495",
            audience: "Voor starters en kleine ondernemingen.",
            featured: false,
            features: [
              "Professionele onepage",
              "Responsive ontwerp",
              "Contactformulier",
              "Basis SEO",
              "SSL-configuratie",
              "Oplevering vanaf vijf werkdagen",
            ],
            cta: "Vraag een offerte aan",
            href: "/contact",
          },
          {
            name: "Business",
            price: "Vanaf €995",
            audience: "Voor bedrijven die uitgebreider en professioneler online zichtbaar willen zijn.",
            featured: true,
            badge: "Meest gekozen",
            features: [
              "Tot vijf pagina's",
              "Maatwerk ontwerp",
              "Portfolio- of dienstenoverzicht",
              "Google Maps-integratie",
              "Basis SEO",
              "Performance-optimalisatie",
            ],
            cta: "Bespreek jouw website",
            href: "/contact",
          },
          {
            name: "Premium",
            price: "Vanaf €1.750",
            audience: "Voor uitgebreide websites, maatwerkfunctionaliteiten en groeiende organisaties.",
            featured: false,
            features: [
              "Alles uit Business",
              "Meer pagina's en content",
              "Maatwerkfunctionaliteiten",
              "API-koppelingen mogelijk",
              "Uitgebreidere animaties",
              "Prioriteit tijdens ontwikkeling",
            ],
            cta: "Vraag maatwerk aan",
            href: "/contact",
          },
        ],
        note: "Alle bedragen zijn vanafprijzen en afhankelijk van ontwerp, omvang en functionaliteiten.",
      },
      {
        type: "cases",
        id: "cases",
        eyebrow: "Cases",
        title: "Zo maakt een sterke website het verschil.",
        items: [
          {
            tag: "Dienstverlening",
            title: "Bedrijfswebsite die aanvragen oplevert",
            text: "Een verouderde site vervangen door een snelle maatwerkwebsite met duidelijke dienstenpagina's en een gerichte offerteflow.",
            results: [
              "Snellere laadtijd en betere vindbaarheid",
              "Duidelijke positionering per dienst",
              "Meer offerteaanvragen via de website",
            ],
          },
          {
            tag: "Lokaal bedrijf",
            title: "Van visitekaartje naar verkooptool",
            text: "Een eenvoudige onepage uitgebouwd tot volwaardige website met portfolio, reviews en duidelijke contactmogelijkheden.",
            results: [
              "Professionelere uitstraling richting klanten",
              "Portfolio dat het werk laat zien",
              "Laagdrempelig contact via iedere pagina",
            ],
          },
        ],
        footerLink: { label: "Bekijk alle projecten", href: "/projecten" },
      },
      {
        type: "cta",
        title: "Klaar voor een website die voor je werkt?",
        text: "Vraag een vrijblijvende offerte aan en ontvang binnen één werkdag een persoonlijke reactie.",
        button: { label: "Offerte aanvragen", href: "/contact" },
      },
    ],
  },

  webshops: {
    slug: "webshops",
    navKey: "diensten",
    title: "Webshops laten bouwen | AxaWeb",
    description:
      "Conversiegerichte webshops met soepele checkout, iDEAL en eenvoudig beheer. Bekijk features, integraties en cases van AxaWeb.",
    canonical: "https://axaweb.nl/webshops",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Diensten", href: "/diensten" },
      { label: "Webshops" },
    ],
    head: {
      variant: "split",
      eyebrow: "Webshops",
      title: "Een webshop die verkoopt en makkelijk te beheren is.",
      text: "We bouwen conversiegerichte webshops die prettig werken voor klanten én voor jou als beheerder. Van eerste product tot groeiend assortiment.",
      actions: [
        { label: "Offerte aanvragen", href: "/contact", style: "primary" },
        { label: "Bekijk integraties", href: "#integraties", style: "secondary" },
      ],
      facts: {
        title: "In het kort",
        items: [
          "Soepele checkout met iDEAL",
          "Producten en voorraad zelf beheren",
          "Koppelingen met verzending en boekhouding",
          "Schaalbaar naar groei",
        ],
      },
    },
    sections: [
      {
        type: "features",
        id: "features",
        eyebrow: "Features",
        title: "Gebouwd op verkopen én beheren.",
        items: [
          {
            icon: "box",
            title: "Productbeheer",
            text: "Producten, varianten en voorraad eenvoudig zelf beheren, zonder technische kennis.",
          },
          {
            icon: "card",
            title: "Betalingen",
            text: "iDEAL, creditcard en meer via betrouwbare betaalproviders, veilig afgehandeld.",
          },
          {
            icon: "cart",
            title: "Soepele checkout",
            text: "Een kort en duidelijk bestelproces dat drempels wegneemt en conversie verhoogt.",
          },
          {
            icon: "truck",
            title: "Verzending en levering",
            text: "Verzendmethodes, tarieven en track & trace afgestemd op jouw logistiek.",
          },
          {
            icon: "chart",
            title: "Inzicht en rapportage",
            text: "Zicht op bezoekers, bestellingen en omzet, zodat je kunt sturen op cijfers.",
          },
          {
            icon: "shield",
            title: "Veilig en stabiel",
            text: "SSL, updates en back-ups zorgen dat je shop veilig blijft draaien.",
          },
        ],
      },
      {
        type: "integrations",
        id: "integraties",
        eyebrow: "Integraties",
        title: "Koppelt met de tools die je al gebruikt.",
        intro:
          "Een webshop staat niet op zichzelf. We koppelen betalingen, verzending en administratie zodat alles soepel doorloopt.",
        items: [
          { title: "iDEAL", text: "De standaard voor online betalen in Nederland." },
          { title: "Mollie", text: "Betaalprovider voor iDEAL, creditcard en meer." },
          { title: "Stripe", text: "Internationale betalingen en abonnementen." },
          { title: "PostNL", text: "Verzendlabels en track & trace voor je klanten." },
          { title: "DHL", text: "Flexibele verzendopties binnen en buiten Nederland." },
          { title: "Google Analytics", text: "Inzicht in bezoekers, gedrag en conversie." },
          { title: "Mailchimp", text: "Nieuwsbrieven en e-mailautomatisering." },
          { title: "Boekhouding", text: "Koppeling met onder andere e-Boekhouden en Moneybird." },
        ],
      },
      {
        type: "cases",
        id: "cases",
        eyebrow: "Cases",
        title: "Webshops die het werk uit handen nemen.",
        items: [
          {
            tag: "Retail",
            title: "Webshop met soepel bestelproces",
            text: "Een overzichtelijke shop waarin klanten snel vinden wat ze zoeken en zonder frictie afrekenen.",
            results: [
              "Kort bestelproces met iDEAL",
              "Overzichtelijk beheer van producten en voorraad",
              "Basis voor verdere groei en marketing",
            ],
          },
          {
            tag: "Maker en producent",
            title: "Van offline verkoop naar online omzet",
            text: "Een eerste webshop die bestaande offline verkoop aanvult met een professioneel online kanaal.",
            results: [
              "Nieuwe verkoopstroom naast bestaande kanalen",
              "Automatische orderbevestiging en verzendlabels",
              "Assortiment eenvoudig uit te breiden",
            ],
          },
        ],
        footerLink: { label: "Bekijk alle projecten", href: "/projecten" },
      },
      {
        type: "cta",
        title: "Klaar om online te verkopen?",
        text: "Vertel ons wat je verkoopt. Wij adviseren de beste opzet voor jouw webshop.",
        button: { label: "Offerte aanvragen", href: "/contact" },
      },
    ],
  },

  hosting: {
    slug: "hosting",
    navKey: "diensten",
    title: "Hosting | AxaWeb",
    description:
      "Snelle en veilige hosting in Nederlandse datacenters. Vergelijk hostingpakketten vanaf €99 per jaar, met SSL, dagelijkse back-ups en persoonlijke support.",
    canonical: "https://axaweb.nl/hosting",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Diensten", href: "/diensten" },
      { label: "Hosting" },
    ],
    head: {
      variant: "stats",
      eyebrow: "Hosting",
      title: "Hosting die er gewoon staat.",
      text: "Snelle en veilige hosting in Nederlandse datacenters, met SSL, dagelijkse back-ups en een aanspreekpunt dat je situatie kent.",
      actions: [
        { label: "Bekijk pakketten", href: "#pakketten", style: "primary" },
        { label: "Stel een vraag", href: "/contact", style: "secondary" },
      ],
      stats: [
        { value: "99,9%", label: "uptime-doelstelling" },
        { value: "Dagelijks", label: "automatische back-ups" },
        { value: "NL", label: "datacenters" },
        { value: "SSL", label: "standaard inbegrepen" },
      ],
    },
    sections: [
      {
        type: "pricing",
        id: "pakketten",
        eyebrow: "Pakketten",
        title: "Kies de hosting die bij je past.",
        plans: [
          {
            name: "Essentieel",
            price: "Vanaf €99",
            period: "per jaar",
            audience: "Voor websites die betrouwbaar online moeten staan.",
            featured: false,
            features: [
              "SSL-certificaat",
              "Dagelijkse back-ups",
              "Zakelijke e-mail",
              "Snelle SSD-opslag",
              "Support via e-mail",
            ],
            cta: "Vraag Essentieel aan",
            href: "/contact",
          },
          {
            name: "Zakelijk",
            price: "Vanaf €199",
            period: "per jaar",
            audience: "Voor bedrijven waar de website een belangrijke rol speelt.",
            featured: true,
            badge: "Meest gekozen",
            features: [
              "Alles uit Essentieel",
              "Meer opslag en snelheid",
              "Uptime-monitoring",
              "Prioriteit bij support",
              "Jaarlijkse performancecheck",
            ],
            cta: "Vraag Zakelijk aan",
            href: "/contact",
          },
          {
            name: "Volledig beheerd",
            price: "Op aanvraag",
            audience: "Hosting en onderhoud volledig uit handen, inclusief updates en monitoring.",
            featured: false,
            features: [
              "Alles uit Zakelijk",
              "Updates en onderhoud inbegrepen",
              "Proactieve monitoring",
              "Vaste contactpersoon",
              "SLA-afspraken mogelijk",
            ],
            cta: "Bespreek de mogelijkheden",
            href: "/contact",
          },
        ],
        note: "Alle bedragen zijn vanafprijzen. Je ontvangt altijd vooraf een duidelijk voorstel.",
      },
      {
        type: "specs",
        id: "specificaties",
        eyebrow: "Specificaties",
        title: "De techniek onder de motorkap.",
        items: [
          { term: "Opslag", detail: "Snelle SSD-opslag voor korte laadtijden." },
          { term: "SSL-certificaat", detail: "Standaard inbegrepen en automatisch verlengd." },
          { term: "E-mail", detail: "Zakelijke e-mailadressen op je eigen domeinnaam." },
          { term: "Locatie", detail: "Hosting in Nederlandse datacenters." },
          { term: "PHP en databases", detail: "Actuele PHP-versies en MySQL-databases." },
          { term: "Caching", detail: "Server-side caching en compressie voor extra snelheid." },
        ],
      },
      {
        type: "panels",
        id: "veiligheid",
        eyebrow: "Veiligheid, back-ups en support",
        title: "Standaard goed geregeld.",
        items: [
          {
            icon: "lock",
            title: "Veiligheid",
            points: [
              "Firewall en actuele serversoftware",
              "SSL op iedere website",
              "Beveiligingsmonitoring",
            ],
          },
          {
            icon: "database",
            title: "Back-ups",
            points: [
              "Dagelijkse automatische back-ups",
              "Bewaard op een externe locatie",
              "Snel terug te zetten bij problemen",
            ],
          },
          {
            icon: "user",
            title: "Support",
            points: [
              "Persoonlijk aanspreekpunt",
              "Reactie binnen één werkdag",
              "Hulp bij e-mail en domeinen",
            ],
          },
        ],
      },
      {
        type: "cta",
        title: "Zorgeloos gehost, meestal binnen één dag.",
        text: "We regelen de migratie van je huidige website, vrijwel altijd zonder merkbare onderbreking.",
        button: { label: "Vraag hosting aan", href: "/contact" },
      },
    ],
  },

  onderhoud: {
    slug: "onderhoud",
    navKey: "diensten",
    title: "Website onderhoud | AxaWeb",
    description:
      "Onderhoudsabonnementen vanaf €39 per maand: updates, monitoring en duidelijke SLA-reactietijden. Zo blijft je website snel, veilig en betrouwbaar.",
    canonical: "https://axaweb.nl/onderhoud",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Diensten", href: "/diensten" },
      { label: "Onderhoud" },
    ],
    head: {
      variant: "split",
      eyebrow: "Onderhoud",
      title: "Onderhoud dat problemen vóór is.",
      text: "Websites hebben onderhoud nodig om snel, veilig en betrouwbaar te blijven. Wij regelen updates, monitoring en support, met duidelijke afspraken.",
      actions: [
        { label: "Bekijk abonnementen", href: "#abonnementen", style: "primary" },
        { label: "Stel een vraag", href: "/contact", style: "secondary" },
      ],
      facts: {
        title: "In het kort",
        items: [
          "Updates zonder omkijken",
          "Monitoring met directe signalering",
          "Vaste reactietijden via SLA",
          "Maandelijks opzegbaar",
        ],
      },
    },
    sections: [
      {
        type: "pricing",
        id: "abonnementen",
        eyebrow: "Abonnementen",
        title: "Onderhoud dat past bij jouw website.",
        plans: [
          {
            name: "Basis",
            price: "Vanaf €39",
            period: "per maand",
            audience: "Voor websites die up-to-date en veilig moeten blijven.",
            featured: false,
            features: [
              "Periodieke updates van CMS en plugins",
              "Controle van back-ups",
              "Maandelijkse gezondheidscheck",
              "Support via e-mail",
            ],
            cta: "Kies Basis",
            href: "/contact",
          },
          {
            name: "Zakelijk",
            price: "Vanaf €79",
            period: "per maand",
            audience: "Voor bedrijven die op hun website moeten kunnen rekenen.",
            featured: true,
            badge: "Meest gekozen",
            features: [
              "Alles uit Basis",
              "Uptime- en foutmonitoring",
              "Prioriteit bij storingen",
              "Klein onderhoud en aanpassingen (1 uur per maand)",
              "Kwartaalrapportage",
            ],
            cta: "Kies Zakelijk",
            href: "/contact",
          },
          {
            name: "Op maat",
            price: "Op aanvraag",
            audience: "Voor maatwerkplatforms en organisaties met specifieke eisen.",
            featured: false,
            features: [
              "Alles uit Zakelijk",
              "SLA met vaste reactietijden",
              "Vast aantal ontwikkeluren",
              "Direct contact met je beheerder",
            ],
            cta: "Bespreek jouw situatie",
            href: "/contact",
          },
        ],
        note: "Alle bedragen zijn vanafprijzen, afgestemd op de omvang en techniek van je website. Maandelijks opzegbaar.",
      },
      {
        type: "checklists",
        id: "updates",
        eyebrow: "Updates",
        title: "Wat we voor je bijhouden.",
        groups: [
          {
            title: "Wat we updaten",
            items: [
              "CMS en plugins",
              "Beveiligingspatches",
              "PHP- en serversoftware",
              "Compatibiliteit na iedere update",
            ],
          },
          {
            title: "Hoe we te werk gaan",
            items: [
              "Altijd eerst een verse back-up",
              "Updates getest na installatie",
              "Direct teruggedraaid bij problemen",
              "Korte terugkoppeling van wat er is gedaan",
            ],
          },
        ],
      },
      {
        type: "features",
        id: "monitoring",
        eyebrow: "Monitoring",
        title: "Wij zien het voordat jij het merkt.",
        items: [
          {
            icon: "activity",
            title: "Uptime-monitoring",
            text: "Continue controle of je website bereikbaar is, met directe signalering bij storingen.",
          },
          {
            icon: "gauge",
            title: "Prestaties",
            text: "Periodieke controle van snelheid en laadtijden, zodat de site vlot blijft aanvoelen.",
          },
          {
            icon: "shield",
            title: "Beveiliging en certificaten",
            text: "Signalering van verdachte activiteit en van verlopende SSL-certificaten of domeinen.",
          },
        ],
      },
      {
        type: "sla",
        id: "sla",
        eyebrow: "SLA",
        title: "Duidelijke reactietijden, zwart op wit.",
        rows: [
          { level: "Kritiek", example: "Website offline of onbruikbaar", response: "Reactie binnen 4 uur" },
          { level: "Hoog", example: "Belangrijke functie werkt niet", response: "Reactie binnen 1 werkdag" },
          { level: "Normaal", example: "Kleine aanpassing of vraag", response: "Reactie binnen 2 werkdagen" },
        ],
        note: "Reactietijden gelden op werkdagen en zijn onderdeel van de abonnementen Zakelijk en Op maat.",
      },
      {
        type: "cta",
        title: "Nooit meer omkijken naar updates?",
        text: "Vertel ons welke website je hebt. We adviseren het abonnement dat daarbij past.",
        button: { label: "Vraag onderhoud aan", href: "/contact" },
      },
    ],
  },

  projecten: {
    slug: "projecten",
    navKey: "projecten",
    title: "Projecten | AxaWeb",
    description:
      "Een selectie van websites, webshops en maatwerkprojecten van AxaWeb, gebouwd met aandacht voor uitstraling, techniek en resultaat.",
    canonical: "https://axaweb.nl/projecten",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Projecten" }],
    head: {
      variant: "center",
      eyebrow: "Projecten",
      title: "Werk waar we achter staan.",
      text: "Een selectie van websites, webshops en maatwerkprojecten, gebouwd met aandacht voor uitstraling, techniek en resultaat.",
    },
    sections: [
      {
        type: "portfolio",
        id: "portfolio",
        items: [
          {
            category: "Zakelijke website",
            title: "Professionele bedrijfswebsite",
            text: "Een heldere online basis met sterke uitstraling en focus op offerteaanvragen.",
            tags: ["Maatwerk design", "SEO-basis", "Contactflow"],
          },
          {
            category: "Webshop",
            title: "Online verkoopplatform",
            text: "Overzichtelijke webshop met soepel bestelproces en eenvoudig beheer.",
            tags: ["iDEAL", "Productbeheer", "Conversie"],
          },
          {
            category: "Maatwerk platform",
            title: "Digitale maatwerkoplossing",
            text: "Schaalbaar platform met functionaliteiten rond specifieke bedrijfsprocessen.",
            tags: ["Maatwerk", "API-koppeling", "Dashboard"],
          },
          {
            category: "Horeca",
            title: "Restaurantwebsite met reserveringen",
            text: "Sfeervolle website met menukaart en een laagdrempelige reserveringsflow.",
            tags: ["Reserveringen", "Menukaart", "Lokale SEO"],
          },
          {
            category: "Bouw en installatie",
            title: "Website voor installatiebedrijf",
            text: "Dienstgerichte website die vakmanschap laat zien en aanvragen binnenhaalt.",
            tags: ["Dienstenstructuur", "Projectgalerij", "Offerteformulier"],
          },
          {
            category: "Creatieve sector",
            title: "Portfolio voor fotograaf",
            text: "Beeldgedreven portfolio waarin het werk centraal staat en razendsnel laadt.",
            tags: ["Portfolio", "Beeldoptimalisatie", "Minimalistisch"],
          },
        ],
        note: "Benieuwd wat we in jouw sector kunnen betekenen? Tijdens een kennismaking laten we graag relevante voorbeelden zien.",
      },
      {
        type: "cta",
        title: "Jouw project als volgende?",
        text: "Vertel ons over je plannen. We denken vrijblijvend mee over de beste aanpak.",
        button: { label: "Start een project", href: "/contact" },
      },
    ],
  },

  contact: {
    slug: "contact",
    navKey: "contact",
    title: "Contact | AxaWeb",
    description:
      "Neem contact op met AxaWeb voor websites, webshops, hosting of onderhoud. Je ontvangt binnen één werkdag een persoonlijke reactie.",
    canonical: "https://axaweb.nl/contact",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Contact" }],
    head: {
      variant: "minimal",
      eyebrow: "Contact",
      title: "Laten we kennismaken.",
      text: "Vertel ons over je project of stel je vraag. Je ontvangt binnen één werkdag een persoonlijke reactie.",
    },
    sections: [
      {
        type: "contact",
        id: "formulier",
        info: [
          { icon: "mail", label: "E-mail", value: "info@axaweb.nl", href: "mailto:info@axaweb.nl" },
          { icon: "pin", label: "Locatie", value: "Dieren, Nederland" },
          { icon: "bolt", label: "Reactietijd", value: "Binnen één werkdag" },
        ],
        steps: {
          title: "Wat je kunt verwachten",
          items: [
            "Binnen één werkdag een persoonlijke reactie",
            "Vrijblijvend gesprek over je wensen en planning",
            "Heldere offerte met vaste vanafprijzen",
          ],
        },
        projectTypes: ["Website", "Webshop", "Hosting", "Onderhoud", "Maatwerkoplossing", "Anders"],
        budgetOptions: [
          "Nog niet bepaald",
          "Tot €1.000",
          "€1.000 – €2.500",
          "€2.500 – €5.000",
          "Vanaf €5.000",
        ],
      },
      {
        type: "faq",
        id: "faq",
        eyebrow: "Veelgestelde vragen",
        title: "Eerst nog even dit.",
        items: [
          {
            question: "Hoe snel krijg ik reactie?",
            answer:
              "Je ontvangt binnen één werkdag een persoonlijke reactie. Meestal plannen we daarna snel een korte kennismaking in.",
          },
          {
            question: "Wat kost een website of webshop?",
            answer:
              "Websites starten vanaf €495. De uiteindelijke investering hangt af van ontwerp, omvang en functionaliteiten. Je ontvangt altijd vooraf een duidelijke offerte.",
          },
          {
            question: "Kan ik ook alleen hosting of onderhoud afnemen?",
            answer:
              "Ja. Hosting en onderhoud zijn los af te nemen, ook voor websites die niet door ons zijn gebouwd. We kijken eerst kort mee of alles technisch overdraagbaar is.",
          },
          {
            question: "Werken jullie ook met bestaande websites?",
            answer:
              "Ja. We kunnen bestaande websites overnemen, verbeteren of migreren naar onze hosting, meestal zonder merkbare onderbreking.",
          },
        ],
      },
    ],
  },
};

export const pageSlugs = Object.keys(pages);
