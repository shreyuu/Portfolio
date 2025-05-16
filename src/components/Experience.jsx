import React from 'react';

const Experience = () => {
  return (
    <div className="w-full text-gray-300 mb-10">
      <h2 className="text-xl font-bold text-purple-400 mb-4">EXPERIENCE</h2>
      <div className="bg-[#0f0f0f] p-4 rounded-lg border border-gray-700 flex items-center space-x-4">
        {/* <img
                    src="https://assets-global.website-files.com/620752da2cbfc9631a04285d/63da1592d558a927b5c97ef3_fueler-logo.png"
                    alt="Fueler Logo"
                    className="h-10 w-10"
                /> */}
        <div>
          <p className="font-semibold text-white">Python Developer Intern</p>
          <p className="text-sm text-gray-400">Arohi Softwares</p>
          <p className="text-xs text-gray-500">Nov 2024 – Feb 2025 · 6mo</p>
        </div>
      </div>
      <div className="bg-[#0f0f0f] p-4 rounded-lg border border-gray-700 flex items-center space-x-4 my-2">
        <div>
          <p className="font-semibold text-white">Software Developer Intern</p>
          <p className="text-sm text-gray-400">NerdTech</p>
          <p className="text-xs text-gray-500">Mar 2024 – Apr 2024 · 1mo</p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
