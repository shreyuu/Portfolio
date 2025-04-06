const Projects = () => {
    return (
        <div className="mt-10">
            <h3 className="text-green-500 text-sm font-semibold flex items-center gap-1 mb-4">
                Projects
            </h3>

            <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
                <h4 className="text-white text-lg font-medium">Rubiklog</h4>
                <p className="text-gray-400 text-sm">Rubix Cube Timer</p>
            </div>

            <div className="bg-[#1a1a1a] p-4 rounded-xl">
                <h4 className="text-white text-lg font-medium">Hand Gesture Recognition</h4>
                <p className="text-gray-400 text-sm">Identify hand signs using webcam</p>
            </div>
        </div>
    );
};

export default Projects;