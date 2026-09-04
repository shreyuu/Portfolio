// Trajectory — work and study as two parallel logs

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";
import { SectionHeader, Reveal, Chip } from "../components/primitives.jsx";

export function ExperienceSection() {
  const p = PORTFOLIO;

  return (
    <section id="experience" data-screen-label="Trajectory" className="traj">
      <div className="wrap">
        <SectionHeader
          index="03"
          label="Trajectory"
          n={`${p.experience.length} roles · ${p.education.length} programmes`}
          title="Where the practice was built."
        />

        <div className="traj__grid">
          {/* Work log */}
          <Reveal>
            <div>
              <div className="traj__col-head">
                <span className="lbl" style={{ color: "var(--ink)" }}>Work</span>
                <span className="traj__rule" />
                <span className="lbl">{p.experience.length} roles</span>
              </div>

              <ul className="traj__list">
                {p.experience.map((e, i) => (
                  <li className="entry" key={i}>
                    <div className="entry__meta">
                      <span className="lbl">{e.period}</span>
                      <span className="lbl entry__dur">{e.duration}</span>
                    </div>

                    <h3 className="entry__role">{e.role}</h3>
                    <div className="entry__org">{e.company}</div>
                    <p className="entry__blurb">{e.blurb}</p>

                    {e.outcomes && e.outcomes.length > 0 && (
                      <ul className="entry__out">
                        {e.outcomes.map((o) => (
                          <li key={o}>
                            <span className="entry__marker" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="entry__tags">
                      {e.skills.map((s) => <Chip key={s}>{s}</Chip>)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Study log */}
          <Reveal delay={120}>
            <div>
              <div className="traj__col-head">
                <span className="lbl" style={{ color: "var(--ink)" }}>Education</span>
                <span className="traj__rule" />
                <span className="lbl">{p.education.length} programmes</span>
              </div>

              <ul className="traj__list">
                {p.education.map((e, i) => (
                  <li className="entry" key={i}>
                    <div className="entry__meta">
                      <span className="lbl">{e.period}</span>
                      <span className="lbl entry__dur">{e.place}</span>
                    </div>

                    <h3 className="entry__role">{e.school}</h3>
                    <div className="entry__org">{e.degree}</div>

                    {/* Modules are long lists — collapsed by default so the
                        column stays scannable, expandable for anyone who wants
                        to check the coverage. */}
                    <details className="entry__mods">
                      <summary className="lbl">
                        {e.notes.length} modules
                        <span className="entry__chev">›</span>
                      </summary>
                      <ul>
                        {e.notes.map((n, j) => (
                          <li key={j}>
                            <span className="entry__marker entry__marker--quiet" />
                            {n}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .traj { padding: var(--section-pad) 0 var(--section-end); }

        .traj__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 52px;
          margin-top: 12px;
        }

        .traj__col-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 4px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--rule);
        }

        .traj__rule { flex: 1; height: 1px; background: var(--rule-hair); }

        .traj__list { list-style: none; margin: 0; padding: 0; }

        .entry {
          padding: 24px 0;
          border-bottom: 1px solid var(--rule-hair);
        }

        .entry__meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .entry__dur { color: var(--ink-mute); }

        .entry__role {
          margin: 0 0 5px;
          font-family: var(--mono);
          font-variation-settings: "wdth" 84, "wght" 600;
          font-size: clamp(16px, 1.5vw, 19px);
          line-height: 1.25;
          letter-spacing: -0.025em;
          color: var(--ink);
        }

        .entry__org {
          font-family: var(--mono);
          font-variation-settings: "wdth" 86, "wght" 500;
          font-size: 11.5px;
          letter-spacing: 0.04em;
          color: var(--accent);
          margin-bottom: 12px;
        }

        .entry__blurb {
          margin: 0 0 14px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--ink-soft);
        }

        .entry__out {
          list-style: none;
          margin: 0 0 16px;
          padding: 0;
          display: grid;
          gap: 8px;
        }

        .entry__out li {
          display: flex;
          gap: 11px;
          align-items: baseline;
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--ink);
        }

        .entry__marker {
          width: 6px; height: 6px;
          background: var(--accent);
          flex: none;
          transform: translateY(-1px);
        }

        .entry__marker--quiet { background: var(--rule-soft); width: 5px; height: 5px; }

        .entry__tags { display: flex; flex-wrap: wrap; gap: 5px; }

        /* Modules disclosure */
        .entry__mods summary {
          cursor: pointer;
          list-style: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 10px;
          border: 1px solid var(--rule-soft);
          color: var(--ink-mute);
          transition: color .2s ease, border-color .2s ease;
        }

        .entry__mods summary::-webkit-details-marker { display: none; }
        .entry__mods summary:hover { color: var(--ink); border-color: var(--ink); }

        .entry__chev {
          display: inline-block;
          transition: transform .22s var(--ease);
          font-size: 13px;
          line-height: 1;
        }

        .entry__mods[open] .entry__chev { transform: rotate(90deg); }

        .entry__mods ul {
          list-style: none;
          margin: 14px 0 0;
          padding: 0;
          display: grid;
          gap: 6px;
        }

        .entry__mods ul li {
          display: flex;
          gap: 10px;
          align-items: baseline;
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--ink-soft);
        }

        @media (max-width: 940px) {
          .traj__grid { grid-template-columns: 1fr; gap: 44px; }
        }
      `}</style>
    </section>
  );
}
