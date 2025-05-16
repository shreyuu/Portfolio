import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-6 border-t border-gray-700 text-gray-400 mt-12">
      <p className="mb-2">Have an idea or you&apos;d like some help building?</p>
      <p className="mb-4">
        Connect –{' '}
        <a
          href="mailto:shreyashmeshram0031@gmail.com"
          className="hover:text-white transition-colors"
        >
          shreyashmeshram0031@gmail.com
        </a>
      </p>
      <p>&copy; {new Date().getFullYear()} Shreyash Meshram. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
