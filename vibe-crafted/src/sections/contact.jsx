// Contact + footer

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";
import { Reveal, ArrowUpRight, Download } from "../components/primitives.jsx";
import { copyText } from "../lib/clipboard.js";
import { announce } from "../lib/announce.js";

const COPY_RESET_MS = 1800;

const COPY_LABEL = { idle: "Copy", copied: "✓", failed: "Retry" };

export function Contact() {
  const p = PORTFOLIO;
  // idle → copied | failed → idle. A refused clipboard is reported, not swallowed.
  const [copyState, setCopyState] = React.useState("idle");

  const copyEmail = async () => {
    const ok = await copyText(p.email);
    setCopyState(ok ? "copied" : "failed");
    announce(ok
      ? "Email address copied"
      : `Couldn't copy the address. Use Write email, or it is ${p.email}.`);
    window.setTimeout(() => setCopyState("idle"), COPY_RESET_MS);
  };

  return (
    <section id="contact" data-screen-label="Contact" className="out">
      <div className="wrap">
        <div className="sect-meta" style={{ marginBottom: 30 }}>
          <span className="sect-meta__idx">04</span>
          <span className="sect-meta__name">Contact</span>
          <span className="sect-meta__n">Replies within ~24h</span>
        </div>

        <Reveal>
          <h2 className="display out__head">
            Send me{" "}
            <br />
            something<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
        </Reveal>

        <div className="out__grid">
          <Reveal delay={120}>
            <div>
              <p className="out__lede">
                I&rsquo;m looking for full-stack and AI engineering roles, and
                I&rsquo;m available to start now.
                Hiring, building something, or just want to argue about
                evaluation metrics — either way, write.
              </p>

              {/* Copy for the desk, mailto for the phone in your hand */}
              <div className="out__actions">
                <button onClick={copyEmail} className="stamp stamp--solid out__mail">
                  <span>{copyState === "copied" ? "Copied to clipboard" : p.email}</span>
                  <span className="out__mail-hint">{COPY_LABEL[copyState]}</span>
                </button>
                <a href={`mailto:${p.email}`} className="stamp out__write">
                  <span>Write email</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>

              <dl className="out__spec">
                {[
                  { label: "GitHub", val: "shreyuu", href: p.github },
                  { label: "LinkedIn", val: "in/shreyuu", href: p.linkedin },
                  { label: "Based in", val: p.location, href: null },
                  { label: "CV", val: "Download PDF", href: p.resume, download: true },
                ].map((x) => (
                  <div className="out__spec-row" key={x.label}>
                    <dt className="lbl">{x.label}</dt>
                    <dd>
                      {x.href ? (
                        <a
                          href={x.href}
                          target={x.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          download={x.download || undefined}
                          className="u-link"
                        >
                          {x.val} {x.download ? <Download size={10} /> : <ArrowUpRight size={10} />}
                        </a>
                      ) : (
                        <span>{x.val}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Availability as a config file — the format this reader actually
              reads all day, and it states the terms without a paragraph. */}
          <Reveal delay={220}>
            <div className="out__yml">
              <div className="out__yml-bar">
                <span className="lbl">available_for.yml</span>
              </div>
              <pre className="out__yml-body">
{`roles:
  - full_stack_engineer
  - ai_engineer
  - applied_ml
start_date: immediate
location:
  - nottingham_uk
  - remote
  - open_to_relocation
response_time: ~24h`}
              </pre>
            </div>
          </Reveal>
        </div>

        <footer className="out__foot">
          <span className="lbl">© {new Date().getFullYear()} Shreyash Meshram</span>
          <span className="lbl">Built in Nottingham · v3.0</span>
        </footer>
      </div>

      <style>{`
        .out {
          padding: var(--section-pad) 0 40px;
          border-top: 1px solid var(--rule);
          background: var(--bg-raised);
        }

        .out__head {
          margin: 0;
          font-size: clamp(40px, 8.5vw, 126px);
          font-variation-settings: "wdth" 85, "wght" 700;
        }

        .out__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.85fr);
          gap: 52px;
          margin-top: 52px;
          align-items: start;
        }

        .out__lede {
          margin: 0 0 30px;
          font-size: clamp(15.5px, 1.35vw, 17.5px);
          line-height: 1.65;
          color: var(--ink-soft);
          max-width: 48ch;
        }

        .out__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .out__mail {
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: none;
          padding: 17px 22px;
        }

        .out__mail-hint {
          font-size: var(--t-micro);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          opacity: 0.7;
          padding-left: 12px;
          border-left: 1px solid currentColor;
        }

        .out__spec {
          margin: 34px 0 0;
          border-top: 1px solid var(--rule);
          max-width: 480px;
        }

        .out__spec-row {
          display: grid;
          grid-template-columns: 92px minmax(0, 1fr);
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid var(--rule-hair);
          align-items: baseline;
        }

        .out__spec dt { margin: 0; }
        .out__spec dd { margin: 0; font-size: 14px; }

        /* YAML plate */
        .out__yml {
          border: 1px solid var(--rule-soft);
          background: var(--bg);
        }

        .out__yml-bar {
          padding: 11px 16px;
          border-bottom: 1px solid var(--rule-soft);
          background: var(--bg-sunk);
        }

        /* --ink-mute is 4.17:1 on --bg-sunk; the softer ink clears 4.5:1 */
        .out__yml-bar .lbl { color: var(--ink-soft); }

        .out__yml-body {
          margin: 0;
          padding: 18px 16px 20px;
          font-family: var(--mono);
          font-variation-settings: "wdth" 88, "wght" 400;
          font-size: 11.5px;
          line-height: 1.85;
          color: var(--ink-soft);
          overflow-x: auto;
        }

        .out__foot {
          margin-top: 88px;
          padding-top: 20px;
          border-top: 1px solid var(--rule-soft);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        @media (max-width: 900px) {
          .out__grid { grid-template-columns: 1fr; gap: 34px; }
        }

        @media (max-width: 520px) {
          .out__mail { width: 100%; justify-content: space-between; }
          .out__write { width: 100%; justify-content: space-between; }
        }
      `}</style>
    </section>
  );
}
