import React from 'react';
import { motion } from 'framer-motion';
import useAnimations from '../hooks/useAnimations';

const Skills = () => {
  const { ref, isInView, fadeInUp, staggerContainer } = useAnimations();

  const skillCategories = [
    {
      title: 'Languages & Tools',
      skills: [
        { name: 'Python', url: 'https://www.python.org' },
        { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
        { name: 'Java', url: 'https://www.oracle.com/java/' },
        { name: 'C', url: 'https://en.wikipedia.org/wiki/C_(programming_language)' },
        { name: 'C++', url: 'https://cplusplus.com/' },
        { name: 'Git', url: 'https://git-scm.com/' },
        { name: 'Docker', url: 'https://www.docker.com/' }
      ]
    },
    {
      title: 'Backend & Frameworks',
      skills: [
        { name: 'FastAPI', url: 'https://fastapi.tiangolo.com/' },
        { name: 'Django', url: 'https://www.djangoproject.com/' },
        { name: 'Flask', url: 'https://flask.palletsprojects.com/' },
        { name: 'React', url: 'https://react.dev/' },
        { name: 'TailwindCSS', url: 'https://tailwindcss.com/' },
        { name: 'REST APIs', url: 'https://restfulapi.net/' }
      ]
    },
    {
      title: 'Data Science & ML',
      skills: [
        { name: 'TensorFlow', url: 'https://www.tensorflow.org/' },
        { name: 'Scikit-learn', url: 'https://scikit-learn.org/' },
        { name: 'Pandas', url: 'https://pandas.pydata.org/' },
        { name: 'MediaPipe', url: 'https://mediapipe.dev/' },
        { name: 'NumPy', url: 'https://numpy.org/' }
      ]
    },
    {
      title: 'Cloud & Databases',
      skills: [
        { name: 'AWS', url: 'https://aws.amazon.com/' },
        { name: 'Google Cloud', url: 'https://cloud.google.com/' },
        { name: 'Microsoft Azure', url: 'https://azure.microsoft.com/' },
        { name: 'Firebase', url: 'https://firebase.google.com/' },
        { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
        { name: 'MongoDB', url: 'https://www.mongodb.com/' },
        { name: 'MySQL', url: 'https://www.mysql.com/' }
      ]
    }
  ];

  const handleSkillClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
                {category.skills.map((skill, techIndex) => (
                  <motion.span
                    key={skill.name}
                    className="px-2 py-1 text-xs bg-[#2c2c2c] rounded-md hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.05 * techIndex, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleSkillClick(skill.url)}
                  >
                    {skill.name}
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
