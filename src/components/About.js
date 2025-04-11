import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const About = () => {
    return (
        <div className="text-gray-300 mt-6">
            <h2 className="text-2xl font-bold mb-4">About me</h2>
            <p className="mb-4 leading-relaxed">
                I'm a CS student from India 🇮🇳 who enjoys building apps & exploring AI/ML projects. I love playing with frameworks 🖥️ and in my free time, I enjoy watching anime 🎥 or solving Rubik's Cubes.
            </p>
            <div>
                <p className="text-sm text-white mb-2">FIND ME AT</p>
                <a href="mailto:your.email@example.com" className="text-green-400 hover:underline block mb-4">
                </a>
                <div className="flex space-x-4 text-xl">
                    <a href="https://github.com/shreyuu" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/shreyuu/" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:shreyashmeshram0031@gmail.com">
                        <FaEnvelope />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;