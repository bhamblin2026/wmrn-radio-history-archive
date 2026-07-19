# WMRN Radio History Archive

This repository contains legacy public-site source material plus the new internal-first archive platform in `apps/archive-platform`.

The live site at `https://wmrnhistory.com` is currently WordPress. Treat the older repository content as a legacy/export source unless it is explicitly reselected as authoritative.

## New Internal App

The internal app is intended to become the source of truth for accessioning, cataloging, preservation events, media processing, review, rights tracking, and controlled public publishing.

```powershell
cd apps\archive-platform
copy .env.example .env
pnpm install
pnpm dev
```

Open `http://localhost:3100`.

## Recommended Operating Model

Keep WordPress as the public museum surface during transition. Build and validate the internal archive app first, then publish approved records outward through an API/export process. Do not overwrite the production site until staging has passed accessibility, security, migration, and owner review.
