# Shreyash Meshram — Portfolio

**Live:** [shreyuu.vercel.app](https://shreyuu.vercel.app/) · **Stack:** React 18 + Vite 5 + plain CSS · **Deploy:** Vercel

The personal portfolio of Shreyash Meshram, a full-stack and applied-AI engineer (MSc Business Analytics, University of Nottingham). It is a single-page React app with 18 standalone case-study pages. Nearly all content comes from one data file.

The design concept is **Instrument**. Every project in the portfolio turns messy input into a measurement (a photo becomes a FEN string, a headline becomes a sentiment, 3,000 customers become five segments), so the site is styled as a calibrated readout. The ground is graph paper, the palette runs cold to hot like a heat map, the display type is monospaced, and a chart recorder in the left gutter plots how fast you scroll.

---

## Contents

- [Quick start](#quick-start)
- [Scripts](#scripts)
- [What's on the page](#whats-on-the-page)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Case studies](#case-studies)
- [Design system](#design-system)
- [Accessibility](#accessibility)
- [SEO & metadata](#seo--metadata)
- [Deployment](#deployment)
- [Implementation notes](#implementation-notes)
- [Troubleshooting](#troubleshooting)
- [Contact](#contact)

---

## Quick start

Requirements: **Node 18+** (developed on Node 24) and npm.

```bash
cd vibe-crafted
npm install
npm run dev
```

Then open <http://localhost:5173>. Vite hot-reloads on save.

> **Repo layout note:** this app lives in the `vibe-crafted/` subdirectory of the `shreyuu/Portfolio` repo. The repository root holds an older Create React App + Tailwind version of the site, which has its own `package.json`, `README.md` and `CLAUDE.md`. Run every command in this README from `vibe-crafted/`.

## Scripts

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite dev server with HMR on port 5173                    |
| `npm run build`   | Writes a production bundle to `dist/` (~69 kB gzipped JS, ~3 kB CSS) |
| `npm run preview` | Serves the built `dist/` locally so you can check it before deploying |

There is no linter, formatter or test runner in this subproject. The only runtime dependencies are `react`, `react-dom` and `@vercel/analytics`.

---

## What's on the page

The page has five sections. Each one has an `id` that the nav, the command palette and the scroll spine all use.

| # | `id`         | Section              | What it shows                                                                                                                                                                                     |
| - | ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| — | `top`        | **Hero / nameplate** | An availability strip with a live London clock, the name set in 168px Martian Mono, a one-line thesis, and a **measurement rack** of four real results. Each result names its source.            |
| 01 | `about`     | **Profile**          | Two about paragraphs and the toolkit, grouped into four skill categories                                                                                                                         |
| 02 | `projects`  | **Selected work**    | A **results table**, not a card grid. One row per project, colour-coded by channel (Vision / ML / Data / LLM / App / Systems), with a channel filter. Clicking a row opens a detail drawer.       |
| 03 | `experience`| **Trajectory**       | Work and education laid out as two parallel logs, with measured outcomes on each role                                                                                                             |
| 04 | `contact`   | **Signal out**       | A copy-email button, social links, the CV, availability and the footer                                                                                                                             |

### Interactive features

- **Chart-recorder spine** (`Spine` in `src/components/nav.jsx`). A `<canvas>` strip chart in the left gutter. On every animation frame it samples scroll velocity into a 160-sample rolling buffer, and the "pen" eases toward that signal, so a quick scroll leaves a readable bump instead of a one-frame spike. Section boundaries are marked at their measured document offsets. The spine only shows at widths of 1180px and up; narrower screens get a thin top progress bar (`ScrollProgress`) instead.
- **Command palette.** Open it with <kbd>⌘K</kbd> / <kbd>Ctrl K</kbd>. From it you can jump to any section, open any project's drawer, toggle the theme, copy the email address, or open GitHub, LinkedIn or the CV. Arrow keys move the selection, <kbd>Enter</kbd> runs a command, <kbd>Esc</kbd> closes it, and focus is trapped while it's open.
- **Project detail drawer.** Shows the blurb, highlights, stack, and links to the repo and case study. <kbd>Esc</kbd> or clicking the backdrop closes it, and focus is trapped.
- **Theme toggle.** Light and dark themes. The choice is saved to `localStorage` under `portfolio_theme`. With no saved choice, the site follows `prefers-color-scheme`. An inline script in `index.html` applies the theme **before first paint**, so there's no flash of the wrong theme. The case-study pages read the same key.
- **Print stylesheet** (`src/styles/print.css`). Printing the page gives a clean one-page A4 résumé layout: light ink, no grid, no nav or overlays.
- **Tweaks panel** (dev tooling, see [below](#the-tweaks-panel)). Live controls for density, font pairing and accent colour.

---

## Project structure

```text
vibe-crafted/
├── index.html                 # HTML shell: meta/OG/JSON-LD, fonts, favicon, pre-paint theme script
├── package.json
├── vite.config.js             # base: "./" so the build works from any sub-path
├── postcss.config.js          # intentionally empty (see Troubleshooting)
├── vercel.json                # SPA rewrite → /index.html
├── public/                    # copied verbatim to dist/
│   ├── og-image.png           # 1200×630 social preview
│   ├── Shreyash-Meshram-Resume.pdf
│   ├── robots.txt
│   ├── sitemap.xml
│   └── case-studies/
│       ├── case-study.css     # self-contained token copy + case-study layout
│       └── *.html             # 18 standalone case-study pages
└── src/
    ├── main.jsx               # entry: adds .js to <html>, imports CSS, mounts <App>
    ├── app.jsx                # shell: theme, tweaks, palette + drawer state, analytics
    ├── data/
    │   └── portfolio.jsx      # ← single source of truth for all content
    ├── components/
    │   ├── primitives.jsx     # useInView, Reveal, MaskText, SectionHeader, Chip, ArrowUpRight
    │   ├── nav.jsx            # Spine, ScrollProgress, Nav, ThemeToggle
    │   ├── command-palette.jsx
    │   └── tweaks-panel.jsx   # useTweaks + floating panel + form controls
    ├── sections/
    │   ├── hero.jsx           # nameplate + measurement rack (RACK constant)
    │   ├── about.jsx
    │   ├── projects.jsx       # results table, channel filter, ProjectDetail drawer
    │   ├── experience.jsx
    │   └── contact.jsx
    └── styles/
        ├── globals.css        # design tokens, reset, grid ground, shared utilities
        └── print.css          # A4 résumé print view
```

Styling that applies to only one section sits next to that section, in a `<style>` block inside its component. `globals.css` holds only the tokens and the rules several sections share.

---

## Editing content

Almost every content change goes in **[`src/data/portfolio.jsx`](src/data/portfolio.jsx)**, which exports one `PORTFOLIO` object. The components render whatever that object contains, so adding a project or a role doesn't need any JSX changes.

### Top-level fields

| Field | Used for |
| --- | --- |
| `name`, `role`, `location` | Nav, hero, footer |
| `email`, `github`, `linkedin` | Contact section, command-palette actions |
| `resume` | CV links. Path relative to the site root (`./Shreyash-Meshram-Resume.pdf`). |
| `tagline`, `intro`, `about[]` | Profile copy |
| `skills[]` | `{ label, items[] }` toolkit groups |
| `experience[]` | Work log |
| `education[]` | Study log |
| `projects[]` | Results table, drawer, command palette |

### Adding a project

Append an object to `PORTFOLIO.projects`:

```jsx
{
  n: "18",                          // row number; also used as the React key and palette id
  title: "Project Name",
  domain: "ML",                     // channel: Vision | ML | Data | LLM | App | Systems
  status: "MSc 2026",               // optional tag shown next to the title
  blurb: "One or two sentences on what it does and how.",
  highlights: [                     // optional; highlights[0] becomes the table's Note column
    "Measured outcome or key technique",
    "Another highlight",
  ],
  stack: ["Python", "FastAPI", "React"],
  href: "https://github.com/shreyuu/project-name",
  caseStudy: "case-studies/project-name.html",   // optional; adds a case-study link to the drawer
}
```

Things to know:

- **`domain` sets the colour.** It maps to a `--ch-*` token through `CHANNEL_TONE` in `src/sections/projects.jsx`. If you use a domain that isn't listed there, the row falls back to `--ink-mute`. To add a new channel, add a token in *both* `globals.css` and `case-study.css`, then add it to `CHANNEL_TONE`.
- **The filter buttons build themselves** from the domains they find, in the order they first appear.
- **The Note column** shows `highlights[0]`. If there are no highlights, it shows the first sentence of `blurb`, trimmed to about 90 characters.
- **Counts are live.** The "N results" button in the hero and the `n=` badge on the section header both read `projects.length`. The section *title* ("Eighteen runs, seventeen shipped.") is plain text in `projects.jsx`, so update it by hand.

### Adding experience / education

```jsx
// PORTFOLIO.experience
{
  role: "Role Title",
  company: "Company",
  period: "Mon YYYY — Mon YYYY",
  duration: "6 mo",
  blurb: "What the role was.",
  outcomes: ["Measured outcome", "Another outcome"],
  skills: ["Python", "Django"],
}

// PORTFOLIO.education
{
  school: "Institution",
  degree: "Degree",
  period: "YYYY — YYYY",
  place: "City, Country",
  notes: ["Module · Module", "Module"],
}
```

### Content that isn't in the data file

| What | Where |
| --- | --- |
| Hero measurement rack (four headline numbers + sources) | `RACK` in `src/sections/hero.jsx` |
| Hero thesis line and availability strip | `src/sections/hero.jsx` |
| Section titles and kickers | each `src/sections/*.jsx` |
| Command-palette section list | `buildCommands` in `src/components/command-palette.jsx` |
| Spine section labels | `SECTIONS` in `src/components/nav.jsx` |
| `<head>` metadata, JSON-LD | `index.html` |

> Every number in the hero rack names where it came from (e.g. `FENgine · validation set`). Keep it that way. The rack is meant to be evidence the reader can check, not decoration.

---

## Case studies

`public/case-studies/` has 18 standalone HTML pages: one for each of the 17 shipped projects, plus `feature-drift-mcr.html` for the MSc dissertation (row `00`).

**They're self-contained on purpose.** Vite copies everything in `/public` to the build root unchanged, so these pages can't import anything from `/src`. An earlier version linked `../src/styles/globals.css`, which doesn't exist in `dist/`, and every case study shipped unstyled. For that reason:

- `case-study.css` carries **its own copy of the design tokens**. When you change a colour, font or channel in `src/styles/globals.css`, make the same change here.
- Each page includes the same Google Fonts link, favicon and pre-paint theme script as `index.html`, so it respects the visitor's saved theme.
- Each page sets its channel colour on `<body>`, e.g. `<body style="--cs-ch: var(--ch-vision)">`.

### Adding a case study

1. Copy an existing page such as `fengine.html` to `public/case-studies/<slug>.html`.
2. Update `<title>`, the meta description, the `--cs-ch` channel on `<body>`, and the `cs-meta` counter (`Case Study · NN / 17`).
3. Fill in the sections. The usual order is problem → constraints → architecture → results → lessons, built from the `cs-section`, `cs-h`, `cs-prose`, `cs-arch`, `cs-lessons` and `cs-pullquote` classes.
4. Set `caseStudy: "case-studies/<slug>.html"` on the project in `portfolio.jsx`.
5. Add the URL to `public/sitemap.xml`.

The "Back to portfolio" link uses `../index.html`, so it works both on Vercel and when you open `dist/` directly.

---

## Design system

The tokens live at the top of [`src/styles/globals.css`](src/styles/globals.css). Dark mode overrides them under `html[data-theme="dark"]`.

### Ground

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#e9eef4` cool graph paper | `#0a0f16` |
| `--bg-raised` / `--bg-sunk` | `#f2f5f9` / `#dee5ee` | `#111925` / `#060a0f` |
| `--ink` / `--ink-soft` / `--ink-mute` | `#0b111a` / `#3d4c5f` / `#5c6d82` | `#e4ecf6` / `#97a9c0` / `#70839b` |

`body::before` draws a 64px graph-paper grid. Corners are square everywhere (no border radius).

### Signal ramp

Five colour stops sampled from matplotlib's **magma** colormap, cold to hot. Using the colour language of the projects' own field is deliberate:

| Token | Light | Dark |
| --- | --- | --- |
| `--sig-0` | `#2e3163` | `#7b82dd` |
| `--sig-1` | `#7a2c63` | `#d264a8` |
| `--sig-2` (**accent**) | `#c42e63` | `#ff5c8a` |
| `--sig-3` | `#b34410` | `#ff8a4c` |
| `--sig-4` | `#8a6208` | `#ffc15e` |

Every stop has at least **4.5:1 contrast** against `--bg`. Several had to be darkened to reach that, so re-check contrast if you change any of them.

### Channels

Each project domain has its own colour: `--ch-vision`, `--ch-ml`, `--ch-data`, `--ch-llm`, `--ch-app` and `--ch-systems`. The six are distinct enough that the swatch alone identifies the channel.

### Type

There are two font families, both variable and loaded from Google Fonts:

- **Martian Mono** (`wdth` 75–112, `wght` 100–800) is used at both ends of the scale: the 168px nameplate (`--display`) and the 10.5px instrument labels (`--mono`). Monospace at display size normally looks wrong. Here that's the point: it reads like printed output rather than lettering.
- **Instrument Sans** (`--sans`) is used for body text.

The type ramp runs from `--t-display` (`clamp(50px, 12.5vw, 168px)`) down to `--t-label` (10.5px).

### The Tweaks panel

`src/components/tweaks-panel.jsx` is a floating panel for trying design variations live. It controls section density (Comfy/Tight), font pairing (Instrument / All-Mono / All-Sans), the light and dark accent colours, and the theme.

**It's hidden on the live site.** It opens only when a parent frame sends a `__activate_edit_mode` `postMessage` (an editing host that embeds the page in an iframe). `setTweak` posts `__edit_mode_set_keys` back to that host, which rewrites the defaults between the `/*EDITMODE-BEGIN*/ … /*EDITMODE-END*/` markers in `src/app.jsx`. To change the shipped defaults by hand, edit that `TWEAK_DEFAULTS` block:

```js
{
  "accent": "#c42e63",
  "accentDark": "#ff5c8a",
  "density": "comfortable",
  "fontPairing": "instrument",
  "theme": "light"
}
```

---

## Accessibility

- A skip link (`Skip to content`) jumps to `<main id="main">`.
- The command palette and the project drawer both trap <kbd>Tab</kbd> focus and close on <kbd>Esc</kbd>.
- Filter buttons expose `aria-pressed`. Decorative SVGs use `aria-hidden`.
- **Reduced motion:** under `prefers-reduced-motion: reduce`, reveal animations are off, the theme cross-fade is skipped, and the spine doesn't record a trace. It still draws the axis, the section events and the numeric readout, so no information is lost.
- **No-JS / failed-bundle safety:** reveal-on-scroll hides content only after `main.jsx` adds a `.js` class to `<html>`. If the bundle fails, the page still renders all of its content.
- Colour tokens were chosen to meet WCAG AA contrast (see [Signal ramp](#signal-ramp)).

## SEO & metadata

All of this is in `index.html`:

- Title, description, canonical URL (`https://shreyuu.vercel.app/`)
- Open Graph and Twitter `summary_large_image` tags pointing at `/og-image.png` (1200×630)
- A `schema.org/Person` JSON-LD block (name, job title, alumni of, sameAs links)
- `theme-color` for both colour schemes
- An inline-SVG favicon: a single signal spike on the dark ground

`public/robots.txt` allows everything and points to `public/sitemap.xml`.

---

## Deployment

The site is deployed on **Vercel**.

- **Root Directory:** `vibe-crafted` (set in the Vercel project settings, because the repo root contains the old CRA app)
- **Framework preset:** Vite. Build command `npm run build`, output directory `dist`.
- **`vercel.json`** rewrites every path to `/index.html`. Vercel serves files from the filesystem first, so `/case-studies/*.html`, the résumé PDF and other static assets still load directly.
- **Analytics:** `@vercel/analytics` is injected once from `<Analytics />` in `app.jsx`.

Because `vite.config.js` sets `base: "./"`, `dist/` is fully relative and also works on GitHub Pages, on Netlify, or opened straight from disk.

---

## Implementation notes

- **Theme precedence:** saved `localStorage` choice, then the attribute the pre-paint script already set (which follows the system preference), then light. A `theme-transition` class is added to `<html>` for about 360ms so colours cross-fade instead of snapping.
- **Spine measurement:** section offsets are measured on mount, on resize, and again after 700ms once web fonts have loaded, so the event markers stay aligned with the real layout.
- **Live clock:** the hero strip shows `Europe/London` time and updates every 30 seconds.
- **Clipboard:** copying the email fails silently if the Clipboard API isn't available (insecure context, permission denied). The address is still on screen and selectable.
- **No state library, no router, no CSS framework.** It's React state, CSS custom properties and one data module.

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| `Cannot find module 'tailwindcss'` during `dev` or `build` | PostCSS searches parent folders for a config and would find the root CRA app's Tailwind config. `vibe-crafted/postcss.config.js` is intentionally an empty `export default {}` to stop that search. Don't delete it. |
| Case study renders unstyled | It's linking to something under `/src`. Case studies may only use `case-study.css` and CDN fonts. |
| Command palette doesn't open | Something else on the page caught <kbd>⌘K</kbd>, or focus is inside an iframe. Click the page first. |
| Tweaks panel never appears | Expected. It opens only when a host frame sends `__activate_edit_mode`. |
| Stray `vite.config.js.timestamp-*.mjs` file | Vite leaves this behind if it's interrupted mid-build. It's git-ignored and safe to delete. |

---

## Contact

**Shreyash Meshram** is a full-stack and AI engineer in Nottingham, UK, available for full-stack, AI-engineering and applied-ML roles.

- Email: [shreyashmeshram0031@gmail.com](mailto:shreyashmeshram0031@gmail.com)
- GitHub: [github.com/shreyuu](https://github.com/shreyuu)
- LinkedIn: [linkedin.com/in/shreyuu](https://www.linkedin.com/in/shreyuu/)
- CV: [`/Shreyash-Meshram-Resume.pdf`](public/Shreyash-Meshram-Resume.pdf)
