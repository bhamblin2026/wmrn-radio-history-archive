# Data Model

The schema in `apps/archive-platform/db/migrations/0001_initial.sql` is normalized around:

- Accessions.
- Collection objects.
- Media assets and derivatives.
- People, organizations, stations, station brands, programs, events, places, subjects, and keywords.
- Record relationships.
- Preservation events and fixity.
- Transcripts and transcript segments.
- Exhibits.
- Public submissions and research requests.
- Users, roles, permissions, and audit events.
- AI suggestions requiring human review.

Every collection object supports stable identifiers, accession numbers, title, description, date certainty, provenance, source, rights, restrictions, credit line, condition, preservation notes, publication/review state, timestamps, and soft deletion.

Large preservation masters are stored in object storage, not Git or PostgreSQL.
