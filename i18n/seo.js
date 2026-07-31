import {
  defaultLocale,
  englishLocaleLive,
  hreflangCode,
  htmlLang,
  locales,
  ogLocale,
  siteName,
  siteUrl,
  defaultOgImage,
  defaultOgImageAlt,
  defaultOgImageWidth,
  defaultOgImageHeight,
  organizationEmail,
  organizationTelephone,
} from "./config.js";
import { localizedPath, resolveLocaleFromPath } from "./routing.js";

/**
 * Canonical URL voor een pad + locale.
 */
export function canonicalUrl(pathname = "/", locale = defaultLocale) {
  const path = localizedPath(pathname, locale);
  if (path === "/") return `${siteUrl}/`;
  return `${siteUrl}${path}`;
}

/**
 * hreflang-linktags.
 * Nu: nl-NL + x-default. Zodra englishLocaleLive=true: ook en.
 */
export function hreflangLinks(pathname = "/", { includeInactive = englishLocaleLive } = {}) {
  const { pathname: clean } = resolveLocaleFromPath(pathname);
  const activeLocales = includeInactive ? locales : [defaultLocale];

  const links = activeLocales.map((locale) => ({
    hreflang: hreflangCode[locale] || htmlLang[locale],
    href: canonicalUrl(clean, locale),
  }));

  links.push({
    hreflang: "x-default",
    href: canonicalUrl(clean, defaultLocale),
  });

  return links;
}

export function renderHreflangLinks(pathname = "/") {
  return hreflangLinks(pathname)
    .map((link) => `<link rel="alternate" hreflang="${link.hreflang}" href="${link.href}" />`)
    .join("\n  ");
}

export function localeMeta(locale = defaultLocale) {
  return {
    htmlLang: htmlLang[locale] || htmlLang[defaultLocale],
    ogLocale: ogLocale[locale] || ogLocale[defaultLocale],
    ogLocaleAlternates: englishLocaleLive
      ? locales.filter((l) => l !== locale).map((l) => ogLocale[l])
      : [],
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function absoluteUrl(urlOrPath) {
  if (!urlOrPath) return defaultOgImage;
  if (String(urlOrPath).startsWith("http")) return String(urlOrPath);
  const path = String(urlOrPath).startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  return `${siteUrl}${path}`;
}

/**
 * Gedeelde social + icon meta tags (OG + Twitter + favicon/manifest).
 */
export function renderSocialMeta({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt = defaultOgImageAlt,
  ogType = "website",
  locale = defaultLocale,
} = {}) {
  const meta = localeMeta(locale);
  const image = absoluteUrl(ogImage || defaultOgImage);
  const isDefaultImage = image === defaultOgImage;
  const ogAlternates = meta.ogLocaleAlternates
    .map((value) => `<meta property="og:locale:alternate" content="${value}" />`)
    .join("\n  ");

  const imageSizeTags = isDefaultImage
    ? `
  <meta property="og:image:width" content="${defaultOgImageWidth}" />
  <meta property="og:image:height" content="${defaultOgImageHeight}" />`
    : "";

  return `
  <meta property="og:type" content="${escapeHtml(ogType)}" />
  <meta property="og:locale" content="${meta.ogLocale}" />
  ${ogAlternates}
  <meta property="og:site_name" content="${escapeHtml(siteName)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />${imageSizeTags}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}" />

  <meta name="theme-color" content="#06101D" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=3" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="msapplication-TileColor" content="#06101D" />
  <meta name="msapplication-config" content="/browserconfig.xml" />`.trim();
}

/** Organization + ProfessionalService node */
export function buildOrganizationNode(seoMessages = {}) {
  const org = seoMessages.organization || {};
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: org.name || siteName,
    legalName: org.legalName || siteName,
    url: `${siteUrl}/`,
    email: org.email || organizationEmail,
    telephone: org.telephone || organizationTelephone,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
      width: 386,
      height: 72,
    },
    image: defaultOgImage,
    description: org.description || "",
    areaServed: {
      "@type": "Country",
      name: org.areaServed || "Nederland",
    },
    priceRange: "€€",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: org.email || organizationEmail,
      telephone: org.telephone || organizationTelephone,
      availableLanguage: ["Dutch", "nl"],
    },
  };
}

