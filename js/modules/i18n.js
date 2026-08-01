/**
 * Client-side i18n helpers.
 * Messages worden als JSON in de pagina geïnjecteerd (#i18n-messages).
 */

function readInlineMessages() {
  const node = document.getElementById("i18n-messages");
  if (!node?.textContent) return null;
  try {
    return JSON.parse(node.textContent);
  } catch {
    return null;
  }
}

let cached = null;

export function getClientMessages() {
  if (cached) return cached;
  cached = readInlineMessages() || {};
  return cached;
}

export function getLocale() {
  return (
    document.documentElement.dataset.locale ||
    document.documentElement.lang?.slice(0, 2) ||
    "nl"
  );
}

export function t(path, values = {}) {
  const parts = path.split(".");
  let current = getClientMessages();
  for (const part of parts) {
    current = current?.[part];
  }
  if (typeof current !== "string") return path;
  return current.replace(/\{(\w+)\}/g, (_, name) =>
    values[name] !== undefined && values[name] !== null
      ? String(values[name])
      : `{${name}}`
  );
}
