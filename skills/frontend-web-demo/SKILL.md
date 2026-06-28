---
name: frontend-web-demo
description: Use when building or modifying this project's web demo UI with Next.js, React, Tailwind CSS, local JSON data, page routing, quiz interactions, responsive layouts, or beginner-friendly frontend code for a small student-facing learning tool.
---

# Frontend Web Demo

## Goal

Build a small, clear, student-facing web demo before adding complex infrastructure.

Default stack:

```text
Next.js + React + Tailwind CSS + local JSON + localStorage
```

## Build Order

1. Create static pages first.
2. Load knowledge points and questions from local JSON.
3. Add quiz state with React `useState`.
4. Add answer submission and scoring.
5. Add result and explanation display.
6. Save wrong questions with `localStorage`.
7. Add AI/API features only after the static flow works.

## Page Scope

First version pages:

- Home/course entry
- Course package selection
- Knowledge point list
- Knowledge point detail
- Quiz
- Result feedback
- Wrong questions

Avoid adding:

- Landing-page marketing sections
- Complex dashboards
- Large admin systems
- Large multi-course platform navigation
- Account settings
- Payment or subscription UI

## UI Principles

- Make the first screen an actual usable learning interface.
- Keep layouts dense but calm.
- Prefer clear navigation and obvious actions.
- Use stable dimensions for quiz cards, buttons, and progress elements.
- Make mobile usable from the beginning.
- Keep text short inside buttons and cards.
- Do not nest cards inside cards.
- Do not use decorative gradient blobs or ornamental backgrounds.

## Component Guidance

Use simple components:

- `KnowledgeCard`
- `QuestionCard`
- `OptionButton`
- `ResultSummary`
- `WrongQuestionItem`
- `PrimaryAction`

Prefer props and local state over global state for the first version.

## Data Guidance

Start with:

```text
data/courses.json
data/knowledge-points.json
data/questions.json
```

Every knowledge point and question should include `course_id` so multiple course packages can share the same UI framework.

Do not introduce Supabase until the demo needs persistent multi-device records.

## Beginner-Friendly Rule

When generating code for this project:

- Explain the file's purpose.
- Keep files small.
- Avoid advanced React patterns unless necessary.
- Prefer readable names over clever abstractions.
- Include only comments that help a beginner understand non-obvious logic.
