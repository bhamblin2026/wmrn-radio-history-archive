import Link from "next/link";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import type { ArchiveRecord } from "@/src/lib/types";

export function RecordCard({ record }: { record: ArchiveRecord }) {
  return (
    <article className="record-card">
      <MediaPlaceholder record={record} />
      <div className="badge-row" aria-label="Record labels">
        <span className="badge">{record.type.replace("_", " ")}</span>
        <span className="badge">{record.accessionNumber}</span>
        {record.accessLevel !== "public" ? <span className="badge restricted">{record.accessLevel}</span> : null}
      </div>
      <h3>
        <Link href={`/records/${record.slug}`}>{record.title}</Link>
      </h3>
      <p>{record.description}</p>
      <dl className="meta-row">
        <dt className="visually-hidden">Date</dt>
        <dd>{record.dateLabel}</dd>
        <dt className="visually-hidden">Collection</dt>
        <dd>{record.collection}</dd>
      </dl>
    </article>
  );
}
