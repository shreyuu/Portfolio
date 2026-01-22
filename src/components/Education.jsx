import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAnimations from '../hooks/useAnimations';

const Education = () => {
  const { ref, isInView, fadeInUp, staggerContainer, hoverScale } = useAnimations();
  const [expandedSkills, setExpandedSkills] = useState({});

  const toggleSkills = (index) => {
    setExpandedSkills(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Core skills that are most relevant to your career path
  const coreSkills = [
    'Data Structures & Algorithms',
    'Web Technology',
    'Machine Learning & Deep Learning',
    'Database Management Systems',
    'Software Engineering',
    'Object-Oriented Programming',
    'Python',
    'Java & Adv. Java',
    'Business Analytics',
    'Big Data',
    'Supply Chain Management',
    'Digital Marketing'
  ];

  const educations = [
    {
      institution: 'University of Nottingham',
      degree: 'Master of Science | Business Analytics',
      period: 'Sep 2025 – Sep 2026',
      location: 'Jubilee Campus, Nottingham, UK',
      achievements: [
        'Full-time MSc programme (RQF Level 7)',
        'IELTS Overall Score: 6.5 (B2 CEFR equivalent)',
        'CAS Number: E4G8II9N54O0E7'
      ],
      skills: [
        'Analytics Specializations',
        'Foundational Business Analytics',
        'Leading Big Data Business Projects',
        'Data at Scale: Management & Processing',
        'Data Driven Dissertation Project',
        'Supply Chain Planning & Management',
        'Digital Marketing',
        'Machine Learning and Predictive Analytics'
      ],
    },
    {
      institution: 'Sandip Institute of Technology & Research Centre',
      degree: 'Bachelor of Engineering | Computer Engineering',
      period: '2022 – 2025',
      location: 'Nashik, Maharashtra, India',
      achievements: [

      ],
      skills: [
        'Data Structures & Algorithms',
        'Machine Learning & Deep Learning',
        'Database Management Systems',
        'Cloud Computing',
        'Artificial Intelligence',
        'Web Technology',
        'Software Engineering',
        'Data Science & Big Data',
        'Computer Networks',
        'Blockchain Technology',
        'Software Testing',
        'IoT & Embedded Systems'
      ],
    },
    {
      institution: "Sandip Foundation's Sandip Polytechnic",
      degree: 'Diploma | Computer Engineering',
      period: '2019 – 2022',
      location: 'Nashik, Maharashtra, India',
      achievements: [

      ],
      skills: [
        'Object-Oriented Programming',
        'Database Management',
        'Java & Adv. Java',
        'Python',
        'PHP',
        'Mobile App Development',
        'Computer Networks',
        'Software Testing',
        'Operating Systems'
      ],
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="w-full text-gray-300 mb-10"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-labelledby="education-heading"
    >
      <motion.h2
        id="education-heading"
        className="text-xl font-bold text-purple-400 mb-6"
        variants={fadeInUp}
      >
        🎓 EDUCATION
      </motion.h2>

      <div className="relative" role="list">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-700" aria-hidden="true"></div>

        {educations.map((edu, index) => (
          <motion.div
            key={index}
            className="relative pl-12 pb-8"
            variants={fadeInUp}
            custom={index}
            role="listitem"
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-0 top-1.5 w-7 h-7 rounded-full border-4 border-purple-500 bg-[#0f0f0f]"
              aria-hidden="true"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            ></motion.div>

            <motion.div
              className="bg-[#0f0f0f] p-4 rounded-lg border border-gray-700 hover:border-purple-500/40 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-wrap justify-between items-center">
                <h3 className="font-semibold text-white text-lg">{edu.institution}</h3>
              </div>
              <p className="text-purple-400">{edu.degree}</p>
              <p className="text-xs text-gray-500 mb-2">{edu.period}</p>
              {edu.location && (
                <p className="text-xs text-gray-400 mb-2">📍 {edu.location}</p>
              )}

              {edu.achievements && edu.achievements.length > 0 && (
                <div className="mb-3 mt-2">
                  <p className="text-sm font-medium text-gray-300 mb-1">Achievements:</p>
                  <ul className="list-disc list-inside text-xs text-gray-400 pl-2 space-y-0.5">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-300">
                    {index === 0 ? 'Core Modules:' : 'Skills & Coursework:'}
                  </p>
                  {edu.skills.length > 6 && (
                    <button
                      onClick={() => toggleSkills(index)}
                      className="text-xs text-purple-400 hover:text-purple-300 underline"
                      aria-expanded={expandedSkills[index] ? 'true' : 'false'}
                    >
                      {expandedSkills[index] ? 'Show less' : 'Show all'}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2" aria-label="Skills learned">
                  {edu.skills
                    .slice(0, expandedSkills[index] ? edu.skills.length : 6)
                    .map((skill, skillIndex) => {
                      const isCore = coreSkills.includes(skill);
                      return (
                        <motion.span
                          key={skillIndex}
                          className={`text-xs px-2 py-1 rounded-full cursor-default transition-colors duration-200 ${isCore
                            ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/40'
                            : 'bg-[#1c1c1c] text-gray-400 hover:bg-gray-800 hover:text-purple-300'
                            }`}
                          whileHover={hoverScale}
                          title={isCore ? 'Core skill for my career path' : ''}
                        >
                          {skill}{isCore && ' ★'}
                        </motion.span>
                      );
                    })}
                  {!expandedSkills[index] && edu.skills.length > 6 && (
                    <motion.span
                      className="bg-[#1c1c1c] text-xs px-2 py-1 rounded-full text-purple-400"
                      whileHover={hoverScale}
                    >
                      +{edu.skills.length - 6} more
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Education;
