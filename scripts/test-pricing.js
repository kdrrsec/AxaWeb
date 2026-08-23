import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  pricing,
  formatEuro,
  calcSavings,
  getAvailableTerms,
  getOneTimePlans,
  getOneTimeFromPrice,
  getWaasPlans,
  getWaasAddons,
  getWaasAddon,
  getWaasIndustries,
  getWaasMonthlyTotal,
  getWaasFromPrice,
  getHostingFromPrice,
  getMaintenanceFromPrice,
  getHostingPlans,
  getMaintenancePlans,
} from "../data/pricing.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nlPricing = JSON.parse(readFileSync(join(root, "messages/nl/pricing.json"), "utf8"));
const enPricing = JSON.parse(readFileSync(join(root, "messages/en/pricing.json"), "utf8"));

/* ---------- Notatie ---------- */

assert.equal(formatEuro(1595), "€1.595");
assert.equal(formatEuro(1595, "en"), "€1,595");
assert.equal(formatEuro(39.5), "€39,50");
assert.equal(formatEuro(39.5, "en"), "€39.50");
assert.equal(formatEuro(7.5), "€7,50");

/* ---------- Eenmalige websites blijven ongewijzigd ---------- */

const oneTime = Object.fromEntries(getOneTimePlans().map((p) => [p.id, p]));
assert.equal(oneTime.start.price, 495, "Eenmalig Start moet €495 blijven");
assert.equal(oneTime.business.price, 795, "Eenmalig Business moet €795 blijven");
assert.equal(oneTime.premium.price, 1595, "Eenmalig Premium moet €1.595 blijven");
assert.equal(getOneTimeFromPrice(), 495);
for (const plan of getOneTimePlans()) {
  assert.equal(plan.priceWas, undefined, `Geen doorgestreepte oude prijs op ${plan.id}`);
}

/* ---------- WaaS: Start / Business / Premium ---------- */

const expectedWaas = {
  start: { "12": 39.5, monthly: 54.5, pages: 1, mailboxes: 0, includesBooking: false },
  business: { "12": 59, monthly: 74, pages: 5, mailboxes: 3, includesBooking: true },
  premium: { "12": 79, monthly: 94, pages: 10, mailboxes: 8, includesBooking: true },
};

const plans = getWaasPlans();
assert.equal(plans.length, 3, "WaaS kent precies drie hoofdpakketten");
assert.deepEqual(
  plans.map((p) => p.id),
  ["start", "business", "premium"],
  "Volgorde Start, Business, Premium"
);

for (const [id, expected] of Object.entries(expectedWaas)) {
  const plan = plans.find((p) => p.id === id);
  assert.ok(plan, `Ontbrekend WaaS-pakket: ${id}`);
  assert.equal(plan.prices["12"], expected["12"], `${id}: 12-maandenprijs`);
  assert.equal(plan.prices.monthly, expected.monthly, `${id}: flexibele maandprijs`);
  assert.equal(plan.pages, expected.pages, `${id}: aantal pagina's`);
  assert.equal(plan.mailboxes, expected.mailboxes, `${id}: aantal mailboxen`);
  assert.equal(plan.includesBooking, expected.includesBooking, `${id}: boekingssysteem`);
  assert.equal(
    Math.round((plan.prices.monthly - plan.prices["12"]) * 100) / 100,
    pricing.waas.monthlySurcharge,
    `${id}: flexibel maandelijks is €${pricing.waas.monthlySurcharge} hoger`
  );
  const savings = calcSavings(plan.prices.monthly, plan.prices["12"], 12);
  assert.equal(savings.amount, 180, `${id}: besparing bij 12 maanden`);
}

/* Vanafprijs €39,50 hoort bij Start op 12 maanden */
assert.equal(getWaasFromPrice(), 39.5);
assert.equal(getWaasFromPrice(), plans.find((p) => p.id === "start").prices["12"]);

/* Business is het aanbevolen pakket */
assert.equal(plans.find((p) => p.id === "business").featured, true);
assert.equal(plans.find((p) => p.id === "business").badgeKey, "mostChosen");
assert.equal(plans.find((p) => p.id === "start").featured, false);
assert.equal(plans.find((p) => p.id === "premium").featured, false);

/* ---------- Add-ons ---------- */

