# Juridische documenten AxaWeb

Bronbestanden (NL):

| Document | Pad | URL |
|----------|-----|-----|
| Algemene voorwaarden | `content/nl/legal/terms.js` | `/algemene-voorwaarden` |
| Privacyverklaring | `content/nl/legal/privacy.js` | `/privacy` |
| Cookiebeleid | `content/nl/legal/cookies.js` | `/cookies` |
| Disclaimer | `content/nl/legal/disclaimer.js` | `/disclaimer` |

Gedeelde bedrijfsgegevens: `content/nl/legal/company.js`.

Generatie: `scripts/generate-legal-pages.js` (aangeroepen vanuit `npm run build`).

## Bedrijfsgegevens in documenten

Contactblokken tonen alleen e-mail, telefoon, website en land.
Geen KvK-nummer, BTW-nummer of bezoekadres in de publieke beleiden.

Bekend en gebruikt: `info@axaweb.nl`, `06 29 12 75 75`, Nederland, AxaWeb.

Cookiebanner-teksten blijven in `messages/nl/cookies.json` (UI); het cookiebeleid-document staat in `content/nl/legal/cookies.js`.
