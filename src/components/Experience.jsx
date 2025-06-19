import React from 'react';
import { motion } from 'framer-motion';
import useAnimations from '../hooks/useAnimations';

const Experience = () => {
  const { ref, isInView, fadeInUp, staggerContainer } = useAnimations();

  const experiences = [
    {
      role: 'Python Developer Intern',
      company: 'Arohi Softwares',
      period: 'Nov 2024 – Feb 2025 · 6mo',
      description: 'Add details about your responsibilities and achievements...',
      skills: ['Python', 'Flask', 'SQL', 'API Development'],
    },
    {
      role: 'Software Developer Intern',
      company: 'NerdTech',
      period: 'Mar 2024 – Apr 2024 · 1mo',
      description: 'Add details about your responsibilities and achievements...',
      skills: ['JavaScript', 'React', 'Node.js'],
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="w-full text-gray-300 mb-10"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2
        className="text-xl font-bold text-purple-400 mb-6"
        variants={fadeInUp}
      >
        EXPERIENCE
      </motion.h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-700"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative pl-12 pb-8"
            variants={fadeInUp}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full border-4 border-purple-500 bg-[#0f0f0f]"></div>

            <div className="bg-[#0f0f0f] p-4 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-white text-lg">{exp.role}</h3>
              <p className="text-purple-400">{exp.company}</p>
              <p className="text-xs text-gray-500 mb-3">{exp.period}</p>

              <p className="text-gray-400 mb-3">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-[#1c1c1c] text-xs px-2 py-1 rounded-full text-gray-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
