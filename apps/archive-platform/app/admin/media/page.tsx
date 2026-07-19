import { AdminNav } from "@/components/AdminNav";
import { records } from "@/src/lib/records";

export default function MediaAdminPage() {
  const mediaRecords = records.filter((record) => ["audio", "video", "photograph", "document"].includes(record.type));
  return (
    <section className="section" aria-labelledby="media-admin-heading">
      <p className="eyebrow">Internal</p>
      <h1 id="media-admin-heading">Media Intake</h1>
      <AdminNav />
      <div className="grid">
        <div className="panel">
          <h2>Upload Queue</h2>
          <p>Upload validation should perform MIME sniffing, extension allow-listing, size limits, checksum creation, and malware scan handoff.</p>
          <label>
            Media batch manifest
            <textarea placeholder="Paste CSV/JSON manifest summary for review." />
          </label>
          <button className="primary" type="button">Stage batch</button>
        </div>
        <div className="panel">
          <h2>Derivative Jobs</h2>
          <ul>
            {mediaRecords.map((record) => (
              <li key={record.id}>{record.accessionNumber}: {record.type} derivatives pending policy checks.</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
