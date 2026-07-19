import type { ArchiveRecord } from "@/src/lib/types";

export function MediaPlaceholder({ record, variant = "card" }: { record?: ArchiveRecord; variant?: "card" | "hero" }) {
  const label = record ? `${record.type.replace("_", " ")} derivative pending` : "Approved archive media pending";
  const detail = record?.accessionNumber ?? "WMRN Archive";

  return (
    <div className={`media-placeholder ${variant}`} role="img" aria-label={label}>
      <span>{label}</span>
      <strong>{detail}</strong>
    </div>
  );
}
