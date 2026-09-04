// Profile + toolkit inventory

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";
import { SectionHeader, Reveal, ArrowUpRight } from "../components/primitives.jsx";

export function About() {
  const p = PORTFOLIO;
  const toolCount = p.skills.reduce((n, c) => n + c.items.length, 0);

  return (
    <section id="about" data-screen-label="Profile" className="about">
      <div className="wrap">
        <SectionHeader
          index="01"
          label="Profile"
          n="Nottingham, UK"
          title="An engineer who ships the measurement, not just the model."
        />

        <div className="about__body">
          <Reveal>
            <div className="about__prose">
              {p.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <div className="about__links">
                {[
                  { label: "GitHub", href: p.github },
                  { label: "LinkedIn", href: p.linkedin },
                  { label: "Email", href: `mailto:${p.email}` },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="lbl u-link"
                    style={{ color: "var(--ink)" }}
                  >
                    {l.label} <ArrowUpRight size={10} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Standing conditions — the facts a hiring manager checks first,
              pulled out of the prose so they can be read in three seconds. */}
          <Reveal delay={120}>
            <dl className="about__spec">
              {[
                ["Status", "Open to part-time & graduate roles"],
                ["Available", "September 2026"],
                ["Based", p.location],
                ["Reading", "MSc Business Analytics, Nottingham"],
                ["Focus", "Backends · applied ML · analytics"],
              ].map(([k, v]) => (
                <div className="about__spec-row" key={k}>
                  <dt className="lbl">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Toolkit */}
        <div className="about__tk">
          <Reveal>
            <div className="sect-meta" style={{ marginBottom: 24 }}>
              <span className="sect-meta__idx">01.2</span>
              <span className="sect-meta__name">Toolkit</span>
              <span className="sect-meta__n">n={toolCount}</span>
            </div>
          </Reveal>

          <div className="tk-grid">
            {p.skills.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 60}>
                <div className="tk-cat">
                  <div className="tk-cat__head">
                    <span className="tk-cat__name">{cat.label}</span>
                    <span className="lbl">{String(cat.items.length).padStart(2, "0")}</span>
                  </div>
                  <div className="tk-cat__items">
                    {cat.items.map((it) => (
                      <span className="tag" key={it}>{it}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about { padding: var(--section-pad) 0 72px; }

        .about__body {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
          gap: 56px;
          margin-top: 8px;
        }

        .about__prose p {
          margin: 0 0 20px;
          font-size: clamp(16px, 1.35vw, 18.5px);
          line-height: 1.68;
          color: var(--ink-soft);
          max-width: 62ch;
        }

        .about__prose p:first-child {
          color: var(--ink);
          font-size: clamp(17px, 1.5vw, 21px);
          line-height: 1.6;
        }

        .about__links {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        /* Spec block — a plate of standing facts */
        .about__spec {
          margin: 0;
          border-top: 1px solid var(--rule);
        }

        .about__spec-row {
          display: grid;
          grid-template-columns: 82px minmax(0, 1fr);
          gap: 16px;
          padding: 13px 0;
          border-bottom: 1px solid var(--rule-hair);
          align-items: baseline;
        }

        .about__spec dt { margin: 0; }

        .about__spec dd {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--ink);
        }

        .about__tk { margin-top: 96px; }

        .tk-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0 56px;
        }

        .tk-cat {
          padding: 20px 0;
          border-top: 1px solid var(--rule-hair);
        }

        .tk-cat__head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .tk-cat__name {
          font-family: var(--mono);
          font-variation-settings: "wdth" 85, "wght" 600;
          font-size: 13px;
          letter-spacing: -0.01em;
          color: var(--ink);
        }

        .tk-cat__items {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        @media (max-width: 940px) {
          .about__body { grid-template-columns: 1fr; gap: 36px; }
          .tk-grid { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>
    </section>
  );
}
