import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultLocale, isLocale } from "./config.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Message-namespaces die in messages/{locale}/ staan */
export const namespaces = ["common", "home", "form"];

function readNamespace(locale, namespace) {
  const file = join(root, "messages", locale, `${namespace}.json`);
  return JSON.parse(readFileSync(file, "utf8"));
}

const cache = new Map();

/**
 * Laad alle message-namespaces voor een locale (build-time / Node).
 */
export function getMessages(locale = defaultLocale) {
  const key = isLocale(locale) ? locale : defaultLocale;
  if (cache.has(key)) return cache.get(key);

  const messages = {};
  for (const namespace of namespaces) {
    messages[namespace] = readNamespace(key, namespace);
  }
  cache.set(key, messages);
  return messages;
}

/**
 * Translator binnen één namespace, of met volledige pad `ns.key`.
 * Voorbeelden: t('nav.diensten') met ns=common → common.nav.diensten
 *              t('home.hero.title') → home.hero.title
 */
export function createTranslator(messages, namespace = "common") {
  return function t(key, values = {}) {
    const first = key.split(".")[0];
    const path =
      first in messages && first !== namespace
        ? key
        : key.startsWith(`${namespace}.`)
          ? key
          : `${namespace}.${key}`;

    const parts = path.split(".");
    let current = messages;

    for (const part of parts) {
      if (current == null || typeof current !== "object") {
        current = undefined;
        break;
      }
      current = current[part];
    }

    if (typeof current !== "string") {
      return key;
    }

    return current.replace(/\{(\w+)\}/g, (_, name) =>
      values[name] !== undefined && values[name] !== null
        ? String(values[name])
        : `{${name}}`
    );
  };
}

export function getTranslator(locale = defaultLocale, namespace = "common") {
  return createTranslator(getMessages(locale), namespace);
}
