# Contactformulier

Productieklare verwerking via Vercel Serverless Function + Resend.

## Flow

1. Client valideert (`js/lib/contact-validation.js` + `js/modules/form.js`)
2. POST naar `/api/contact`
3. Server herhaalt validatie, spamchecks en rate limiting
4. E-mail via Resend naar `CONTACT_TO_EMAIL`

## Environment variables

Zie `.env.example`:

| Variabele | Doel |
|-----------|------|
| `RESEND_API_KEY` | API-sleutel van Resend |
| `CONTACT_TO_EMAIL` | Ontvanger (bijv. `info@axaweb.nl`) |
| `CONTACT_FROM_EMAIL` | Geverifieerde afzender in Resend |

Stel deze in bij Vercel → Project → Settings → Environment Variables.

## Spambeveiliging

- Honeypotveld (`website`)
- Minimale invultijd (~2,5s)
- Rate limit (5 / 15 min / IP, in-memory)
- Basiscontrole op verdachte inhoud

## i18n

Alle zichtbare formulierteksten staan in `messages/nl/form.json` (EN-placeholders in `messages/en/form.json`).
