// Entry point — mounts the app and loads the design system.
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.jsx";

import "./styles/globals.css";
import "./styles/print.css";

// Reveal-on-scroll only hides content once JS is confirmed to be running.
// Without this the page renders blank if the bundle fails, the observer never
// fires, or the tab is backgrounded and transitions never tick.
document.documentElement.classList.add("js");

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
