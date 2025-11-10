class ErrorLogger {
    static log(error, context = {}) {
        const errorDetails = {
            message: error.message,
            stack: error.stack,
            context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
        };

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error logged:', errorDetails);
        }

        // In production, send to your error tracking service
        // Example: Sentry, LogRocket, etc.
        if (process.env.NODE_ENV === 'production') {
            // Send to error tracking service
            this.sendToErrorService(errorDetails);
        }

        return errorDetails;
    }

    static sendToErrorService(errorDetails) {
        // Implement your error tracking service integration
        // Example: Sentry.captureException(errorDetails);
        // Reference errorDetails to avoid "defined but never used" warnings during build
        if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
            /* eslint-disable-next-line no-console */
            console.log('sendToErrorService called with:', errorDetails);
        }
    }

    static boundary(error, errorInfo) {
        return this.log(error, { errorInfo, type: 'boundary' });
    }
}

export default ErrorLogger;
