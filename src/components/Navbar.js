import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 
                ${isScrolled
                    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg"
                    : "bg-transparent"}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.h1
                        className="text-2xl font-bold text-gray-900 dark:text-white"
                        whileHover={{ scale: 1.05 }}
                    >
                        Shreyash
                    </motion.h1>

                    <div className="flex items-center space-x-6">
                        <div className="hidden sm:flex space-x-6">
                            <NavLink href="#about">About</NavLink>
                            <NavLink href="#projects">Projects</NavLink>
                            <NavLink href="#contact">Contact</NavLink>
                        </div>

                        <motion.button
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {theme === "light" ? "🌙" : "☀️"}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

const NavLink = ({ href, children }) => (
    <motion.a
        href={href}
        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.a>
);

export default Navbar;