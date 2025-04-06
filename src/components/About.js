const About = () => {
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">About me</h2>
            <p className="text-gray-400 leading-relaxed">
                I'm a CS student from India 🇮🇳 who enjoys building apps & all sorts of interesting and crazy ideas.
                I love tech, AI, and clean design. In my free time, I enjoy watching anime, reading manga, and exploring new tools.
            </p>

            <div className="mt-6">
                <p className="text-sm text-gray-400 mb-1">FIND ME AT</p>
                <a href="mailto:shreyash@gmail.com" className="text-green-400 hover:underline text-sm">shreyash@gmail.com</a>
                <div className="flex space-x-4 mt-4 text-2xl">
                    <a href="https://github.com/shreyuu" target="_blank" rel="noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://linkedin.com/in/shreyuu" target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <button className="hover:text-gray-400">
                        <i className="fab fa-discord"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;