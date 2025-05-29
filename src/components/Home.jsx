import React from 'react';
import Hero from './Hero';
import About from './About';
import ProfileCard from './ProfileCard';
import Projects from './Projects';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import Navigation from './Navigation';

const Home = () => {
  return (
    <>
      <ThemeToggle />
      <Navigation />
      <main
        className="min-h-screen bg-background-dark dark:bg-background-dark text-white px-4 sm:px-6 lg:px-20 py-8 sm:py-12 transition-colors duration-300"
      >
        <Hero />
        <section
          id="about"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 max-w-7xl mx-auto pb-10"
          aria-label="About and Skills"
        >
          <div className="lg:col-span-1">
            <About />
          </div>
          <div className="lg:col-span-1 flex items-start justify-center">
            <ProfileCard />
          </div>
          <div className="lg:col-span-1">
            <Skills />
          </div>
        </section>
        <section
          id="experience"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 sm:my-12 max-w-7xl mx-auto"
          aria-label="Experience and Education"
        >
          <Experience />
          <Education />
        </section>
        <div className="max-w-7xl mx-auto" role="region" aria-label="Projects">
          <Projects />
        </div>
        <section id="contact">
          <Footer />
        </section>
      </main>
    </>
  );
};

export default Home;
