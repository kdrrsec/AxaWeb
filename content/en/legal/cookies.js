import { company, companyIdentityLine } from "./company.js";

/**
 * Cookie policy AxaWeb, aligned with cookie consent.
 */
export const cookiesDoc = {
  pageId: "cookies",
  filename: "cookies.html",
  path: "/cookies",
  title: "Cookie Policy | AxaWeb",
  description:
    "Cookie policy of AxaWeb: which cookie categories we use, Google Analytics, Microsoft Clarity and how you change your consent.",
  h1: "Cookie Policy",
  updatedLabel: company.documentsUpdated,
  dateIso: "2026-08-01",
  showCookieSettingsButton: true,
  intro: [
    {
      type: "p",
      html: `This cookie policy relates to the website of ${companyIdentityLine()}. It explains which cookies and similar technologies we use, why, and how you manage your choice.`,
    },
    {
      type: "p",
      html: `For the processing of personal data, see also the <a href="/privacy">privacy statement</a>.`,
    },
  ],
  sections: [
    {
      id: "what-are-cookies",
      title: "1. What are cookies?",
      blocks: [
        {
          type: "p",
          text: "Cookies are small text files that your browser may store when you visit a website. Similar technologies, such as local storage, can serve the same purpose, for example remembering your cookie consent.",
        },
      ],
    },
    {
      id: "categories",
      title: "2. Categories we use",
      blocks: [
        {
          type: "h3",
          text: "Necessary",
        },
        {
          type: "p",
          text: "Required for the basic operation of the site, security and storing your cookie choice. This category is always active. Without this storage we would not be able to remember your choice.",
        },
        {
          type: "h3",
          text: "Preferences",
        },
        {
          type: "p",
          text: "For optional functional settings that are not strictly necessary. At present we do not load separate preference scripts unless needed; the category exists in the banner for future functional extensions.",
        },
        {
          type: "h3",
          text: "Statistics",
        },
        {
          type: "p",
          text: "Helps us understand how the website is used. Only after your consent do we load Google Analytics 4 and Microsoft Clarity. Without consent these tools are not loaded.",
        },
        {
          type: "h3",
          text: "Marketing",
        },
        {
          type: "p",
          text: "Reserved for future marketing tools (such as advertising pixels). Off by default. Without consent we do not load marketing tools.",
        },
      ],
    },
    {
      id: "consent",
      title: "3. Consent",
      blocks: [
        {
          type: "p",
          text: "On your first visit we show a cookie banner. You can accept all, reject all (except necessary), or set categories separately. Your choice is remembered on this device so the banner does not return on every visit.",
        },
        {
          type: "p",
          text: "Optional statistics or marketing tools load only after your consent. You can change your choice later via Cookie preferences in the footer.",
        },
      ],
    },
    {
      id: "which-tools",
      title: "4. Which tools may be used?",
      blocks: [
        {
          type: "ul",
          items: [
            {
              html: "<strong>Cookie consent (necessary):</strong> storage of your choice on this device.",
            },
            {
              html: "<strong>Google Analytics 4:</strong> statistics on website use, only after consent.",
            },
            {
              html: "<strong>Microsoft Clarity:</strong> session insights and session recordings, only after consent. Sensitive fields on the contact and quote form are masked; other page text is not fully masked by default.",
            },
            {
              html: "<strong>Google Fonts:</strong> loads the Manrope font for display.",
            },
            {
              html: "<strong>Marketing tools:</strong> not active without marketing consent.",
            },
          ],
        },
      ],
    },
    {
      id: "retention-cookies",
      title: "5. Retention periods",
      blocks: [
        {
          type: "ul",
          items: [
            "Your consent choice remains stored until you clear it via browser data or change it via Cookie preferences.",
            "Cookies from Google Analytics and Microsoft Clarity follow the settings of those services.",
            "Without consent for Statistics or Marketing, those optional tools do not place tracking cookies via our site.",
          ],
        },
      ],
    },
    {
      id: "manage",
      title: "6. Changing cookie preferences",
      blocks: [
        {
          type: "p",
          text: "You can always change your choice later via “Cookie preferences” in the website footer, or via the button below. You can also delete or block cookies via your browser settings. If you block all cookies, the site may work less well.",
        },
      ],
    },
    {
      id: "third-parties",
      title: "7. External services",
      blocks: [
        {
          type: "p",
          text: "External parties (Google, Microsoft) process data under their own terms when their services are loaded. We load optional tracking scripts only after the appropriate consent.",
        },
      ],
    },
    {
      id: "changes-cookies",
      title: "8. Changes",
      blocks: [
        {
          type: "p",
          text: "This cookie policy may be updated if we add tools or legislation changes. The date at the top shows the latest update.",
        },
      ],
    },
  ],
  related: [
    { href: "/privacy", label: "Privacy Statement" },
    { href: "/terms", label: "Terms and Conditions" },
    { href: "/disclaimer", label: "Disclaimer" },
  ],
};
