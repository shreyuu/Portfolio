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
            <main className="min-h-screen bg-background-dark text-white px-6 md:px-20 py-12">
                <Hero />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    <div className="col-span-1">
                        <About />
                    </div>
                    <div className="col-span-1 flex items-start justify-center">
                        <ProfileCard />
                    </div>
                    <div className="col-span-1">
                        <Skills />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 max-w-7xl mx-auto">
                    <Experience />
                    <Education />
                </div>
                <div className="max-w-7xl mx-auto my-12">
                    <Projects />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Home;
