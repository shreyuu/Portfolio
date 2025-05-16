import React from 'react';

const Skills = () => {
  return (
    <div className="text-gray-300">
      <h2 className="text-xl font-bold text-purple-400 mb-4">SKILLS</h2>

      <div className="space-y-4">
        <div className="p-4 bg-[#161616] rounded-lg border border-[#2c2c2c]">
          <h3 className="text-lg font-bold">Languages & Tools</h3>
          <div className="mt-3">
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                'Python',
                'Java',
                'JavaScript',
                'C',
                'C++',
                'Git',
                'Docker',
                'Virtual Machines',
                'Adobe Photoshop',
                'Premiere Pro',
                'After Effects',
                'Figma',
              ].map(tech => (
                <span key={tech} className="px-2 py-1 text-xs bg-[#2c2c2c] rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#161616] rounded-lg border border-[#2c2c2c]">
          <h3 className="text-lg font-bold">Frameworks & Libraries</h3>
          <div className="mt-3">
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                'Flask',
                'Django',
                'React',
                'TailwindCSS',
                'REST APIs',
                'Unit Testing',
                'CI/CD pipelines',
              ].map(tech => (
                <span key={tech} className="px-2 py-1 text-xs bg-[#2c2c2c] rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#161616] rounded-lg border border-[#2c2c2c]">
          <h3 className="text-lg font-bold">Cloud & DevOps</h3>
          <div className="mt-3">
            <div className="space-y-2">
              <div>
                {/* <p className="text-sm text-gray-400 font-medium">Frontend:</p> */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {['AWS', 'Google Cloud', 'Microsoft Azure', 'PostgreSQL', 'MongoDB', 'MySQL'].map(
                    tech => (
                      <span key={tech} className="px-2 py-1 text-xs bg-[#2c2c2c] rounded-md">
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
