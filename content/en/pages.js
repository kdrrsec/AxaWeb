/*
 * Page definitions for the multipage site.
 * Each page has its own purpose, hero variant, and unique sections.
 * The generator (scripts/generate-pages.js) renders different markup per section type.
 * Prices come from data/pricing.js (no hardcoded amounts here).
 */

import {
  formatEuro,
  getOneTimeFromPrice,
  getWaasFromPrice,
  getHostingFromPrice,
  getMaintenanceFromPrice,
} from "../../data/pricing.js";

export const siteNav = [
  { label: "Services", href: "/services", key: "diensten" },
  { label: "Packages", href: "/packages", key: "pakketten" },
  { label: "Projects", href: "/projects", key: "projecten" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export const pages = {
  diensten: {
    slug: "services",
    navKey: "diensten",
    path: "/services",
    title: "Services | Websites, Web Shops, Hosting & Maintenance | AxaWeb",
    description:
      "Custom websites, web shops, hosting, and maintenance - from one digital partner.",
    canonical: "https://axaweb.nl/en/services",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Services" }],
    head: {
      variant: "center",
      eyebrow: "Services",
      title: "One partner for everything you need online.",
      text: "From design and development to hosting and maintenance. Four focused services - strong alone, stronger together.",
    },
    sections: [
      {
        type: "serviceRows",
        id: "overzicht",
        eyebrow: "What we offer",
        title: "Four services, one point of contact.",
        rows: [
          {
            title: "Websites",
            text: "Custom websites that build trust and turn visitors into enquiries.",
            points: [
              "Unique design based on your brand",
              "Responsive and optimised for speed",
              "SEO foundation and a clear structure",
            ],
            link: { label: "Explore websites", href: "/websites" },
          },
          {
            title: "Web shops",
            text: "Conversion-focused online stores with simple management and reliable payments.",
            points: [
              "Smooth checkout with iDEAL and more",
              "Straightforward product and stock management",
              "Scalable with your catalogue and growth",
            ],
            link: { label: "Explore web shops", href: "/webshops" },
          },
          {
            title: "Hosting",
            text: "Fast, secure hosting with everything included - without the technical overhead.",
            points: [
              "SSL and automatic backups",
              "Business email on your own domain",
              "Personal support, not a ticket queue",
            ],
            link: { label: "Explore hosting", href: "/hosting" },
          },
          {
            title: "Maintenance",
            text: "Updates, monitoring, and support that stay ahead of problems - not just fix them after the fact.",
            points: [
              "Scheduled updates and checks",
              "Monitoring from the Business plan upward",
              "Response times based on your plan or SLA",
            ],
            link: { label: "Explore maintenance", href: "/maintenance" },
          },
        ],
      },
      {
        type: "compare",
        id: "vergelijking",
        eyebrow: "Comparison",
        title: "Which service fits your business?",
        intro:
          "Compare purpose, scope, and outcome at a glance.",
        columns: ["Website", "Website as a Service", "Hosting", "Maintenance"],
        rows: [
          {
            label: "Type",
            values: [
              "One-time investment",
              "Monthly subscription",
              "Annual subscription",
              "Monthly subscription",
            ],
          },
          {
            label: "Best for",
            values: [
              "Businesses that want a custom website built",
              "Businesses that want website, hosting, and maintenance in one subscription",
              "Anyone with a website or web shop",
              "Website owners who want less technical overhead",
            ],
          },
          {
            label: "Outcome",
            values: [
              "A professional custom website",
              "An industry-focused website with hosting and maintenance",
              "A fast, secure environment",
              "A stable, up-to-date website",
            ],
          },
          {
            label: "Investment",
            values: [
              `From ${formatEuro(getOneTimeFromPrice(), "en")}`,
              `From ${formatEuro(getWaasFromPrice(), "en")} / month on a 12-month term`,
              `From ${formatEuro(getHostingFromPrice(), "en")} / year on a 12-month term`,
              `From ${formatEuro(getMaintenanceFromPrice(), "en")} / month on a 12-month term`,
            ],
          },
          {
            label: "Timeline",
            values: ["From 5 business days", "By arrangement", "Immediate activation", "Ongoing"],
          },
          {
            label: "Pairs well with",
            values: [
              "Hosting and maintenance",
              "Hosting and maintenance included",
              "Maintenance",
              "Hosting",
            ],
          },
        ],
        note: "Unsure, or looking to combine services? We’ll recommend a setup that fits.",
      },
      {
        type: "cta",
        title: "Not sure where to begin?",
        text: "Tell us what you want to achieve. We’ll recommend a clear setup - no obligation.",
        button: { label: "Schedule an intro call", href: "/contact" },
      },
    ],
  },

  websites: {
    slug: "websites",
    navKey: "diensten",
    path: "/websites",
    title: "Custom Website Design & Development | AxaWeb",
    description:
      "Custom websites by AxaWeb - with solid SEO foundations, fast load times, and clear starting prices. View packages and case studies.",
    canonical: "https://axaweb.nl/en/websites",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Websites" },
    ],
    head: {
      variant: "split",
      eyebrow: "Websites",
      title: "A website that builds trust and brings in clients.",
      text: "A custom website that positions your brand clearly and helps visitors take the next step.",
      actions: [
        { label: "Request a quote", href: "/quote", style: "primary" },
        { label: "View our work", href: "/projects", style: "secondary" },
      ],
      facts: {
        title: "At a glance",
        items: [
          "100% custom - no off-the-shelf themes",
          "Responsive on every screen",
          "SEO and performance built in from the start",
          `Packages from ${formatEuro(getOneTimeFromPrice(), "en")}`,
        ],
      },
    },
    sections: [
      {
        type: "features",
        id: "functionaliteiten",
        eyebrow: "Capabilities",
        title: "Everything a modern website needs.",
        items: [
          {
            icon: "craft",
            title: "Custom design",
            text: "A unique design that fits your brand, audience, and goals.",
          },
          {
            icon: "layout",
            title: "Clear structure",
            text: "Logical pages and navigation so visitors find what they need right away.",
          },
          {
            icon: "search",
            title: "SEO foundation",
            text: "Clean semantics, metadata, and indexability - built in from the start.",
          },
          {
            icon: "gauge",
            title: "High performance",
            text: "Optimised images, minimal scripts, and smart caching for short load times.",
          },
          {
            icon: "plug",
            title: "Forms and integrations",
            text: "Contact forms, maps, or booking integrations - tailored to how you work.",
          },
          {
            icon: "trend",
            title: "Built to grow",
            text: "A scalable setup so extra pages and features are easy to add later.",
          },
        ],
      },
      {
        type: "timeline",
        id: "proces",
        eyebrow: "The process",
        title: "From introduction to launch.",
        intro: "A clear process with fixed steps and no surprises.",
        steps: [
          {
            title: "Introduction",
            text: "We discuss your business, audience, and goals. You share; we listen and ask sharp questions.",
            meta: "Step 1 · no obligation",
          },
          {
            title: "Proposal and quote",
            text: "You receive a clear proposal with structure, timeline, and a fixed starting price.",
            meta: "Step 2",
          },
          {
            title: "Design",
            text: "We design the key pages and refine until everything aligns with your brand.",
            meta: "Step 3",
          },
          {
            title: "Development",
            text: "We build a responsive, fast, and technically sound website that can grow with you.",
            meta: "Step 4",
          },
          {
            title: "Launch and aftercare",
            text: "After a final check, the site goes live. We’re then available for hosting and maintenance.",
            meta: "Step 5",
          },
        ],
      },
      {
        type: "pricing",
        id: "prijzen",
        catalog: "oneTime",
        i18nKey: "oneTime",
        footerLink: { label: "View all packages", href: "/packages", i18nKey: null },
      },
      {
        type: "cases",
        id: "cases",
        eyebrow: "Case studies",
        title: "Live projects with a clear approach.",
        items: [
          {
            tag: "Bandendepot",
            title: "Conversion-focused B2C website",
            text: "A clear website for an online tyre retailer, with a short path to a quote and advice.",
            results: [
              "Strong hero with a clear promise",
              "Quote form with relevant tyre fields",
              "Desktop- and mobile-friendly structure",
            ],
          },
          {
            tag: "Axanet",
            title: "Premium B2B website for IT management",
            text: "A calm site for service desk, workplace management, and Microsoft 365, with a direct introduction flow.",
            results: [
              "Split hero with strong hierarchy",
              "Scannable service cards",
              "Consistent CTA to an introduction",
            ],
          },
        ],
        footerLink: { label: "View all projects", href: "/projects" },
      },
      {
        type: "cta",
        title: "Ready for a website that earns trust?",
        text: "Request a quote with no obligation. You’ll hear back personally within one business day.",
        button: { label: "Request a quote", href: "/quote" },
      },
    ],
  },

  webshops: {
    slug: "webshops",
    navKey: "diensten",
    path: "/webshops",
    title: "Custom Web Shop Development | AxaWeb",
    description:
      "Conversion-focused web shops by AxaWeb - with payments, inventory management, and room to scale. Request a quote.",
    canonical: "https://axaweb.nl/en/webshops",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Web shops" },
    ],
    head: {
      variant: "split",
      eyebrow: "Web shops",
      title: "A web shop that sells - and stays easy to manage.",
      text: "We build conversion-focused online stores that feel simple for customers and easy for your team to run - from the first product to a growing catalogue.",
      actions: [
        { label: "Request a quote", href: "/quote", style: "primary" },
        { label: "View integrations", href: "#integraties", style: "secondary" },
      ],
      facts: {
        title: "At a glance",
        items: [
          "Smooth checkout with iDEAL",
          "Manage products and stock yourself",
          "Integrations with shipping and accounting",
          "Built with room to scale",
        ],
      },
    },
    sections: [
      {
        type: "features",
        id: "features",
        eyebrow: "Features",
        title: "Designed to sell. Simple to manage.",
        items: [
          {
            icon: "box",
            title: "Product management",
            text: "Manage products, variants, and stock yourself with ease - no technical knowledge required.",
          },
          {
            icon: "card",
            title: "Payments",
            text: "iDEAL, credit card, and more via trusted payment providers, handled securely.",
          },
          {
            icon: "cart",
            title: "Smooth checkout",
            text: "A short, clear order flow that removes friction and lifts conversion.",
          },
          {
            icon: "truck",
            title: "Shipping and delivery",
            text: "Shipping methods, rates, and track & trace tailored to your logistics.",
          },
          {
            icon: "chart",
            title: "Insight and reporting",
            text: "Clear insight into visitors, orders, and revenue - so decisions rest on real numbers.",
          },
          {
            icon: "shield",
            title: "Secure and stable",
            text: "SSL, updates, and backups keep your shop running safely.",
          },
        ],
      },
      {
        type: "integrations",
        id: "integraties",
        eyebrow: "Integrations",
        title: "Connect your web shop to the tools you already use.",
        intro:
          "A web shop doesn’t stand alone. We connect payments, shipping, and admin tools so everything runs smoothly.",
        items: [
          { title: "iDEAL", text: "The standard for online payments in the Netherlands." },
          { title: "Mollie", text: "Payment provider for iDEAL, credit card, and more." },
          { title: "Stripe", text: "International payments and subscriptions." },
          { title: "PostNL", text: "Shipping labels and track & trace for your customers." },
          { title: "DHL", text: "Flexible shipping options in and beyond the Netherlands." },
          { title: "Google Analytics", text: "Insight into visitors, behaviour, and conversion." },
          { title: "Mailchimp", text: "Newsletters and email automation." },
          { title: "Accounting", text: "Integrations with e-Boekhouden, Moneybird, and more." },
        ],
      },
      {
        type: "cases",
        id: "cases",
        eyebrow: "Approach",
        title: "What matters in an ecommerce build.",
        items: [
          {
            tag: "Conversion",
            title: "A short, clear order process",
            text: "From product page to payment: as few steps as possible, clear CTAs, and trusted payment methods such as iDEAL.",
            results: [
              "Clear product structure",
              "Straightforward cart and checkout",
              "Mobile-friendly purchase flow",
            ],
          },
          {
            tag: "Management",
            title: "Simple for owners to manage",
            text: "Behind the scenes, your web shop should feel organised: products, stock, and orders without friction.",
            results: [
              "Simple product management",
              "Room for shipping and payment integrations",
              "A foundation for further growth",
            ],
          },
        ],
        footerLink: { label: "View live projects", href: "/projects" },
      },
      {
        type: "cta",
        title: "Ready to sell online?",
        text: "Tell us what you sell. We’ll recommend the right setup for your web shop.",
        button: { label: "Request a quote", href: "/quote" },
      },
    ],
  },

  hosting: {
    slug: "hosting",
    navKey: "diensten",
    path: "/hosting",
    title: "Hosting | Fast & Secure Website Hosting | AxaWeb",
    description:
      "Reliable website hosting with AxaWeb: SSL, backups, monitoring, and personal support. Stable hosting from a fixed annual price.",
    canonical: "https://axaweb.nl/en/hosting",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Hosting" },
    ],
    head: {
      variant: "stats",
      eyebrow: "Hosting",
      title: "Hosting that simply delivers.",
      text: "Fast, secure hosting in Dutch data centres, with SSL, automatic backups, and a contact who knows your setup.",
      actions: [
        { label: "View packages", href: "#pakketten", style: "primary" },
        { label: "Ask a question", href: "/contact", style: "secondary" },
      ],
      stats: [
        { value: "99.9%", label: "uptime target" },
        { value: "Included", label: "automatic backups" },
        { value: "NL", label: "data centres" },
        { value: "SSL", label: "included as standard" },
      ],
    },
    sections: [
      {
        type: "pricing",
        id: "pakketten",
        catalog: "hosting",
        i18nKey: "hosting",
      },
      {
        type: "specs",
        id: "specificaties",
        eyebrow: "Specifications",
        title: "The tech under the hood.",
        items: [
          { term: "Storage", detail: "Fast SSD storage for short load times." },
          { term: "SSL certificate", detail: "Included as standard and renewed automatically." },
          { term: "Email", detail: "Business email addresses on your own domain." },
          { term: "Location", detail: "Hosting in Dutch data centres." },
          { term: "PHP and databases", detail: "Current PHP versions and MySQL databases." },
          { term: "Caching", detail: "Server-side caching and compression for extra speed." },
        ],
      },
      {
        type: "panels",
        id: "veiligheid",
        eyebrow: "Security, backups, and support",
        title: "Taken care of as standard.",
        items: [
          {
            icon: "lock",
            title: "Security",
            points: [
              "Firewall and up-to-date server software",
              "SSL on every website",
              "Uptime monitoring from Business upward",
            ],
          },
          {
            icon: "database",
            title: "Backups",
            points: [
              "Automatic backups",
              "Stored at an external location",
              "Quick to restore if something goes wrong",
            ],
          },
          {
            icon: "user",
            title: "Support",
            points: [
              "A personal point of contact",
              "Response aim: within one business day",
              "Help with email and domains",
            ],
          },
        ],
      },
      {
        type: "cta",
        title: "Migrated and hosted - usually within a day.",
        text: "We migrate your current website, almost always without a noticeable interruption.",
        button: { label: "Request a quote", href: "/quote" },
      },
    ],
  },

  onderhoud: {
    slug: "maintenance",
    navKey: "diensten",
    path: "/maintenance",
    title: "Website Maintenance | Updates, Monitoring & Support | AxaWeb",
    description:
      "Website maintenance by AxaWeb: updates, monitoring, security, and support on a clear monthly plan.",
    canonical: "https://axaweb.nl/en/maintenance",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Maintenance" },
    ],
    head: {
      variant: "split",
      eyebrow: "Maintenance",
      title: "Maintenance that stays ahead of problems.",
      text: "Websites need maintenance to stay fast, secure, and reliable. We handle updates, monitoring, and support - with clear agreements.",
      actions: [
        { label: "View plans", href: "#abonnementen", style: "primary" },
        { label: "Ask a question", href: "/contact", style: "secondary" },
      ],
      facts: {
        title: "At a glance",
        items: [
          "Updates without the hassle",
          "Monitoring from Business upward",
          "Response times based on your plan or SLA",
          "Clear minimum terms and cancellation conditions",
        ],
      },
    },
    sections: [
      {
        type: "pricing",
        id: "abonnementen",
        catalog: "maintenance",
        i18nKey: "maintenance",
      },
      {
        type: "checklists",
        id: "updates",
        eyebrow: "Updates",
        title: "What we keep current for you.",
        groups: [
          {
            title: "What we update",
            items: [
              "CMS and plugins",
              "Security patches",
              "PHP and server software",
              "Compatibility after every update",
            ],
          },
          {
            title: "How we work",
            items: [
              "Always a fresh backup first",
              "Updates tested after installation",
              "Rolled back immediately if issues arise",
              "A short update on what was done",
            ],
          },
        ],
      },
      {
        type: "features",
        id: "monitoring",
        eyebrow: "Monitoring",
        title: "We see it before you notice.",
        items: [
          {
            icon: "activity",
            title: "Uptime monitoring",
            text: "On Business and Custom: checks whether your website is reachable, with alerts when something goes down.",
          },
          {
            icon: "gauge",
            title: "Performance",
            text: "Periodic checks of speed and load times so the site keeps feeling snappy.",
          },
          {
            icon: "shield",
            title: "Security and certificates",
            text: "Alerts for suspicious activity and for expiring SSL certificates or domains, depending on the package you choose.",
          },
        ],
      },
      {
        type: "sla",
        id: "sla",
        eyebrow: "SLA",
        title: "Clear response times, written into your agreement.",
        rows: [
          {
            level: "Critical",
            example: "Website offline or unusable",
            response: "Priority according to package or SLA",
          },
          {
            level: "High",
            example: "An important feature isn’t working",
            response: "According to package or SLA agreement",
          },
          {
            level: "Normal",
            example: "A small change or question",
            response: "Within a reasonable timeframe on business days",
          },
        ],
        note: "Response times depend on the maintenance package you choose or a separate SLA agreement. Indicative for Business and Custom; exact terms are set out in your agreement.",
      },
      {
        type: "cta",
        title: "Keep your website maintained without chasing updates.",
        text: "Tell us about your website. We’ll recommend the right maintenance plan.",
        button: { label: "Request a quote", href: "/quote" },
      },
    ],
  },

  pakketten: {
    slug: "packages",
    navKey: "pakketten",
    path: "/packages",
    title: "Packages & Pricing | Websites and Subscriptions | AxaWeb",
    description:
      "AxaWeb packages for websites, Website as a Service, hosting, and maintenance. Clear pricing, no surprises. Request advice with no obligation.",
    canonical: "https://axaweb.nl/en/packages",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Packages" }],
    head: {
      variant: "center",
      eyebrow: "Packages",
      title: "All packages and prices in one place.",
      text: "From a first website to hosting and maintenance: every package has a clear price and scope. Recurring services run monthly or on a 12-month term; all prices exclude 21% VAT.",
    },
    sections: [
      {
        type: "pricingHub",
        id: "websites",
        footerLink: { label: "Explore websites", href: "/websites", i18nKey: "viewWebsites" },
      },
      {
        type: "pricing",
        id: "hosting",
        catalog: "hosting",
        i18nKey: "hosting",
        footerLink: { label: "Explore hosting", href: "/hosting", i18nKey: "viewHosting" },
      },
      {
        type: "pricing",
        id: "onderhoud",
        catalog: "maintenance",
        i18nKey: "maintenance",
        footerLink: { label: "Explore maintenance", href: "/maintenance", i18nKey: "viewMaintenance" },
      },
      {
        type: "pricingTerms",
      },
      {
        type: "cta",
        title: "Not sure which package is right?",
        text: "Tell us what you need. We’ll advise clearly on what is worth doing now - and what can wait.",
        button: { label: "Request advice", href: "/contact" },
      },
    ],
  },

  projecten: {
    slug: "projects",
    navKey: "projecten",
    path: "/projects",
    title: "Projects | View Our Work | AxaWeb",
    description:
      "Live AxaWeb websites such as Bandendepot, Axanet, and ViralOn - focused on structure, presence, and technical quality.",
    canonical: "https://axaweb.nl/en/projects",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Projects" }],
    head: {
      variant: "center",
      eyebrow: "Projects",
      title: "Selected work, live in production.",
      text: "Websites we designed and built. Each one shaped around clear structure, strong presence, and solid technical execution.",
    },
    sections: [
      {
        type: "portfolio",
        id: "portfolio",
        note: "Want this standard for your brand? In an intro call, we can share relevant examples.",
      },
      {
        type: "cta",
        title: "Shall we talk about your project?",
        text: "Tell us about your plans. We’ll advise clearly on approach, timeline, and investment.",
        button: { label: "Schedule an intro call", href: "/contact" },
      },
    ],
  },

  contact: {
    slug: "contact",
    navKey: "contact",
    path: "/contact",
    title: "Contact | Request a Quote | AxaWeb",
    description:
      "Get in touch with AxaWeb about a website, web shop, hosting, or maintenance. Personal reply within one business day.",
    canonical: "https://axaweb.nl/en/contact",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Contact" }],
    head: {
      variant: "minimal",
      eyebrow: "Contact",
      title: "Let’s talk about your project.",
      text: "Tell us about your project or ask your question. You’ll receive a personal reply within one business day.",
    },
    sections: [
      {
        type: "contact",
        id: "formulier",
        info: [
          { icon: "mail", label: "Email", value: "info@axaweb.nl", href: "mailto:info@axaweb.nl" },
          { icon: "clock", label: "Response time", value: "Within one business day" },
        ],
        steps: {
          title: "What to expect",
          items: [
            "A personal reply within one business day",
            "A no-obligation conversation about your needs and timeline",
            "A clear quote with fixed starting prices",
          ],
        },
        sourcePage: "/contact",
      },
      {
        type: "faq",
        id: "faq",
        eyebrow: "Frequently asked questions",
        title: "Questions before you get in touch?",
        items: [
          {
            question: "How quickly will I hear back?",
            answer:
              "You’ll receive a personal reply within one business day. We usually schedule a short introduction soon after.",
          },
          {
            question: "What does a website or web shop cost?",
            answer:
              `One-time websites start from ${formatEuro(getOneTimeFromPrice(), "en")} excl. VAT. Prefer to spread the cost? Website as a Service starts from ${formatEuro(getWaasFromPrice(), "en")} per month on a 12-month term. The final investment depends on design, scope, and features.`,
          },
          {
            question: "Can I choose only hosting or maintenance?",
            answer:
              "Yes. Hosting and maintenance can be taken separately, including for websites we didn’t build. We’ll first check whether the setup can be transferred safely.",
          },
          {
            question: "Do you also work with existing websites?",
            answer:
              "Yes. We can take over, improve, or migrate existing websites to our hosting - usually without a noticeable interruption.",
          },
        ],
      },
    ],
  },

  offerte: {
    slug: "quote",
    navKey: "contact",
    path: "/quote",
    title: "Request a Quote | Website or Web Shop | AxaWeb",
    description:
      "Request a quote from AxaWeb for your website or web shop. Clear starting prices, personal advice, and prompt follow-up.",
    canonical: "https://axaweb.nl/en/quote",
    breadcrumb: [{ label: "Home", href: "/" }, { label: "Quote" }],
    head: {
      variant: "minimal",
      eyebrow: "Quote",
      title: "Request a quote - no obligation.",
      text: "Tell us briefly about your plans. We’ll advise on approach, timeline, and investment, then send a clear quote.",
    },
    sections: [
      {
        type: "contact",
        id: "formulier",
        info: [
          { icon: "mail", label: "Email", value: "info@axaweb.nl", href: "mailto:info@axaweb.nl" },
          { icon: "clock", label: "Response time", value: "Within one business day" },
        ],
        steps: {
          title: "How it works",
          items: [
            "You share your needs via the form or by phone",
            "We reply within one business day with focused questions or advice",
            "You receive a clear quote with no obligation",
          ],
        },
        sourcePage: "/quote",
      },
      {
        type: "faq",
        id: "faq",
        eyebrow: "Frequently asked questions",
        title: "Good to know before your quote.",
        items: [
          {
            question: "Is the quote without obligation?",
            answer:
              "Yes. You’re not locked in. We first discuss whether the approach fits, so you get a realistic picture of investment and timeline.",
          },
          {
            question: "How quickly will I receive a quote?",
            answer:
              "After your request we get in touch within one business day. A concrete quote usually follows shortly after, once the scope is clear.",
          },
          {
            question: "What do I need for a good request?",
            answer:
              "A short description of your goal, desired pages or features, and optionally a budget indication is enough to get started.",
          },
          {
            question: "Can I call instead?",
            answer:
              "Of course. Call us on 06 29 12 75 75. We’re happy to talk through your project by phone.",
          },
        ],
      },
    ],
  },
};

export const pageSlugs = Object.keys(pages);
