# Contactformulier

Productieklare verwerking via Vercel Serverless Function + FormSubmit.

## Flow

1. Client valideert (`js/lib/contact-validation.js` + `js/modules/form.js`)
2. POST naar `/api/contact` (JSON, same-origin)
3. Server controleert Origin/Referer, rate limit, dedupe, validatie en spamfilters
4. E-mail via **FormSubmit** naar `info@axaweb.nl`

## Environment variables

Zie `.env.example`:

| Variabele | Doel | Standaard |
|-----------|------|-----------|
| `CONTACT_TO_EMAIL` | Ontvanger FormSubmit | `info@axaweb.nl` |
| `ALLOWED_ORIGINS` | Toegestane Origins (CSV) | `https://axaweb.nl,https://www.axaweb.nl` |

Geen API-sleutel nodig. Optioneel overschrijven in Vercel → Environment Variables.

> Let op: FormSubmit vraagt bij het eerste bericht naar een nieuw adres om activatie via e-mail.

## Beveiliging

- Honeypotveld (`website`)
- Verplichte `formStartedAt` (min. ~2,5s, max. 24u)
- Origin / Referer / Sec-Fetch-Site allowlist
- Rate limit (5 / 15 min / IP, in-memory per instance)
- Dedupe fingerprint (60s) tegen dubbele mails
- Client double-submit lock
- Basiscontrole op verdachte inhoud
- Opaque API-foutcodes (geen stacktraces)

Zie ook `docs/SECURITY.md`.

## i18n

Alle zichtbare formulierteksten staan in `messages/nl/form.json` (EN-placeholders in `messages/en/form.json`).
