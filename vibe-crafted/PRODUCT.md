# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers and recruiters filling full-stack and applied-AI/ML engineering roles, weighted equally — UK-based or remote. They arrive from a CV, LinkedIn or a direct link and decide within about a minute whether Shreyash is worth contacting. A smaller group goes deep: they open a project, read a case study, and check the source.

## Product Purpose

The personal portfolio of Shreyash Meshram, full-stack and applied-AI engineer (MSc Business Analytics, University of Nottingham, 2026). It exists to get him interviews: show what he has built, prove it with sourced numbers and readable case studies, and make every route to contact effortless.

Success is any of these visitor actions, all valued:
- writing to him by email
- opening the CV
- going deep on a project (drawer, case study, or source repository)
- following through to LinkedIn or GitHub

## Positioning

Every project in the portfolio turns messy input into a measurement (a photo into FEN notation, a headline into sentiment, 3,000 customers into five segments). The site presents itself the same way, as a calibrated readout of the work rather than a gallery of cards.

## Operating Context

- Visitors scan on a phone between other tabs, or on a laptop while shortlisting candidates.
- Depth is layered: results table → project drawer → static case study → GitHub source.
- Contact paths: email (`shreyashmeshram0031@gmail.com`), CV PDF, LinkedIn (`in/shreyuu`), GitHub (`shreyuu`).

## Capabilities and Constraints

- Single-page Vite + React app. No client routing. Sections: Hero, Profile, Work (18 projects with channel filter and detail drawer), Trajectory, Contact. Also a ⌘K command palette and a light/dark theme that persists in `localStorage`.
- 18 static case studies in `public/case-studies/*.html`. They are self-contained, with tokens mirrored by hand in `case-study.css` and no build step.
- Deployed on Vercel (project `shreyash`) at `https://www.shreyash.codes/`; the apex `shreyash.codes` 308-redirects to `www` (confirmed 2026-10-30). `shreyash-meshram.vercel.app` is a different project (the parent `Portfolio` app), not this site. The CSP in `vercel.json` pins a SHA-256 of the inline pre-paint theme script, so any change to that script must update the hash.
- Status as of 2026-10-30: MSc completed (dissertation submitted 3 Sep 2026); open to full-time roles, available now; based in Nottingham, UK; open to remote and relocation.

## Brand Commitments

- The **"Instrument"** identity is binding: graph-paper ground, magma signal ramp, Martian Mono display with Instrument Sans for reading, zero border radius, the chart-recorder spine. Do not drift back to the templated look it replaced (cream ground, serif display, terracotta accent, pill buttons, generic numbered markers).
- **Numbers need provenance.** Every metric shown must cite its source (project and method). No unsourced statistics, ever.
- **Case studies stay static.** `/public` pages remain self-contained HTML/CSS.

## Evidence on Hand

- 18 projects (00–17) with blurbs, highlights, stacks and repository links: `src/data/portfolio.jsx`
- 18 case studies: `public/case-studies/*.html`
- CV: `public/resources/Shreyash-Meshram-CV.pdf`
- Sourced metrics:
  - −40% API p50 latency (Arohi Softwares, query batching)
  - ~97% piece-classifier validation accuracy (FENgine)
  - 89% recall, 5-fold CV (heart-disease classifier)
  - £1.29M transactions analysed across 4 stores (FoodCorp KPI)
- Social card: `public/og-image.png` (1200×630)
- **Absent, never fabricate:** testimonials, employer or client logos, quotes, headshots, follower counts, salary or rate information.

## Product Principles

1. **Evidence over adjectives.** A claim earns its place by citing where it came from.
2. **Readable in a minute.** Role, availability, proof and a contact route are visible without hunting.
3. **Depth on demand.** Summary first; drawer, case study and source are each one step further.
4. **Every contact route works.** Email, CV, LinkedIn and GitHub are always one action away and give clear feedback.
5. **Distinctive, never at legibility's expense.** The Instrument identity stays, and it meets the accessibility bar.

## Accessibility & Inclusion

WCAG 2.2 AA for all work: full keyboard use, visible focus, accessible names that include visible labels, 4.5:1 text contrast, `prefers-reduced-motion` respected.
