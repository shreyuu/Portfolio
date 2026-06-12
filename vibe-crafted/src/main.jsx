// Entry point — mounts the app and loads the design system.
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.jsx";

import "./styles/globals.css";
import "./styles/print.css";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
