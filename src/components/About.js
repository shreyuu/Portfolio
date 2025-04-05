// src/components/About.js
import React from "react";

const About = () => {
    return (
        <section id="about" className="py-20">
            <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                <img
                    src="/profile.jpg"
                    alt="profile"
                    className="w-40 h-40 rounded-full object-cover shadow-lg"
                />
                <div className="max-w-xl text-gray-300 text-center md:text-left">
                    <p>
                        I'm a final-year Computer Engineering student with a passion for AI,
                        web development, and clean UI. I love building full-stack apps with
                        React, Tailwind, Django, and Python.
                    </p>
                    <p className="mt-4">Always curious. Always learning. Let's build!</p>
                </div>
            </div>
        </section>
    );
};

export default About;