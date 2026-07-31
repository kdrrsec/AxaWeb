# Changelog

Alle noemenswaardige wijzigingen aan AxaWeb worden hier bijgehouden.

## [1.0.0] — 2026-07-31

Eerste officiële productierelease van AxaWeb.

### Website
- Multipage marketingwebsite met diensten, projecten/cases, contact en offerte
- Eenmalige websitepakketten én Website as a Service (branchepakketten)
- Hosting- en onderhoudsabonnementen met contractduur-selectors
- i18n-ready architectuur (`messages/`, `content/`, hreflang-voorbereiding voor EN)

### SEO
- Unieke meta titles/descriptions, Open Graph, Twitter cards
- Canonical URLs, hreflang `nl-NL`, XML sitemap, robots.txt
- JSON-LD (Organization, WebSite, Service, FAQ, BreadcrumbList, CreativeWork)
- SEO-vriendelijke 404

### Security
- Security headers (CSP, HSTS, Permissions-Policy, COOP)
- Gehard contact-API (Origin-check, rate limit, honeypot, dedupe)
- XSS-hardening in client rendering
- Dependency audit clean

### Privacy & analytics
- AVG cookiebanner met categorieën (noodzakelijk, voorkeuren, statistieken, marketing)
- Google Consent Mode v2 (default denied)
- GA4 + Microsoft Clarity alleen na toestemming Statistieken
- Centrale event tracking zonder persoonsgegevens
- Cookiebeleid + bijgewerkte privacyverklaring

### Ops
- Vercel static + serverless contact endpoint
- Environment-driven analytics/verification IDs
