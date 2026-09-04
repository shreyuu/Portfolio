// Hero — instrument nameplate + a rack of measured, cited results

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";
import { Reveal, ArrowUpRight } from "../components/primitives.jsx";

/**
 * Every figure here is real and carries its provenance. A number without a
 * source is decoration; a number with one is evidence, and the reader can
 * weigh it. That distinction is the whole point of the rack.
 */
const RACK = [
  { value: "−40", unit: "%",  label: "API p50 latency",  source: "Arohi Softwares · query batching", tone: "var(--sig-2)" },
  { value: "97",  unit: "%",  label: "Piece classifier", source: "FENgine · validation set",         tone: "var(--sig-3)" },
  { value: "89",  unit: "%",  label: "Recall",           source: "Heart disease · 5-fold CV",        tone: "var(--sig-4)" },
  { value: "1.29",unit: "M",  label: "Txns analysed",    source: "FoodCorp KPI · £, 4 stores",       tone: "var(--sig-0)" },
];

export function Hero() {
  const p = PORTFOLIO;
  const [time, setTime] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/London",
  });

  return (
    <section id="top" data-screen-label="Hero" className="hero">
      <div className="wrap">

        {/* Instrument header strip */}
        <div className="hero__strip">
          <span className="lbl" style={{ color: "var(--ink)" }}>
            <span className="hero__live" /> Available
          </span>
          <span className="lbl">{p.location}</span>
          <span className="lbl">MSc Business Analytics · 25—26</span>
          <span className="lbl hero__strip-t">{timeStr} BST</span>
        </div>

        {/* Nameplate. Mono at display size is conventionally wrong — the even
            advance widths make big words airy and strange. That strangeness is
            the point: it reads as stamped output, not lettering. */}
        <h1 className="hero__name display">
          <span className="hero__line" style={{ "--i": 0 }}>Shreyash</span>
          <span className="hero__line" style={{ "--i": 1 }}>
            Meshra<span style={{ color: "var(--accent)" }}>m</span>
          </span>
        </h1>

        {/* Thesis */}
        <div className="hero__thesis">
          <Reveal delay={520}>
            <p className="hero__lede">
              I build systems that <em>measure things</em> — backends that answer fast,
              models that answer honestly, and interfaces that show their working.
            </p>
          </Reveal>
          <Reveal delay={620}>
            <div className="hero__cta">
              <a href="#projects" className="stamp stamp--solid">
                <span>{p.projects.length} results</span>
                <ArrowUpRight size={12} />
              </a>
              <a href="#contact" className="stamp">
                <span>Get in touch</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Measurement rack */}
        <Reveal delay={720}>
          <div className="rack" role="list" aria-label="Selected measured results">
            {RACK.map((r) => (
              <div className="readout" role="listitem" key={r.label}>
                <div className="readout__v" style={{ color: r.tone }}>
                  {r.value}<span className="readout__u">{r.unit}</span>
                </div>
                <div className="readout__l">{r.label}</div>
                <div className="readout__s">{r.source}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .hero {
          padding: 132px 0 var(--section-end);
          position: relative;
        }

        .hero__strip {
          display: flex;
          align-items: center;
          gap: 26px;
          flex-wrap: wrap;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--rule-soft);
          margin-bottom: 30px;
          opacity: 0;
          animation: fadeIn 700ms ease 120ms forwards;
        }

        .hero__strip-t { margin-left: auto; }

        .hero__live {
          display: inline-block;
          width: 6px; height: 6px;
          background: var(--accent);
          margin-right: 8px;
          vertical-align: 1px;
          animation: blip 2.4s steps(1, end) infinite;
        }

        .hero__name {
          margin: 0;
          font-size: var(--t-display);
          display: grid;
        }

        /* The nameplate calibrates in: the variable width axis settles from
           condensed to its resting width, the way a gauge swings to true. */
        .hero__line {
          display: block;
          font-variation-settings: "wdth" 75, "wght" 700;
          opacity: 0;
          animation: calibrate 1100ms cubic-bezier(.2,.75,.2,1) forwards;
          animation-delay: calc(180ms + var(--i) * 130ms);
          white-space: nowrap;
        }

        @keyframes calibrate {
          from { font-variation-settings: "wdth" 75, "wght" 300; opacity: 0; letter-spacing: 0.06em; }
          to   { font-variation-settings: "wdth" 87, "wght" 700; opacity: 1; letter-spacing: -0.015em; }
        }

        @keyframes fadeIn { to { opacity: 1; } }

        @keyframes blip {
          0%, 55% { opacity: 1; }
          56%, 100% { opacity: 0.25; }
        }

        .hero__thesis {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
          gap: 40px;
          align-items: end;
          margin-top: 40px;
          padding-top: 26px;
          border-top: 1px solid var(--rule-soft);
        }

        .hero__lede {
          margin: 0;
          font-size: clamp(18px, 1.9vw, 25px);
          line-height: 1.45;
          letter-spacing: -0.015em;
          color: var(--ink);
          max-width: 34ch;
        }

        .hero__lede em {
          font-style: italic;
          color: var(--accent);
        }

        .hero__cta {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        /* Rack — four channels, hairline-separated, like a meter bridge */
        .rack {
          margin-top: 56px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-top: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule-soft);
        }

        .readout {
          padding: 20px 20px 18px;
          border-right: 1px solid var(--rule-hair);
          display: grid;
          gap: 5px;
          align-content: start;
        }

        .readout:last-child { border-right: 0; }

        .readout__v {
          font-family: var(--mono);
          font-variation-settings: "wdth" 82, "wght" 700;
          font-size: clamp(30px, 3.4vw, 46px);
          line-height: 1;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
        }

        .readout__u {
          font-size: 0.46em;
          margin-left: 0.12em;
          font-variation-settings: "wdth" 82, "wght" 500;
          vertical-align: 0.5em;
        }

        .readout__l {
          font-family: var(--mono);
          font-variation-settings: "wdth" 88, "wght" 500;
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink);
          margin-top: 4px;
        }

        .readout__s {
          font-size: 11.5px;
          line-height: 1.45;
          color: var(--ink-mute);
        }

        @media (max-width: 980px) {
          .hero__thesis { grid-template-columns: 1fr; gap: 26px; align-items: start; }
          .hero__cta { justify-content: flex-start; }
          .rack { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .readout:nth-child(2) { border-right: 0; }
          .readout:nth-child(-n+2) { border-bottom: 1px solid var(--rule-hair); }
        }

        @media (max-width: 560px) {
          .hero { padding-top: 112px; }
          .hero__strip { gap: 14px; }
          .hero__strip-t { margin-left: 0; }
          .rack { grid-template-columns: 1fr; }
          .readout { border-right: 0; border-bottom: 1px solid var(--rule-hair); }
          .readout:last-child { border-bottom: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero__strip { opacity: 1; animation: none; }
          .hero__line {
            opacity: 1;
            animation: none;
            font-variation-settings: "wdth" 87, "wght" 700;
          }
          .hero__live { animation: none; }
        }
      `}</style>
    </section>
  );
}
