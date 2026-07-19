# Digital Preservation

## Implemented Direction

- Original/master and derivative separation.
- SHA-256 checksum fields.
- Technical metadata fields.
- Preservation-event logging.
- Derivative operation logs.
- Restricted-media access controls.
- Repeatable search indexing from database records.

## Required Workflow

1. Preserve untouched originals.
2. Generate checksums at ingest.
3. Identify file format and technical metadata.
4. Create web derivatives in separate storage keys.
5. Record every operation as a preservation event.
6. Verify fixity on a schedule.
7. Regenerate derivatives without changing stable record URLs.

Adobe or local derivative tooling can be used when source media and permissions are available.
