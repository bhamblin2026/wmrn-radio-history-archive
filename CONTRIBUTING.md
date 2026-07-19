# Contributing

## Development Rules

- Preserve the live WordPress site until a replacement is explicitly approved.
- Do not commit preservation masters, private donor data, credentials, private URLs, or restricted materials.
- Keep sample data clearly marked and provenance-backed.
- Exclude references to the station scope the owner removed from this project.
- Use the internal app as the source-of-truth direction; public publishing is an output workflow.

## Local Checks

```powershell
cd apps\archive-platform
pnpm test
pnpm qa:static
pnpm typecheck
pnpm build
```

## Review Expectations

Every pull request should include scope, migration impact, security notes, accessibility notes, screenshots for UI work, and test results.
