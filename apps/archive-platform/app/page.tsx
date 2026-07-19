import Link from "next/link";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { RecordCard } from "@/components/RecordCard";
import { archiveStats, records } from "@/src/lib/records";

export default function HomePage() {
  const stats = archiveStats();
  const featured = records.slice(0, 3);
  const today = records.filter((record) => record.dateLabel.includes("July 19"));

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Digital museum and collection system</p>
          <h1>WMRN Radio History Archive</h1>
          <p>
            A public research archive, working accessioning system, and preservation platform for WMRN broadcast history.
          </p>
          <p className="meta-row">
            <Link className="button primary" href="/archive">Search the Archive</Link>
            <Link className="button" href="/admin">Open Dashboard</Link>
          </p>
        </div>
        <aside className="hero-panel" aria-label="Featured archive image">
          <MediaPlaceholder variant="hero" />
          <p>Public-site and collection media remain source-controlled by provenance, rights, and derivative workflows outside Git.</p>
        </aside>
      </section>

      <section className="section" aria-labelledby="stats-heading">
        <div className="section-header">
          <div>
            <p className="eyebrow">Collection Snapshot</p>
            <h2 id="stats-heading">Preservation-minded by default</h2>
          </div>
          <Link className="button" href="/archive">Browse all records</Link>
        </div>
        <div className="stats-grid">
          <div className="stat"><strong>{stats.totalRecords}</strong> Seed records</div>
          <div className="stat"><strong>{stats.collections}</strong> Collections</div>
          <div className="stat"><strong>{stats.restrictedRecords}</strong> Restricted</div>
          <div className="stat"><strong>{stats.mediaFormats}</strong> Formats</div>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-heading">
        <div className="section-header">
          <div>
            <p className="eyebrow">Featured Objects</p>
            <h2 id="featured-heading">Records with rights and provenance visible</h2>
          </div>
        </div>
        <div className="grid">
          {featured.map((record) => <RecordCard key={record.id} record={record} />)}
        </div>
      </section>

      <section className="section" aria-labelledby="timeline-heading">
        <div className="detail-layout">
          <div className="panel">
            <p className="eyebrow">Timeline</p>
            <h2 id="timeline-heading">Historical anchors</h2>
            <ol className="timeline">
              <li><strong>1940:</strong> WMRN-AM signed on in Marion, Ohio.</li>
              <li><strong>1953:</strong> WMRN-FM expanded the station legacy into FM broadcasting.</li>
              <li><strong>1973:</strong> WMRN-FM Christmas Day broadcasts were recorded off-air and later preserved.</li>
              <li><strong>2026:</strong> The independent WMRN Radio History Archive was founded.</li>
            </ol>
          </div>
          <aside className="panel">
            <p className="eyebrow">On This Day</p>
            <h2>July 19</h2>
            {today.length > 0 ? (
              today.map((record) => <p key={record.id}>{record.title}</p>)
            ) : (
              <p>No approved July 19 item is in the local seed yet. The production workflow keeps this empty rather than inventing history.</p>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
