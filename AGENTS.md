# AGENTS.md

## Project Overview
This repository contains a static personal portfolio website built with HTML, JavaScript, Sass, Bootstrap, and Webpack. It has two pages:
- `index.html`: main portfolio landing page.
- `tableofcontents.html`: lightweight blog/table-of-contents page.

The site is compiled into `dist/` and deployed to GitHub Pages.

## Tech Stack
- Bundler: Webpack 5
- Styling: Sass + PostCSS + Bootstrap 5
- JavaScript: ES modules (transpiled with Babel)
- Hosting: GitHub Pages (workflow uploads `dist/`)

## Repository Structure
```text
.
|-- src/                         # Source files edited during development
|   |-- index.html               # Main page template
|   |-- tableofcontents.html     # Secondary page template
|   |-- js/
|   |   |-- index.js             # Main bundle entry; imports UI modules, styles, and assets
|   |   |-- index_toc.js         # TOC page entry
|   |   |-- navbar_utility.js    # Scroll/resize/toggler navbar behavior
|   |   |-- toggle_button.js     # Theme toggle logic (dark/light)
|   |   `-- typedtext.js         # Typed.js setup for hero text
|   |-- styles/
|   |   |-- styles.scss          # Primary Sass source
|   |   |-- styles.css           # Compiled CSS artifact committed in repo
|   |   `-- styles.css.map       # Source map artifact
|   `-- assets/                  # Images/icons used by pages and bundles
|
|-- dist/                        # Build output served in production (generated)
|-- .github/workflows/static.yml # Deploys dist/ to GitHub Pages on push to main
|
|-- webpack.common.js            # Shared webpack config (entries, loaders, HTML generation)
|-- webpack.dev.js               # Development config (source maps, style-loader)
|-- webpack.prod.js              # Production config (hashes, minification, CSS extraction)
|-- postcss.config.js            # PostCSS preset-env setup
|-- package.json                 # Scripts and dependencies
`-- README.md
```

## Build and Development Flow
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Create production build: `npm run build`

`npm run build` writes hashed JS/CSS and copied assets into `dist/`.

## Webpack Entry Points
- `main` -> `src/js/index.js` -> generates bundle for `src/index.html`
- `toc` -> `src/js/index_toc.js` -> generates bundle for `src/tableofcontents.html`

`HtmlWebpackPlugin` creates `dist/index.html` and `dist/tableofcontents.html` and injects the right bundles.

## Deployment
GitHub Actions workflow `.github/workflows/static.yml`:
- Triggers on pushes to `main` (and manual dispatch).
- Uploads `./dist` as the Pages artifact.
- Deploys that artifact to GitHub Pages.

## Editing Guidelines
- Treat `src/` as source of truth.
- Treat `dist/` as generated output.
- Keep asset imports centralized through entry files so webpack can track and emit them.
- If changing page structure, verify related navbar behavior in `src/js/navbar_utility.js`.
- Always use 4 space identation
- Follow stylelint best practices when modifying .scss and .css files.