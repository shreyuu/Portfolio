import React from "react";

const projects = [
    {
        title: "Rubiklog",
        description: "Rubik's Cube Timer",
        technologies: ["Python 3.10+", "Node.js 18+", "PostgreSQL 14+"],
        link: "https://github.com/shreyuu/RubikLog",
    },
    {
        title: "Hand Gesture Recognition",
        description: "Identify hand signs using webcam",
        technologies: ["Python", "TensorFlow", "MediaPipe", "OpenCV", "Jupyter Notebook"],
        link: "https://github.com/shreyuu/Hand-Gesture-Recognition",
    },
    {
        title: "DjangoChatify",
        description: "Real-Time Chat Application",
        technologies: ["React.js", "Tailwind CSS", "Django", "WebSockets", "MongoDB"],
        link: "https://github.com/shreyuu/DjangoChatify",
    },
];

const ProjectsSection = () => {
    return (
        <section className="text-gray-300 my-12">
            <h2 className="text-xl font-bold text-purple-400 mb-4">💻 PROJECTS</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-[#0f0f0f] border border-gray-700 p-5 rounded-xl hover:scale-[1.02] transition duration-200 relative overflow-hidden"
                    >
                        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="bg-[#1c1c1c] text-sm px-3 py-1 rounded-full text-gray-400 border border-gray-600"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <p className="text-sm text-gray-400 mb-4">{project.description}</p>

                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white font-medium text-sm bg-gray-800 px-3 py-1.5 rounded hover:bg-gray-700 transition"
                        >
                            View more →
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;