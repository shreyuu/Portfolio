import React from "react";

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning!";
    if (hour >= 12 && hour < 18) return "Good Afternoon!";
    return "Good Evening!";
};

const Hero = () => {
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-12 px-2 xs:px-4 sm:px-6">
            <div className="col-span-12 flex sm:flex-wrap md:flex-wrap p-6 dark:border-gray-500">
                <div className="relative w-fit" style={{ opacity: 1, transform: 'none' }}>
                    <div className="flex flex-wrap overflow-hidden">
                        {["S", "h", "r", "e", "y", "a", "s", "h", " ", "M", "e", "s", "h", "r", "a", "m"].map((letter, index) => (
                            <div key={index} className="overflow-hidden" style={{ width: 'auto', opacity: 1 }}>
                                <span className="text-[4.5rem] max-sm:text-4xl font-bold inline-block whitespace-pre">
                                    {letter}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 -translate-y-14 translate-x-12 rounded-full bg-purple-500 px-4 py-3 text-lg font-bold leading-none text-white dark:text-gray-1000 xs:inline-block lg:translate-x-full lg:translate-y-0" style={{ opacity: 1 }}>
                        <span className="inline-block">{getGreeting()}</span>
                        <svg viewBox="0 0 22 18" fill="none" className="absolute -bottom-[9px] left-[7px] w-5 text-purple-500">
                            <path d="M20.9991 8C17.4991 12.5 13.4991 16 7.69476 17.4776C8.49908 10.5 6.99908 8 0.939453 3.39334L1.79694 0L21.1874 4.8999L20.9991 8Z" fill="currentColor" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;