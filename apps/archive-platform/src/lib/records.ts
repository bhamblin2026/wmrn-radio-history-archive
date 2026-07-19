import seedRecords from "@/src/data/seed-records.json";
import type { ArchiveRecord } from "./types";

export const records = seedRecords as ArchiveRecord[];

export function publicRecords() {
  return records.filter((record) => record.publicationStatus === "published" && record.accessLevel === "public");
}

export function findRecordBySlug(slug: string) {
  return records.find((record) => record.slug === slug);
}

export function relatedRecords(record: ArchiveRecord) {
  const ids = new Set(record.relatedRecordIds);
  return records.filter((candidate) => ids.has(candidate.id));
}

export function archiveStats() {
  const years = records.flatMap((record) => [record.startYear, record.endYear]).filter((year): year is number => Boolean(year));
  return {
    totalRecords: records.length,
    publicRecords: publicRecords().length,
    restrictedRecords: records.filter((record) => record.accessLevel === "restricted").length,
    collections: new Set(records.map((record) => record.collection)).size,
    earliestYear: Math.min(...years),
    latestYear: Math.max(...years),
    mediaFormats: new Set(records.flatMap((record) => record.mediaFormats)).size
  };
}

export function facets() {
  const unique = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));
  return {
    types: unique(records.map((record) => record.type)),
    collections: unique(records.map((record) => record.collection)),
    people: unique(records.flatMap((record) => record.people)),
    stations: unique(records.flatMap((record) => record.stations)),
    subjects: unique(records.flatMap((record) => record.subjects)),
    decades: unique(records.flatMap((record) => (record.startYear ? [`${Math.floor(record.startYear / 10) * 10}s`] : [])))
  };
}
