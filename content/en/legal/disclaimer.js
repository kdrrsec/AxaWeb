import { company, companyIdentityLine, companyContactBlockHtml } from "./company.js";

/**
 * Business disclaimer for axaweb.nl (EN).
 */
export const disclaimerDoc = {
  pageId: "disclaimer",
  filename: "disclaimer.html",
  path: "/disclaimer",
  title: "Disclaimer | AxaWeb",
  description:
    "Disclaimer of AxaWeb on accuracy of information, external links, liability, intellectual property and site changes.",
  h1: "Disclaimer",
  updatedLabel: company.documentsUpdated,
  dateIso: "2026-07-31",
  intro: [
    {
      type: "p",
      html: `This disclaimer applies to the website of ${companyIdentityLine()} (${company.website}). By using this website, you accept the provisions below.`,
    },
  ],
  sections: [
    {
      id: "accuracy",
      title: "1. Accuracy of information",
      blocks: [
        {
          type: "p",
          text: "AxaWeb compiles the content of this website with care. Even so, texts, prices, package descriptions or other data may be incomplete, outdated or not entirely accurate. Information on the website is general in nature and does not constitute a binding offer, unless expressly stated otherwise.",
        },
        {
          type: "p",
          text: "Starting prices and packages on the website are indicative. The quote or agreement is leading for price, scope and terms of an assignment.",
        },
      ],
    },
    {
      id: "no-advice",
      title: "2. No legal or professional advice",
      blocks: [
        {
          type: "p",
          html: `Content on this website, including the <a href="/terms">terms and conditions</a>, <a href="/privacy">privacy statement</a> and this document, is intended as clear information about our services. It is not personal legal advice. If you are unsure about your situation, seek advice from a qualified professional.`,
        },
      ],
    },
    {
      id: "external-links",
      title: "3. External links",
      blocks: [
        {
          type: "p",
          text: "This website may contain links to third-party websites (for example live client projects or external services). AxaWeb has no control over those websites and is not responsible for their content, availability or privacy practices. Following an external link is at your own risk.",
        },
      ],
    },
    {
      id: "liability",
      title: "4. Liability",
      blocks: [
        {
          type: "p",
          text: "AxaWeb is not liable for damage arising from use of this website or from reliance on information on this website, to the extent permitted by law. This includes, among other things, damage from outages, inaccuracies, incomplete information or temporary unavailability.",
        },
        {
          type: "p",
          html: `For assignments and subscriptions, the liability provisions in the <a href="/terms">terms and conditions</a> apply.`,
        },
      ],
    },
    {
      id: "ip-disclaimer",
      title: "5. Intellectual property",
      blocks: [
        {
          type: "p",
          text: "All rights in texts, design, logos, photos, code samples and other content on this website vest in AxaWeb or its licensors, unless otherwise indicated. Nothing on this website may be copied, distributed or reused without prior permission, except for mandatory legal exceptions.",
        },
      ],
    },
    {
      id: "site-changes",
      title: "6. Changes to the website",
      blocks: [
        {
          type: "p",
          text: "AxaWeb may change the content, structure, prices and functionality of the website at any time or (temporarily) interrupt it without prior notice. No rights may be derived from temporary publications or test environments.",
        },
      ],
    },
    {
      id: "availability",
      title: "7. Availability",
      blocks: [
        {
          type: "p",
          text: "We aim for a well-accessible website, but do not guarantee uninterrupted availability. Maintenance, third-party outages or force majeure may limit access.",
        },
      ],
    },
    {
      id: "contact-disclaimer",
      title: "8. Contact",
      blocks: [
        {
          type: "p",
          text: "Questions about this disclaimer:",
        },
        { type: "html", html: companyContactBlockHtml() },
      ],
    },
  ],
  related: [
    { href: "/terms", label: "Terms and Conditions" },
    { href: "/privacy", label: "Privacy Statement" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};
