import { AdminNav } from "@/components/AdminNav";

const checks = [
  ["Database", "configured by DATABASE_URL"],
  ["Search", "Meilisearch sync endpoint planned"],
  ["Object storage", "S3-compatible bucket required"],
  ["Malware scanning", "webhook integration point configured"],
  ["Backups", "daily encrypted database and object manifests required"],
  ["Audit log", "append-only table in initial migration"]
] as const;

export default function SystemAdminPage() {
  return (
    <section className="section" aria-labelledby="system-admin-heading">
      <p className="eyebrow">Internal</p>
      <h1 id="system-admin-heading">System Health</h1>
      <AdminNav />
      <div className="grid">
        {checks.map(([name, note]) => (
          <article className="queue-item" key={name}>
            <strong>{name}</strong>
            <p>{note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
