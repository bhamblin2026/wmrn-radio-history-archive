import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const records = JSON.parse(readFileSync(new URL("../src/data/seed-records.json", import.meta.url), "utf8"));

const documents = records.map((record) => ({
  id: record.id,
  accessionNumber: record.accessionNumber,
  title: record.title,
  slug: record.slug,
  type: record.type,
  collection: record.collection,
  people: record.people,
  stations: record.stations,
  subjects: record.subjects,
  publicationStatus: record.publicationStatus,
  accessLevel: record.accessLevel,
  text: [
    record.title,
    record.description,
    record.people.join(" "),
    record.programs.join(" "),
    record.institutions.join(" "),
    record.stations.join(" "),
    record.subjects.join(" "),
    record.keywords.join(" "),
    record.transcriptSegments?.map((segment) => segment.text).join(" ") ?? ""
  ].join(" ")
}));

const output = new URL("../public/search-index.json", import.meta.url);
mkdirSync(dirname(fileURLToPath(output)), { recursive: true });
writeFileSync(output, JSON.stringify({ generatedAt: new Date().toISOString(), documents }, null, 2));
console.log(`Wrote ${documents.length} search documents from ${root}`);
