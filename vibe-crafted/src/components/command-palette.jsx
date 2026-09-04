// Command Palette (⌘K / Ctrl+K) — keyboard-first navigation

import React from "react";
import { PORTFOLIO } from "../data/portfolio.jsx";

function buildCommands({ setTheme, theme, openProject, setOpen }) {
  const p = PORTFOLIO || {};
  const sections = [
    { id: "top", label: "Top", section: "Section" },
    { id: "about", label: "About", section: "Section" },
    { id: "projects", label: "Work", section: "Section" },
    { id: "experience", label: "Trajectory", section: "Section" },
    { id: "contact", label: "Contact", section: "Section" },
  ];

  const navCmds = sections.map((s) => ({
    id: `nav-${s.id}`,
    icon: "GO",
    label: `Jump to ${s.label}`,
    section: "Navigate",
    run: () => {
      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    },
  }));

  const projectCmds = (p.projects || []).map((proj) => ({
    id: `proj-${proj.n}`,
    icon: proj.n,
    label: proj.title,
    section: "Open Project",
    run: () => {
      openProject(proj);
      setOpen(false);
    },
  }));

  const actionCmds = [
    {
      id: "theme-toggle",
      icon: "TH",
      label: `Toggle theme — ${theme === "dark" ? "Light" : "Dark"}`,
      section: "Action",
      run: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setOpen(false);
      },
    },
    {
      id: "copy-email",
      icon: "@",
      label: "Copy email address",
      section: "Action",
      run: async () => {
        try {
          await navigator.clipboard.writeText(p.email || "");
        } catch (e) {
          console.error("Failed to copy email:", e);
        }
        setOpen(false);
      },
    },
    {
      id: "open-github",
      icon: "EXT",
      label: "Open GitHub profile",
      section: "Action",
      run: () => {
        window.open(p.github, "_blank", "noopener");
        setOpen(false);
      },
    },
    {
      id: "open-linkedin",
      icon: "EXT",
      label: "Open LinkedIn",
      section: "Action",
      run: () => {
        window.open(p.linkedin, "_blank", "noopener");
        setOpen(false);
      },
    },
    {
      id: "open-cv",
      icon: "EXT",
      label: "Open CV",
      section: "Action",
      run: () => {
        try {
          window.open(p.resume, "_blank", "noopener");
        } catch (e) {
          console.error("Failed to open CV:", e);
        }
        setOpen(false);
      },
    },
  ];

  return [...navCmds, ...projectCmds, ...actionCmds];
}

export function CommandPalette({ open, setOpen, theme, setTheme, openProject }) {
  const [query, setQuery] = React.useState("");
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const inputRef = React.useRef(null);
  const listRef = React.useRef(null);

  const commands = React.useMemo(
    () => buildCommands({ setTheme, theme, openProject, setOpen }),
    [theme, openProject, setTheme, setOpen]
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.section || ""} ${c.hint || ""}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Reset selection when filter changes
  React.useEffect(() => {
    setSelectedIdx(0);
  }, [query, open]);

  // Focus input on open
  React.useEffect(() => {
    if (open) {
      setQuery("");
      // delay so transition starts
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // Global ⌘K / Ctrl+K listener
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  // Keep the highlighted item visible as you arrow through the list
  React.useEffect(() => {
    const el = listRef.current?.children[selectedIdx];
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [selectedIdx]);

  // Arrow nav — focus stays in the input; Tab is trapped so it can't
  // escape to the page behind the open palette.
  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[selectedIdx];
      if (cmd) cmd.run();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div
        className={`cmdk-backdrop${open ? " open" : ""}`}
        role="button"
        tabIndex={0}
        aria-label="Close command palette"
        onClick={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(false);
          }
        }}
      />
      <div className={`cmdk-shell${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          ref={inputRef}
          className="cmdk-input"
          type="text"
          placeholder="Search sections, projects, actions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKey}
          aria-label="Search commands"
          role="combobox"
          aria-expanded={filtered.length > 0}
          aria-controls="cmdk-list"
          aria-activedescendant={
            filtered[selectedIdx] ? `cmdk-opt-${filtered[selectedIdx].id}` : undefined
          }
        />
        {filtered.length === 0 ? (
          <div className="cmdk-empty">No matches for &quot;{query}&quot;</div>
        ) : (
          <ul className="cmdk-list" id="cmdk-list" ref={listRef} role="listbox">
            {filtered.map((c, i) => (
              <li
                key={c.id}
                id={`cmdk-opt-${c.id}`}
                className="cmdk-item"
                role="option"
                aria-selected={i === selectedIdx}
                tabIndex={-1}
                onMouseEnter={() => setSelectedIdx(i)}
                onClick={() => c.run()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    c.run();
                  }
                }}
              >
                <span className="cmdk-icon">{c.icon}</span>
                <span>
                  {c.label}
                  {c.hint && (
                    <span style={{ color: "var(--ink-mute)", marginLeft: 10, fontSize: 12 }}>
                      · {c.hint}
                    </span>
                  )}
                </span>
                <span className="cmdk-kbd">{c.section}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mono" style={{
          padding: "10px 24px",
          borderTop: "1px solid var(--rule-soft)",
          fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "var(--ink-mute)",
          display: "flex", justifyContent: "space-between", gap: 12,
        }}>
          <span>↑ ↓ Navigate · ↵ Select · ESC Close</span>
          <span>{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </>
  );
}
