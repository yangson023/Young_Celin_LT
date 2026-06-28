---
name: web-ui-qa
description: Use when checking, testing, or polishing this project's web UI, including responsive layout, mobile usability, quiz flow, local dev server verification, browser screenshots, text overflow, visual consistency, interaction states, and final frontend quality review.
---

# Web UI QA

## Goal

Verify that the demo is usable by real students before sharing a trial URL.

## QA Checklist

Check these before considering a UI task complete:

- The app opens without runtime errors.
- The main learning flow is reachable from the first screen.
- The user can choose a course package.
- The user can choose a knowledge point.
- The user can answer questions.
- The user can submit answers.
- The result page shows score and explanations.
- Wrong questions are saved and visible.
- Buttons have clear hover/disabled states.
- Text does not overflow on mobile.
- Cards, buttons, and question options do not shift unexpectedly.
- The layout works on desktop and mobile widths.

## Viewports

Test at least:

```text
desktop: 1440 x 900
mobile: 390 x 844
```

If a feature is important for classmates using phones, prioritize the mobile viewport.

## Visual Style

The learning tool should feel:

- clear
- calm
- study-focused
- trustworthy
- lightweight

Avoid:

- marketing-style hero pages
- oversized decorative cards
- nested card layouts
- one-note purple/blue gradient palettes
- tiny low-contrast text
- cramped mobile buttons

## Browser Verification

When a dev server exists, open the page in a browser and verify:

- page renders
- quiz interactions work
- no obvious console/runtime errors
- mobile layout is usable
- generated content does not overlap

If browser tooling is available, capture screenshots after meaningful UI changes.

## Final Review

Before sharing with trial students, verify this full path:

```text
open app -> choose course package -> choose knowledge point -> read summary -> answer quiz -> submit -> view results -> review wrong questions
```

Do not call the demo ready if this path is broken.
