import React from 'react';
import { motion } from 'framer-motion';
import useAnimations from '../hooks/useAnimations';

const ProjectDetails = ({ project, onClose }) => {
    const { fadeInUp, staggerContainer } = useAnimations();

    // Extended project details based on the title
    const getExtendedDetails = () => {
        switch (project.title) {
            case 'AmazeBot 🤖':
                return {
                    fullDescription: "AmazeBot is an AI-powered chatbot built with Django (Backend), React.js (Frontend), and Tailwind CSS. It leverages Hugging Face's Blenderbot model to provide intelligent and engaging conversations.",
                    features: [
                        "AI-powered chatbot with Hugging Face Blenderbot",
                        "Django REST Framework API backend",
                        "React.js + Tailwind CSS frontend for a sleek UI",
                        "Real-time conversation experience",
                        "CORS enabled for seamless frontend-backend communication",
                        "Rate limiting with 10 requests/second",
                        "Response caching for improved performance",
                        "Error handling and retry logic"
                    ],
                    challenges: "The main challenge was integrating the Hugging Face API efficiently and ensuring low response times while maintaining conversation context. This was solved by implementing response caching and optimizing API calls."
                };
            case 'Expense Analytics React':
                return {
                    fullDescription: "A simple and user-friendly Expense Tracker built with React.js, Tailwind CSS, and MongoDB that helps you manage and analyze your expenses efficiently.",
                    features: [
                        "Add, edit, and delete expenses",
                        "View a list of all expenses",
                        "See real-time total expense analytics",
                        "Store expenses persistently in MongoDB",
                        "Simple and intuitive user interface"
                    ],
                    challenges: "The key challenge was implementing real-time analytics that update instantly as expenses are added or modified. This was addressed using React's state management and efficient re-rendering strategies."
                };
            case 'Posture Recognition':
                return {
                    fullDescription: "This Python script demonstrates how to build and train a Convolutional Neural Network (CNN) for classifying images into two categories: 'sitting' and 'standing' from a dataset of images.",
                    features: [
                        "Data Loading & Preprocessing of images",
                        "CNN model built using TensorFlow's Keras API",
                        "Data Augmentation to prevent overfitting",
                        "Model Training with validation split",
                        "Model Evaluation with accuracy metrics",
                        "Visual plotting of training results"
                    ],
                    challenges: "The main challenge was getting enough quality training data and preventing overfitting. This was addressed by implementing data augmentation techniques like rotation, width and height shifting, and horizontal flipping."
                };
            case 'TempTracker':
                return {
                    fullDescription: "TempTracker is a simple Django-based web app that displays the current temperature for a specific city using the OpenWeatherMap API. It provides real-time temperature data with a clean, responsive interface.",
                    features: [
                        "Displays current temperature for specific cities",
                        "Shows the name of the city where temperature was fetched",
                        "Beautiful and responsive UI built with TailwindCSS",
                        "Real-time data from OpenWeatherMap API"
                    ],
                    challenges: "The main challenge was handling API rate limits and ensuring the application remains responsive even when the API is slow. This was solved by implementing caching and fallback mechanisms."
                };
            case 'Rubiklog':
                return {
                    fullDescription: "RubikLog is a comprehensive Django-based web application for tracking Rubik's Cube solving times. It features computer vision capabilities for scanning cube states, a ReactJS frontend styled with TailwindCSS, and uses PostgreSQL as its database.",
                    features: [
                        "Space bar-controlled timer with hold-to-ready functionality",
                        "Built-in scramble generator and manual entry",
                        "Computer vision cube state detection using webcam",
                        "Statistics tracking: best times, count, Ao5, Ao12, solve history",
                        "Dark/light theme toggle",
                        "ReactJS frontend with TailwindCSS styling",
                        "Django REST framework backend with PostgreSQL",
                        "TensorFlow-based solve time prediction",
                        "GitHub Actions workflow for automated testing"
                    ],
                    challenges: "The biggest challenge was implementing accurate computer vision for cube state detection in various lighting conditions. This was solved by using advanced image processing techniques and machine learning to recognize cube colors reliably."
                };
            case 'Hand Gesture Recognition':
                return {
                    fullDescription: "This project uses MediaPipe and TensorFlow to recognize hand gestures from a webcam feed in real-time. It also utilizes the gTTS library to provide audio feedback of recognized gestures, making it useful for accessibility applications.",
                    features: [
                        "Real-time hand gesture recognition using webcam",
                        "MediaPipe for hand landmark detection",
                        "TensorFlow for gesture classification",
                        "Audio feedback using Google Text-to-Speech (gTTS)",
                        "Support for multiple hand signs and gestures",
                        "Easy to run with minimal setup",
                        "Optimized for real-time performance"
                    ],
                    challenges: "The main challenges were achieving real-time performance while maintaining accuracy, and handling variations in lighting and hand positions. These were addressed by optimizing the model and implementing preprocessing techniques to normalize the input data."
                };
            case 'DjangoChatify':
                return {
                    fullDescription: "DjangoChatify is a full-featured real-time chat application built with Django Channels for WebSocket communication on the backend and React.js on the frontend. It uses PostgreSQL for data persistence and Redis for WebSocket channel management.",
                    features: [
                        "Real-time messaging powered by WebSockets via Django Channels",
                        "Scalable Django backend with Gunicorn for production",
                        "Responsive design using Tailwind CSS",
                        "PostgreSQL database for primary data storage",
                        "Cross-platform support for macOS and Windows",
                        "Dockerized setup for easy development and deployment",
                        "Security-focused with non-root user container setup",
                        "Comprehensive tests including WebSocket testing",
                        "CI/CD with GitHub Actions and code quality checks"
                    ],
                    challenges: "The primary challenge was implementing reliable WebSocket connections that could scale. This was solved by using Django Channels with Redis as the backend, and implementing proper error handling and reconnection logic in the frontend."
                };
            default:
                return {
                    fullDescription: project.description,
                    features: ["Feature details not available for this project"],
                    challenges: "Details about challenges faced in this project are not available."
                };
        }
    };

    const extendedDetails = getExtendedDetails();

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
                        {extendedDetails.fullDescription}
                    </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Features</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {extendedDetails.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div variants={fadeInUp} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Challenges & Solutions</h3>
                    <p className="text-gray-300 leading-relaxed">
                        {extendedDetails.challenges}
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

                    {project.demoLink && (
                        <motion.a
                            href={project.demoLink}
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
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectDetails;