import React from "react";
import Hero from "./Hero";
import About from "./About";
import ProfileCard from "./ProfileCard";
import Projects from "./Projects";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white px-6 md:px-20 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left Column */}
            <div className="col-span-1">
                <Hero />
                <About />
            </div>

            {/* Center Column */}
            <div className="col-span-1 flex items-start justify-center">
                <ProfileCard />
            </div>

            {/* Right Column */}
            <div className="col-span-1">
                <Projects />
            </div>
        </div>
    );
};

export default Home;