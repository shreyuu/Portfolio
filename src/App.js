import React, { Suspense, lazy } from "react";
import "./App.css";
import { inject } from "@vercel/analytics";
import { Helmet } from "react-helmet";

// Initialize Vercel Analytics
inject();

// Lazy load the Home component
const Home = lazy(() => import("./components/Home.jsx"));

// Loading component
const Loading = () => (
  <div className="min-h-screen bg-background-dark flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background-dark text-white flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Oops! Something went wrong.
            </h1>
            <p className="mb-4">Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
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
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Shreyash Meshram | Portfolio</title>
        <meta
          name="description"
          content="Full-stack developer and CS student passionate about building apps and exploring AI/ML projects. Check out my portfolio of web development and machine learning projects."
        />
        <meta
          name="keywords"
          content="Shreyash Meshram, Full Stack Developer, Web Developer, Python Developer, React Developer, Portfolio"
        />
        <meta property="og:title" content="Shreyash Meshram | Portfolio" />
        <meta
          property="og:description"
          content="Full-stack developer and CS student passionate about building apps and exploring AI/ML projects."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shreyash Meshram | Portfolio" />
        <meta
          name="twitter:description"
          content="Full-stack developer and CS student passionate about building apps and exploring AI/ML projects."
        />
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
