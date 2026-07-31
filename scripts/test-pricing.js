import assert from "node:assert/strict";
import {
  formatEuro,
  calcSavings,
  getOneTimeFromPrice,
  getWaasFromPrice,
  getHostingFromPrice,
  getMaintenanceFromPrice,
  getWaasBranches,
} from "../data/pricing.js";

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

assert.ok(getWaasBranches().length >= 5);

console.log("Pricing config tests passed.");
