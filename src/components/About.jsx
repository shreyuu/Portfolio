import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload } from "react-icons/fa";

const About = () => {
    return (
        <div className="text-gray-300 mt-6">
            <h2 className="text-xl font-bold text-purple-400 mb-4">ABOUT ME</h2>
            <p className="mb-4 leading-relaxed">
                I'm a CS student from India 🇮🇳 who enjoys building apps & exploring
                AI/ML projects. I love playing with frameworks 🖥️ and in my free time, I
                enjoy watching anime 🎥 or solving Rubik's Cubes.
            </p>
            <div>
                <p className="text-sm text-white mb-2">FIND ME AT</p>
                <div className="flex space-x-4 text-xl mb-4">
                    <a href="https://github.com/shreyuu" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/shreyuu/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=shreyashmeshram0031@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaEnvelope />
                    </a>
                </div>
                <a
                    href="/Shreyash-Meshram-Resume.pdf"
                    download
                    className="inline-flex items-center gap-2 text-white font-medium text-sm bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
                >
                    <FaDownload /> Download Resume
                </a>
            </div>
        </div>
    );
};

export default About;
