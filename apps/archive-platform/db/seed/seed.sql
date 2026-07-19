BEGIN;

INSERT INTO accessions (accession_number, title, description, source, donor_name, provenance, received_on)
VALUES
  ('WMRN-2026-052', 'Terry Cole Rotary International Radio Identification Button', 'Seed from current public WordPress accession listing; full source metadata required before production publication.', 'WordPress REST API', NULL, 'Derived from public endpoint https://wmrnhistory.com/wp-json/wp/v2/accession/1731', '2026-06-20'),
  ('WMRN-2026-008', 'WMRN-FM Christmas Day Broadcast Recordings (1973)', 'Legacy GitHub export seed; verify against current WordPress before migration.', 'Legacy GitHub export', 'Larry Haas', 'Original reel-to-reel tapes retained by donor; digitized files held by archive.', '2026-02-25');

INSERT INTO collection_objects (
  accession_id,
  stable_identifier,
  slug,
  record_type,
  title,
  description,
  date_label,
  start_year,
  end_year,
  approximate_date,
  rights_statement,
  usage_restrictions,
  credit_line,
  condition_note,
  preservation_notes,
  access_level,
  publication_status,
  review_status,
  source_system,
  source_identifier,
  source_path
)
SELECT
  a.id,
  'https://wmrnhistory.com/accession/wmrn-2026-052/',
  'wmrn-2026-052-terry-cole-rotary-international-radio-identification-button',
  'artifact',
  'Terry Cole Rotary International Radio Identification Button',
  'Rotary International identification button bearing the name Terry Cole Radio, associated with longtime WMRN broadcaster Terry Cole.',
  'Date unknown; listed in 2026 archive browser',
  NULL,
  NULL,
  true,
  'Rights status undetermined.',
  'Do not publish high-resolution derivative until rights and custody are documented.',
  'WMRN Radio History Archive.',
  'Needs condition report.',
  'Full cataloging, photography, measurements, and source-file checksum are required.',
  'reading_room',
  'review',
  'needs_metadata',
  'wordpress',
  '1731',
  'https://wmrnhistory.com/wp-json/wp/v2/accession/1731'
FROM accessions a
WHERE a.accession_number = 'WMRN-2026-052';

COMMIT;
