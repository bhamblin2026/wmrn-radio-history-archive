# Test Report

## Implemented Checks

- Seed record validation script.
- Static QA script for migration tables, PWA manifest, focus styles, and reduced-motion CSS.
- Playwright configuration for desktop and mobile responsive checks after dependencies are installed.

## Checks Run On July 19, 2026

- `pnpm test`: passed.
- `pnpm qa:static`: passed.
- `pnpm typecheck`: passed.
- `pnpm build`: passed.
- Browser smoke: desktop and mobile screenshots generated from production-built HTML/CSS artifacts.
- API smoke: `/api/search?q=Terry%20Cole` returned Terry Cole results; `/api/assistant/research` answered from approved public seed records with source citations.
- Safety regression: sample data/test suite rejects references to the owner-removed station scope.

## Required Before Staging

- Full Playwright browser checks against a stable `next start` or deployed staging URL.
- Axe accessibility checks.
- Backup/restore test against staging database.

## Representative Workflows To Automate

- Public visitor searches for Terry Cole.
- Visitor opens related records and transcript segments.
- Visitor generates citation text.
- Donor submits material.
- Archivist reviews submission and creates accession.
- Reviewer approves record.
- Administrator publishes record.
- Restricted content remains unavailable publicly.
- Deleted draft can be recovered.
