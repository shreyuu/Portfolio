import React from 'react';
import { motion } from 'framer-motion';
import useAnimations from '../hooks/useAnimations';

const Skills = () => {
  const { ref, isInView, fadeInUp, staggerContainer } = useAnimations();

  const skillCategories = [
    {
      title: 'Languages & Tools',
      skills: [
        'Python', 'Java', 'JavaScript', 'C', 'C++', 'Git', 'Docker',
        'Virtual Machines', 'Adobe Photoshop', 'Premiere Pro', 'After Effects', 'Figma'
      ]
    },
    {
      title: 'Frameworks & Libraries',
      skills: [
        'Flask', 'Django', 'React', 'TailwindCSS', 'REST APIs',
        'Unit Testing', 'CI/CD pipelines'
      ]
    },
    {
      title: 'Cloud & DevOps',
      skills: [
        'AWS', 'Google Cloud', 'Microsoft Azure', 'PostgreSQL', 'MongoDB', 'MySQL'
      ]
    }
  ];

  return (
    <motion.div
      ref={ref}
      className="text-gray-300"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2
        className="text-xl font-bold text-purple-400 mb-4"
        variants={fadeInUp}
      >
        SKILLS
      </motion.h2>

      <div className="space-y-4">
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            className="p-4 bg-[#161616] rounded-lg border border-[#2c2c2c]"
            variants={fadeInUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h3 className="text-lg font-bold">{category.title}</h3>
            <div className="mt-3">
              <div className="flex flex-wrap gap-2 mt-2">
                {category.skills.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    className="px-2 py-1 text-xs bg-[#2c2c2c] rounded-md hover:bg-[#3c3c3c] transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.1 * techIndex, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
