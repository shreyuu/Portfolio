import React from "react";

const Projects = () => {
    return (
        <div className="text-gray-300">
            <h2 className="text-green-500 font-semibold mb-4">Projects</h2>

            <div className="space-y-4">
                <div className="p-4 bg-[#161616] rounded-lg border border-[#2c2c2c]">
                    <h3 className="text-lg font-bold">Rubiklog</h3>
                    <p className="text-sm text-gray-400">Rubik's Cube Timer</p>
                </div>

                <div className="p-4 bg-[#161616] rounded-lg border border-[#2c2c2c]">
                    <h3 className="text-lg font-bold">Hand Gesture Recognition</h3>
                    <p className="text-sm text-gray-400">Identify hand signs using webcam</p>
                </div>
            </div>
        </div>
    );
};

export default Projects;
