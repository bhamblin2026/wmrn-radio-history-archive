import { records } from "@/src/lib/records";
import { hasPermission, permissions, roleFromHeader } from "@/src/lib/auth";
import { headers } from "next/headers";
import { AdminNav } from "@/components/AdminNav";

const queues = [
  "Accessions",
  "Media upload queue",
  "Derivative generation",
  "Transcript review",
  "OCR review",
  "Metadata review",
  "Duplicate detection",
  "Search-index status",
  "Backup status",
  "System health"
];

export default async function AdminPage() {
  const requestHeaders = await headers();
  const role = roleFromHeader(requestHeaders.get("x-wmrn-role"));
  const canPublish = hasPermission(role, "records:publish");

  return (
    <section className="section" aria-labelledby="admin-heading">
      <p className="eyebrow">Internal Collection Management</p>
      <h1 id="admin-heading">Archive Dashboard</h1>
      <p>
        Demo role: <strong>{role}</strong>. Production auth should come from a trusted provider with MFA-ready sessions.
      </p>
      <AdminNav />
      <div className="admin-layout">
        <div className="panel">
          <h2>Collection Statistics</h2>
          <div className="stats-grid">
            <div className="stat"><strong>{records.length}</strong> Records</div>
            <div className="stat"><strong>{records.filter((r) => r.reviewStatus === "needs_metadata").length}</strong> Needs metadata</div>
            <div className="stat"><strong>{records.filter((r) => r.publicationStatus === "restricted").length}</strong> Restricted</div>
            <div className="stat"><strong>{canPublish ? "Yes" : "No"}</strong> Publish permission</div>
          </div>
          <h2>Accession Number Generator</h2>
          <p className="panel">Next local suggestion: <strong>WMRN-2026-054</strong>. Final assignment must check the production database transactionally.</p>
          <h2>Role Permissions</h2>
          <ul>
            {Object.entries(permissions).map(([permission, allowedRoles]) => (
              <li key={permission}>
                <strong>{permission}</strong>: {allowedRoles.join(", ")}
              </li>
            ))}
          </ul>
        </div>
        <aside className="admin-rail" aria-label="Operational queues">
          {queues.map((queue) => (
            <div className="queue-item" key={queue}>
              <strong>{queue}</strong>
              <p>Status scaffolded. Connect database jobs and workers before production.</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
