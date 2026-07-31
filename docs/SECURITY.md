# AxaWeb Security

Production hardening notes for the static site + Vercel contact API.

## Surface

- Public marketing pages (static HTML/CSS/JS)
- One serverless endpoint: `POST /api/contact`
- No authentication, admin, uploads, or database

## Headers

Configured in `vercel.json`:

- Content-Security-Policy (self + Google Fonts)
- Strict-Transport-Security (preload)
- X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- Permissions-Policy (camera/mic/geo/payment disabled)
- Cross-Origin-Opener-Policy (`same-origin`)
- Cross-Origin-Resource-Policy (`same-origin`) on `/api/*` only
- Cache-Control for static assets; `no-store` for `/api/*`

COEP is intentionally omitted (not required; can break third-party fonts).
Global CORP is omitted so social crawlers can fetch Open Graph images.

## Contact form controls

| Control | Implementation |
|--------|----------------|
| Honeypot | Hidden `website` field |
| Timing | Required `formStartedAt` (min 2.5s, max 24h) |
| Validation | Shared client/server (`js/lib/contact-validation.js`) |
| Origin binding | `Origin` / `Referer` / `Sec-Fetch-Site` allowlist |
| Rate limit | 5 / 15 min / IP (in-memory per instance) |
| Dedup | SHA-256 fingerprint of IP+email+message (60s) |
| Double submit UI | Button disable + in-flight lock |
| Errors | Opaque JSON codes, no stack traces |

## Future auth (when needed)

If login/admin is added later:

1. Prefer a managed auth provider (Clerk/Auth0) over custom sessions
2. Cookies: `HttpOnly`, `Secure`, `SameSite=Lax` (or `Strict` for admin)
3. Never store tokens in `localStorage`
4. CSRF tokens required for cookie-authenticated mutations
5. Separate admin origin or path with stricter CSP
6. Rate-limit auth endpoints independently

## Secrets

- No production npm dependencies
- No client-side API keys
- Configure `CONTACT_TO_EMAIL` / `ALLOWED_ORIGINS` in Vercel env only
- See `.env.example`

## Uploads

Not supported. If added later: MIME allowlist, size caps, random storage names, no executable types, virus scanning at the edge/object store.
