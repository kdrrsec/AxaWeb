import assert from "node:assert/strict";
import {
  validateContactPayload,
  PROJECT_TYPE_VALUES,
  BUDGET_VALUES,
  isSafeSourcePage,
} from "../js/lib/contact-validation.js";
import { assertTrustedOrigin, getAllowedOrigins } from "../api/lib/origin.js";
import { checkDuplicateSubmission } from "../api/lib/rate-limit.js";
import { escapeHtml, safeUrl } from "../js/lib/escape.js";

function base(overrides = {}) {
  return {
    name: "Jan Jansen",
    company: "Voorbeeld BV",
    email: "jan@voorbeeld.nl",
    phone: "0612345678",
    projectType: "website",
    budget: "2500-5000",
    message: "We zoeken een nieuwe website voor ons bedrijf met duidelijke uitstraling.",
    privacy: true,
    website: "",
    formStartedAt: Date.now() - 10_000,
    sourcePage: "/contact",
    ...overrides,
  };
}

const ok = validateContactPayload(base());
assert.equal(ok.ok, true);

const missingName = validateContactPayload(base({ name: "" }));
assert.equal(missingName.ok, false);
assert.equal(missingName.fields.name, "nameRequired");

const badEmail = validateContactPayload(base({ email: "fout" }));
assert.equal(badEmail.ok, false);
assert.equal(badEmail.fields.email, "emailInvalid");

const shortMessage = validateContactPayload(base({ message: "Te kort" }));
assert.equal(shortMessage.ok, false);
assert.equal(shortMessage.fields.message, "messageTooShort");

const honeypot = validateContactPayload(base({ website: "http://spam.test" }));
assert.equal(honeypot.ok, false);
assert.equal(honeypot.code, "spam");

const tooFast = validateContactPayload(base({ formStartedAt: Date.now() }));
assert.equal(tooFast.ok, false);
assert.equal(tooFast.code, "too_fast");

const missingStart = validateContactPayload(base({ formStartedAt: 0 }));
assert.equal(missingStart.ok, false);
assert.equal(missingStart.code, "too_fast");

const tooOld = validateContactPayload(base({ formStartedAt: Date.now() - 48 * 60 * 60 * 1000 }));
assert.equal(tooOld.ok, false);
assert.equal(tooOld.code, "too_fast");

assert.equal(isSafeSourcePage("/contact"), true);
assert.equal(isSafeSourcePage("https://evil.test"), false);
assert.equal(isSafeSourcePage("//evil.test"), false);

const unsafeSource = validateContactPayload(base({ sourcePage: "https://evil.test" }));
assert.equal(unsafeSource.ok, true);
assert.equal(unsafeSource.data.sourcePage, "/");

assert.ok(PROJECT_TYPE_VALUES.includes("website-as-a-service"));
assert.ok(BUDGET_VALUES.includes("to-discuss"));

/* Origin checks (non-production allows missing origin) */
process.env.NODE_ENV = "test";
delete process.env.VERCEL_ENV;
assert.ok(getAllowedOrigins().includes("https://axaweb.nl"));
assert.equal(assertTrustedOrigin({ headers: { origin: "https://evil.test" } }).ok, false);
assert.equal(assertTrustedOrigin({ headers: { origin: "https://axaweb.nl" } }).ok, true);
assert.equal(
  assertTrustedOrigin({ headers: { "sec-fetch-site": "cross-site", origin: "https://axaweb.nl" } }).ok,
  false
);

const first = checkDuplicateSubmission("test-fingerprint");
const second = checkDuplicateSubmission("test-fingerprint");
assert.equal(first.duplicate, false);
assert.equal(second.duplicate, true);

assert.equal(escapeHtml('<img src=x onerror=alert(1)>'), "&lt;img src=x onerror=alert(1)&gt;");
assert.equal(safeUrl("javascript:alert(1)"), "#");
assert.equal(safeUrl("/projecten/axanet"), "/projecten/axanet");

console.log("Contact validation tests passed.");
