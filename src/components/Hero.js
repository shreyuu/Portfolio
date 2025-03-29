import { motion } from "framer-motion";

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-5xl font-bold">Hi, I'm Shreyash 👋</h1>
                <p className="mt-4 text-lg">I love building cool projects using React & Tailwind CSS.</p>
                <a
                    href="/resume.pdf"
                    download
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    Download Resume
                </a>
            </motion.div>
        </div>
    );
};

export default Hero;