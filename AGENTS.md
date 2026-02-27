# AGENTS.md

## Mission

Build and maintain a clean, professional Astro portfolio/blog where readability, information hierarchy, and reliability matter more than visual gimmicks.

## Product goals

- Keep the experience calm, minimal, and technical.
- Prioritize clear sections and scannable content.
- Use motion sparingly and purposefully.
- Preserve SEO, accessibility, and deployment reliability as first-class requirements.

## Information architecture

Homepage flow should stay coherent and easy to navigate:

- Hero
- About
- Projects
- Learning
- Featured Writing
- Contact

Blog structure:

- Index page at `/blog/`
- Post pages at `/blog/<slug>/`
- Tag pages at `/blog/tag/<tag>/`
- RSS at `/rss.xml`

## Source-of-truth files

- Site identity + external links: `src/data/site.ts`
- About, experience, learning timeline, projects: `src/data/content.ts`
- Blog frontmatter schema: `src/content.config.ts`
- Homepage composition: `src/pages/index.astro`
- Blog listing + tag pages: `src/pages/blog/index.astro`, `src/pages/blog/tag/[tag].astro`
- Global styling tokens and base look: `src/styles/global.css`
- SEO/canonical site settings: `astro.config.mjs`, `src/layouts/BaseLayout.astro`

When changing content structure, update the relevant type definitions in `src/data/content.ts` before editing entries.

## Design rules

- Keep a restrained neutral palette; avoid loud branding colors.
- Use accent color sparingly for links, focus, and interactive emphasis.
- Preserve high contrast and readable body copy.
- Maintain consistent spacing, card structure, and heading patterns across sections.
- Keep typography modern and legible; avoid decorative display styles.

## Motion and React island rules

Use React islands only when needed:

- Typed text in hero (`TypedText`).
- Small Framer Motion transitions (`MotionReveal`, `MotionCard`).

Motion constraints:

- Respect `prefers-reduced-motion`.
- Avoid animation-heavy section choreography.
- Keep transitions short and subtle.

## Content rules

- Tone: professional, technically grounded, concise.
- Avoid filler copy and hype language.
- Keep chronology and role labels accurate in experience and learning timelines.
- Ensure every external link is valid and uses safe attributes (`target="_blank"` + `rel="noreferrer"` where appropriate).
- Do not leave obvious placeholders in shipped content unless explicitly intentional.

## Accessibility and SEO rules

- Use semantic headings and maintain logical heading order.
- Keep keyboard focus states visible.
- Include descriptive labels for form fields and interactive controls.
- Preserve structured data consistency with `personSchema` in `src/data/site.ts`.
- Keep canonical URL/site config aligned with `https://cdglissov.github.io/`.
- Ensure sitemap and RSS continue to build correctly.

## Engineering standards

- Stack: Astro + TypeScript + Tailwind CSS + React islands + Framer Motion.
- Runtime: Node.js `>=24.14.0`.
- Lint/format/type/build must pass before shipping.

Required local commands:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Single-command gate:

```bash
npm run check
```

## CI, deployment, and maintenance

- CI workflow runs typecheck, lint, format check, build, and link check.
- Deploy workflow publishes `dist/` to GitHub Pages on pushes to `main`.
- Dependabot should remain enabled for npm and GitHub Actions.
- Keep README workflows current for adding projects and blog posts.

## Quick update workflows

Add/update a project:

1. Edit `projects` in `src/data/content.ts`.
2. Confirm `name`, `description`, `stack`, and `href` are complete.
3. Run `npm run build` and verify the project card renders correctly.

Add/update a learning timeline entry:

1. Edit `learningTimeline` in `src/data/content.ts`.
2. Keep `period`, `topic`, and `description` concise and typo-free.
3. Verify timeline ordering and mobile readability on the homepage.

Add a blog post:

1. Create a new markdown file in `src/content/blog/`.
2. Include valid frontmatter required by `src/content.config.ts`:
   - `title`
   - `description`
   - `pubDate`
   - `tags` (optional but recommended)
   - `featured` / `draft` as needed
3. Run `npm run build` and verify post, tag page, and RSS output.

## Ship checklist

- Mobile layout checks passed for homepage and blog pages.
- Contact form action points to configured Formspree endpoint.
- LinkedIn/GitHub/contact links resolve correctly.
- Canonical URL, sitemap, and RSS are valid.
- `npm run check` passes locally.
- No accidental regressions in accessibility or readability.