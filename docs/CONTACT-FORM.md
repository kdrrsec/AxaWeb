# Contactformulier

Productieklare verwerking via Vercel Serverless Function + FormSubmit.

## Flow

1. Client valideert (`js/lib/contact-validation.js` + `js/modules/form.js`)
2. POST naar `/api/contact`
3. Server herhaalt validatie, spamchecks en rate limiting
4. E-mail via **FormSubmit** naar `info@axaweb.nl`

## Environment variables

Zie `.env.example`:

| Variabele | Doel | Standaard |
|-----------|------|-----------|
| `CONTACT_TO_EMAIL` | Ontvanger FormSubmit | `info@axaweb.nl` |

Geen API-sleutel nodig. Optioneel overschrijven in Vercel → Environment Variables.

> Let op: FormSubmit vraagt bij het eerste bericht naar een nieuw adres om activatie via e-mail.

## Spambeveiliging

- Honeypotveld (`website`)
- Minimale invultijd (~2,5s)
- Rate limit (5 / 15 min / IP, in-memory)
- Basiscontrole op verdachte inhoud

## i18n

Alle zichtbare formulierteksten staan in `messages/nl/form.json` (EN-placeholders in `messages/en/form.json`).
