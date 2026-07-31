import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  formatEuro,
  calcSavings,
  getOneTimeFromPrice,
  getWaasFromPrice,
  getHostingFromPrice,
  getMaintenanceFromPrice,
  getWaasBranches,
} from "../data/pricing.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nlPricing = JSON.parse(readFileSync(join(root, "messages/nl/pricing.json"), "utf8"));

assert.equal(formatEuro(1495), "€1.495");
assert.equal(getOneTimeFromPrice(), 395);
assert.equal(getWaasFromPrice(), 129);
assert.equal(getHostingFromPrice(), 99);
assert.equal(getMaintenanceFromPrice(), 39);

const barber = getWaasBranches().find((b) => b.id === "barbershop");
assert.ok(barber);
const save12 = calcSavings(barber.prices.monthly, barber.prices["12"], 12);
assert.equal(save12.amount, 240);
const save24 = calcSavings(barber.prices.monthly, barber.prices["24"], 24);
assert.equal(save24.amount, 720);

const branches = getWaasBranches();
assert.ok(branches.length >= 5);

const featureSets = branches.map((b) => (b.featureKeys || []).slice().sort().join("|"));
assert.equal(new Set(featureSets).size, featureSets.length, "Each WaaS branch must have a unique feature list");

for (const branch of branches) {
  assert.ok(nlPricing.waas[branch.id]?.audience, `Missing audience for ${branch.id}`);
  for (const key of branch.featureKeys || []) {
    assert.ok(nlPricing.features[key], `Missing feature translation: ${key}`);
  }
  if (branch.upcomingKey) {
    assert.ok(nlPricing.upcoming[branch.upcomingKey], `Missing upcoming translation: ${branch.upcomingKey}`);
  }
}

assert.equal(branches.find((b) => b.id === "business-site")?.upcomingKey, undefined);
assert.equal(branches.find((b) => b.id === "webshop")?.upcomingKey, undefined);
assert.equal(branches.find((b) => b.id === "barbershop")?.upcomingKey, "axabookAppointments");
assert.equal(branches.find((b) => b.id === "restaurant")?.upcomingKey, "axabookRestaurants");
assert.equal(branches.find((b) => b.id === "gym")?.upcomingKey, "axabookAppointments");

assert.equal(branches.find((b) => b.id === "business-site")?.icon, "building2");
assert.equal(branches.find((b) => b.id === "barbershop")?.icon, "scissors");
assert.equal(branches.find((b) => b.id === "restaurant")?.icon, "utensils");
assert.equal(branches.find((b) => b.id === "gym")?.icon, "dumbbell");
assert.equal(branches.find((b) => b.id === "webshop")?.icon, "shoppingBag");

console.log("Pricing config tests passed.");
