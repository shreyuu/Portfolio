import React from 'react';
import { motion } from 'framer-motion';
import useAnimations from '../hooks/useAnimations';

const Education = () => {
  const { ref, isInView, fadeInUp, staggerContainer } = useAnimations();

  const educations = [
    {
      institution: 'Sandip Institute of Technology & Research Centre',
      degree: 'Bachelor of Engineering | Computer Engineering',
      period: '2022 – 2025',
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
        🎓 EDUCATION
      </motion.h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-700"></div>

        {educations.map((edu, index) => (
          <motion.div
            key={index}
            className="relative pl-12 pb-8"
            variants={fadeInUp}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full border-4 border-purple-500 bg-[#0f0f0f]"></div>

            <div className="bg-[#0f0f0f] p-4 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-white text-lg">{edu.institution}</h3>
              <p className="text-purple-400">{edu.degree}</p>
              <p className="text-xs text-gray-500 mb-3">{edu.period}</p>

              <div className="flex flex-wrap gap-2">
                {edu.skills.map((skill, skillIndex) => (
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

export default Education;
