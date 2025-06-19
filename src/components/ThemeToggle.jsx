import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaPalette } from 'react-icons/fa';
import useTheme from '../hooks/useTheme';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const [showThemeOptions, setShowThemeOptions] = useState(false);

    const themes = {
        light: { icon: FaSun, label: 'Light' },
        dark: { icon: FaMoon, label: 'Dark' },
        ocean: { icon: FaSun, label: 'Ocean' },
        forest: { icon: FaSun, label: 'Forest' },
        sunset: { icon: FaSun, label: 'Sunset' },
        rose: { icon: FaSun, label: 'Rose' },
    };

    return (
        <>
            <motion.button
                onClick={() => setShowThemeOptions(!showThemeOptions)}
                className="fixed top-4 right-4 z-50 p-3 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 shadow-lg transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Theme options"
            >
                <FaPalette size={20} />
            </motion.button>

            <AnimatePresence>
                {showThemeOptions && (
                    <motion.div
                        className="fixed top-16 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {Object.entries(themes).map(([themeName, { icon: Icon, label }]) => (
                            <motion.button
                                key={themeName}
                                onClick={() => {
                                    toggleTheme(themeName);
                                    setShowThemeOptions(false);
                                }}
                                className={`flex items-center gap-2 w-full text-left p-2 rounded-md ${theme === themeName ? 'bg-purple-100 dark:bg-purple-900' : ''
                                    }`}
                                whileHover={{ backgroundColor: '#f3f4f6' }}
                            >
                                <Icon size={16} />
                                {label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ThemeToggle;
