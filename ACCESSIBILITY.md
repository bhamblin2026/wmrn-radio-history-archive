# Accessibility

Target: WCAG 2.2 AA where applicable.

## Implemented in the Scaffold

- Semantic landmarks, headings, forms, labels, and tables.
- Skip link.
- Visible `:focus-visible` styles.
- Minimum 44px interactive targets.
- Reduced-motion support.
- No color-only status labels.
- Responsive layouts for desktop and mobile.
- Transcript-first media access patterns.

## Required Manual Tests

- Keyboard-only navigation across public archive and internal admin sections.
- Screen-reader pass for search, record detail, admin tables, and dialogs once dialogs are added.
- Contrast verification for light and dark color schemes.
- Media player captions/transcripts and audio-description availability where applicable.
- Accessible alternatives for batch editing and drag-and-drop upload.

## Automated Tests Planned

Playwright plus axe checks are configured as dependencies and should run in CI after install.
