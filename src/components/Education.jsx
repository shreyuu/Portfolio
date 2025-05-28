import React from 'react';
import { FaCircle } from 'react-icons/fa';

const Education = () => {
  return (
    <div className="text-gray-300 mb-10">
      <h2 className="text-xl font-bold text-purple-400 mb-4">🎓 EDUCATION</h2>

      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <FaCircle className="text-purple-500 text-sm mt-1" />
          <div>
            <p className="font-bold text-white">Sandip Institute of Technology & Research Centre</p>
            <p className="text-sm text-gray-400">
              Bachelor of Engineering | Computer Engineering
              <br />
              Aug 2022 – May 2025
            </p>
            {/* <p className="text-xs text-gray-500 mt-1">AI/ML, Python, Data Structures</p> */}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <FaCircle className="text-purple-500 text-sm mt-1" />
          <div>
            <p className="font-bold text-white">Sandip Foundation&apos;s Sandip Polytechnic</p>
            <p className="text-sm text-gray-400">
              Diploma | Computer Engineering
              <br />
              2019 – 2022
            </p>
            {/* <p className="text-xs text-gray-500 mt-1">Grade: A</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
