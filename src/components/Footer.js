import React from "react";

const Footer = () => {
    return (
        <footer className="text-center py-6 border-t border-gray-700 text-gray-400 mt-12">
            &copy; {new Date().getFullYear()} Shreyash Meshram. All rights reserved.
        </footer>
    );
};

export default Footer;