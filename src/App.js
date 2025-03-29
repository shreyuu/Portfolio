import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <Helmet>
        <title>Shreyash Meshram | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Shreyash Meshram, a React developer."
        />
        <meta property="og:title" content="Shreyash Meshram | Portfolio" />
        <meta
          property="og:description"
          content="Portfolio of Shreyash Meshram, a React developer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
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
    </>
  );
}

export default App;
