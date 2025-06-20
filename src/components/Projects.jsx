import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonProject } from './Skeleton';
import ProjectDetails from './ProjectDetails';
import useAnimations from '../hooks/useAnimations';

const ProjectsSection = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, isInView, fadeInUp, staggerContainer } = useAnimations();

  const projects = [
    {
      title: 'Rubiklog',
      description: "Rubik's Cube Timer with Computer Vision",
      technologies: ['Django', 'React.js', 'PostgreSQL', 'TailwindCSS', 'OpenCV', 'TensorFlow'],
      link: 'https://github.com/shreyuu/RubikLog',
      category: 'web',
    },
    {
      title: 'AmazeBot 🤖',
      description: "AI-powered chatbot with Hugging Face's Blenderbot model",
      technologies: ['Django', 'React.js', 'Tailwind CSS', 'Hugging Face API', 'REST API'],
      link: 'https://github.com/shreyuu/AmazeBot',
      category: 'web',
    },
    {
      title: 'DjangoChatify',
      description: 'Real-Time WebSocket Chat Application',
      technologies: ['Django Channels', 'React.js', 'WebSockets', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
      link: 'https://github.com/shreyuu/DjangoChatify',
      category: 'web',
    },
    {
      title: 'Hand Gesture Recognition',
      description: 'Real-time hand sign detection with audio feedback',
      technologies: ['Python', 'TensorFlow', 'MediaPipe', 'OpenCV', 'gTTS'],
      link: 'https://github.com/shreyuu/Hand-Gesture-Recognition',
      category: 'ml',
    },
    {
      title: 'Posture Recognition',
      description: 'CNN-Based Sitting and Standing Detection',
      technologies: ['Python', 'TensorFlow', 'CNN', 'scikit-learn', 'matplotlib'],
      link: 'https://github.com/shreyuu/ml-models/tree/main/Posture%20Recognition%3A%20CNN-Based%20Sitting%20and%20Standing%20Detection',
      category: 'ml',
    },
    {
      title: 'Expense Analytics React',
      description: 'Simple and user-friendly Expense Tracker',
      technologies: ['React.js', 'Tailwind CSS', 'MongoDB', 'Express.js'],
      link: 'https://github.com/shreyuu/expense-analytics-react',
      category: 'web',
    },
    {
      title: 'TempTracker',
      description: 'Current Temperature Web App',
      technologies: ['Django', 'React.js', 'TailwindCSS', 'OpenWeatherMap API'],
      link: 'https://github.com/shreyuu/TempTracker',
      category: 'web',
    },
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Close project details when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="text-gray-300 my-12"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2
        className="text-xl font-bold text-purple-400 mb-4"
        variants={fadeInUp}
      >
        💻 PROJECTS
      </motion.h2>

      <div className="flex flex-wrap gap-2 mb-6">
        <motion.button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm ${filter === 'all'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        <motion.button
          onClick={() => setFilter('web')}
          className={`px-3 py-1 rounded-full text-sm ${filter === 'web'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Web Dev
        </motion.button>
        <motion.button
          onClick={() => setFilter('ml')}
          className={`px-3 py-1 rounded-full text-sm ${filter === 'ml'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Machine Learning
        </motion.button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {loading ? (
          // Show skeleton loading state
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonProject key={index} className="bg-[#0f0f0f]" />
          ))
        ) : (
          // Show actual projects
          projects
            .filter(project => filter === 'all' || project.category === filter)
            .map((project, index) => (
              <motion.div
                key={index}
                className="bg-[#0f0f0f] border border-gray-700 p-5 rounded-xl hover:scale-[1.02] transition duration-200 relative overflow-hidden cursor-pointer"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                  transition: { duration: 0.3 }
                }}
                onClick={() => handleProjectClick(project)}
              >
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="bg-[#1c1c1c] text-sm px-3 py-1 rounded-full text-gray-400 border border-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <p className="text-sm text-gray-400 mb-4">{project.description}</p>

                <motion.button
                  className="inline-flex items-center gap-2 text-white font-medium text-sm bg-gray-800 px-3 py-1.5 rounded hover:bg-gray-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening the modal
                    window.open(project.link, '_blank', 'noopener,noreferrer');
                  }}
                >
                  View code →
                </motion.button>
              </motion.div>
            ))
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            onClose={closeProjectDetails}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProjectsSection;
