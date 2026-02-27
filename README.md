# Christian D. Glissov - Portfolio

Modern Astro portfolio and blog with a neutral, professional design, typed hero text, lightweight motion, and markdown posts with math + code copy buttons.

## Tech stack

- Astro + TypeScript
- Tailwind CSS
- React islands (typed text + Framer Motion section/card transitions)
- Markdown content collections with KaTeX math rendering
- RSS + sitemap
- GitHub Pages deployment via GitHub Actions

## Requirements

- Node.js `>=24.14.0`
- npm

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

All checks in one command:

```bash
npm run check
```

## 5-minute workflow: add a project

1. Open `src/data/content.ts`.
2. Append a new object in the `projects` array (`name`, `description`, `stack`, `href`).
3. Run `npm run build` and verify the Projects section on the homepage.

## 5-minute workflow: add a blog post

1. Create a new markdown file in `src/content/blog/`.
2. Add frontmatter:

```md
---
title: Example Title
description: Short summary
pubDate: 2026-02-27
tags:
  - ai-systems
featured: false
draft: false
---
```

3. Write content with markdown, code blocks, and optional math (`$...$` or `$$...$$`).
4. Run `npm run build` and verify:
   - Post appears on `/blog/`
   - Tags route renders (`/blog/tag/<tag>/`)
   - RSS includes the post (`/rss.xml`)

## Deployment

- CI workflow runs: typecheck, lint, format check, build, and link check.
- Deploy workflow publishes `dist/` to GitHub Pages on pushes to `main`.
- Site canonical URL: `https://cdglissov.github.io/`
