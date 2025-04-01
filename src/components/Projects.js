import React from "react";
import { motion } from "framer-motion";

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
        github: "https://github.com/shreyuu/RubikLog",
    },
];

const Projects = () => {
    return (
        <section
            id="projects"
            className="py-20 px-4 bg-background-light dark:bg-background-dark"
        >
            <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                    Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary dark:text-primary-light hover:text-primary-dark transition-colors"
                    whileHover={{ x: 5 }}
                >
                    View on GitHub
                    <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </motion.a>
            </div>
        </motion.div>
    );
};

export default Projects;