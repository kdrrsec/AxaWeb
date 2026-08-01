import { company, companyIdentityLine, companyContactBlockHtml } from "./company.js";

/**
 * Terms and conditions AxaWeb: production-ready (EN).
 */
export const termsDoc = {
  pageId: "terms",
  filename: "terms.html",
  path: "/terms",
  title: "Terms and Conditions | AxaWeb",
  description:
    "Terms and conditions of AxaWeb for websites, webshops, hosting, maintenance and Website as a Service. Clear agreements on collaboration.",
  h1: "Terms and Conditions",
  updatedLabel: company.documentsUpdated,
  dateIso: "2026-07-31",
  intro: [
    {
      type: "p",
      html: `These terms and conditions apply to all services of <strong>${companyIdentityLine()}</strong>, including the design and development of websites and webshops, hosting, maintenance, support and Website as a Service (WaaS).`,
    },
    {
      type: "p",
      text: "By accepting a quote, placing an order or taking out a subscription, you agree to these terms, unless otherwise agreed in writing.",
    },
  ],
  sections: [
    {
      id: "definitions",
      title: "1. Definitions",
      blocks: [
        {
          type: "ul",
          items: [
            { html: `<strong>AxaWeb / we / us:</strong> ${companyIdentityLine()}, established in the ${company.country}.` },
            { html: "<strong>Client / you / your:</strong> the (legal) person who purchases services from AxaWeb." },
            { html: "<strong>Agreement:</strong> the arrangement between AxaWeb and the client, including the quote, confirmation and these terms." },
            { html: "<strong>Services:</strong> all work and subscriptions that AxaWeb provides, such as websites, webshops, hosting, maintenance, support and WaaS." },
            { html: "<strong>Website as a Service (WaaS):</strong> a subscription model under which AxaWeb makes a website available including hosting and maintenance according to the selected package." },
            { html: "<strong>Additional work:</strong> work outside the agreed scope." },
            { html: "<strong>In writing:</strong> by letter, email or another durable digital record." },
          ],
        },
      ],
    },
    {
      id: "applicability",
      title: "2. Applicability",
      blocks: [
        {
          type: "p",
          text: "These terms apply to all quotes, agreements and deliveries of AxaWeb, unless the parties expressly agree otherwise in writing.",
        },
        {
          type: "p",
          text: "The client’s general terms apply only if AxaWeb has expressly accepted them in writing. In the event of conflict between documents, this order of precedence applies: (1) written custom agreements or SLA, (2) quote/order confirmation, (3) these terms and conditions.",
        },
        {
          type: "p",
          html: `The <a href="/privacy">privacy statement</a> also applies to personal data. Use of the website axaweb.nl is also subject to the <a href="/disclaimer">disclaimer</a>.`,
        },
      ],
    },
    {
      id: "quotes",
      title: "3. Quotes",
      blocks: [
        {
          type: "p",
          text: "Quotes from AxaWeb are without obligation, unless they state an express acceptance period. A quote is in principle valid for 14 days, unless otherwise stated.",
        },
        {
          type: "p",
          text: "Prices on the website are starting prices or indications. The final price, scope, schedule and any subscription terms are set out in the quote or order confirmation.",
        },
        {
          type: "p",
          text: "Obvious mistakes or typographical errors in a quote do not bind AxaWeb.",
        },
      ],
    },
    {
      id: "formation",
      title: "4. Formation of the agreement",
      blocks: [
        {
          type: "p",
          text: "An agreement is formed when the client accepts the quote in writing, or when AxaWeb confirms an order in writing, or when AxaWeb begins performance with the client’s consent.",
        },
        {
          type: "p",
          text: "Oral arrangements are binding only after written confirmation by AxaWeb.",
        },
      ],
    },
    {
      id: "client-obligations",
      title: "5. Client obligations",
      blocks: [
        {
          type: "p",
          text: "The client timely provides all information, content, access, feedback and decisions needed to perform the services. Delay on your part may shift the schedule and delivery.",
        },
        {
          type: "p",
          text: "You warrant that texts, images, logos, trademarks and other materials you supply are lawful and do not infringe third-party rights. You indemnify AxaWeb against third-party claims arising from this.",
        },
        {
          type: "p",
          text: "You remain responsible for the substantive accuracy of business information, prices, legal texts on your website (unless AxaWeb has expressly prepared those as a separate service) and compliance with legislation applicable to your business.",
        },
      ],
    },
    {
      id: "payments",
      title: "6. Payments and invoicing",
      blocks: [
        {
          type: "p",
          text: "Prices are in euros and exclusive of VAT, unless expressly stated otherwise. The website may show “excl. 21% VAT” for packages; the quote prevails.",
        },
        {
          type: "p",
          text: "Unless otherwise agreed, AxaWeb invoices projects in instalments, for example: deposit at start, interim instalment on delivery of a concept or milestone, and the remainder on delivery. Subscriptions (hosting, maintenance, WaaS) are invoiced in advance for the chosen period.",
        },
        {
          type: "p",
          text: "Invoices must be paid within 14 days of the invoice date, unless a different term has been agreed in writing. In the event of late payment, AxaWeb is entitled to charge statutory (commercial) interest and reasonable collection costs.",
        },
        {
          type: "p",
          text: "AxaWeb may suspend performance for as long as outstanding, due invoices remain unpaid, after a reminder.",
        },
      ],
    },
    {
      id: "price-changes",
      title: "7. Price changes",
      blocks: [
        {
          type: "p",
          text: "For one-off projects the price set out in the quote applies, subject to additional work or scope changes.",
        },
        {
          type: "p",
          text: "For ongoing subscriptions AxaWeb may adjust prices annually or on renewal. We will inform you in advance of a price change. If you disagree with the change, you may cancel the subscription effective on the date the new price takes effect, subject to the notice period.",
        },
        {
          type: "p",
          text: "Cost increases from third parties (for example domain registrars, payment providers or infrastructure) that are specifically passed on for your service may be charged as soon as they occur, with prior notice.",
        },
      ],
    },
    {
      id: "additional-work",
      title: "8. Additional work",
      blocks: [
        {
          type: "p",
          text: "Work outside the agreed scope counts as additional work. AxaWeb will inform you when something is treated as additional work and, where reasonable, provide a price indication or fixed surcharge before that work starts.",
        },
        {
          type: "p",
          text: "Additional work is performed after your (written) approval, unless urgency or continuity makes that unreasonable. Additional work may shift the schedule.",
        },
      ],
    },
    {
      id: "delivery",
      title: "9. Delivery, acceptance and revisions",
      blocks: [
        {
          type: "p",
          text: "Lead times are set by mutual agreement and are target dates, unless a firm deadline has been expressly agreed. AxaWeb will make reasonable efforts to meet agreed milestones, provided you supply materials and feedback on time.",
        },
        {
          type: "p",
          text: "Unless otherwise agreed, a website or webshop project includes a reasonable number of revision rounds as stated in the quote (for example design revisions and delivery revisions). Extra rounds or structural changes of direction may be treated as additional work.",
        },
        {
          type: "p",
          text: "After delivery you have an acceptance period of 7 days to report defects that fall within the agreed scope. If you do not respond within that period, delivery is deemed accepted. Minor outstanding items do not prevent acceptance; those will be addressed reasonably.",
        },
      ],
    },
    {
      id: "domain-names",
      title: "10. Domain names",
      blocks: [
        {
          type: "p",
          text: "If AxaWeb registers or manages a domain name for you, this is done at your request and at your expense. Domain names remain in principle your property, subject to contrary agreements or outstanding payment obligations that temporarily block management.",
        },
        {
          type: "p",
          text: "Availability of a domain name cannot be guaranteed until registration is actually completed. Renewal fees and third-party registrar terms may apply.",
        },
      ],
    },
    {
      id: "hosting",
      title: "11. Hosting",
      blocks: [
        {
          type: "p",
          text: "Hosting comprises making the agreed web environment available, including the components set out in the selected package or agreement (for example SSL, backups or monitoring).",
        },
        {
          type: "p",
          text: "AxaWeb aims for a stable and secure environment, but does not give an absolute uptime guarantee, unless a specific availability or SLA has been agreed in writing. Planned maintenance may take place; preferably outside peak hours and where possible with prior notice.",
        },
        {
          type: "p",
          text: "Backups are made according to the schedule applicable to your package, insofar as agreed. A backup is a safety measure, not a guarantee that every moment or every file is always recoverable. You remain responsible for keeping important source files that you supply.",
        },
        {
          type: "p",
          text: "Hosting may (partly) run via reputable third parties and data centres. AxaWeb selects those parties with care, but is not liable for outages attributable solely to those third parties, to the extent permitted by law. We will make efforts to have outages remedied.",
        },
        {
          type: "p",
          text: "You may not use the hosting environment for illegal, harmful or excessively burdensome activities (including malware, spam or DDoS). In the event of abuse, AxaWeb may (temporarily) suspend the service.",
        },
      ],
    },
    {
      id: "maintenance",
      title: "12. Maintenance subscriptions",
      blocks: [
        {
          type: "p",
          text: "A maintenance subscription covers the work set out in the selected package or agreement. Typically this may include: updates of the CMS or frameworks where relevant, security updates, monitoring of basic issues and an agreed amount of small adjustments.",
        },
        {
          type: "h3",
          text: "Included (unless otherwise agreed)",
        },
        {
          type: "ul",
          items: [
            "Security and maintenance updates within the agreed technical framework",
            "Checks for evident outages within the scope of the subscription",
            "Small textual or visual adjustments within the agreed hours or request budget",
            "Advice on urgent security issues that AxaWeb identifies",
          ],
        },
        {
          type: "h3",
          text: "Not included (additional work or separate quote)",
        },
        {
          type: "ul",
          items: [
            "New pages, redesigns or structural expansions",
            "New features or integrations with third parties",
            "Content creation (copy, photography, translations) unless separately agreed",
            "Recovery after damage by third parties, incorrect credentials or unauthorised intervention",
            "SEO campaigns, ad management or copywriting unless separately agreed",
          ],
        },
        {
          type: "p",
          text: "Response times are obligations of effort: AxaWeb responds within a reasonable time to support requests during office hours on working days in the Netherlands. Urgent requests (for example full unavailability of the live site) take priority. Exact response times may be set out in more detail in a package or SLA.",
        },
      ],
    },
    {
      id: "waas",
      title: "13. Website as a Service (WaaS)",
      blocks: [
        {
          type: "p",
          text: "Under Website as a Service, AxaWeb makes a website available on a subscription basis. Hosting and maintenance are included insofar as stated in the selected package. Features, limits and any options differ per package and are set out in the quote or on the package page as it applied when you entered into the agreement.",
        },
        {
          type: "p",
          text: "Unless otherwise agreed in writing, the WaaS website (including the underlying technical setup, templates and AxaWeb platform components) remains the property of AxaWeb for as long as the subscription runs. Your own content (texts, logos, product photos that you supply) remains your property.",
        },
        {
          type: "p",
          text: "Custom modules, integrations or special developments may have additional or differing terms, including separate ownership or licence arrangements. Those arrangements prevail for that part.",
        },
        {
          type: "h3",
          text: "Termination, migration and transfer",
        },
        {
          type: "p",
          text: "On termination of a WaaS subscription, the right to use the WaaS website via AxaWeb ends on the end date. The parties will make reasonable arrangements regarding:",
        },
        {
          type: "ul",
          items: [
            "export or transfer of your content;",
            "any migration to another environment (additional work or a fixed migration fee);",
            "domain linking and DNS changes;",
            "final deactivation of the WaaS environment.",
          ],
        },
        {
          type: "p",
          text: "There is no automatic right to a free transfer of the full technical codebase or the AxaWeb platform, unless that has been expressly agreed or you have taken out a transfer or buy-out arrangement.",
        },
      ],
    },
    {
      id: "support",
      title: "14. Support and response times",
      blocks: [
        {
          type: "p",
          text: "Support takes place via the agreed channels (in practice often email or the contact form). AxaWeb aims to respond within one to two working days to regular requests, and faster for urgent outages on a live environment that we host.",
        },
        {
          type: "p",
          text: "Support does not include unlimited consultancy. Extensive advice, strategy or training may be offered as a separate service.",
        },
      ],
    },
    {
      id: "ip",
      title: "15. Intellectual property and licences",
      blocks: [
        {
          type: "p",
          text: "All intellectual property rights in designs, code, templates, documentation and methodologies developed by AxaWeb vest in AxaWeb or its licensors, unless otherwise agreed in writing.",
        },
        {
          type: "p",
          text: "For a one-off project you receive, after full payment, a right to use the delivered result for the intended use. Transfer of source code or exclusive rights takes place only if agreed in writing.",
        },
        {
          type: "p",
          text: "Open-source components, fonts, plugins or themes from third parties are subject to their respective licences. Those remain applicable alongside these terms.",
        },
        {
          type: "p",
          text: "AxaWeb may include the project in its portfolio and use it as a reference, unless you object in writing for compelling reasons (for example confidentiality).",
        },
      ],
    },
    {
      id: "content",
      title: "16. Client content",
      blocks: [
        {
          type: "p",
          text: "You remain responsible for content that you supply or place yourself. AxaWeb is not obliged to legally review content in advance, unless that is expressly part of the assignment.",
        },
        {
          type: "p",
          text: "AxaWeb may refuse or remove content that is clearly unlawful or endangers the service or infrastructure, after notice where reasonably possible.",
        },
      ],
    },
    {
      id: "liability",
      title: "17. Liability",
      blocks: [
        {
          type: "p",
          text: "AxaWeb delivers services to the best of its knowledge and ability (obligation of effort), unless a result obligation has been expressly agreed.",
        },
        {
          type: "p",
          text: "If AxaWeb is liable for damage, that liability is limited to direct damage and to a maximum of the amount the client paid AxaWeb in the twelve (12) months before the damaging event for the relevant service, exclusive of VAT. For a one-off project the maximum is the amount invoiced for that project.",
        },
        {
          type: "p",
          text: "AxaWeb is not liable for indirect damage, consequential damage, lost profit, missed savings, reputational damage, data loss (insofar as reasonable backup measures have been taken or offered), or damage due to incorrect or incomplete information from the client, to the extent permitted by law.",
        },
        {
          type: "p",
          text: "These limitations do not apply in the event of intent or wilful recklessness by AxaWeb, or insofar as mandatory law provides otherwise.",
        },
      ],
    },
    {
      id: "force-majeure",
      title: "18. Force majeure",
      blocks: [
        {
          type: "p",
          text: "In the event of force majeure, AxaWeb is not obliged to perform for as long as the force majeure continues. Force majeure includes, among other things: outages at suppliers or hosting providers, internet or energy failure, fire, pandemic, government measures, DDoS attacks and other circumstances beyond AxaWeb’s reasonable control.",
        },
        {
          type: "p",
          text: "If the force majeure lasts longer than sixty (60) days, either party may dissolve the agreement for the affected part without liability for damages, without prejudice to the obligation to pay for services already delivered.",
        },
      ],
    },
    {
      id: "suspension-termination",
      title: "19. Suspension and termination",
      blocks: [
        {
          type: "p",
          text: "AxaWeb may suspend the agreement or (partly) dissolve it if the client fails to meet essential obligations (including payment obligations) and remains in default after notice of default, or if continuation cannot reasonably be required of AxaWeb.",
        },
        {
          type: "p",
          text: "On dissolution, amounts already invoiced and due remain payable. Prepaid subscription periods are not automatically refunded, unless dissolution results from an attributable shortcoming by AxaWeb or mandatory law requires a refund.",
        },
      ],
    },
    {
      id: "duration-cancellation",
      title: "20. Duration of subscriptions and notice periods",
      blocks: [
        {
          type: "p",
          text: "Hosting, maintenance and WaaS subscriptions are entered into for the initial period stated in the agreement (for example monthly or annually) and are thereafter tacitly renewed for the same period, unless otherwise agreed.",
        },
        {
          type: "p",
          text: "Cancellation must be in writing, subject to a notice period of one (1) month to the end of the current period, unless the agreement states a different period.",
        },
        {
          type: "p",
          text: "After termination AxaWeb may deactivate the environment. Ensure timely export of content or migration arrangements yourself.",
        },
      ],
    },
    {
      id: "confidentiality",
      title: "21. Confidentiality",
      blocks: [
        {
          type: "p",
          text: "The parties treat as confidential information they receive in the course of the collaboration that is marked confidential or whose confidential nature is reasonably clear. This does not apply to information that is public, was already lawfully known, or must be disclosed by law.",
        },
      ],
    },
    {
      id: "privacy",
      title: "22. Privacy",
      blocks: [
        {
          type: "p",
          html: `AxaWeb processes personal data as described in the <a href="/privacy">privacy statement</a>. Where AxaWeb acts as a processor for personal data in your systems, additional processor arrangements may be required; we will then record those in writing.`,
        },
      ],
    },
    {
      id: "changes-terms",
      title: "23. Changes to these terms",
      blocks: [
        {
          type: "p",
          text: "AxaWeb may amend these terms. For existing subscriptions we will notify material changes in advance. If you do not agree, you may cancel the subscription effective on the date the change takes effect, subject to the notice period.",
        },
      ],
    },
    {
      id: "law-disputes",
      title: "24. Governing law and disputes",
      blocks: [
        {
          type: "p",
          text: `These terms and all agreements with AxaWeb are governed by ${company.governingLaw}.`,
        },
        {
          type: "p",
          text: `Disputes are preferably resolved amicably. If that fails, the ${company.disputeForum} has jurisdiction, without prejudice to mandatory rules that prescribe a different jurisdiction.`,
        },
      ],
    },
    {
      id: "contact-terms",
      title: "25. Contact",
      blocks: [
        {
          type: "p",
          text: "Questions about these terms to:",
        },
        { type: "html", html: companyContactBlockHtml() },
      ],
    },
  ],
  related: [
    { href: "/privacy", label: "Privacy Statement" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/packages", label: "Packages and Website as a Service" },
    { href: "/hosting", label: "Hosting" },
    { href: "/maintenance", label: "Maintenance" },
  ],
};
