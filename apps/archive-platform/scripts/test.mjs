import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const records = JSON.parse(readFileSync(new URL("../src/data/seed-records.json", import.meta.url), "utf8"));

assert.ok(records.length >= 5, "seed includes representative records");

const identifiers = new Set();
for (const record of records) {
  assert.match(record.accessionNumber, /^(WMRN-\d{4}-\d{3}|PODCAST-\d{4}-\d{2}-\d{2})$/);
  assert.ok(record.title.length > 8, "record has a title");
  assert.ok(record.rightsStatement, "record has rights metadata");
  assert.ok(record.restrictions, "record has restriction metadata");
  assert.ok(record.stations.every((station) => station.startsWith("WMRN") || station.includes("107") || station.includes("Country")), "station scope stays within approved WMRN-related history");
  assert.ok(!identifiers.has(record.stableIdentifier), "stable identifiers are unique");
  identifiers.add(record.stableIdentifier);
}

const terry = records.filter((record) => JSON.stringify(record).toLowerCase().includes("terry cole"));
assert.ok(terry.length >= 2, "Terry Cole workflow has representative records");

console.log(`OK: ${records.length} seed records validated`);
