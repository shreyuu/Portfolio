import React from "react";

const Projects = () => {
    return (
        <div className="text-gray-300">
            <h2 className="text-purple-500 font-semibold mb-4">Projects</h2>

            <div className="space-y-4">
                <div className="p-4 bg-[#161616] rounded-lg border border-[#2c2c2c]">
                    <h3 className="text-lg font-bold">
                        <a
                            href="https://github.com/shreyuu/RubikLog"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-purple-500 transition-colors"
                        >
                            Rubiklog
                        </a>
                    </h3>
                    <p className="text-sm text-gray-400">Rubik's Cube Timer</p>
                    <div className="mt-3">
                        {/* <p className="text-sm text-gray-400 font-medium">System Requirements:</p> */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {["Python 3.10+", "Node.js 18+", "PostgreSQL 14+"].map((tech) => (
                                <span key={tech} className="px-2 py-1 text-xs bg-[#2c2c2c] rounded-md">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-[#161616] rounded-lg border border-[#2c2c2c]">
                    <h3 className="text-lg font-bold">
                        <a
                            href="https://github.com/shreyuu/Hand-Gesture-Recognition"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-purple-500 transition-colors"
                        >
                            Hand Gesture Recognition
                        </a>
                    </h3>
                    <p className="text-sm text-gray-400">Identify hand signs using webcam</p>
                    <div className="mt-3">
                        {/* <p className="text-sm text-gray-400 font-medium">Technologies:</p> */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {["Python", "TensorFlow", "MediaPipe", "OpenCV", "Jupyter Notebook"].map((tech) => (
                                <span key={tech} className="px-2 py-1 text-xs bg-[#2c2c2c] rounded-md">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-[#161616] rounded-lg border border-[#2c2c2c]">
                    <h3 className="text-lg font-bold">
                        <a
                            href="https://github.com/shreyuu/DjangoChatify"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-purple-500 transition-colors"
                        >
                            DjangoChatify
                        </a>
                    </h3>
                    <p className="text-sm text-gray-400">Real-Time Chat Application</p>
                    <div className="mt-3">
                        <div className="space-y-2">
                            <div>
                                {/* <p className="text-sm text-gray-400 font-medium">Frontend:</p> */}
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {["React.js", "Tailwind CSS", "Django", "WebSockets", "MongoDB"].map((tech) => (
                                        <span key={tech} className="px-2 py-1 text-xs bg-[#2c2c2c] rounded-md">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
