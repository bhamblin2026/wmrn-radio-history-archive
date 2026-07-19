# Security

Security is release-blocking for the WMRN Radio History Archive.

## Current Controls

- Role and permission model defined in code and SQL.
- Server-side API permission checks scaffolded.
- Security headers and Content Security Policy configured in Next.
- Private contact information is excluded from public records.
- Restricted records are modeled separately from publication status.
- Object storage is planned for masters and derivatives; large files are not stored in Git.
- Malware-scanning webhook is reserved for uploads.
- Audit events are included in the initial schema.

## Required Before Production

- Connect a reputable authentication provider with MFA-ready sessions.
- Enforce server-side authorization on every mutating endpoint.
- Add rate limiting and CSRF/session protections based on selected auth.
- Add dependency scanning, secret scanning, and branch protection.
- Encrypt backups and restrict object-storage bucket policies.
- Configure signed URLs for private media.
- Add vulnerability disclosure contact and incident-response process.

Report suspected issues privately to the archive owner before public disclosure.
