import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa';
import useAnimations from '../hooks/useAnimations';

const About = () => {
  const { ref, isInView, fadeInUp, staggerContainer } = useAnimations();

  return (
    <motion.div
      ref={ref}
      className="text-gray-300 mt-6"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.h2
        className="text-xl font-bold text-purple-400 mb-4"
        variants={fadeInUp}
      >
        ABOUT ME
      </motion.h2>
      <motion.p
        className="mb-4 leading-relaxed"
        variants={fadeInUp}
      >
        I&apos;m a <span className="text-purple-300 font-semibold">full-stack developer</span> and MSc Business Analytics student at the University of Nottingham.
        I obsess over building <span className="text-purple-300 font-semibold">scalable systems</span> and
        experimenting with <span className="text-purple-300 font-semibold">AI/ML solutions</span> that solve
        real problems.
      </motion.p>
      <motion.p
        className="mb-4 leading-relaxed"
        variants={fadeInUp}
      >
        Whether architecting <span className="text-purple-300 font-semibold">backend services</span>, crafting <span className="text-purple-300 font-semibold">frontends</span>, or <span className="text-purple-300 font-semibold">wrangling data</span>—I&apos;m drawn to challenges
        requiring both technical depth and creative thinking. I thrive in collaborative environments and love
        building things with real-world impact.
      </motion.p>
      <motion.div variants={fadeInUp} className="flex flex-col items-end">
        <p className="text-sm text-white mb-2">FIND ME AT</p>
        <motion.div
          className="flex space-x-4 text-xl mb-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {[
            { href: 'https://github.com/shreyuu', icon: FaGithub, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/shreyuu/', icon: FaLinkedin, label: 'LinkedIn' },
            { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=shreyashmeshram0031@gmail.com', icon: FaEnvelope, label: 'Email' }
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              variants={fadeInUp}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>
        <motion.a
          href="/Shreyash-Meshram-Resume.pdf"
          download
          className="inline-flex items-center gap-2 text-white font-medium text-sm bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload /> Download Resume
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default About;
