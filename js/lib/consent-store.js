/**
 * Consent storage + helpers (AVG-categorieën).
 * Noodzakelijk is altijd true; overige default false tot expliciete keuze.
 */

export const CONSENT_STORAGE_KEY = "axaweb_consent_v1";
export const CONSENT_VERSION = 1;

export const CONSENT_CHANGED_EVENT = "axaweb:consent-changed";

/** @typedef {{ necessary: true, preferences: boolean, statistics: boolean, marketing: boolean, version: number, updatedAt: string }} ConsentState */

export function defaultConsent() {
  return {
    necessary: true,
    preferences: false,
    statistics: false,
    marketing: false,
    version: CONSENT_VERSION,
    updatedAt: "",
  };
}

export function normalizeConsent(input) {
  const base = defaultConsent();
  if (!input || typeof input !== "object") return base;
  return {
    necessary: true,
    preferences: Boolean(input.preferences),
    statistics: Boolean(input.statistics),
    marketing: Boolean(input.marketing),
    version: CONSENT_VERSION,
    updatedAt: typeof input.updatedAt === "string" ? input.updatedAt : "",
  };
}

export function readStoredConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return normalizeConsent(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function hasStoredConsent() {
  return Boolean(readStoredConsent()?.updatedAt);
}

/**
 * @param {Partial<ConsentState> & { preferences?: boolean, statistics?: boolean, marketing?: boolean }} partial
 */
export function saveConsent(partial) {
  const state = normalizeConsent({
    ...partial,
    necessary: true,
    updatedAt: new Date().toISOString(),
  });

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* private mode / quota — UI werkt nog voor deze sessie */
  }

  if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: state }));
  }

  return state;
}

export function acceptAllConsent() {
  return saveConsent({ preferences: true, statistics: true, marketing: true });
}

export function rejectAllConsent() {
  return saveConsent({ preferences: false, statistics: false, marketing: false });
}

export function getConsent() {
  return readStoredConsent() || defaultConsent();
}

export function allowsStatistics(state = getConsent()) {
  return Boolean(state?.statistics);
}

export function allowsMarketing(state = getConsent()) {
  return Boolean(state?.marketing);
}

export function allowsPreferences(state = getConsent()) {
  return Boolean(state?.preferences);
}
