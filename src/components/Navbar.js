import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between">
            <h1 className="text-2xl font-bold">Shreyash</h1>
            <div className="space-x-4">
                <a href="#about" className="hover:text-gray-400">About</a>
                <a href="#projects" className="hover:text-gray-400">Projects</a>
                <a href="#contact" className="hover:text-gray-400">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;