import { motion } from "framer-motion";

const Hero = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.section
            className="h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="text-center max-w-2xl px-4"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-light to-primary-dark bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    Hi, I'm Shreyash 👋
                </motion.h1>
                <motion.p
                    className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    I love building cool projects using React & Tailwind CSS.
                </motion.p>
                <motion.div
                    className="flex gap-4 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.a
                        href="/resume.pdf"
                        download
                        className="bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Download Resume
                    </motion.a>
                    <motion.a
                        href="#projects"
                        className="border-2 border-primary text-primary dark:text-primary-light hover:bg-primary hover:text-white py-3 px-8 rounded-lg text-lg font-semibold transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Projects
                    </motion.a>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Hero;