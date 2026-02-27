# AGENTS.md

## Project Overview
A clean, modern personal portfolio / CV site with a "tech" feel.

## Features
- Function over flair: prioritize readable structure and clear sections (About/Skills/Experience/Projects/Contact) rather than heavy animations.
- Modern Stack: Built with Astro, TypeScript, and Tailwind CSS
- Smooth Animations: Framer Motion for elegant transitions and interactions
- Fully Responsive: Optimized for all devices and screen sizes
- SEO Optimized: Meta tags and structured data for search engines
- Security-First: Following best practices and secure coding standards 
- Zero Config Deployment: Automated GitHub Actions workflow
- Accessible: WCAG compliant design

## Colors
- Color is restrained and utilitarian. It's a neutral palette (near-black/charcoal) with gray UI elements for separation and hierarchy.
- Accent color is used sparingly (mainly on interactive bits like links / emphasis), so nothing feels loud or "branded" - more "professional/dev portfolio."
- Readability and atmosphere is priority. The colors should feel calm, minimal, and safe.

## Design
- Clear hierarchy & flow: sections are ordered logically (About → Blog → Projects → Contact) and the nav makes it easy to jump around.
- Consistency: the site uses repeated patterns (headings, cards, spacing) so it feels coherent.
- Hero area: Name should be clear. Use typed-text subtitle. Icons for linkedin, github, email. Make room for a punchy line.
- Use an easily readable and modern text font.

# Blog
- Markdown blog posts with math rendering. 
- A feature section that features blog posts.
- Syntax highlighting + copy button.
- Features:
    - Featured posts section on home
    - Tag filtering
    - RSS Feed

## Tech Stack
- Framework: Astro
- UI components: React (only where needed)
- Language: TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion (inside React components)
- Icons: React Icons
- Deployment: GitHub Pages via GitHub Actions 
- Content: Markdown with math rendering

## Formatting, evaluation, and linting
- Add formatting + quality gates: Prettier, ESLint, TypeScript checks
- Test implementation works as expected

## Animation
Use React islands only for:
- typed-text
- small Framer Motion transitions (section reveal, hover)
- Respect prefers-reduced-motion.

## Deployment + maintenance
- GitHub Actions deploy to GitHub Pages.
- Add CI checks: typecheck, lint, build, link check.
- Add Dependabot.
- Document “how to add a project/post” in README (5-minute workflow).

## Ship checklist 
- Fill real content (projects, experience bullets, 2–3 blog posts).
- Verify mobile layout + contact links.
- Confirm Pages URL + canonical URLs + sitemap/RSS working.

## Context
Site url: https://cdglissov.github.io/
Linkedin: https://www.linkedin.com/in/christian-glissov/
Formspree: https://formspree.io/f/xvojpppy
About me: Senior AI specialist. Background in mathematical modelling and scientific computing