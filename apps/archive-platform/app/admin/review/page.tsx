import { AdminNav } from "@/components/AdminNav";
import { records } from "@/src/lib/records";

export default function ReviewAdminPage() {
  return (
    <section className="section" aria-labelledby="review-admin-heading">
      <p className="eyebrow">Internal</p>
      <h1 id="review-admin-heading">Review Workbench</h1>
      <AdminNav />
      <div className="panel">
        <h2>Records Needing Human Review</h2>
        <ul>
          {records
            .filter((record) => record.reviewStatus !== "approved" || record.publicationStatus !== "published")
            .map((record) => (
              <li key={record.id}>
                <strong>{record.accessionNumber}</strong> - {record.title}: {record.reviewStatus}, {record.publicationStatus}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
