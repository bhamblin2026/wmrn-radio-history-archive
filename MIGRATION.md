# Migration

## Current Source Truth

The live site is WordPress at `https://wmrnhistory.com`, not Hugo. Public REST discovery on July 19, 2026 showed:

- Custom post type: `accession`.
- Custom post type: `exhibit`.
- Custom post type: `wmrn_program`.
- Custom post type: `wmrn_brand_era`.
- Plugins/namespaces including AIOSEO, Jetpack, Redirection, WP All Import, FileBird, and WP Writer.

The cloned GitHub repository is treated as a legacy/export source only.

## Safe Migration Steps

1. Export WordPress REST inventory with `scripts/import-wordpress.mjs`.
2. Request authenticated exports for private fields, media library folders, FileBird organization, and WP All Import mappings.
3. Map WordPress custom post fields to the normalized PostgreSQL schema.
4. Preserve WordPress IDs, slugs, URLs, accession numbers, filenames, dates, relationships, rights, and provenance.
5. Generate duplicate, validation, and failed-row reports.
6. Run migrations into staging only.
7. Compare record counts and public URLs.
8. Keep rollback exports before any production cutover.

Never destroy or modify the only source copy.
