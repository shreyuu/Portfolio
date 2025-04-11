import React from "react";
import Hero from "./Hero";
import About from "./About";
import ProfileCard from "./ProfileCard";
import Projects from "./Projects";
// import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
    return (
        <>
            {/* <Navbar /> */}
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
                        <Projects />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Home;
