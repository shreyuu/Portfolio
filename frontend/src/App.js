import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="app">
      <SpeedInsights />
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
