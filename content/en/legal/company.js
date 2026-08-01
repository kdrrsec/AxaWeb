/**
 * Known AxaWeb details for legal documents.
 * No Chamber of Commerce number, VAT number or visiting address in public policies.
 */
export const company = {
  brand: "AxaWeb",
  legalLabel: "AxaWeb",
  email: "info@axaweb.nl",
  phoneDisplay: "06 29 12 75 75",
  phoneHref: "tel:+31629127575",
  country: "Netherlands",
  website: "https://axaweb.nl",
  /** Last substantive update of the legal documents */
  documentsUpdated: "1 August 2026",
  governingLaw: "Dutch law",
  disputeForum: "competent court in the Netherlands",
};

export function companyIdentityLine() {
  return company.legalLabel;
}

/** Contact block for privacy, terms and disclaimer (no Chamber of Commerce/VAT/address). */
export function companyContactBlockHtml() {
  return `
    <ul>
      <li>Email: <a href="mailto:${company.email}">${company.email}</a></li>
      <li>Phone: <a href="${company.phoneHref}">${company.phoneDisplay}</a></li>
      <li>Website: <a href="${company.website}">${company.website}</a></li>
      <li>Country: ${company.country}</li>
    </ul>
  `.trim();
}