const emailAddon = getWaasAddon("businessEmail");
const bookingAddon = getWaasAddon("booking");

assert.equal(emailAddon.price, 7.5, "Zakelijke e-mail add-on is €7,50");
assert.equal(emailAddon.billing, "oneTime", "Zakelijke e-mail is eenmalig");
assert.deepEqual(emailAddon.availableFor, ["start"], "E-mail add-on alleen bij Start");

assert.equal(bookingAddon.price, 7.5, "Boekingssysteem add-on is €7,50");
assert.equal(bookingAddon.billing, "monthly", "Boekingssysteem is per maand");
assert.deepEqual(bookingAddon.availableFor, ["start"], "Boeking add-on alleen bij Start");

assert.deepEqual(
  getWaasAddons("start").map((a) => a.id),
  ["businessEmail", "booking"]
);
assert.deepEqual(getWaasAddons("business"), [], "Business toont geen add-ons");
assert.deepEqual(getWaasAddons("premium"), [], "Premium toont geen add-ons");

/* Start + boekingssysteem = €47,00 per maand bij 12 maanden */
assert.equal(getWaasMonthlyTotal("start", "12", ["booking"]), 47);
assert.equal(getWaasMonthlyTotal("start", "monthly", ["booking"]), 62);
assert.equal(getWaasMonthlyTotal("start", "12", []), 39.5);
/* Eenmalige add-ons tellen niet mee in het maandtotaal */
assert.equal(getWaasMonthlyTotal("start", "12", ["businessEmail"]), 39.5);

/* ---------- Mailboxen: nooit onbeperkt ---------- */

assert.equal(plans.find((p) => p.id === "business").mailboxes, 3);
assert.equal(plans.find((p) => p.id === "premium").mailboxes, 8);
assert.equal(plans.find((p) => p.id === "start").mailboxes, 0);

for (const messages of [nlPricing, enPricing]) {
  const serialised = JSON.stringify(messages).toLowerCase();
  assert.ok(!serialised.includes("onbeperkt"), "Geen onbeperkte claims in NL-copy");
  assert.ok(!serialised.includes("unlimited"), "Geen unlimited claims in EN-copy");
}

assert.ok(nlPricing.features.waasMailboxesIncluded.includes("{count}"));
assert.ok(enPricing.features.waasMailboxesIncluded.includes("{count}"));

/* ---------- Boekingssysteem: basis, geen premium-claims ---------- */

assert.equal(plans.find((p) => p.id === "business").includesBooking, true);
assert.equal(plans.find((p) => p.id === "premium").includesBooking, true);
assert.equal(plans.find((p) => p.id === "start").includesBooking, false);

for (const id of ["business", "premium"]) {
  const plan = plans.find((p) => p.id === id);
  assert.ok(plan.featureKeys.includes("waasBookingIncluded"), `${id}: boekingssysteem in featurelijst`);
}
assert.ok(!plans.find((p) => p.id === "start").featureKeys.includes("waasBookingIncluded"));

/* Toekomstige premium-functionaliteit mag nergens als inbegrepen staan */
const forbiddenClaims = [
  "whatsapp",
  "ai-receptionist",
  "ai receptionist",
  "no-show",
  "api-toegang",
  "api access",
  "extra locaties",
  "extra medewerkers",
];
for (const messages of [nlPricing, enPricing]) {
  const serialised = JSON.stringify(messages).toLowerCase();
  for (const claim of forbiddenClaims) {
    assert.ok(!serialised.includes(claim), `Toekomstige feature niet als inbegrepen tonen: ${claim}`);
  }
}

/* ---------- Looptijden: uitsluitend flexibel maandelijks en 12 maanden ---------- */

const recurringCatalogs = {
  waas: pricing.waas,
  hosting: pricing.hosting,
  maintenance: pricing.maintenance,
};

for (const [name, catalog] of Object.entries(recurringCatalogs)) {
  const termIds = catalog.terms.map((t) => t.id);
  for (const id of termIds) {
    assert.ok(["monthly", "12"].includes(id), `${name}: onbekende looptijd "${id}"`);
  }
  assert.ok(!termIds.includes("24"), `${name}: 24 maanden mag niet meer bestaan`);
  assert.ok(!termIds.includes("36"), `${name}: 36 maanden mag niet meer bestaan`);
  assert.equal(catalog.defaultTerm, "12", `${name}: 12 maanden is de standaardkeuze`);
}

