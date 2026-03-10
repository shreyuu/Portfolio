import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const Navigation = () => {
    const [activeSection, setActiveSection] = useState(0);
    const navRef = useRef(null);

    const sections = useMemo(() => [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' }
    ], []);

    const scrollToSection = useCallback((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY + 100;
                    for (let i = sections.length - 1; i >= 0; i--) {
                        const element = document.getElementById(sections[i].id);
                        if (element && element.offsetTop <= scrollPosition) {
                            setActiveSection(i);
                            break;
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const handleNavKeyDown = useCallback((e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newIndex = activeSection > 0 ? activeSection - 1 : sections.length - 1;
            setActiveSection(newIndex);
            scrollToSection(sections[newIndex].id);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newIndex = activeSection < sections.length - 1 ? activeSection + 1 : 0;
            setActiveSection(newIndex);
            scrollToSection(sections[newIndex].id);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToSection(sections[activeSection].id);
        }
    }, [activeSection, sections, scrollToSection]);

    return (
        <nav
            ref={navRef}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
            aria-label="Page sections"
        >
            <div
                role="toolbar"
                aria-label="Section navigation"
                onKeyDown={handleNavKeyDown}
            >
                <ul className="flex flex-col space-y-4">
                    {sections.map((section, index) => (
                        <li key={section.id}>
                            <motion.button
                                onClick={() => {
                                    setActiveSection(index);
                                    scrollToSection(section.id);
                                }}
                                className={`w-3 h-3 rounded-full transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black ${activeSection === index
                                    ? 'bg-purple-500 scale-125'
                                    : 'bg-gray-400 hover:bg-gray-300'
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Navigate to ${section.label}`}
                                aria-current={activeSection === index ? 'step' : undefined}
                                title={`Go to ${section.label} section`}
                            >
                                <span
                                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                                    aria-hidden="true"
                                >
                                    {section.label}
                                </span>
                            </motion.button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="text-xs text-gray-500 mt-4 space-y-1">
                <p>↑↓ Navigate</p>
            </div>
        </nav>
    );
};

export default Navigation;
