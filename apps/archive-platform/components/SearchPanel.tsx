import { facets } from "@/src/lib/records";
import type { SearchFilters } from "@/src/lib/types";

export function SearchPanel({ filters }: { filters: SearchFilters }) {
  const facetData = facets();
  return (
    <form className="panel search-form" role="search" action="/archive">
      <label>
        Search
        <input name="q" type="search" placeholder="Terry Cole, WMRN-2026-052, Christmas 1973" defaultValue={filters.q} />
      </label>
      <label>
        Type
        <select name="type" defaultValue={filters.type ?? ""}>
          <option value="">All types</option>
          {facetData.types.map((type) => (
            <option key={type} value={type}>
              {type.replace("_", " ")}
            </option>
          ))}
        </select>
      </label>
      <label>
        Station
        <select name="station" defaultValue={filters.station ?? ""}>
          <option value="">All stations</option>
          {facetData.stations.map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>
      </label>
      <button className="primary" type="submit">Search</button>
    </form>
  );
}
