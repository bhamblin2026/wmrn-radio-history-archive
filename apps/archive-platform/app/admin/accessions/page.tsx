import { AdminNav } from "@/components/AdminNav";
import { records } from "@/src/lib/records";

export default function AccessionsAdminPage() {
  return (
    <section className="section" aria-labelledby="accessions-admin-heading">
      <p className="eyebrow">Internal</p>
      <h1 id="accessions-admin-heading">Accessions</h1>
      <AdminNav />
      <div className="panel">
        <div className="section-header">
          <div>
            <h2>Register</h2>
            <p>Accession numbers must be assigned inside a database transaction before production use.</p>
          </div>
          <button className="primary" type="button">New accession draft</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Accession</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Rights</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.accessionNumber}</td>
                <td>{record.title}</td>
                <td>{record.publicationStatus} / {record.reviewStatus}</td>
                <td>{record.rightsStatement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
