import { motion } from "framer-motion";

const Hero = () => {
    return (
        <motion.section
            className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center"
            >
                <motion.h1
                    className="text-6xl font-bold mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    Hi, I'm Shreyash 👋
                </motion.h1>
                <motion.p
                    className="text-xl mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    I love building cool projects using React & Tailwind CSS.
                </motion.p>
                <motion.a
                    href="/resume.pdf"
                    download
                    className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Download Resume
                </motion.a>
            </motion.div>
        </motion.section>
    );
};

export default Hero;