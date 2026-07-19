import type { ArchiveRecord } from "@/src/lib/types";

export function MediaPanel({ record }: { record: ArchiveRecord }) {
  if (record.type !== "audio" && record.type !== "video") {
    return (
      <aside className="panel" aria-labelledby="media-heading">
        <h2 id="media-heading">Media Access</h2>
        <p>{record.restrictions}</p>
      </aside>
    );
  }

  return (
    <aside className="media-shell" aria-labelledby="media-heading">
      <h2 id="media-heading">Listening Room</h2>
      {record.mediaUrl ? (
        <p>
          <a className="button" href={record.mediaUrl} rel="noreferrer" target="_blank">
            Open approved access copy
          </a>
        </p>
      ) : (
        <p>Access copy is pending rights and preservation review.</p>
      )}
      <h3>Synchronized Transcript</h3>
      <ol className="transcript">
        {(record.transcriptSegments ?? []).map((segment) => (
          <li key={`${segment.start}-${segment.end}`}>
            <strong>
              {formatTime(segment.start)}-{formatTime(segment.end)}
            </strong>
            <p>{segment.text}</p>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}
