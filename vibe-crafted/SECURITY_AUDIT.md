# Security & logic audit

Date: 2026-10-23 · Scope: the whole git repo at `Portfolio/`. That covers the legacy CRA app at the root and the current Vite app in `vibe-crafted/`.

**Result:** no Critical or High findings. 1 Medium and 6 Low security findings are fixed, 1 is informational, and 3 bugs are fixed or folded into fixes. 1 bug is won't-fix (dead code), and 2 notes need the owner.

## Scope and attack surface

| | Root (CRA, legacy) | `vibe-crafted/` (Vite, current) |
|---|---|---|
| Stack | React 18, CRACO, Tailwind, framer-motion, EmailJS, Jest, ESLint | React 18, Vite 5, plain CSS, `@vercel/analytics`; Vitest (added in this audit) |
| Hosting | Vercel (old build live at shreyash-meshram.vercel.app) | Vercel, Root Directory `vibe-crafted` |
| Entry points | SPA `index.html`; EmailJS contact form (`src/components/Footer.jsx`) | SPA `index.html`; 18 static `public/case-studies/*.html`; `postMessage` listener (TweaksPanel) |
| User input | Contact form fields → `api.emailjs.com` | Command-palette search (filtered locally with `includes`), cross-window `message` events |
| Secrets / PII | `.env` (local, gitignored, never committed): EmailJS IDs + public key (public by design), `SPEED_INSIGHTS_TOKEN`. CI secret `SPEED_INSIGHTS_TOKEN` | None. The CV PDF and the email address are published on purpose |
| CI | `.github/workflows/ci.yml`: lint, test, build | none |

**Not applicable** (no code exists for these, checked by reading every source file): server routes, auth/sessions/JWT, authorization/IDOR, SQL/NoSQL/shell injection, deserialization, SSRF, file upload, path traversal, payments and other business-logic amounts, LLM features, containers.
**Checked and clean:** there is no `dangerouslySetInnerHTML`, `innerHTML`, `eval` or `new Function` anywhere. Every `target="_blank"` link has `rel="noreferrer"` or uses `window.open(..., 'noopener')`. The palette search is a plain substring match, so there's no ReDoS. The React error boundary only shows stack traces when `NODE_ENV === 'development'`.

## Findings

