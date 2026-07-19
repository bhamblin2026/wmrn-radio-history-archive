import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration = readFileSync(new URL("../db/migrations/0001_initial.sql", import.meta.url), "utf8");
const requiredTables = [
  "accessions",
  "collection_objects",
  "media_assets",
  "media_derivatives",
  "people",
  "organizations",
  "radio_stations",
  "station_brands",
  "programs",
  "events",
  "places",
  "subjects",
  "keywords",
  "preservation_events",
  "transcripts",
  "transcript_segments",
  "oral_history_interviews",
  "exhibits",
  "public_submissions",
  "research_requests",
  "users",
  "roles",
  "permissions",
  "audit_events"
];

for (const table of requiredTables) {
  assert.ok(migration.includes(`CREATE TABLE ${table}`), `migration creates ${table}`);
}

const manifest = JSON.parse(readFileSync(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"));
assert.equal(manifest.name, "WMRN Radio History Archive");
assert.equal(manifest.display, "standalone");
assert.ok(manifest.icons.length >= 2, "PWA manifest includes install icons");

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
assert.ok(css.includes(":focus-visible"), "focus style exists");
assert.ok(css.includes("prefers-reduced-motion"), "reduced motion media query exists");

console.log("OK: static QA checks passed");
