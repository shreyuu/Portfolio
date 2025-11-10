import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';

const Navigation = () => {
    const [activeSection, setActiveSection] = useState(0);

    const sections = useMemo(() => [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' }
    ], []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i].id);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(i);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    useKeyboardNavigation({
        onArrowUp: (e) => {
            e.preventDefault();
            const newIndex = activeSection > 0 ? activeSection - 1 : sections.length - 1;
            setActiveSection(newIndex);
            scrollToSection(sections[newIndex].id);
        },
        onArrowDown: (e) => {
            e.preventDefault();
            const newIndex = activeSection < sections.length - 1 ? activeSection + 1 : 0;
            setActiveSection(newIndex);
            scrollToSection(sections[newIndex].id);
        },
        onEnter: (e) => {
            e.preventDefault();
            scrollToSection(sections[activeSection].id);
        },
        onSpace: (e) => {
            e.preventDefault();
            scrollToSection(sections[activeSection].id);
        }
    });

    return (
        <nav
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
            aria-label="Page sections"
            role="navigation"
        >
            <div className="flex flex-col space-y-4" role="list">
                {sections.map((section, index) => (
                    <motion.button
                        key={section.id}
                        onClick={() => {
                            setActiveSection(index);
                            scrollToSection(section.id);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 relative group ${activeSection === index
                                ? 'bg-purple-500 scale-125'
                                : 'bg-gray-400 hover:bg-gray-300'
                            }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Navigate to ${section.label}`}
                        aria-current={activeSection === index ? 'true' : 'false'}
                        role="listitem"
                    >
                        <span
                            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                            aria-hidden="true"
                        >
                            {section.label}
                        </span>
                    </motion.button>
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
