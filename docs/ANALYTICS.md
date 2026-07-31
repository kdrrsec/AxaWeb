# Analytics & Search Console

## Environment variables

Set in Vercel → Project Settings → Environment Variables (Production/Preview):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID (`G-XXXXXXXX`) |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity project ID |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console meta verification token |

Empty values keep analytics/verification disabled (no runtime errors).

Values are injected at build time into `js/config/public-env.js`.

## Google Analytics 4

1. Create a GA4 property and copy the Measurement ID.
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel.
3. Redeploy.
4. Scripts load only after the visitor accepts **Statistieken**.

## Microsoft Clarity

1. Create a Clarity project and copy the project ID.
2. Set `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
3. Redeploy.
4. Loads only after **Statistieken** consent. Contact forms use `data-clarity-mask`.

## Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add property `https://axaweb.nl`.
3. Choose **HTML-tag** verification.
4. Copy only the `content` value from the meta tag into `GOOGLE_SITE_VERIFICATION`.
5. Redeploy, then click **Verify** in Search Console.
6. Submit `https://axaweb.nl/sitemap.xml`.

## Events

Central helper: `js/modules/analytics.js` → `trackEvent()`.

Measured (statistics consent required):

- `contact_form_submit`, `quote_form_submit`
- `phone_click`, `whatsapp_click`
- `primary_cta_click`, `package_cta_click`
- `pricing_model_select`, `pricing_duration_select`
- `waas_package_view`, `project_view`, `outbound_project_click`

No names, emails, phone numbers or message bodies are sent as parameters.
