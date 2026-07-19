import { records } from "./records";
import type { ArchiveRecord, SearchFilters } from "./types";

const searchableText = (record: ArchiveRecord) =>
  [
    record.title,
    record.accessionNumber,
    record.description,
    record.collection,
    record.type,
    record.dateLabel,
    record.people.join(" "),
    record.programs.join(" "),
    record.institutions.join(" "),
    record.stations.join(" "),
    record.events.join(" "),
    record.subjects.join(" "),
    record.keywords.join(" "),
    record.transcriptSegments?.map((segment) => segment.text).join(" ") ?? ""
  ]
    .join(" ")
    .toLowerCase();

function levenshtein(a: string, b: string) {
  const rows = Array.from({ length: a.length + 1 }, (_, index) => [index]);
  for (let j = 1; j <= b.length; j += 1) rows[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      rows[i][j] = Math.min(
        rows[i - 1][j] + 1,
        rows[i][j - 1] + 1,
        rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return rows[a.length][b.length];
}

function scoreRecord(record: ArchiveRecord, query: string) {
  if (!query) return 1;
  const text = searchableText(record);
  const normalized = query.toLowerCase().trim();
  let score = 0;

  if (text.includes(normalized)) score += normalized.includes(" ") ? 20 : 8;
  if (record.title.toLowerCase().includes(normalized)) score += 18;
  if (record.accessionNumber.toLowerCase() === normalized) score += 30;

  const terms = normalized.split(/\s+/).filter(Boolean);
  const words = new Set(text.split(/[^a-z0-9-]+/).filter(Boolean));
  for (const term of terms) {
    if (words.has(term)) score += 5;
    else if ([...words].some((word) => word.length > 3 && levenshtein(word, term) <= 1)) score += 2;
  }

  return score;
}

function matchesFilters(record: ArchiveRecord, filters: SearchFilters) {
  if (filters.type && filters.type !== record.type) return false;
  if (filters.collection && filters.collection !== record.collection) return false;
  if (filters.person && !record.people.includes(filters.person)) return false;
  if (filters.station && !record.stations.includes(filters.station)) return false;
  if (filters.rights && !record.rightsStatement.toLowerCase().includes(filters.rights.toLowerCase())) return false;
  if (filters.decade && record.startYear) {
    const decade = `${Math.floor(record.startYear / 10) * 10}s`;
    if (filters.decade !== decade) return false;
  }
  if (filters.yearFrom && record.endYear && record.endYear < filters.yearFrom) return false;
  if (filters.yearTo && record.startYear && record.startYear > filters.yearTo) return false;
  return true;
}

export function searchRecords(filters: SearchFilters) {
  const q = filters.q?.trim() ?? "";
  const scored = records
    .filter((record) => matchesFilters(record, filters))
    .map((record) => ({ record, score: scoreRecord(record, q) }))
    .filter((result) => !q || result.score > 0);

  scored.sort((a, b) => {
    if (filters.sort === "date_asc") return (a.record.startYear ?? 9999) - (b.record.startYear ?? 9999);
    if (filters.sort === "date_desc") return (b.record.startYear ?? 0) - (a.record.startYear ?? 0);
    if (filters.sort === "title_asc") return a.record.title.localeCompare(b.record.title);
    return b.score - a.score || a.record.title.localeCompare(b.record.title);
  });

  return scored;
}

export function searchSuggestions(query: string) {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];
  const candidates = records.flatMap((record) => [
    record.title,
    record.accessionNumber,
    ...record.people,
    ...record.programs,
    ...record.stations,
    ...record.subjects
  ]);

  return [...new Set(candidates)]
    .filter((candidate) => candidate.toLowerCase().includes(normalized))
    .slice(0, 8);
}

export function highlightedPassage(record: ArchiveRecord, query: string) {
  const transcript = record.transcriptSegments?.map((segment) => segment.text).join(" ");
  const body = transcript || record.description;
  const normalized = query.toLowerCase().trim();
  if (!normalized) return body.slice(0, 220);
  const index = body.toLowerCase().indexOf(normalized);
  if (index < 0) return body.slice(0, 220);
  const start = Math.max(0, index - 80);
  const end = Math.min(body.length, index + normalized.length + 140);
  return `${start > 0 ? "... " : ""}${body.slice(start, end)}${end < body.length ? " ..." : ""}`;
}
