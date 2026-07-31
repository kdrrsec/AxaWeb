/**
 * HTML-escape voor veilige weergave van content in innerHTML-templates.
 */
export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Alleen veilige relatieve paden of http(s) URL's toestaan in href/src. */
export function safeUrl(value, fallback = "#") {
  const url = String(value ?? "").trim();
  if (!url) return fallback;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (/^https?:\/\//i.test(url)) return url;
  return fallback;
}
