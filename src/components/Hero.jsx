import React from "react";
import { motion } from "framer-motion";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning!";
  if (hour >= 12 && hour < 18) return "Good Afternoon!";
  return "Good Evening!";
};

const Hero = () => {
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.08
      }
    }
  };

  const letterAnimation = {
    hidden: {
      y: 50,
      opacity: 0,
      rotateX: -45
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  const name = "Shreyash Meshram".split("");

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-12 px-4 sm:px-6 lg:px-8">
      <div className="col-span-12 flex items-center justify-start p-6 sm:p-8 lg:p-10">
        <div className="relative">
          <motion.div
            className="flex flex-wrap"
            variants={containerAnimation}
            initial="hidden"
            animate="visible"
          >
            {name.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterAnimation}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold 
                          bg-gradient-to-r from-white to-gray-400 bg-clip-text 
                          text-transparent transform-gpu"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 1.2,
              duration: 0.8,
              ease: "easeOut"
            }}
            className="absolute -top-16 right-0 lg:right-[-50px] 
                       bg-purple-500 px-4 py-3 rounded-full 
                       shadow-lg transform-gpu"
          >
            <span className="text-lg font-bold text-white">{getGreeting()}</span>
            <svg
              viewBox="0 0 22 18"
              fill="none"
              className="absolute -bottom-[9px] left-[7px] w-5 text-purple-500"
            >
              <path
                d="M20.9991 8C17.4991 12.5 13.4991 16 7.69476 17.4776C8.49908 10.5 6.99908 8 0.939453 3.39334L1.79694 0L21.1874 4.8999L20.9991 8Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
