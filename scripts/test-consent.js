import assert from "node:assert/strict";
import {
  CONSENT_STORAGE_KEY,
  acceptAllConsent,
  defaultConsent,
  getConsent,
  hasStoredConsent,
  normalizeConsent,
  rejectAllConsent,
  saveConsent,
} from "../js/lib/consent-store.js";

/* Minimal localStorage polyfill for Node tests */
const store = new Map();
globalThis.localStorage = {
  getItem: (key) => (store.has(key) ? store.get(key) : null),
  setItem: (key, value) => store.set(key, String(value)),
  removeItem: (key) => store.delete(key),
};
globalThis.window = globalThis;

assert.equal(hasStoredConsent(), false);
assert.deepEqual(getConsent().statistics, false);

const denied = defaultConsent();
assert.equal(denied.necessary, true);
assert.equal(denied.marketing, false);

const saved = saveConsent({ preferences: true, statistics: true, marketing: false });
assert.equal(saved.statistics, true);
assert.equal(saved.marketing, false);
assert.ok(saved.updatedAt);
assert.equal(hasStoredConsent(), true);

const normalized = normalizeConsent({ preferences: 1, statistics: 0, marketing: "yes", necessary: false });
assert.equal(normalized.necessary, true);
assert.equal(normalized.preferences, true);
assert.equal(normalized.statistics, false);
assert.equal(normalized.marketing, true);

rejectAllConsent();
assert.equal(getConsent().statistics, false);
assert.equal(getConsent().preferences, false);

acceptAllConsent();
assert.equal(getConsent().statistics, true);
assert.equal(getConsent().marketing, true);

assert.equal(CONSENT_STORAGE_KEY, "axaweb_consent_v1");

console.log("Consent tests passed.");
