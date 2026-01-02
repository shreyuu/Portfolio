import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonProject } from './Skeleton';
import ProjectDetails from './ProjectDetails';
import useAnimations from '../hooks/useAnimations';

const ProjectsSection = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, isInView, fadeInUp, staggerContainer } = useAnimations();

  // Memoize projects data
  const projects = useMemo(() => [
    {
      title: 'ZenSpend',
      description: 'Privacy-first, AI-powered expense tracker (FastAPI, LangChain, React, PostgreSQL) running locally via Ollama.',
      technologies: ['FastAPI', 'PostgreSQL', 'LangChain', 'pgvector', 'Ollama', 'React', 'Tailwind CSS'],
      link: 'https://github.com/shreyuu/ZenSpend',
      category: 'web',
    },
    {
      title: 'FENgine',
      description: 'Chess OCR pipeline to convert a board image into FEN and PGN using CV and a CNN classifier.',
      technologies: ['FastAPI', 'OpenCV', 'CNN', 'TensorFlow/PyTorch', 'Uvicorn', 'React', 'Tailwind CSS'],
      link: 'https://github.com/shreyuu/FENgine',
      category: 'ml',
    },
    {
      title: 'Stock Market Analysis Platform',
      description: 'Full‑stack platform with technical indicators, SVM price prediction, and FinBERT sentiment.',
      technologies: ['FastAPI', 'React', 'TypeScript', 'Pandas', 'NumPy', 'scikit-learn', 'FinBERT', 'Vite'],
      link: 'https://github.com/shreyuu/FinCastAI',
      category: 'ml',
    },
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
  ], []);

  // Memoize filtered and searched projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesFilter = filter === 'all' || project.category === filter;
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesFilter && matchesSearch;
    });
  }, [projects, filter, searchTerm]);

  // Memoize callbacks
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const closeProjectDetails = useCallback(() => {
    setSelectedProject(null);
  }, []);

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
        closeProjectDetails();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, closeProjectDetails]);

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

      {/* Search Bar */}
      <motion.div
        className="mb-6"
        variants={fadeInUp}
      >
        <input
          type="text"
          placeholder="Search projects by name, description, or technology..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          aria-label="Search projects"
        />
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <motion.button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${filter === 'all'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-pressed={filter === 'all'}
        >
          All
        </motion.button>
        <motion.button
          onClick={() => handleFilterChange('web')}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${filter === 'web'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-pressed={filter === 'web'}
        >
          Web Dev
        </motion.button>
        <motion.button
          onClick={() => handleFilterChange('ml')}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${filter === 'ml'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-pressed={filter === 'ml'}
        >
          Machine Learning
        </motion.button>
      </div>

      {/* Results counter */}
      <motion.p
        className="text-sm text-gray-500 mb-4"
        variants={fadeInUp}
      >
        Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
      </motion.p>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {loading ? (
          // Show skeleton loading state
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonProject key={index} className="bg-[#0f0f0f]" />
          ))
        ) : filteredProjects.length > 0 ? (
          // Show actual projects
          filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              className="bg-[#0f0f0f] border border-gray-700 p-5 rounded-xl hover:scale-[1.02] transition duration-200 relative overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                transition: { duration: 0.3 }
              }}
              onClick={() => handleProjectClick(project)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleProjectClick(project);
                }
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
                className="inline-flex items-center gap-2 text-white font-medium text-sm bg-gray-800 px-3 py-1.5 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                View code →
              </motion.a>
            </motion.div>
          ))
        ) : (
          // No results state
          <motion.div
            className="col-span-full text-center py-12 text-gray-400"
            variants={fadeInUp}
          >
            <p>No projects found matching your search.</p>
          </motion.div>
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