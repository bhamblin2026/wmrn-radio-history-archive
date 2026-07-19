import { AdminNav } from "@/components/AdminNav";
import { facets } from "@/src/lib/records";

export default function VocabulariesAdminPage() {
  const data = facets();
  return (
    <section className="section" aria-labelledby="vocab-admin-heading">
      <p className="eyebrow">Internal</p>
      <h1 id="vocab-admin-heading">Controlled Vocabularies</h1>
      <AdminNav />
      <div className="grid">
        {Object.entries(data).map(([name, values]) => (
          <article className="panel" key={name}>
            <h2>{name}</h2>
            <ul>
              {values.map((value) => <li key={value}>{value}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