| ID | Severity | Category | Location | Exploit scenario | Fix | Confidence | Status |
|---|---|---|---|---|---|---|---|
| SEC-01 | Medium | Missing security headers | `vibe-crafted/vercel.json`, `vercel.json` | Both live sites send only HSTS (checked with curl on 2026-10-23). An attacker page can load the portfolio in a transparent iframe (clickjacking), and it's the precondition for SEC-02. Without a CSP, any future injection bug runs scripts with no second line of defence. | `headers` block: enforced CSP (inline theme script allowed by sha256 only, no `'unsafe-inline'` for scripts), `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`. Root build sets `INLINE_RUNTIME_CHUNK=false` so CRA never emits a per-build inline script. | High | **Fixed.** Tests: `vibe-crafted/tests/security-headers.test.js` (re-hashes every inline script on every page), `src/securityHeaders.test.js` |
| SEC-02 | Low | Cross-origin messaging | `vibe-crafted/src/components/tweaks-panel.jsx` | `evil.example` frames the site and calls `frame.contentWindow.postMessage({type:'__activate_edit_mode'}, '*')`. The listener doesn't check `origin` or `source`, so the design-tool panel opens on the production site, and every tweak change is posted to the parent with target `'*'`. | Panel and all host messaging only run when `import.meta.env.DEV` is true; the production bundle no longer contains the protocol (`grep __edit_mode dist/` → 0) | High | **Fixed.** Test: `vibe-crafted/tests/tweaks-panel.test.jsx` |
| SEC-03 | Low | Abuse / client-only validation | `src/components/Footer.jsx` | The EmailJS service ID, template ID and public key ship in the JS bundle (by design). A script calls `emailjs.send()` in a loop with multi-MB messages. The length and format checks only run in the form handler, so the script floods the owner's inbox and burns the monthly EmailJS quota, and the real form then fails. Not exploitable on the current live root bundle, which doesn't include the form. | Length caps (100 / 254 / 5000) enforced in the handler and via `maxLength`; trimmed values are sent; hidden honeypot field silently drops bots. **The real server-side control is manual:** EmailJS allowed origins, rate limit, reCAPTCHA | High (missing controls); can't see the EmailJS dashboard | **Fixed in code.** Dashboard step is manual. Test: `src/components/Footer.test.jsx` |
| SEC-04 | Low | CI supply chain / secret exposure | `.github/workflows/ci.yml`, `package.json` | `npx --yes @vercel/speed-insights@latest` downloads and runs whatever is tagged `latest` with `SPEED_INSIGHTS_TOKEN` in its environment, so a malicious publish gets the token. There's no `permissions:` block, so the job gets the repo-default GITHUB_TOKEN scopes. The `npm install --legacy-peer-deps` fallback installs unpinned versions. Actions use mutable tags (`@v3`), so a retagged action runs in CI (semgrep `github-actions-mutable-action-tag`). | Step and `speed-insights` script removed; `permissions: contents: read`; `npm ci` only; `actions/checkout` and `actions/setup-node` pinned to the commit SHAs the `v3` tags currently resolve to | High | **Fixed.** Verified: YAML parses; `npm ci --dry-run` succeeds |
| SEC-05 | Low | Unpinned dependencies | `.gitignore` (`package-lock.json` matched every directory) | `vibe-crafted/package-lock.json` was ignored, so every Vercel build resolved `^` ranges fresh. A compromised patch release of any transitive build dependency would go straight into the production bundle. | Lockfiles no longer ignored | High | **Fixed.** Owner must `git add vibe-crafted/package-lock.json` |
| SEC-06 | Low | Vulnerable dependencies (build/dev only) | `vibe-crafted/package-lock.json`, root `package-lock.json` | Example: GHSA-67mh-4wv8-2f99 (esbuild ≤0.24.2). While `npm run dev` is running, any website you visit can send requests to the dev server and read the responses, i.e. your source. None of these reach the static production bundle. | `npm audit fix` in vibe-crafted fixed nanoid, postcss, source-map-js, browserslist, baseline-browser-mapping. What's left (vite 5.4.21 + esbuild, dev-only) needs Vite ≥6.4.4. The root's 99 advisories come from `react-scripts` 5, which is unmaintained. | High | **Partly fixed.** Rest needs owner (major upgrades) |
| SEC-07 | Info | Secrets | `.env` (untracked) | None: never committed (`git log --all -- .env` is empty), not in any build output | — | High | No action needed |
| SEC-08 | Low | Third-party resource without SRI | `public/index.html:20` (root) | Font Awesome CSS is loaded from cdnjs with no `integrity` attribute. If the CDN or that path is compromised, the stylesheet can do CSS injection or exfiltration (attribute selectors, `url()` beacons). Nothing in `src/` uses `fa-` classes, so it is dead weight anyway. | `integrity` (sha512, checked against the served file) + `crossorigin` + `referrerpolicy`; CSP limits styles to the listed hosts | High | **Fixed.** Test: `src/securityHeaders.test.js`. Removing the unused link is optional (owner) |
| BUG-01 | Bug | Crash | `vibe-crafted/src/app.jsx` | With storage blocked (Safari "Block all cookies", sandboxed iframes, some in-app webviews), `localStorage.getItem` throws `SecurityError` inside the `useState` initializer. There's no error boundary, so React unmounts and the page is blank. | `readSavedTheme` / `saveTheme` helpers with try/catch, same as the existing guard in `index.html` | High | **Fixed.** Test: `vibe-crafted/tests/app-storage.test.jsx`; also reproduced in the browser with storage throwing |
| BUG-02 | Bug | Crash | `src/hooks/useTheme.jsx:8,19`, `src/components/ThemeToggle.jsx:8,20` | Same unguarded storage access. Neither file is imported anywhere, so this can't happen. (ThemeToggle also ignores the theme it's passed.) | — | High | **Won't fix: dead code.** Owner may delete both files |
| BUG-03 | Bug | Logic | `src/components/Footer.jsx` | The handler validated the trimmed values but sent the raw ones, so emails arrived padded with whitespace. | Send the trimmed values | High | **Fixed** (with SEC-03) |
| BUG-04 | Bug | CI | `.github/workflows/ci.yml` | `@vercel/speed-insights` has no `bin` entry (checked in 1.2.0's package.json), so the upload step couldn't work. | Step removed | High | **Fixed** (with SEC-04) |
| BUG-05 | Bug | Broken link | `src/components/About.jsx:68` | Your uncommitted deletion of `public/resources/Shreyash-Meshram-CV.pdf` (it predates this audit) means the root app's CV link would 404 once committed. | Keep the file, or update the link | High | **Needs owner** |
| DOC-01 | Note | Docs | `vibe-crafted/README.md:3,313` | The README says the site is live at `shreyuu.vercel.app`, but that domain serves an unrelated page. | Correct the URL | High | **Needs owner** |

## Verification (2026-10-23, after fixes)

**Scanners**
- gitleaks `git` (all history): no leaks. gitleaks `dir` on every tracked source dir: no leaks.
- trufflehog (`git` history + filesystem, verified + unknown results): no findings.
- osv-scanner: vibe-crafted has only `vite` 5.4.21 and `esbuild` 0.21.5, both in the dev group (SEC-06). Root: 60 packages, all from the `react-scripts` toolchain (SEC-06).
- npm audit, vibe-crafted: 7 → 2 (vite, esbuild; dev-only). vitest was added at 4.1.12, because ≤4.1.11 carries critical advisories.
- semgrep `--config auto` (251 rules, 80 files): 7 results.
  - Mutable action tags (2): fixed under SEC-04.
  - `wildcard-postmessage-configuration` (3): accepted. That code now only runs in dev builds (SEC-02), and the host origin isn't known in advance.
  - `unsafe-formatstring` in `src/hooks/usePerformanceMonitor.jsx:10`: false positive. It's a dev-only `console.log` of a component name.
  - `missing-integrity` in `vibe-crafted/index.html:12`: false positive. It flags `<link rel="canonical">`, which isn't a loaded resource.

**Tests, lint, build**
- Root: Jest 7/7 pass; ESLint clean; `npm run build` compiles with no inline `<script>` in `build/index.html`.
- vibe-crafted: Vitest 27/27 pass; `npm run build` OK. The built `dist/index.html` inline script hash matches the CSP.

**Exploits replayed** (built `dist/` served locally with the vercel.json headers applied)
- SEC-01: an attacker page on another origin framed the site. Chrome blocked it with "violates … frame-ancestors 'none'", and the iframe stayed empty.
- SEC-02: the `__activate_edit_mode` postMessage from the framing page got no response, and the production bundle contains no `__edit_mode` code.
- BUG-01: with `window.localStorage` throwing `SecurityError`, the app still mounts all 5 sections.
- CSP: no violations on `/`, `case-studies/zenspend.html` or `case-studies/feature-drift-mcr.html`. Fonts load and the theme script runs. `/_vercel/insights/script.js` 404s locally only; Vercel serves it in production, same origin.
- Core flows: theme toggle persists, ⌘K palette opens and closes, project modal opens and Escape closes it with focus returned, CV PDF returns 200.

## Manual actions for the owner
- **EmailJS dashboard:** restrict allowed origins to your domain, enable the rate limit, add reCAPTCHA, and check that the template uses `{{var}}` (escaped), not `{{{var}}}`.
- `git add vibe-crafted/package-lock.json` (plus the new test files) when you commit.
- **Upgrades:** Vite 5 → ≥6.4.4 in vibe-crafted (dev-server advisories). Retire or migrate the root `react-scripts` app. CI's Node 16/18 matrix is EOL; move to 20/22 and `actions/*@v4+`, pinned by SHA.
- **SPEED_INSIGHTS_TOKEN:** never leaked. Since CI no longer uses it, delete the GitHub secret and revoke the token in Vercel.
- Fix the README live URL (DOC-01) and the CV link/file (BUG-05). Optionally delete the dead `useTheme.jsx`, `ThemeToggle.jsx` and the unused Font Awesome link.
- **Deploy check:** after the next Vercel deploy, open the site and the case studies with DevTools open and confirm there are no CSP violations. Analytics is same-origin (`/_vercel/insights`) and is allowed by `'self'`.
