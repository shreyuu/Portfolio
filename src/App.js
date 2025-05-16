import React, { Suspense, lazy } from 'react';
import './App.css';
import { inject } from '@vercel/analytics';
import { Helmet } from 'react-helmet';
import * as Sentry from '@sentry/react';

// Initialize Vercel Analytics
inject();

// Initialize Sentry
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN', // Replace with your Sentry DSN
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
});

// Lazy load the Home component
const Home = lazy(() => import('./components/Home.jsx'));

// Skip link component for accessibility
const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded z-50"
  >
    Skip to main content
  </a>
);

// Loading component with improved accessibility
const Loading = () => (
  <div
    className="min-h-screen bg-background-dark flex items-center justify-center"
    role="status"
    aria-label="Loading"
  >
    <div
      className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"
      aria-hidden="true"
    ></div>
  </div>
);

// Error boundary component with improved accessibility
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen bg-background-dark text-white flex items-center justify-center p-4"
          role="alert"
          aria-live="assertive"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
            <p className="mb-4">Please try refreshing the page.</p>
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
  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shreyash Meshram',
    jobTitle: 'Full Stack Developer',
    url: 'https://your-portfolio-domain.com',
    sameAs: ['https://github.com/yourusername', 'https://linkedin.com/in/yourusername'],
    knowsAbout: ['Web Development', 'React', 'JavaScript', 'Python', 'Machine Learning'],
    description:
      'Full-stack developer and CS student passionate about building apps and exploring AI/ML projects.',
  };

  return (
    <ErrorBoundary>
      <Helmet>
        <title>Shreyash Meshram | Portfolio</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Full-stack developer and CS student passionate about building apps and exploring AI/ML projects. Check out my portfolio of web development and machine learning projects."
        />
        <meta
          name="keywords"
          content="Shreyash Meshram, Full Stack Developer, Web Developer, Python Developer, React Developer, Portfolio"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Shreyash Meshram | Portfolio" />
        <meta
          property="og:description"
          content="Full-stack developer and CS student passionate about building apps and exploring AI/ML projects."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-portfolio-domain.com" />
        <meta property="og:image" content="https://your-portfolio-domain.com/og-image.jpg" />
        <meta property="og:site_name" content="Shreyash Meshram Portfolio" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        <meta name="twitter:creator" content="@yourtwitterhandle" />
        <meta name="twitter:title" content="Shreyash Meshram | Portfolio" />
        <meta
          name="twitter:description"
          content="Full-stack developer and CS student passionate about building apps and exploring AI/ML projects."
        />
        <meta name="twitter:image" content="https://your-portfolio-domain.com/twitter-image.jpg" />

        {/* Security Headers */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.your-domain.com;"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <SkipLink />
      <main id="main-content" tabIndex="-1">
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}

export default App;
