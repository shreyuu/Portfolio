import React, { Suspense, lazy, useEffect, useState } from 'react';
import './App.css';
import { inject } from '@vercel/analytics';
import { Helmet } from 'react-helmet';
import { ToastProvider } from './components/ToastContext.jsx';
import StructuredData from './components/StructuredData';
import ErrorLogger from './utils/ErrorLogger';

// Initialize Vercel Analytics
inject();

// Lazy load the Home component
const Home = lazy(() => import('./components/Home.jsx'));

// Skip link component for accessibility
const SkipLink = () => (
    <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
        Skip to main content
    </a>
);

// Loading component with improved accessibility
const Loading = () => (
    <div
        className="min-h-screen bg-background-dark flex items-center justify-center"
        role="status"
        aria-label="Loading application"
    >
        <div className="text-center">
            <div
                className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"
                aria-hidden="true"
            ></div>
            <p className="mt-4 text-gray-400">Loading...</p>
        </div>
    </div>
);

// Error boundary component with improved accessibility
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        ErrorLogger.boundary(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    className="min-h-screen bg-background-dark text-white flex items-center justify-center p-4"
                    role="alert"
                    aria-live="assertive"
                >
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
                        <p className="mb-4 text-gray-400">
                            We apologize for the inconvenience. Please try refreshing the page.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <pre className="text-left bg-gray-900 p-4 rounded text-xs overflow-auto mb-4">
                                {this.state.error.toString()}
                            </pre>
                        )}
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            aria-label="Refresh page"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

function App() {
    const [mounted, setMounted] = useState(false);

    // Move any initialization code to useEffect
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <ErrorBoundary>
            <ToastProvider>
                <Helmet>
                    <title>Shreyash Meshram | Full Stack Developer Portfolio</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta
                        name="description"
                        content="Full-stack developer and CS student passionate about building apps and exploring AI/ML projects. Skilled in React, Python, Django, FastAPI, and more."
                    />
                    <meta
                        name="keywords"
                        content="Shreyash Meshram, Full Stack Developer, Web Developer, Python Developer, React Developer, Machine Learning, AI, Portfolio"
                    />
                    <link rel="canonical" href="https://shreyashmeshram.com" />
                </Helmet>

                <StructuredData />
                <SkipLink />

                <main id="main-content" tabIndex="-1">
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                </main>
            </ToastProvider>
        </ErrorBoundary>
    );
}

export default App;
