// src/components/Navbar.js
import React from "react";

const Navbar = () => {
    const links = ["Home", "About", "Projects", "Contact"];

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#0f0f0f]/70 backdrop-blur-md z-50 shadow-md">
            <div className="flex justify-between items-center py-4 px-6 md:px-16">
                <h1 className="text-xl font-bold text-cyan-400">Shreyash</h1>
                <ul className="flex space-x-6 text-sm md:text-base">
                    {links.map((link) => (
                        <li key={link}>
                            <a
                                href={`#${link.toLowerCase()}`}
                                className="hover:text-cyan-400 transition-all"
                            >
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;