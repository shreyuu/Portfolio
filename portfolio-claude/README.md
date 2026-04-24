# Shreyash Meshram — Portfolio

A single-page, editorial-style portfolio built with React (via in-browser Babel)
and a tokenised CSS design system. No build step — open `Portfolio.html` and go.

## Stack

- **React 18** (UMD, loaded from CDN)
- **Babel Standalone** for inline JSX transpilation
- **Vanilla CSS** with design tokens (light + dark themes)
- **Google Fonts** — Fraunces, JetBrains Mono, Neue Haas Grotesk

## Project structure

```
.
├── Portfolio.html              # Entry — loads styles + all scripts
├── README.md
└── src/
    ├── app.jsx                 # Root <App /> — mounts page, wires tweaks
    │
    ├── styles/
    │   └── globals.css         # Design tokens, reset, utility classes
    │
    ├── data/
    │   └── portfolio.jsx       # Single source of truth for content
    │
    ├── components/             # Reusable, section-agnostic pieces
    │   ├── primitives.jsx      # <Reveal />, hooks, small helpers
    │   ├── nav.jsx             # Top nav + scroll progress + theme toggle
    │   └── tweaks-panel.jsx    # In-design tweak controls
    │
    └── sections/               # One file per page section
        ├── hero.jsx
        ├── about.jsx
        ├── projects.jsx
        ├── experience.jsx
        └── contact.jsx
```

## Conventions

- **One section = one file.** Keep sections self-contained; lift shared
  building blocks into `components/`.
- **Content lives in `data/portfolio.jsx`.** Sections read; they don't own data.
- **Design tokens live in `styles/globals.css`** under `:root` and
  `html[data-theme="dark"]`. Never hard-code colours — reference
  `var(--ink)`, `var(--bg)`, `var(--accent)`, etc.
- **Babel scope is per-script.** Components shared across files must be
  exported at the bottom of their file via `Object.assign(window, { … })`.
- **No generic `styles` objects.** Use a component-prefixed name
  (e.g. `heroStyles`) or inline styles — name collisions break the page.

## Running locally

Any static server works:

```sh
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000/Portfolio.html`.

## Tweaks

Toggle **Tweaks** in the toolbar to expose live design knobs (accent colour,
font pairing, density, theme). See `src/components/tweaks-panel.jsx`.

## Content edits

Almost every copy change is a one-liner in `src/data/portfolio.jsx`.
