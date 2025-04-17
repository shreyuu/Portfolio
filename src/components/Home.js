import React from "react";
import Hero from "./Hero";
import About from "./About";
import ProfileCard from "./ProfileCard";
import Projects from "./Projects";
import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";
import Footer from "./Footer";

const Home = () => {
    return (
        <>
            <main className="min-h-screen bg-background-dark text-white px-4 sm:px-6 lg:px-20 py-8 sm:py-12">
                <Hero />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 max-w-7xl mx-auto pb-10">
                    <div className="lg:col-span-1">
                        <About />
                    </div>
                    <div className="lg:col-span-1 flex items-start justify-center">
                        <ProfileCard />
                    </div>
                    <div className="lg:col-span-1">
                        <Skills />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 sm:my-12 max-w-7xl mx-auto">
                    <Experience />
                    <Education />
                </div>
                <div className="max-w-7xl mx-auto">
                    <Projects />
                </div>
                <Footer />
            </main>
        </>
    );
};

export default Home;