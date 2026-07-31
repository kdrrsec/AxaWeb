/**
 * Bekende AxaWeb-gegevens + placeholders voor later invullen.
 * Geen verzonnen KvK/BTW/adres — alleen wat op de site of in docs staat.
 */
export const company = {
  brand: "AxaWeb",
  legalLabel: "AxaWeb",
  parentNote: "onderdeel van AxaNet",
  email: "info@axaweb.nl",
  phoneDisplay: "06 29 12 75 75",
  phoneHref: "tel:+31629127575",
  country: "Nederland",
  website: "https://axaweb.nl",
  /** Placeholders — vervang door echte gegevens */
  kvk: "[KvK-nummer]",
  btw: "[BTW-nummer]",
  addressLine: "[Bezoekadres]",
  postalCity: "[Postcode en plaats]",
  /** Laatste inhoudelijke update van de juridische documenten */
  documentsUpdated: "31 juli 2026",
  governingLaw: "Nederlands recht",
  disputeForum: "bevoegde rechter in Nederland",
};

export function companyIdentityLine() {
  return `${company.legalLabel} (${company.parentNote})`;
}

export function companyContactBlockHtml() {
  return `
    <ul>
      <li>E-mail: <a href="mailto:${company.email}">${company.email}</a></li>
      <li>Telefoon: <a href="${company.phoneHref}">${company.phoneDisplay}</a></li>
      <li>Website: <a href="${company.website}">${company.website}</a></li>
      <li>Land: ${company.country}</li>
      <li>KvK: ${company.kvk}</li>
      <li>BTW: ${company.btw}</li>
      <li>Adres: ${company.addressLine}, ${company.postalCity}</li>
    </ul>
  `.trim();
}
