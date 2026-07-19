# Backup and Recovery

## Strategy

- Daily encrypted PostgreSQL backups.
- Point-in-time recovery where hosting supports it.
- Object-storage versioning for masters and derivatives.
- Separate checksum manifests.
- At least one geographically separate copy.
- Quarterly restore tests.

## Recovery Tests

1. Restore database to an isolated staging database.
2. Reattach object storage read-only.
3. Rebuild Meilisearch from PostgreSQL.
4. Recalculate checksums on a sample of masters and derivatives.
5. Verify stable URLs still resolve.
