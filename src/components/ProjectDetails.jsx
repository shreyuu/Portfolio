// filepath: src/components/ProjectDetails.jsx
import React from 'react';
import { motion } from 'framer-motion';
import useAnimations from '../hooks/useAnimations';

const ProjectDetails = ({ project, onClose }) => {
    const { fadeInUp, staggerContainer } = useAnimations();

    return (
        <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-[#0f0f0f] border border-gray-700 rounded-xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                onClick={(e) => e.stopPropagation()}
            >
                <motion.button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </motion.button>

                <motion.h2
                    className="text-3xl font-bold text-white mb-4"
                    variants={fadeInUp}
                >
                    {project.title}
                </motion.h2>

                <motion.div variants={fadeInUp} className="mb-6">
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
                </motion.div>

                <motion.div variants={fadeInUp} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
                    <p className="text-gray-300 leading-relaxed">
                        {project.description}
                        {/* Add more detailed description here */}
                    </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Features</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                        {/* Add project features */}
                    </ul>
                </motion.div>

                <motion.div variants={fadeInUp} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Challenges & Solutions</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Explain the challenges faced and how you solved them...
                    </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-8 flex space-x-4">
                    <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        View Code
                    </motion.a>

                    <motion.a
                        href={project.demoLink} // Add demo links to your projects
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                        </svg>
                        Live Demo
                    </motion.a>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectDetails;