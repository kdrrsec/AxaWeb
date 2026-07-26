/** Content voor dienstpagina's — bron voor build + eventuele client-side hergebruik */

export const sharedWhy = [
  {
    title: "Maatwerk",
    text: "Geen generieke templates, maar een oplossing die aansluit op het bedrijf, de doelgroep en de ambities.",
  },
  {
    title: "Snelheid",
    text: "Websites worden gebouwd met aandacht voor prestaties, gebruiksgemak en technische kwaliteit.",
  },
  {
    title: "Betrouwbaarheid",
    text: "Heldere afspraken, veilige hosting, back-ups en ondersteuning wanneer dat nodig is.",
  },
  {
    title: "Persoonlijke aanpak",
    text: "Eén vast aanspreekpunt, korte lijnen en duidelijke communicatie gedurende het hele traject.",
  },
];

export const servicePages = {
  diensten: {
    slug: "diensten",
    title: "Diensten | AxaWeb — Digitale partner voor ondernemers",
    description:
      "Ontdek de diensten van AxaWeb: maatwerk websites, webshops, hosting, onderhoud en technische ondersteuning.",
    canonical: "https://axaweb.nl/diensten",
    hero: {
      title: "Digitale diensten die jouw bedrijf vooruit helpen.",
      text: "Van een sterke website tot betrouwbare hosting en onderhoud. AxaWeb levert complete online oplossingen met één vast aanspreekpunt.",
      primaryCta: { label: "Offerte aanvragen", href: "/#contact" },
      secondaryCta: { label: "Bekijk websites", href: "/websites" },
    },
    intro: {
      eyebrow: "Overzicht",
      title: "Alles onder één dak.",
      text: "Als digitale partner combineren we design, techniek en ondersteuning. Zo bouw je niet alleen een website, maar een online basis die meegroeit met je onderneming.",
    },
    benefits: {
      eyebrow: "Wat je krijgt",
      title: "Diensten die in elkaar grijpen.",
      items: [
        {
          icon: "layout",
          title: "Websites",
          text: "Maatwerk websites die vertrouwen uitstralen, snel laden en bezoekers overtuigen.",
          href: "/websites",
        },
        {
          icon: "cart",
          title: "Webshops",
          text: "Conversiegerichte webshops met overzichtelijk beheer en ruimte om te groeien.",
          href: "/webshops",
        },
        {
          icon: "server",
          title: "Hosting",
          text: "Snelle, veilige hosting met SSL, back-ups en persoonlijke ondersteuning.",
          href: "/hosting",
        },
        {
          icon: "wrench",
          title: "Onderhoud",
          text: "Updates, monitoring en technische support zodat je site betrouwbaar blijft draaien.",
          href: "/onderhoud",
        },
      ],
    },
    process: {
      eyebrow: "Werkwijze",
      title: "Van kennismaking tot livegang.",
      steps: [
        { number: "01", title: "Kennismaking", text: "We bespreken je doelen, doelgroep en wat er technisch en visueel nodig is." },
        { number: "02", title: "Voorstel", text: "Je ontvangt een helder plan met scope, planning en een duidelijke offerte." },
        { number: "03", title: "Uitvoering", text: "We bouwen, testen en optimaliseren — met korte lijnen en tussentijdse afstemming." },
        { number: "04", title: "Nazorg", text: "Na oplevering blijven we beschikbaar voor hosting, onderhoud en verdere groei." },
      ],
    },
    faqs: [
      {
        question: "Welke diensten kan ik combineren?",
        answer:
          "Je kunt websites of webshops combineren met hosting en onderhoud. We stemmen het pakket af op wat jouw bedrijf nu nodig heeft — en wat later logisch volgt.",
      },
      {
        question: "Werken jullie alleen met nieuwe projecten?",
        answer:
          "Nee. We bouwen nieuwe websites en webshops, maar helpen ook bij het overzetten, verbeteren of onderhouden van bestaande online omgevingen.",
      },
      {
        question: "Hoe snel kan ik starten?",
        answer:
          "Na de kennismaking ontvang je een voorstel. Zodra scope en planning akkoord zijn, plannen we de start in — meestal binnen enkele werkdagen.",
      },
      {
        question: "Blijf ik één aanspreekpunt houden?",
        answer:
          "Ja. Je werkt met een vast contactpersoon, ook wanneer hosting of onderhoud later aan het traject worden toegevoegd.",
      },
    ],
    cta: {
      title: "Klaar om de juiste digitale basis te leggen?",
      text: "Vertel ons waar je staat. We denken mee over de juiste diensten, planning en investering.",
      button: { label: "Neem contact op", href: "/#contact" },
    },
  },

  websites: {
    slug: "websites",
    title: "Websites | AxaWeb — Professionele maatwerkwebsites",
    description:
      "AxaWeb bouwt professionele maatwerkwebsites die vertrouwen uitstralen, snel laden en bezoekers overtuigen.",
    canonical: "https://axaweb.nl/websites",
    hero: {
      title: "Websites die vertrouwen wekken en resultaat opleveren.",
      text: "Een sterke website is meer dan een visitekaartje. Wij ontwerpen en bouwen maatwerk sites die jouw merk scherp neerzetten en bezoekers in beweging brengen.",
      primaryCta: { label: "Offerte aanvragen", href: "/#contact" },
      secondaryCta: { label: "Bekijk pakketten", href: "/#pakketten" },
    },
    intro: {
      eyebrow: "Websites",
      title: "Maatwerk met focus op uitstraling en prestaties.",
      text: "Elke website bouwen we rond jouw bedrijf, doelgroep en doelen. Strak design, heldere structuur, snelle techniek — zonder generieke templates.",
    },
    benefits: {
      eyebrow: "Voordelen",
      title: "Waarom ondernemers voor AxaWeb kiezen.",
      items: [
        { icon: "craft", title: "Uniek ontwerp", text: "Een uitstraling die past bij jouw merk — geen standaard thema’s die overal terugkomen." },
        { icon: "bolt", title: "Snel en responsive", text: "Gebouwd voor desktop, tablet en mobiel, met aandacht voor laadtijd en gebruiksgemak." },
        { icon: "layout", title: "Duidelijke structuur", text: "Bezoekers vinden snel wat ze zoeken. Jij stuurt ze gericht naar contact of conversie." },
        { icon: "shield", title: "Technisch stevig", text: "SEO-basis, SSL, schone code en een opzet die later eenvoudig uit te breiden is." },
      ],
    },
    process: {
      eyebrow: "Werkwijze",
      title: "Zo komt jouw website tot stand.",
      steps: [
        { number: "01", title: "Kennismaking", text: "We brengen merk, doelgroep, content en gewenste functionaliteiten in kaart." },
        { number: "02", title: "Structuur en ontwerp", text: "We bepalen pagina’s, navigatie en een ontwerp dat professioneel en herkenbaar is." },
        { number: "03", title: "Bouw en optimalisatie", text: "We ontwikkelen responsive, testen grondig en stemmen details met jou af." },
        { number: "04", title: "Livegang", text: "Na controle zetten we de site live en regelen we desgewenst hosting en onderhoud." },
      ],
    },
    faqs: [
      {
        question: "Hoe lang duurt het bouwen van een website?",
        answer:
          "Dat hangt af van omvang en content. Een gerichte onepage kan vaak binnen enkele werkdagen; grotere sites vragen meer doorlooptijd. Je krijgt vooraf een realistische planning.",
      },
      {
        question: "Wat kost een professionele website?",
        answer:
          "Onze webpakketten starten vanaf €495. De uiteindelijke investering hangt af van ontwerp, pagina’s en functionaliteiten. Je ontvangt altijd vooraf een duidelijke offerte.",
      },
      {
        question: "Kan ik later pagina’s toevoegen?",
        answer:
          "Ja. We bouwen schaalbaar, zodat extra pagina’s, formulieren of koppelingen later logisch kunnen worden toegevoegd.",
      },
      {
        question: "Regelen jullie ook hosting?",
        answer:
          "Ja. We kunnen hosting, SSL en back-ups voor je regelen. Bekijk onze hostingmogelijkheden of vraag ernaar in het contactformulier.",
      },
    ],
    related: [
      { label: "Webshops", href: "/webshops" },
      { label: "Hosting", href: "/hosting" },
      { label: "Onderhoud", href: "/onderhoud" },
    ],
    cta: {
      title: "Klaar voor een website die jouw bedrijf serieus neerzet?",
      text: "Vertel ons over je bedrijf en ambities. We denken mee over structuur, ontwerp en een realistische planning.",
      button: { label: "Vraag een offerte aan", href: "/#contact" },
    },
  },

  webshops: {
    slug: "webshops",
    title: "Webshops | AxaWeb — Professionele online verkoop",
    description:
      "AxaWeb ontwikkelt gebruiksvriendelijke webshops waarmee ondernemers producten en diensten professioneel online verkopen.",
    canonical: "https://axaweb.nl/webshops",
    hero: {
      title: "Webshops die verkopen zonder gedoe.",
      text: "Wij bouwen overzichtelijke, conversiegerichte webshops die prettig werken voor klanten én voor jou als beheerder.",
      primaryCta: { label: "Bespreek jouw webshop", href: "/#contact" },
      secondaryCta: { label: "Alle diensten", href: "/diensten" },
    },
    intro: {
      eyebrow: "Webshops",
      title: "Online verkopen met rust en overzicht.",
      text: "Een goede webshop combineert aantrekkelijke presentatie met een soepel bestelproces. Wij richten de shop in op jouw producten, logistiek en groeidoelen.",
    },
    benefits: {
      eyebrow: "Voordelen",
      title: "Gebouwd om te verkopen én te beheren.",
      items: [
        { icon: "cart", title: "Conversiegericht", text: "Duidelijke productpagina’s, een helder pad naar checkout en minder frictie voor de klant." },
        { icon: "layout", title: "Overzichtelijk beheer", text: "Producten, voorraad en bestellingen beheer je zonder technische rompslomp." },
        { icon: "bolt", title: "Snel en betrouwbaar", text: "Performance en stabiliteit staan centraal — ook bij groeiend verkeer." },
        { icon: "craft", title: "Schaalbaar opgezet", text: "Start lean en breid later uit met extra functionaliteiten of koppelingen." },
      ],
    },
    process: {
      eyebrow: "Werkwijze",
      title: "Van assortiment tot live webshop.",
      steps: [
        { number: "01", title: "Kennismaking", text: "We bespreken producten, betaalwijzen, verzending en wat jouw klanten verwachten." },
        { number: "02", title: "Structuur en ontwerp", text: "We bepalen categorieën, shopflow en een ontwerp dat vertrouwen uitstraalt." },
        { number: "03", title: "Inrichting en testen", text: "We bouwen de shop, koppelen benodigde onderdelen en testen het volledige bestelproces." },
        { number: "04", title: "Livegang en support", text: "Na controle gaan we live. Desgewenst regelen we hosting, onderhoud en verdere optimalisatie." },
      ],
    },
    faqs: [
      {
        question: "Bouwen jullie ook kleinere webshops?",
        answer:
          "Ja. Of je nu een compact assortiment hebt of groeit naar meer producten: we schalen de opzet af op jouw situatie.",
      },
      {
        question: "Kan ik zelf producten beheren?",
        answer:
          "Ja. We richten het beheer zo in dat je zelf producten, prijzen en content kunt bijwerken — met instructie waar nodig.",
      },
      {
        question: "Werken jullie met bestaande betaalproviders?",
        answer:
          "We stemmen betaal- en verzendopties af op wat past bij jouw bedrijf. Welke koppelingen mogelijk zijn, bespreken we in het voortraject.",
      },
      {
        question: "Is onderhoud belangrijk bij een webshop?",
        answer:
          "Zeker. Updates, beveiliging en monitoring zijn extra relevant wanneer er bestellingen en klantgegevens doorheen lopen. Bekijk onze onderhoudsdienst voor de mogelijkheden.",
      },
    ],
    related: [
      { label: "Websites", href: "/websites" },
      { label: "Hosting", href: "/hosting" },
      { label: "Onderhoud", href: "/onderhoud" },
    ],
    cta: {
      title: "Klaar om online te verkopen?",
      text: "Vertel ons over je assortiment en doelen. We geven eerlijk advies over aanpak, planning en investering.",
      button: { label: "Plan een gesprek", href: "/#contact" },
    },
  },

  hosting: {
    slug: "hosting",
    title: "Hosting | AxaWeb — Snel, veilig en persoonlijk",
    description:
      "Hosting bij AxaWeb: snelle en veilige hosting met SSL, automatische back-ups, zakelijke e-mail en persoonlijke support. Vanaf €99 per jaar.",
    canonical: "https://axaweb.nl/hosting",
    hero: {
      title: "Hosting die je niet hoeft te begrijpen om erop te vertrouwen.",
      text: "Wij zorgen voor een snelle, veilige omgeving met SSL, back-ups en persoonlijke ondersteuning — zodat jij je op je bedrijf kunt richten.",
      primaryCta: { label: "Vraag hosting aan", href: "/#contact" },
      secondaryCta: { label: "Bekijk onderhoud", href: "/onderhoud" },
    },
    intro: {
      eyebrow: "Hosting",
      title: "Een stabiele basis voor je online aanwezigheid.",
      text: "Goede hosting is onzichtbaar als het werkt — en cruciaal als het misgaat. AxaWeb biedt hosting vanaf €99 per jaar, met korte lijnen wanneer je ons nodig hebt.",
    },
    benefits: {
      eyebrow: "Inbegrepen",
      title: "Wat je van AxaWeb-hosting mag verwachten.",
      items: [
        { icon: "shield", title: "SSL-certificaat", text: "Veilige verbinding voor bezoekers en een professionele uitstraling in de browser." },
        { icon: "server", title: "Automatische back-ups", text: "Regelmatige back-ups zodat je niet alles kwijt bent bij een incident." },
        { icon: "mail", title: "Zakelijke e-mail", text: "E-mailadressen op je eigen domein, passend bij een professionele uitstraling." },
        { icon: "user", title: "Persoonlijke support", text: "Geen anoniem ticketcircus: je hebt een aanspreekpunt dat je situatie kent." },
      ],
    },
    process: {
      eyebrow: "Werkwijze",
      title: "Zo zetten we hosting voor je klaar.",
      steps: [
        { number: "01", title: "Inventarisatie", text: "We kijken naar je huidige site, domein en wat er technisch nodig is." },
        { number: "02", title: "Inrichting", text: "We zetten hosting, SSL en desgewenst e-mail zorgvuldig voor je op." },
        { number: "03", title: "Migratie", text: "Heb je al een website? Dan verzorgen we een gecontroleerde overzetting." },
        { number: "04", title: "Beheer", text: "Na livegang blijven we bereikbaar. Onderhoud kan optioneel worden toegevoegd." },
      ],
    },
    faqs: [
      {
        question: "Wat kost hosting bij AxaWeb?",
        answer:
          "Hosting start vanaf €99 per jaar. De exacte invulling hangt af van je site en eventuele extra’s zoals e-mail. Je ontvangt vooraf een duidelijke offerte.",
      },
      {
        question: "Kan ik mijn bestaande domeinnaam behouden?",
        answer:
          "Ja. We kunnen je bestaande domein koppelen of helpen bij de overzetting, zodat je online adres behouden blijft.",
      },
      {
        question: "Garanderen jullie 100% uptime?",
        answer:
          "Nee. We werken met betrouwbare infrastructuur en monitoring, maar beloven geen onhaalbare 100% uptime. Wel reageren we snel wanneer er iets speelt.",
      },
      {
        question: "Is onderhoud hetzelfde als hosting?",
        answer:
          "Nee. Hosting is de technische omgeving. Onderhoud gaat over updates, controles en doorlopende technische zorg. Die diensten kun je combineren, maar ze zijn optioneel en apart af te stemmen.",
      },
    ],
    related: [
      { label: "Onderhoud", href: "/onderhoud" },
      { label: "Websites", href: "/websites" },
      { label: "Webshops", href: "/webshops" },
    ],
    cta: {
      title: "Wil je hosting zonder zorgen?",
      text: "Laat weten wat je nu draait of plant. We adviseren eerlijk over hosting en eventueel onderhoud.",
      button: { label: "Neem contact op", href: "/#contact" },
    },
  },

  onderhoud: {
    slug: "onderhoud",
    title: "Onderhoud | AxaWeb — Updates, monitoring en support",
    description:
      "Website-onderhoud door AxaWeb: updates, monitoring, beveiliging en technische ondersteuning met een vast aanspreekpunt.",
    canonical: "https://axaweb.nl/onderhoud",
    hero: {
      title: "Onderhoud dat je website gezond houdt.",
      text: "Updates, monitoring en snelle support — zodat kleine problemen niet uitgroeien tot stilstand of veiligheidsrisico’s.",
      primaryCta: { label: "Vraag onderhoud aan", href: "/#contact" },
      secondaryCta: { label: "Bekijk hosting", href: "/hosting" },
    },
    intro: {
      eyebrow: "Onderhoud",
      title: "Techniek die op orde blijft, ook na livegang.",
      text: "Een website is geen eenmalig project. Plugins, systemen en beveiliging vragen aandacht. Met AxaWeb-onderhoud houd je grip zonder zelf technisch specialist te hoeven zijn.",
    },
    benefits: {
      eyebrow: "Voordelen",
      title: "Wat onderhoud concreet oplevert.",
      items: [
        { icon: "wrench", title: "Periodieke updates", text: "We houden kernsystemen en relevante onderdelen bij, met oog voor stabiliteit." },
        { icon: "shield", title: "Controle en monitoring", text: "We houden de site in de gaten en grijpen in wanneer iets afwijkends speelt." },
        { icon: "bolt", title: "Snel aanspreekpunt", text: "Bij vragen of storingen weet je wie je bereikt — zonder omwegen." },
        { icon: "server", title: "Past bij hosting", text: "Onderhoud combineert goed met AxaWeb-hosting, maar is ook apart af te nemen.", href: "/hosting" },
      ],
    },
    process: {
      eyebrow: "Werkwijze",
      title: "Zo pakken we onderhoud aan.",
      steps: [
        { number: "01", title: "Intake", text: "We bekijken je huidige site, stack en waar de risico’s of knelpunten liggen." },
        { number: "02", title: "Afspraken", text: "We leggen vast wat onderhoud inhoudt: frequentie, scope en bereikbaarheid." },
        { number: "03", title: "Uitvoering", text: "Updates, controles en fixes gebeuren gepland — met melding wanneer relevant." },
        { number: "04", title: "Doorlopend", text: "Je houdt één partner voor vragen, verbeteringen en technische rust." },
      ],
    },
    faqs: [
      {
        question: "Is onderhoud verplicht?",
        answer:
          "Nee. Onderhoud is optioneel en hangt af van je pakket en wensen. Voor webshops en bedrijfskritische sites raden we het wel sterk aan.",
      },
      {
        question: "Wat valt er onder onderhoud?",
        answer:
          "Denk aan updates, monitoring, beveiligingscontroles en technische support. Exacte inhoud stemmen we af in de overeenkomst — zonder vage beloftes.",
      },
      {
        question: "Onderhouden jullie ook sites die elders gehost worden?",
        answer:
          "In veel gevallen wel, afhankelijk van toegang en techniek. Tijdens de intake bepalen we of dat verantwoord en efficiënt kan.",
      },
      {
        question: "Hoe snel reageren jullie bij problemen?",
        answer:
          "Je hebt een vast aanspreekpunt en we reageren zo snel mogelijk binnen de afgesproken kaders. Prioriteit hangt af van de ernst van het probleem.",
      },
    ],
    related: [
      { label: "Hosting", href: "/hosting" },
      { label: "Websites", href: "/websites" },
      { label: "Webshops", href: "/webshops" },
    ],
    cta: {
      title: "Wil je technische rust na livegang?",
      text: "Vertel ons over je huidige website. We geven een helder voorstel voor onderhoud — alleen wat je echt nodig hebt.",
      button: { label: "Vraag een voorstel aan", href: "/#contact" },
    },
  },
};

export const servicePageSlugs = Object.keys(servicePages);
