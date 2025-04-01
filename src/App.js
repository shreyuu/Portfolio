import React from "react";
import { Helmet } from "react-helmet";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Helmet>
        <title>Shreyash Meshram | React Developer</title>
        <meta
          name="description"
          content="Portfolio of Shreyash Meshram, a passionate React developer specializing in modern web applications."
        />
        <meta property="og:title" content="Shreyash Meshram | React Developer" />
        <meta
          property="og:description"
          content="Portfolio of Shreyash Meshram, a passionate React developer specializing in modern web applications."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="canonical" href="https://shreyash.dev" />
      </Helmet>

      <div className="app min-h-screen bg-background-light dark:bg-background-dark">
        <SpeedInsights />
        <header className="relative z-50">
          <Navbar />
        </header>
        <main className="relative z-0">
          <Hero />
          <Projects />
          <Contact />
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
