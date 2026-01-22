import React from 'react';
import { motion } from 'framer-motion';
import useAnimations from '../hooks/useAnimations';

const Experience = () => {
  const { ref, isInView, fadeInUp, staggerContainer } = useAnimations();

  const experiences = [
    {
      role: 'Python Developer Intern',
      company: 'Arohi Softwares',
      period: 'Aug 2024 – Feb 2025 · 7mo',
      description: 'Constructed responsive UIs with Python/Django and integrated REST APIs while managing databases. Executed full-stack development with cross-functional teams using Agile practices.',
      skills: ['Python', 'Django', 'REST API', 'Database Management', 'UI/UX', 'Agile'],
    },
    {
      role: 'Software Developer Intern',
      company: 'NerdTech',
      period: 'Mar 2024 – Apr 2024 · 2mo',
      description: 'Developed client software solutions with focus on user-centric design and backend systems. Reduced runtime errors by 30% through debugging and testing.',
      skills: ['Software Development', 'Debugging', 'Testing', 'Agile'],
    },
    {
      role: 'Machine Learning with AI Using Python Trainee',
      company: 'Knowledge Solutions India',
      period: 'Dec 2021 – Feb 2022 · 3mo',
      description: 'Collaborated on "Heart Disease Predictor" project and deployed ML pipeline using scikit-learn and Pandas, reducing inventory costs by 15%.',
      skills: ['Python', 'Machine Learning', 'scikit-learn', 'Pandas', 'Model Deployment'],
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
        🏢 EXPERIENCE
      </motion.h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-700"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative pl-12 pb-8"
            variants={fadeInUp}
            custom={index}
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-0 top-1.5 w-7 h-7 rounded-full border-4 border-purple-500 bg-[#0f0f0f]"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            ></motion.div>

            <motion.div
              className="bg-[#0f0f0f] p-4 rounded-lg border border-gray-700 hover:border-purple-500/40 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
