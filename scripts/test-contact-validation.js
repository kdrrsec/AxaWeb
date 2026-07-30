import assert from "node:assert/strict";
import {
  validateContactPayload,
  PROJECT_TYPE_VALUES,
  BUDGET_VALUES,
} from "../js/lib/contact-validation.js";

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

assert.ok(PROJECT_TYPE_VALUES.includes("website-as-a-service"));
assert.ok(BUDGET_VALUES.includes("to-discuss"));

console.log("Contact validation tests passed.");
