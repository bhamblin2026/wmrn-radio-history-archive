# Deployment

## Recommendation

Deploy the internal archive app to a private staging environment first. Keep WordPress public until the new platform is approved.

## Baseline Stack

- Next.js app.
- PostgreSQL 16.
- Meilisearch.
- S3-compatible object storage.
- Background worker for imports, derivatives, OCR, transcripts, AI suggestions, and fixity.
- Error monitoring and uptime checks.

## Required Environment

See `.env.example`.

## DNS

Recommended staging host: `staging-archive.wmrnhistory.com` or `internal-staging.wmrnhistory.com`.

Recommended production host for internal tools: `internal.wmrnhistory.com`, restricted by authentication and preferably additional network controls.

## Monthly Cost Estimate

Small production baseline: USD 75-180/month depending on managed database size, object storage volume, backups, monitoring, and search hosting. Media-heavy preservation storage will dominate long-term cost.

## Production Gate

Do not deploy over the public site until tests pass and the owner explicitly approves production deployment.
