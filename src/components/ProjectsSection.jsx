import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SkeletonProject } from './Skeleton';
import useAnimations from '../hooks/useAnimations';

const projects = [
  {
    title: 'Rubiklog',
    description: "Rubik's Cube Timer",
    technologies: ['Python 3.10+', 'Node.js 18+', 'PostgreSQL 14+'],
    link: 'https://github.com/shreyuu/RubikLog',
  },
  {
    title: 'Hand Gesture Recognition',
    description: 'Identify hand signs using webcam',
    technologies: ['Python', 'TensorFlow', 'MediaPipe', 'OpenCV', 'Jupyter Notebook'],
    link: 'https://github.com/shreyuu/Hand-Gesture-Recognition',
  },
  {
    title: 'DjangoChatify',
    description: 'Real-Time Chat Application',
    technologies: ['React.js', 'Tailwind CSS', 'Django', 'WebSockets', 'MongoDB'],
    link: 'https://github.com/shreyuu/DjangoChatify',
  },
];

const ProjectsSection = () => {
  const [loading, setLoading] = useState(true);
  const { ref, isInView, fadeInUp, staggerContainer } = useAnimations();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
      
      <div className="grid md:grid-cols-3 gap-6">
        {loading ? (
          // Show skeleton loading state
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonProject key={index} className="bg-[#0f0f0f]" />
          ))
        ) : (
          // Show actual projects
          projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-[#0f0f0f] border border-gray-700 p-5 rounded-xl hover:scale-[1.02] transition duration-200 relative overflow-hidden"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                transition: { duration: 0.3 }
              }}
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

              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-medium text-sm bg-gray-800 px-3 py-1.5 rounded hover:bg-gray-700 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View more →
              </motion.a>
            </motion.div>
          ))
        )}
      </div>
    </motion.section>
  );
};

export default ProjectsSection;