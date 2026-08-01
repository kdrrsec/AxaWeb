import { company, companyIdentityLine, companyContactBlockHtml } from "./company.js";

/**
 * Privacy statement AxaWeb: GDPR-aligned based on actual site functionality.
 */
export const privacyDoc = {
  pageId: "privacy",
  filename: "privacy.html",
  path: "/privacy",
  title: "Privacy Statement | AxaWeb",
  description:
    "Privacy statement of AxaWeb: which data we process via forms, cookies, Analytics and Clarity, and what rights you have.",
  h1: "Privacy Statement",
  updatedLabel: company.documentsUpdated,
  dateIso: "2026-08-01",
  intro: [
    {
      type: "p",
      html: `${companyIdentityLine()} respects your privacy. In this statement we explain which personal data we process when you visit our website or contact us, why we do so, how long we retain data and what rights you have.`,
    },
    {
      type: "p",
      html: `This statement applies to <a href="${company.website}">${company.website}</a> and the related contact and quote forms. We describe only processing that actually takes place or may take place at AxaWeb with the current website.`,
    },
  ],
  sections: [
    {
      id: "controller",
      title: "1. Controller",
      blocks: [
        {
          type: "p",
          text: "Controller for the processing of personal data:",
        },
        { type: "html", html: companyContactBlockHtml() },
        {
          type: "p",
          text: "For privacy questions, please email the address above.",
        },
      ],
    },
    {
      id: "which-data",
      title: "2. Which personal data do we process?",
      blocks: [
        {
          type: "h3",
          text: "Contact and quote forms",
        },
        {
          type: "p",
          text: "When you use the contact form or the quote form, we may receive the following data:",
        },
        {
          type: "ul",
          items: [
            "name;",
            "company name (if provided);",
            "email address;",
            "phone number (if provided);",
            "project or service selection;",
            "budget indication (if provided);",
            "message content / project information;",
            "source page from which the form was submitted;",
            "time of submission;",
            "technical anti-spam data needed to limit abuse (such as when you started filling in the form);",
            "IP address, for rate limiting and abuse prevention when submitting forms.",
          ],
        },
        {
          type: "h3",
          text: "Direct contact",
        },
        {
          type: "p",
          html: `If you contact us by email (<a href="mailto:${company.email}">${company.email}</a>) or phone (<a href="${company.phoneHref}">${company.phoneDisplay}</a>), we process the data you share to the extent needed to help you.`,
        },
        {
          type: "h3",
          text: "Website use and cookies",
        },
        {
          type: "p",
          html: `Depending on your cookie consent, technical and statistical data may be processed, such as cookie identifiers, device or browser information, IP address (possibly truncated), page views and interactions. See the <a href="/cookies">cookie policy</a> for details.`,
        },
        {
          type: "h3",
          text: "Fonts",
        },
        {
          type: "p",
          text: "For typography we load the Manrope font via Google Fonts. In doing so, Google may technically process your IP address.",
        },
      ],
    },
    {
      id: "purposes-legal-bases",
      title: "3. Purposes and legal bases",
      blocks: [
        {
          type: "p",
          text: "We process personal data only for clear purposes:",
        },
        {
          type: "ul",
          items: [
            {
              html: "<strong>Handling contact and quotes:</strong> to respond to your enquiry, answer questions and provide a quote or proposal. Legal basis: legitimate interest and/or taking pre-contractual steps at your request (GDPR Art. 6(1)(b) and (f)).",
            },
            {
              html: "<strong>Contract and service delivery:</strong> if you become a client, for performing the agreement. Legal basis: performance of a contract (Art. 6(1)(b)).",
            },
            {
              html: "<strong>Security and abuse prevention:</strong> for example rate limiting and spam filters on forms. Legal basis: legitimate interest (Art. 6(1)(f)).",
            },
            {
              html: "<strong>Statistics and website improvement:</strong> via Google Analytics 4 and Microsoft Clarity, only after consent for the Statistics category. Legal basis: consent (Art. 6(1)(a)).",
            },
            {
              html: "<strong>Necessary cookies / storage:</strong> to make the site work and remember your cookie choice. Legal basis: legitimate interest / necessary for the requested service (and where required, consent under cookie rules).",
            },
            {
              html: "<strong>Legal obligations:</strong> for example retention duties for administration. Legal basis: legal obligation (Art. 6(1)(c)).",
            },
          ],
        },
        {
          type: "p",
          text: "We do not load marketing cookies or advertising pixels without your consent for Marketing. At present, no separate marketing tools are actively loaded as long as that consent is absent.",
        },
      ],
    },
    {
      id: "retention",
      title: "4. Retention periods",
      blocks: [
        {
          type: "ul",
          items: [
            "We retain contact and quote requests no longer than needed for handling and any follow-up, typically up to a maximum of 24 months after the last relevant contact, unless an ongoing collaboration or legal duty requires longer retention.",
            "We retain administrative and contract data for as long as the law requires (including tax retention periods).",
            "Cookie preferences are stored locally in your browser until you clear or change them.",
            "Statistical data at Google Analytics and Microsoft Clarity follow the retention settings of those services and your consent; without consent those scripts are not loaded.",
          ],
        },
      ],
    },
    {
      id: "recipients",
      title: "5. Sharing with third parties / processors",
      blocks: [
        {
          type: "p",
          text: "We do not sell your data. We share data only with parties needed for our services or where we are legally required to do so.",
        },
        {
          type: "ul",
          items: [
            {
              html: "<strong>Vercel:</strong> hosting of the website and the server-side API for the contact and quote form.",
            },
            {
              html: "<strong>External form service:</strong> for processing and sending contact and quote forms we use an external form service. This service processes only the data needed to handle your request correctly.",
            },
            {
              html: "<strong>Google (Fonts, and optionally Analytics):</strong> Google Fonts for typography; Google Analytics 4 only after consent for Statistics.",
            },
            {
              html: "<strong>Microsoft Clarity:</strong> only after consent for Statistics, for usage and session insights (including session recordings).",
            },
          ],
        },
        {
          type: "p",
          text: "Some of these parties may also process data outside the EEA. Where that is the case, we rely on appropriate safeguards such as the European Commission’s standard contractual clauses, where applicable, and for non-essential tracking also on your consent.",
        },
      ],
    },
    {
      id: "cookies-analytics",
      title: "6. Cookies and analytics",
      blocks: [
        {
          type: "p",
          html: `We use a cookie banner with categories: necessary, preferences, statistics and marketing. Optional statistics tools load only after consent. More details are in the <a href="/cookies">cookie policy</a>.`,
        },
        {
          type: "p",
          text: "With statistics consent, Google Analytics 4 and Microsoft Clarity may measure usage data such as page views, clicks and (with Clarity) session behaviour. This is not fully anonymous measurement: technical identifiers and usage data may be processed.",
        },
        {
          type: "p",
          text: "For Microsoft Clarity we mask sensitive form fields on the contact and quote form (via data-clarity-mask), so names, email addresses, phone numbers, messages and similar input are not visible in Clarity recordings. Other page text is not fully masked by default.",
        },
      ],
    },
    {
      id: "axabook",
      title: "7. Future services (such as AxaBook)",
      blocks: [
        {
          type: "p",
          text: "The website may mention future products or modules (for example AxaBook as “coming soon”). As long as such a service is not live and connected to this website, we do not process separate personal data for it via axaweb.nl. If that later changes, we will update this statement or refer to a supplementary privacy notice.",
        },
      ],
    },
    {
      id: "security",
      title: "8. Security",
      blocks: [
        {
          type: "p",
          text: "We take appropriate technical and organisational measures to protect personal data, including HTTPS, security headers, origin checks and spam limits on the contact form, and access restriction to mailboxes. Absolute security cannot be guaranteed by anyone; we improve measures where needed.",
        },
      ],
    },
    {
      id: "rights",
      title: "9. Your rights",
      blocks: [
        {
          type: "p",
          text: "To the extent the GDPR applies, you have among other things the right to:",
        },
        {
          type: "ul",
          items: [
            "access your personal data;",
            "rectification of inaccurate data;",
            "erasure (“right to be forgotten”) in the cases provided by law;",
            "restriction of processing;",
            "portability of data you have provided to us, where applicable;",
            "object to processing based on legitimate interest;",
            "withdraw consent, without affecting the lawfulness of processing based on consent before its withdrawal.",
          ],
        },
        {
          type: "p",
          html: `You can send a request to <a href="mailto:${company.email}">${company.email}</a>. We respond within the statutory time limits. We may ask for additional information to verify your identity.`,
        },
      ],
    },
    {
      id: "complaints",
      title: "10. Complaints",
      blocks: [
        {
          type: "p",
          html: `Do you have a complaint about how we handle personal data? Please contact us first at <a href="mailto:${company.email}">${company.email}</a>. You also have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens): <a href="https://www.autoriteitpersoonsgegevens.nl" rel="noopener noreferrer" target="_blank">www.autoriteitpersoonsgegevens.nl</a>.`,
        },
      ],
    },
    {
      id: "changes-privacy",
      title: "11. Changes",
      blocks: [
        {
          type: "p",
          text: "We may amend this privacy statement if our services or the law change. The “Last updated” date at the top indicates the current version. For material changes we will inform you via the website where appropriate.",
        },
      ],
    },
  ],
  related: [
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/terms", label: "Terms and Conditions" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/contact", label: "Contact" },
  ],
};
