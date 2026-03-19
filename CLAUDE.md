# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a modern, responsive portfolio website built with React and Tailwind CSS. It showcases the developer's journey as a Full Stack Developer and Computer Science student, featuring smooth animations, excellent performance, and strong accessibility compliance.

## Key Technologies

- React 18 with hooks and suspense
- Tailwind CSS for styling
- Framer Motion for animations
- React Helmet for document head management
- EmailJS for contact form functionality
- Vercel Analytics and Speed Insights for monitoring
- CRACO for webpack configuration overrides

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── App.jsx             # Main app component with error boundary
├── index.js            # Entry point
└── ...
```

## Common Development Commands

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Create production build
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier

## Architecture Highlights

1. **Component-Based Structure**: Organized into reusable components in the `src/components/` directory
2. **Lazy Loading**: Home component is lazy-loaded for performance
3. **Custom Hooks**: Custom hooks for animations, keyboard navigation, responsive behavior, and theme management
4. **Error Boundaries**: Comprehensive error handling with logging
5. **Accessibility**: WCAG 2.1 compliant with keyboard navigation and semantic HTML
6. **Performance Optimized**: Uses code splitting, lazy loading, and skeleton loading states
7. **SEO Ready**: Implements meta tags, Open Graph, structured data, and canonical URLs

## Configuration Files

- `craco.config.js` - CRACO configuration for webpack overrides
- `tailwind.config.js` - Tailwind CSS configuration with custom color themes
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `jest.config.js` - Jest testing configuration

## Testing

Tests are written with Jest and React Testing Library. Run with `npm test` or `npm run test:coverage` for coverage reports.

## Custom Hooks

- `useAnimations.js` - Animation variants and scroll detection for Framer Motion
- `useKeyboardNavigation.js` - Keyboard shortcuts for navigation
- `useResponsive.js` - Responsive utilities with debounced resize handling
- `useTheme.js` - Theme management with localStorage persistence

## Deployment

The site is deployed on Vercel with automated analytics and speed insights integration.