import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                        {/* Desktop Menu */}
                        <div className="hidden sm:flex space-x-6">
                            <NavLink href="#about">About</NavLink>
                            <NavLink href="#projects">Projects</NavLink>
                            <NavLink href="#contact">Contact</NavLink>
                        </div>

                        {/* Theme Toggle */}
                        <motion.button
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {theme === "light" ? "🌙" : "☀️"}
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="sm:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="sr-only">Open menu</span>
                            <svg
                                className="w-6 h-6 text-gray-900 dark:text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="sm:hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <MobileNavLink href="#about">About</MobileNavLink>
                                <MobileNavLink href="#projects">Projects</MobileNavLink>
                                <MobileNavLink href="#contact">Contact</MobileNavLink>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

// Add MobileNavLink component
const MobileNavLink = ({ href, children }) => (
    <motion.a
        href={href}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        whileHover={{ x: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: document.querySelector(href).offsetTop, behavior: 'smooth' })}
    >
        {children}
    </motion.a>
);

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