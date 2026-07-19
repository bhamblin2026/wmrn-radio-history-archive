import Link from "next/link";

const items = [
  ["Dashboard", "/admin"],
  ["Accessions", "/admin/accessions"],
  ["Media", "/admin/media"],
  ["Submissions", "/admin/submissions"],
  ["Review", "/admin/review"],
  ["Preservation", "/admin/preservation"],
  ["Vocabularies", "/admin/vocabularies"],
  ["System", "/admin/system"]
] as const;

export function AdminNav() {
  return (
    <nav className="admin-nav" aria-label="Internal tools">
      {items.map(([label, href]) => (
        <Link className="button" href={href} key={href}>{label}</Link>
      ))}
    </nav>
  );
}
