import React from "react";

const projects = [
    {
        title: "Hand Gesture Recognition",
        description: "Recognize hand signs via webcam.",
        technologies: ["Next.js", "TailwindCSS", "Supabase"],
        github: "https://github.com/shreyuu/hand-gesture-recognition",
    },
    {
        title: "RubikLog",
        description: "Web app to keep record of cube solves.",
        technologies: ["Django", "Python", "Vercel"],
        github: "https://github.com/shreyuu/RubikLog"
        ,
    },
];

const Projects = () => {
    return (
        <section id="projects" className="p-10 bg-gray-800 text-white">
            <h2 className="text-3xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="mt-2">{project.description}</p>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="mt-4 block text-blue-400">
                            GitHub Repo →
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;