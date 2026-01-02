import { useInView } from 'framer-motion';
import { useRef, useMemo, useCallback } from 'react';

const useAnimations = (options = {}) => {
    const ref = useRef(null);

    // Memoize getMargin function to prevent recalculation on every render
    const getMargin = useCallback(() => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            if (width < 640) return '-20px'; // Mobile
            if (width < 1024) return '-50px'; // Tablet
            return '-100px'; // Desktop
        }
        return '-100px';
    }, []);

    // Memoize margin value
    const margin = useMemo(() => getMargin(), [getMargin]);

    const isInView = useInView(ref, {
        once: true,
        margin: margin,
        amount: 0.2,
        ...options,
    });

    const fadeInUp = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
    }), []);

    const fadeInDown = useMemo(() => ({
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
    }), []);

    const fadeInLeft = useMemo(() => ({
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
    }), []);

    const fadeInRight = useMemo(() => ({
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
    }), []);

    const scaleIn = useMemo(() => ({
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
    }), []);

    const staggerContainer = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    }), []);

    const letterAnimation = useMemo(() => ({
        hidden: {
            y: 50,
            opacity: 0,
            rotateX: -45,
        },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
    }), []);

    const hoverScale = useMemo(() => ({
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease: 'easeInOut',
        },
    }), []);

    const tapScale = useMemo(() => ({
        scale: 0.95,
        transition: {
            duration: 0.1,
            ease: 'easeInOut',
        },
    }), []);

    const slideUp = useMemo(() => ({
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }), []);

    const rotateIn = useMemo(() => ({
        hidden: { opacity: 0, rotate: -10 },
        visible: {
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
    }), []);

    return {
        ref,
        isInView,
        fadeInUp,
        fadeInDown,
        fadeInLeft,
        fadeInRight,
        scaleIn,
        staggerContainer,
        letterAnimation,
        hoverScale,
        tapScale,
        slideUp,
        rotateIn,
    };
};

export default useAnimations;
