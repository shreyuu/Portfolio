// src/components/Projects.js
import React from "react";

const projects = [
    {
        name: "Expense Tracker",
        description: "Track your expenses with charts and categories.",
        tech: ["React", "MongoDB", "Tailwind"],
        img: "/expense.png",
        github: "https://github.com/shreyuu/expense-analytics-react",
        live: "#",
    },
    // Add more...
];

const Projects = () => {
    return (
        <section id="projects" className="py-20">
            <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
                        <img
                            src={project.img}
                            alt={project.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <p className="text-gray-400 mt-2">{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tech.map((t, i) => (
                                <span
                                    key={i}
                                    className="text-sm text-cyan-400 border border-cyan-400 px-2 py-1 rounded"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="mt-4 flex space-x-4">
                            <a
                                href={project.github}
                                className="text-sm text-cyan-400 hover:underline"
                            >
                                GitHub
                            </a>
                            <a
                                href={project.live}
                                className="text-sm text-cyan-400 hover:underline"
                            >
                                Live Demo
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;