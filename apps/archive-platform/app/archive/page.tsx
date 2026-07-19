import { RecordCard } from "@/components/RecordCard";
import { SearchPanel } from "@/components/SearchPanel";
import { highlightedPassage, searchRecords } from "@/src/lib/search";
import type { SearchFilters } from "@/src/lib/types";

export default async function ArchivePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const filters: SearchFilters = {
    q: value(params.q),
    type: value(params.type),
    station: value(params.station),
    sort: (value(params.sort) as SearchFilters["sort"]) ?? "relevance"
  };
  const results = searchRecords(filters);

  return (
    <section className="section" aria-labelledby="archive-heading">
      <p className="eyebrow">Universal Search</p>
      <h1 id="archive-heading">Find accession records</h1>
      <SearchPanel filters={filters} />
      <div className="section-header">
        <p aria-live="polite">Showing {results.length} record{results.length === 1 ? "" : "s"}</p>
        <form action="/archive">
          <input type="hidden" name="q" value={filters.q ?? ""} />
          <label>
            Sort
            <select name="sort" defaultValue={filters.sort}>
              <option value="relevance">Relevance</option>
              <option value="date_desc">Date newest</option>
              <option value="date_asc">Date oldest</option>
              <option value="title_asc">Title A-Z</option>
            </select>
          </label>
        </form>
      </div>
      <div className="grid">
        {results.map(({ record }) => (
          <div key={record.id}>
            <RecordCard record={record} />
            {filters.q ? <p className="panel">{highlightedPassage(record, filters.q)}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function value(input: string | string[] | undefined) {
  if (Array.isArray(input)) return input[0];
  return input;
}
