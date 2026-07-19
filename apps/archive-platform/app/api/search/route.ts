import { NextResponse } from "next/server";
import { highlightedPassage, searchRecords, searchSuggestions } from "@/src/lib/search";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const results = searchRecords({
    q,
    type: url.searchParams.get("type") ?? undefined,
    collection: url.searchParams.get("collection") ?? undefined,
    person: url.searchParams.get("person") ?? undefined,
    station: url.searchParams.get("station") ?? undefined,
    decade: url.searchParams.get("decade") ?? undefined,
    rights: url.searchParams.get("rights") ?? undefined,
    sort: (url.searchParams.get("sort") as "relevance" | "date_asc" | "date_desc" | "title_asc" | null) ?? "relevance"
  });

  return NextResponse.json({
    query: q,
    count: results.length,
    suggestions: searchSuggestions(q),
    hits: results.map(({ record, score }) => ({
      id: record.id,
      title: record.title,
      accessionNumber: record.accessionNumber,
      slug: record.slug,
      score,
      passage: highlightedPassage(record, q),
      facets: {
        type: record.type,
        collection: record.collection,
        people: record.people,
        stations: record.stations,
        subjects: record.subjects
      }
    }))
  });
}
