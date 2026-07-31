/**
 * Bekende AxaWeb-gegevens voor juridische documenten.
 * Geen KvK, BTW-nummer of bezoekadres in de publieke beleiden.
 */
export const company = {
  brand: "AxaWeb",
  legalLabel: "AxaWeb",
  email: "info@axaweb.nl",
  phoneDisplay: "06 29 12 75 75",
  phoneHref: "tel:+31629127575",
  country: "Nederland",
  website: "https://axaweb.nl",
  /** Laatste inhoudelijke update van de juridische documenten */
  documentsUpdated: "31 juli 2026",
  governingLaw: "Nederlands recht",
  disputeForum: "bevoegde rechter in Nederland",
};

export function companyIdentityLine() {
  return company.legalLabel;
}

/** Contactblok voor privacy, voorwaarden en disclaimer (geen KvK/BTW/adres). */
export function companyContactBlockHtml() {
  return `
    <ul>
      <li>E-mail: <a href="mailto:${company.email}">${company.email}</a></li>
      <li>Telefoon: <a href="${company.phoneHref}">${company.phoneDisplay}</a></li>
      <li>Website: <a href="${company.website}">${company.website}</a></li>
      <li>Land: ${company.country}</li>
    </ul>
  `.trim();
}
