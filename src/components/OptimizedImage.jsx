import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({ src, alt, className = '', width, height, priority = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}
            <motion.img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                onLoad={() => setIsLoaded(true)}
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
            />
        </div>
    );
};

export default OptimizedImage;