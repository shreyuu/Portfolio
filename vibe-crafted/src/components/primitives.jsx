// Instrument primitives — reveal, masked text, section headers

import React from "react";

const { useEffect, useRef, useState } = React;

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function Reveal({ children, delay = 0, as: As = "div", className = "", style, ...rest }) {
  const [ref, inView] = useInView(0.12);
  return (
    <As
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </As>
  );
}

// Word-by-word mask reveal
export function MaskText({ text, delay = 0, stagger = 30, className = "", style, as: As = "span" }) {
  const [ref, inView] = useInView(0.1);
  const words = String(text).split(" ");
  return (
    <As ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span className={`mask ${inView ? "in" : ""}`} key={i} style={{ marginRight: "0.26em" }}>
          <span style={{ "--d": `${delay + i * stagger}ms` }}>{w}</span>
        </span>
      ))}
    </As>
  );
}

// Section header. `n` is the real count of what follows — the reader learns
// the size of the section before scrolling into it.
export function SectionHeader({ index, label, title, kicker, n }) {
  return (
    <header className="sect-head">
      <div className="sect-meta">
        <span className="sect-meta__idx">{index}</span>
        <span className="sect-meta__name">{label}</span>
        {n && <span className="sect-meta__n">{n}</span>}
      </div>
      {title && <MaskText text={title} as="h2" className="sect-title" />}
      {kicker && (
        <Reveal delay={160}>
          <p className="sect-kicker">{kicker}</p>
        </Reveal>
      )}
    </header>
  );
}

// Stack tag
export function Chip({ children }) {
  return <span className="tag">{children}</span>;
}

// Arrow — drawn on the grid, square joins, no rounded caps
export function ArrowUpRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={{ transition: "transform .25s cubic-bezier(.2,.7,.2,1)", flex: "none" }}>
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}
