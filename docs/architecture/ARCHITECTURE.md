# Architecture

## Recommendation

Build a full-blown internal archive platform first, then publish approved public records outward. The internal app becomes the source of truth; WordPress remains the public museum surface until a deliberate replacement is approved.

## Components

- `apps/archive-platform`: Next.js TypeScript app.
- PostgreSQL: authoritative database.
- S3-compatible object storage: preservation masters, derivatives, manifests, and private media.
- Meilisearch: recoverable full-text index generated from PostgreSQL.
- Background workers: uploads, media derivatives, OCR, transcripts, AI suggestions, fixity checks, and exports.
- WordPress import/export scripts: migration bridge and possible public publishing bridge.

## Security Model

- Auth provider handles passwords and MFA-ready sessions.
- App enforces roles and permissions server-side.
- Restricted records and private media never enter public search indexes.
- Signed private-media URLs are required before production.
- Audit log records security and data changes.

## AI Model

AI is a reviewable assistant only. Suggestions are marked, sourced, and human-approved. The research endpoint answers only from approved public records and returns supporting source records.

## Why This Shape

This avoids risky production-site replacement, keeps database records normalized and exportable, preserves provenance, and lets the archive grow into public apps, mobile wrappers, and future store packages without vendor lock-in.
