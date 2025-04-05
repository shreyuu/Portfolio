// src/components/Hero.js
import React from "react";

const Hero = () => {
    return (
        <section
            id="home"
            className="min-h-screen flex flex-col justify-center items-center text-center pt-24"
        >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
                Hey, I'm <span className="text-cyan-400">Shreyash</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl">
                A passionate Full Stack Developer building beautiful web experiences.
            </p>
            <div className="mt-8 flex space-x-4">
                <a
                    href="/resume.pdf"
                    className="bg-cyan-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-cyan-600"
                >
                    Resume
                </a>
                <a
                    href="#projects"
                    className="border border-cyan-500 px-6 py-2 rounded-lg text-cyan-500 font-semibold hover:bg-cyan-500 hover:text-white"
                >
                    Projects
                </a>
            </div>
        </section>
    );
};

export default Hero;