# Blockers and Limitations

Updated: July 19, 2026.

## Plugins and Accounts

- Google Drive plugin is not installed. Required to inventory approved WMRN Drive folders, source media, spreadsheets, and provenance files.
- Notion plugin is not installed. Required to create the requested Notion project workspace.
- Canva is connected, but `brandkit:read` scope is missing. Reconnect Canva with brand-kit read permission to use approved brand kits.
- Adobe is connected. No WMRN Adobe Brand or source archive media was visible or authorized for processing in this session.
- GitHub repository search found `bhamblin2026/wmrn-radio-history-archive`; installed-account listing returned empty. Connector permissions appeared sufficient for repository reads/search, but branch push/PR creation still needs verification.

## Source Systems

- The live site is WordPress. The cloned GitHub repository is not the current website source and is treated as legacy/export material only.
- Full WordPress migration requires authenticated access to custom fields, media library metadata, private/restricted records, import history, and file folders.

## Product Scope

- References to the owner-removed station scope are excluded from the new app, sample data, docs, and tests.

## Infrastructure

- No staging hosting credentials are available yet.
- No production database, object-storage bucket, Meilisearch instance, auth provider, malware scanner, email provider, or monitoring account is configured yet.
- Local `next dev`/`next start` background launches were inconsistent under the Windows sandbox process wrapper. `next build` passes, and screenshots were generated from the built HTML/CSS artifacts.
