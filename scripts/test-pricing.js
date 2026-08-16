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
  getWaasFromPrice,
  getHostingFromPrice,
  getMaintenanceFromPrice,
  getWaasBranches,
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

/* ---------- Eenmalige websites ---------- */

const oneTime = Object.fromEntries(getOneTimePlans().map((p) => [p.id, p]));
assert.equal(oneTime.start.price, 495, "Start moet €495 zijn");
assert.equal(oneTime.business.price, 795, "Business moet €795 zijn");
assert.equal(oneTime.premium.price, 1595, "Premium moet €1.595 zijn");
assert.equal(getOneTimeFromPrice(), 495);

for (const plan of getOneTimePlans()) {
  assert.equal(plan.priceWas, undefined, `Geen oude/doorgestreepte prijs meer op ${plan.id}`);
}

/* ---------- Looptijden: uitsluitend maandelijks en 12 maanden ---------- */

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
  assert.ok(!termIds.includes("yearly"), `${name}: losse jaaroptie mag niet meer bestaan`);
  assert.equal(catalog.defaultTerm, "12", `${name}: 12 maanden is de standaardkeuze`);
}

assert.equal(nlPricing.terms["24"], undefined, "NL: label 24 maanden moet weg zijn");
assert.equal(enPricing.terms["24"], undefined, "EN: label 24 months moet weg zijn");
assert.equal(nlPricing.terms.yearly, undefined);
assert.equal(enPricing.terms.yearly, undefined);
assert.equal(nlPricing.terms["12"], "12 maanden");
assert.equal(enPricing.terms["12"], "12 months");
assert.equal(nlPricing.terms.monthly, "Maandelijks");
assert.equal(enPricing.terms.monthly, "Monthly");

/* ---------- Website as a Service ---------- */

const expectedWaas = {
  "one-page": { "12": 39.5, monthly: 54.5 },
  "business-site": { "12": 59, monthly: 74 },
  "beauty-barber": { "12": 79, monthly: 94 },
  restaurant: { "12": 89, monthly: 104 },
  gym: { "12": 89, monthly: 104 },
  webshop: { "12": 129, monthly: 144 },
};

const branches = getWaasBranches();
assert.equal(branches.length, Object.keys(expectedWaas).length);

for (const [id, prices] of Object.entries(expectedWaas)) {
  const branch = branches.find((b) => b.id === id);
  assert.ok(branch, `Ontbrekend WaaS-pakket: ${id}`);
  assert.equal(branch.prices["12"], prices["12"], `${id}: 12-maandenprijs`);
  assert.equal(branch.prices.monthly, prices.monthly, `${id}: maandprijs`);
  assert.equal(
    Math.round((branch.prices.monthly - branch.prices["12"]) * 100) / 100,
    pricing.waas.monthlySurcharge,
    `${id}: maandelijks moet exact €${pricing.waas.monthlySurcharge} hoger zijn dan 12 maanden`
  );
}

/* Vanafprijs €39,50 hoort bij One Page op 12 maanden */
assert.equal(getWaasFromPrice(), 39.5);
assert.equal(getWaasFromPrice(), branches.find((b) => b.id === "one-page").prices["12"]);

/* €15 per maand verschil = €180 besparing per jaar */
for (const branch of branches) {
  const savings = calcSavings(branch.prices.monthly, branch.prices["12"], 12);
  assert.equal(savings.amount, 180, `${branch.id}: besparing bij 12 maanden`);
}

/* ---------- Pakketnamen ---------- */

const expectedNames = {
  nl: {
    "one-page": "One Page",
    "business-site": "Bedrijfswebsite",
    "beauty-barber": "Beauty & Barber",
    restaurant: "Restaurant",
    gym: "Sport & Fitness",
    webshop: "Webshop",
  },
  en: {
    "one-page": "One Page Website",
    "business-site": "Business Website",
    "beauty-barber": "Beauty & Barber",
    restaurant: "Restaurant",
    gym: "Gym & Fitness",
    webshop: "Online Store",
  },
};

for (const [id, name] of Object.entries(expectedNames.nl)) {
  assert.equal(nlPricing.waas[id]?.name, name, `NL naam voor ${id}`);
}
for (const [id, name] of Object.entries(expectedNames.en)) {
  assert.equal(enPricing.waas[id]?.name, name, `EN naam voor ${id}`);
}

assert.equal(nlPricing.waas.barbershop, undefined, "Oud Barbershop-pakket moet verwijderd zijn");
assert.equal(enPricing.waas.barbershop, undefined, "Old Barbershop package must be removed");

/* ---------- Afspraken- en reserveringssysteem ---------- */

const beauty = branches.find((b) => b.id === "beauty-barber");
const restaurant = branches.find((b) => b.id === "restaurant");

assert.equal(beauty.includesBooking, "appointments");
assert.ok(
  beauty.featureKeys.includes("waasOnlineAppointments"),
  "Beauty & Barber bevat online afsprakensysteem"
);
assert.equal(restaurant.includesBooking, "reservations");
assert.ok(
  restaurant.featureKeys.includes("waasOnlineReservations"),
  "Restaurant bevat online reserveringssysteem"
);

for (const id of ["one-page", "business-site", "gym", "webshop"]) {
  const branch = branches.find((b) => b.id === id);
  assert.equal(branch.includesBooking, undefined, `${id}: geen boekingssysteem communiceren`);
  assert.ok(!branch.featureKeys.includes("waasOnlineAppointments"), `${id}: geen afspraken`);
  assert.ok(!branch.featureKeys.includes("waasOnlineReservations"), `${id}: geen reserveringen`);
}