export function buildWebSiteNode(seoMessages = {}) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: seoMessages.siteName || siteName,
    inLanguage: hreflangCode[defaultLocale] || "nl-NL",
    publisher: { "@id": `${siteUrl}/#organization` },
    description: seoMessages.organization?.description || "",
  };
}

export function buildBreadcrumbList(items = [], pageUrl = "/") {
  if (!items.length) return null;
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(pageUrl)}#breadcrumb`,
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      const href = item.href || (isLast ? pageUrl : undefined);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(href ? { item: absoluteUrl(href) } : {}),
      };
    }),
  };
}

export function buildFaqPage(items = []) {
  if (!items.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildServiceNode({ name, description, url, seoMessages }) {
  return {
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(url),
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: {
      "@type": "Country",
      name: seoMessages?.organization?.areaServed || "Nederland",
    },
  };
}

export function buildContactPageNode(url = "/contact") {
  return {
    "@type": "ContactPage",
    "@id": `${absoluteUrl(url)}#contactpage`,
    url: absoluteUrl(url),
    name: "Contact",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
  };
}

export function buildCreativeWorkNode(project) {
  return {
    "@type": "CreativeWork",
    name: project.name,
    description: project.meta.description,
    url: `${siteUrl}/projecten/${project.slug}`,
    image: project.images.og,
    creator: { "@id": `${siteUrl}/#organization` },
    about: {
      "@type": "WebSite",
      name: project.name,
      url: project.url,
    },
  };
}

/**
 * Bouw @graph JSON-LD voor een pagina.
 */
export function buildJsonLdGraph(nodes = []) {
  const filtered = nodes.filter(Boolean);
  if (!filtered.length) return "";
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": filtered,
    },
    null,
    2
  );
}

export function renderJsonLdScript(jsonLd) {
  if (!jsonLd) return "";
  const payload = typeof jsonLd === "string" ? jsonLd : JSON.stringify(jsonLd, null, 2);
  return `<script type="application/ld+json">\n${payload}\n  </script>`;
}

/**
 * Sitemap-entries voor alle publieke pagina's.
 * @param {{ lastmod?: string }} options
 */
export function getSitemapEntries({ lastmod } = {}) {
  const iso = lastmod || new Date().toISOString().slice(0, 10);
  return [
    { path: "/", changefreq: "weekly", priority: "1.0", lastmod: iso },
    { path: "/diensten", changefreq: "monthly", priority: "0.9", lastmod: iso },
    { path: "/websites", changefreq: "monthly", priority: "0.85", lastmod: iso },
    { path: "/webshops", changefreq: "monthly", priority: "0.85", lastmod: iso },
    { path: "/hosting", changefreq: "monthly", priority: "0.8", lastmod: iso },
    { path: "/onderhoud", changefreq: "monthly", priority: "0.8", lastmod: iso },
    { path: "/pakketten", changefreq: "weekly", priority: "0.9", lastmod: iso },
    { path: "/projecten", changefreq: "monthly", priority: "0.75", lastmod: iso },
    { path: "/projecten/bandendepot", changefreq: "monthly", priority: "0.65", lastmod: iso },
    { path: "/projecten/axanet", changefreq: "monthly", priority: "0.65", lastmod: iso },
    { path: "/projecten/viralon", changefreq: "monthly", priority: "0.65", lastmod: iso },
    { path: "/contact", changefreq: "monthly", priority: "0.85", lastmod: iso },
    { path: "/offerte", changefreq: "monthly", priority: "0.85", lastmod: iso },
    { path: "/privacy", changefreq: "yearly", priority: "0.3", lastmod: iso },
    { path: "/algemene-voorwaarden", changefreq: "yearly", priority: "0.3", lastmod: iso },
  ];
}

export function renderSitemapXml(entries = getSitemapEntries()) {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${canonicalUrl(entry.path)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
