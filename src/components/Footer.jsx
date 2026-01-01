import React, { useState } from 'react';

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('shreyashmeshram0031@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="text-center py-6 border-t border-gray-700 text-gray-400 mt-12">
      <p className="mb-2">Have an idea or you&apos;d like some help building?</p>
      <p className="mb-4">
        Connect –{' '}
        <button
          onClick={copyEmail}
          className="hover:text-white transition-colors"
        >
          {copied ? '✓ Copied!' : 'shreyashmeshram0031@gmail.com'}
        </button>
      </p>
      <p>&copy; {new Date().getFullYear()} Shreyash Meshram. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