assert.equal(nlPricing.terms["24"], undefined);
assert.equal(enPricing.terms["24"], undefined);
assert.equal(nlPricing.terms["36"], undefined);
assert.equal(enPricing.terms["36"], undefined);
assert.equal(nlPricing.terms["12"], "12 maanden");
assert.equal(enPricing.terms["12"], "12 months");
assert.equal(nlPricing.terms.monthly, "Flexibel maandelijks");
assert.equal(enPricing.terms.monthly, "Flexible monthly");

/* ---------- Oude WaaS-structuur is verdwenen ---------- */

const removedPlanIds = ["one-page", "business-site", "beauty-barber", "restaurant", "gym", "webshop", "barbershop"];
for (const id of removedPlanIds) {
  assert.ok(!plans.some((p) => p.id === id), `Oud WaaS-pakket ${id} mag geen prijskaart meer zijn`);
  assert.equal(nlPricing.waas[id], undefined, `NL: oude WaaS-pricing ${id} verwijderd`);
  assert.equal(enPricing.waas[id], undefined, `EN: oude WaaS-pricing ${id} verwijderd`);
}

const oldWaasPrices = [104, 119, 129, 139, 144, 149, 169, 179, 189, 199, 229];
const currentWaasPrices = plans.flatMap((p) => Object.values(p.prices));
for (const price of oldWaasPrices) {
  assert.ok(!currentWaasPrices.includes(price), `Oude WaaS-prijs €${price} mag niet meer voorkomen`);
}

for (const messages of [nlPricing, enPricing]) {
  const serialised = JSON.stringify(messages);
  for (const name of ["Barbershop Complete", "Restaurant Complete", "Sportschool Complete", "Webshop Complete", "Gym Complete"]) {
    assert.ok(!serialised.includes(name), `Oude pakketnaam verwijderd: ${name}`);
  }
}

/* ---------- Branches blijven bestaan als positionering ---------- */

const industries = getWaasIndustries();
assert.deepEqual(
  industries.map((i) => i.id),
  ["beauty-barber", "restaurant", "automotive", "sport-fitness", "professional-services"]
);

for (const industry of industries) {
  assert.equal(industry.prices, undefined, `${industry.id}: branche mag geen eigen pricing hebben`);
  for (const messages of [nlPricing, enPricing]) {
    assert.ok(messages.industries[industry.id]?.name, `Ontbrekende branchenaam: ${industry.id}`);
    assert.ok(messages.industries[industry.id]?.text, `Ontbrekende branchetekst: ${industry.id}`);
    assert.ok(
      Array.isArray(messages.industries[industry.id]?.examples),
      `Ontbrekende voorbeelden: ${industry.id}`
    );
    if (industry.bookingKey) {
      assert.ok(messages.highlights[industry.bookingKey], `Ontbrekende boekingsterm: ${industry.bookingKey}`);
    }
  }
}

assert.equal(industries.find((i) => i.id === "beauty-barber").bookingKey, "appointments");
assert.equal(industries.find((i) => i.id === "restaurant").bookingKey, "reservations");
assert.equal(industries.find((i) => i.id === "automotive").bookingKey, undefined);
assert.equal(industries.find((i) => i.id === "professional-services").bookingKey, undefined);

/* ---------- Hosting en onderhoud blijven bestaan ---------- */

const hosting = Object.fromEntries(getHostingPlans().map((p) => [p.id, p]));
assert.equal(hosting.essential.prices["12"], 89);
assert.equal(hosting.business.prices["12"], 179);
assert.equal(hosting.managed.onRequest, true);
assert.equal(getHostingFromPrice(), 89);
assert.deepEqual(getAvailableTerms(pricing.hosting).map((t) => t.id), ["12"]);

const maintenance = Object.fromEntries(getMaintenancePlans().map((p) => [p.id, p]));
assert.equal(maintenance.basic.prices.monthly, 39);
assert.equal(maintenance.basic.prices["12"], 32);
assert.equal(maintenance.business.prices.monthly, 79);
assert.equal(maintenance.business.prices["12"], 64);
assert.equal(getMaintenanceFromPrice(), 32);
assert.deepEqual(getAvailableTerms(pricing.maintenance).map((t) => t.id), ["monthly", "12"]);

