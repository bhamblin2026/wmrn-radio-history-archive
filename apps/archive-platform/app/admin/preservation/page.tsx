import { AdminNav } from "@/components/AdminNav";

export default function PreservationAdminPage() {
  return (
    <section className="section" aria-labelledby="preservation-admin-heading">
      <p className="eyebrow">Internal</p>
      <h1 id="preservation-admin-heading">Digital Preservation</h1>
      <AdminNav />
      <div className="grid">
        <div className="panel">
          <h2>Fixity</h2>
          <p>SHA-256 manifests, scheduled fixity verification, and failed-check escalation belong here.</p>
        </div>
        <div className="panel">
          <h2>Storage Health</h2>
          <p>Masters, derivatives, backups, and cold-copy locations are tracked separately to prevent accidental overwrite.</p>
        </div>
        <div className="panel">
          <h2>Preservation Events</h2>
          <p>Each derivative, migration, OCR run, transcript update, and rights change creates an immutable event record.</p>
        </div>
      </div>
    </section>
  );
}