/* Geen "binnenkort"-claims meer op pakketten */
for (const branch of branches) {
  assert.equal(branch.upcomingKey, undefined, `${branch.id}: geen 'binnenkort'-vermelding`);
}
assert.equal(nlPricing.upcoming, undefined);
assert.equal(enPricing.upcoming, undefined);

/* ---------- Hosting ---------- */

const hosting = Object.fromEntries(getHostingPlans().map((p) => [p.id, p]));
assert.equal(hosting.essential.prices["12"], 89);
assert.equal(hosting.business.prices["12"], 179);
assert.equal(hosting.managed.onRequest, true);
assert.equal(getHostingFromPrice(), 89);
/* Maandtarieven zijn nog niet vastgesteld en worden dus niet getoond */
assert.deepEqual(pricing.hosting.pendingTerms, ["monthly"]);
assert.deepEqual(getAvailableTerms(pricing.hosting).map((t) => t.id), ["12"]);
for (const plan of getHostingPlans().filter((p) => !p.onRequest)) {
  assert.equal(plan.prices.monthly, undefined, `hosting ${plan.id}: geen verzonnen maandprijs`);
}

/* ---------- Onderhoud ---------- */

const maintenance = Object.fromEntries(getMaintenancePlans().map((p) => [p.id, p]));
assert.equal(maintenance.basic.prices.monthly, 39);
assert.equal(maintenance.basic.prices["12"], 32);
assert.equal(maintenance.business.prices.monthly, 79);
assert.equal(maintenance.business.prices["12"], 64);
assert.equal(getMaintenanceFromPrice(), 32);
assert.deepEqual(getAvailableTerms(pricing.maintenance).map((t) => t.id), ["monthly", "12"]);
for (const plan of getMaintenancePlans().filter((p) => !p.onRequest)) {
  assert.ok(plan.prices["12"] < plan.prices.monthly, `onderhoud ${plan.id}: 12 maanden voordeliger`);
}

/* ---------- btw-vermelding ---------- */

assert.equal(nlPricing.labels.exclVat, "Excl. 21% btw");
assert.equal(enPricing.labels.exclVat, "Excl. 21% VAT");
assert.ok(nlPricing.termsInfo.items.some((i) => i.includes("exclusief 21% btw")));
assert.ok(enPricing.termsInfo.items.some((i) => i.includes("exclude 21% VAT")));
for (const key of ["oneTime", "waas", "hosting", "maintenance"]) {
  assert.ok(nlPricing.sections[key].note.includes("21% btw"), `NL btw ontbreekt in ${key}`);
  assert.ok(enPricing.sections[key].note.includes("21% VAT"), `EN VAT ontbreekt in ${key}`);
}

/* ---------- NL en EN gebruiken dezelfde bedragen en structuur ---------- */

const keysOf = (obj) => Object.keys(obj).sort().join(",");
assert.equal(keysOf(nlPricing.waas), keysOf(enPricing.waas), "WaaS-pakketten gelijk in NL en EN");
assert.equal(keysOf(nlPricing.hosting), keysOf(enPricing.hosting));
assert.equal(keysOf(nlPricing.maintenance), keysOf(enPricing.maintenance));
assert.equal(keysOf(nlPricing.oneTime), keysOf(enPricing.oneTime));
assert.equal(keysOf(nlPricing.features), keysOf(enPricing.features));
assert.equal(keysOf(nlPricing.terms), keysOf(enPricing.terms));
assert.equal(keysOf(nlPricing.highlights), keysOf(enPricing.highlights));

/* ---------- Vertaaldekking ---------- */

const featureSets = branches.map((b) => (b.featureKeys || []).slice().sort().join("|"));
assert.equal(new Set(featureSets).size, featureSets.length, "Elke WaaS-branche heeft een unieke featurelijst");

for (const branch of branches) {
  for (const messages of [nlPricing, enPricing]) {
    assert.ok(messages.waas[branch.id]?.audience, `Ontbrekende doelgroeptekst voor ${branch.id}`);
    for (const key of branch.featureKeys || []) {
      assert.ok(messages.features[key], `Ontbrekende featurevertaling: ${key}`);
    }
    if (branch.includesBooking) {
      assert.ok(messages.highlights[branch.includesBooking], `Ontbrekende highlight: ${branch.includesBooking}`);
    }
  }
}

for (const catalog of [pricing.waas, pricing.hosting, pricing.maintenance]) {
  for (const term of catalog.terms) {
    if (!term.badgeKey) continue;
    assert.ok(nlPricing.badges[term.badgeKey], `Ontbrekende badge NL: ${term.badgeKey}`);
    assert.ok(enPricing.badges[term.badgeKey], `Ontbrekende badge EN: ${term.badgeKey}`);
  }
}

assert.equal(branches.find((b) => b.id === "one-page")?.icon, "layout");
assert.equal(branches.find((b) => b.id === "business-site")?.icon, "building2");
assert.equal(branches.find((b) => b.id === "beauty-barber")?.icon, "scissors");
assert.equal(branches.find((b) => b.id === "restaurant")?.icon, "utensils");
assert.equal(branches.find((b) => b.id === "gym")?.icon, "dumbbell");
assert.equal(branches.find((b) => b.id === "webshop")?.icon, "shoppingBag");

console.log("Pricing config tests passed.");