/* ---------- btw-vermelding ---------- */

assert.equal(nlPricing.labels.exclVat, "Excl. 21% btw");
assert.equal(enPricing.labels.exclVat, "Excl. 21% VAT");
assert.ok(nlPricing.termsInfo.items.some((i) => i.includes("exclusief 21% btw")));
assert.ok(enPricing.termsInfo.items.some((i) => i.includes("exclude 21% VAT")));
assert.ok(nlPricing.compare.note.includes("21% btw"));
assert.ok(enPricing.compare.note.includes("21% VAT"));
for (const key of ["oneTime", "waas", "hosting", "maintenance"]) {
  assert.ok(nlPricing.sections[key].note.includes("21% btw"), `NL btw ontbreekt in ${key}`);
  assert.ok(enPricing.sections[key].note.includes("21% VAT"), `EN VAT ontbreekt in ${key}`);
}

/* ---------- NL en EN lopen gelijk ---------- */

const keysOf = (obj) => Object.keys(obj).sort().join(",");
assert.equal(keysOf(nlPricing.waas), keysOf(enPricing.waas), "WaaS-pakketten gelijk in NL en EN");
assert.equal(keysOf(nlPricing.addons), keysOf(enPricing.addons));
assert.equal(keysOf(nlPricing.industries), keysOf(enPricing.industries));
assert.equal(keysOf(nlPricing.hosting), keysOf(enPricing.hosting));
assert.equal(keysOf(nlPricing.maintenance), keysOf(enPricing.maintenance));
assert.equal(keysOf(nlPricing.oneTime), keysOf(enPricing.oneTime));
assert.equal(keysOf(nlPricing.features), keysOf(enPricing.features));
assert.equal(keysOf(nlPricing.terms), keysOf(enPricing.terms));
assert.equal(keysOf(nlPricing.highlights), keysOf(enPricing.highlights));
assert.equal(keysOf(nlPricing.compare.rows), keysOf(enPricing.compare.rows));
assert.equal(keysOf(nlPricing.compare.values), keysOf(enPricing.compare.values));
assert.equal(nlPricing.termsInfo.items.length, enPricing.termsInfo.items.length);

for (const id of Object.keys(nlPricing.industries)) {
  const nlEntry = nlPricing.industries[id];
  if (!nlEntry || typeof nlEntry !== "object") continue;
  assert.equal(
    nlEntry.examples?.length,
    enPricing.industries[id].examples?.length,
    `Aantal voorbeelden gelijk voor ${id}`
  );
}

/* ---------- Vertaaldekking ---------- */

const featureSets = plans.map((p) => (p.featureKeys || []).slice().sort().join("|"));
assert.equal(new Set(featureSets).size, featureSets.length, "Elk pakket heeft een unieke featurelijst");

for (const plan of plans) {
  for (const messages of [nlPricing, enPricing]) {
    assert.ok(messages.waas[plan.id]?.name, `Ontbrekende pakketnaam voor ${plan.id}`);
    assert.ok(messages.waas[plan.id]?.audience, `Ontbrekende doelgroeptekst voor ${plan.id}`);
    for (const key of plan.featureKeys || []) {
      assert.ok(messages.features[key], `Ontbrekende featurevertaling: ${key}`);
    }
    for (const addon of getWaasAddons(plan.id)) {
      assert.ok(messages.addons[addon.id]?.name, `Ontbrekende add-onvertaling: ${addon.id}`);
    }
    assert.ok(messages.compare.values[plan.id], `Ontbrekende vergelijkingswaarden voor ${plan.id}`);
  }
}

for (const catalog of [pricing.waas, pricing.hosting, pricing.maintenance]) {
  for (const term of catalog.terms) {
    if (!term.badgeKey) continue;
    assert.ok(nlPricing.badges[term.badgeKey], `Ontbrekende badge NL: ${term.badgeKey}`);
    assert.ok(enPricing.badges[term.badgeKey], `Ontbrekende badge EN: ${term.badgeKey}`);
  }
}

assert.equal(plans.find((p) => p.id === "start").icon, "layout");
assert.equal(plans.find((p) => p.id === "business").icon, "building2");
assert.equal(plans.find((p) => p.id === "premium").icon, "craft");

console.log("Pricing config tests passed.");
