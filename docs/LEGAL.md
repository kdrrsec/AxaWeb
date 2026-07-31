# Juridische documenten AxaWeb

Bronbestanden (NL):

| Document | Pad | URL |
|----------|-----|-----|
| Algemene voorwaarden | `content/nl/legal/terms.js` | `/algemene-voorwaarden` |
| Privacyverklaring | `content/nl/legal/privacy.js` | `/privacy` |
| Cookiebeleid | `content/nl/legal/cookies.js` | `/cookies` |
| Disclaimer | `content/nl/legal/disclaimer.js` | `/disclaimer` |

Gedeelde bedrijfsgegevens / placeholders: `content/nl/legal/company.js`.

Generatie: `scripts/generate-legal-pages.js` (aangeroepen vanuit `npm run build`).

## Bedrijfsgegevens in documenten

Privacy toont alleen e-mail, telefoon, website en land (geen KvK/BTW/adres).

Optionele placeholders in `company.js` (alleen als `includeRegistry: true` wordt gebruikt):

- `[KvK-nummer]`
- `[BTW-nummer]`
- `[Bezoekadres]`
- `[Postcode en plaats]`

Bekend en reeds gebruikt: `info@axaweb.nl`, `06 29 12 75 75`, Nederland, AxaWeb (onderdeel van AxaNet).

Cookiebanner-teksten blijven in `messages/nl/cookies.json` (UI); het cookiebeleid-document staat in `content/nl/legal/cookies.js`.
