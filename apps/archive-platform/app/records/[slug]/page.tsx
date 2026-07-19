import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { MediaPanel } from "@/components/MediaPanel";
import { findRecordBySlug, records, relatedRecords } from "@/src/lib/records";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return records.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = findRecordBySlug(slug);
  return {
    title: record?.title ?? "Record Not Found",
    description: record?.description
  };
}

export default async function RecordPage({ params }: PageProps) {
  const { slug } = await params;
  const record = findRecordBySlug(slug);
  if (!record) notFound();
  const related = relatedRecords(record);

  return (
    <section className="section" aria-labelledby="record-heading">
      <p className="eyebrow">{record.accessionNumber}</p>
      <h1 id="record-heading">{record.title}</h1>
      <div className="detail-layout">
        <article className="panel">
          <MediaPlaceholder record={record} />
          <p>{record.description}</p>
          <h2>Core Metadata</h2>
          <dl>
            <dt>Date</dt>
            <dd>{record.dateLabel}{record.approximateDate ? " (approximate or incomplete)" : ""}</dd>
            <dt>Collection</dt>
            <dd>{record.collection}</dd>
            <dt>People</dt>
            <dd>{record.people.length ? record.people.join(", ") : "None recorded"}</dd>
            <dt>Stations and Brands</dt>
            <dd>{record.stations.join(", ")}</dd>
            <dt>Rights</dt>
            <dd>{record.rightsStatement}</dd>
            <dt>Restrictions</dt>
            <dd>{record.restrictions}</dd>
            <dt>Credit Line</dt>
            <dd>{record.creditLine}</dd>
            <dt>Source</dt>
            <dd>{record.source}</dd>
            <dt>Provenance</dt>
            <dd>{record.provenance}</dd>
          </dl>
          <h2>Citation</h2>
          <p>
            {record.title}. {record.accessionNumber}. WMRN Radio History Archive. {record.stableIdentifier}
          </p>
          <h2>Related Records</h2>
          {related.length ? (
            <ul>
              {related.map((item) => (
                <li key={item.id}><Link href={`/records/${item.slug}`}>{item.title}</Link></li>
              ))}
            </ul>
          ) : (
            <p>No related records have been approved yet.</p>
          )}
        </article>
        <MediaPanel record={record} />
      </div>
    </section>
  );
}
