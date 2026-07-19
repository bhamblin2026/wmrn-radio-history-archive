import { AdminNav } from "@/components/AdminNav";

const submissionTypes = ["Correction", "Takedown", "Research request", "Material donation", "Digital contribution", "Volunteer interest"];

export default function SubmissionsAdminPage() {
  return (
    <section className="section" aria-labelledby="submissions-admin-heading">
      <p className="eyebrow">Internal</p>
      <h1 id="submissions-admin-heading">Public Submissions</h1>
      <AdminNav />
      <div className="grid">
        {submissionTypes.map((type) => (
          <article className="queue-item" key={type}>
            <strong>{type}</strong>
            <p>Queue scaffolded for triage, private-contact protection, audit logging, and assignment.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
