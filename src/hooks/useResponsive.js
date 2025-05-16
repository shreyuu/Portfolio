import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;
  const isLargeDesktop = windowSize.width >= 1280;

  const getResponsiveValue = values => {
    if (isMobile) return values.mobile;
    if (isTablet) return values.tablet;
    if (isDesktop) return values.desktop;
    return values.largeDesktop;
  };

  const getResponsiveClass = classes => {
    return getResponsiveValue(classes);
  };

  const getResponsiveStyle = styles => {
    return getResponsiveValue(styles);
  };

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    getResponsiveValue,
    getResponsiveClass,
    getResponsiveStyle,
  };
};

export default useResponsive;
