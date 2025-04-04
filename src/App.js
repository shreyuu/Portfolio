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
        <title>Shreyash Meshram | Full Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Shreyash Meshram - Full Stack Developer specializing in React, Django, and modern web technologies"
        />
        <meta
          name="keywords"
          content="Shreyash Meshram, Portfolio, React, Django, Tailwind CSS, Full Stack Developer"
        />
        <meta name="author" content="Shreyash Meshram" />

        {/* Open Graph tags */}
        <meta
          property="og:title"
          content="Shreyash Meshram | Full Stack Developer"
        />
        <meta
          property="og:description"
          content="Hi! I'm Shreyash — a full-stack developer experienced in React and Django development."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://frontend-867yaxpx9-shreyuus-projects.vercel.app/"
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Shreyash Meshram | Full Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Hi! I'm Shreyash — a full-stack developer experienced in React and Django development."
        />

        {/* Other important meta tags */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#3B82F6" />
        <link
          rel="canonical"
          href="https://frontend-867yaxpx9-shreyuus-projects.vercel.app/"
        />
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
