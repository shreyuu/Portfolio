import { useEffect } from 'react';

const usePerformanceMonitor = (componentName) => {
    useEffect(() => {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'measure') {
                    if (process.env.NODE_ENV !== 'production') {
                        /* eslint-disable-next-line no-console */
                        console.log(`${componentName} render time:`, entry.duration, 'ms');
                    }
                }
            }
        });

        observer.observe({ entryTypes: ['measure'] });

        performance.mark(`${componentName}-start`);

        return () => {
            performance.mark(`${componentName}-end`);
            performance.measure(
                `${componentName}-render`,
                `${componentName}-start`,
                `${componentName}-end`
            );
            observer.disconnect();
        };
    }, [componentName]);
};

export default usePerformanceMonitor;