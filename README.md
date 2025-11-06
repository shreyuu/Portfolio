# Personal Portfolio Website

A modern, responsive portfolio website showcasing my journey as a Full Stack Developer and Computer Science student. Built with React and Tailwind CSS, featuring smooth animations and excellent performance.

## ✨ Features

-   🎨 **Modern Design** - Clean, professional UI with dark theme
-   📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
-   ♿ **Accessibility First** - WCAG 2.1 compliant with keyboard navigation
-   🚀 **Performance Optimized** - Lazy loading, code splitting, and caching
-   🔍 **SEO Friendly** - Meta tags, Open Graph, and structured data
-   📊 **Analytics Integration** - Vercel Analytics and Speed Insights
-   🎭 **Smooth Animations** - Framer Motion for engaging interactions
-   🛡️ **Security Hardened** - CSP headers and security best practices
-   🎯 **Scroll Progress** - Visual scroll indicator and back-to-top button
-   🔄 **Filter System** - Filter projects by category (Web Dev, ML)
-   📄 **Project Modals** - Detailed project information with features and challenges
-   🌐 **Navigation** - Smooth scroll navigation with active section indicators

## 🛠️ Tech Stack

### Core

-   **React 18** - Modern React with hooks and suspense
-   **Tailwind CSS** - Utility-first CSS framework
-   **Framer Motion** - Animation library for React
-   **React Helmet** - Document head management
-   **React Icons** - Popular icon library

### Development Tools

-   **CRACO** - Create React App Configuration Override
-   **ESLint** - Code quality and consistency
-   **Prettier** - Code formatting
-   **Husky** - Git hooks for quality checks
-   **lint-staged** - Pre-commit linting

### Testing & CI/CD

-   **Jest** - Testing framework
-   **React Testing Library** - Component testing
-   **Lighthouse CI** - Automated performance auditing
-   **GitHub Actions** - Continuous integration

### Analytics & Monitoring

-   **Vercel Analytics** - Real-time analytics
-   **Vercel Speed Insights** - Performance metrics
-   **Web Vitals** - Core Web Vitals monitoring

## 📋 Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Git

## 🚀 Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/shreyuu/Portfolio.git
    cd Portfolio
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `npm start`        | Start development server with CRACO                |
| `npm test`         | Run tests with CRACO                               |
| `npm run build`    | Create production build                            |
| `npm run lint`     | Run ESLint checks                                  |
| `npm run lint:fix` | Fix ESLint errors automatically                    |
| `npm run eject`    | Eject from Create React App (⚠️ one-way operation) |

## 📁 Project Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── .husky/                      # Git hooks configuration
├── .vscode/
│   └── settings.json           # VS Code settings
├── public/
│   ├── icons/                  # App icons
│   ├── index.html              # HTML template
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # SEO robots file
│   └── sitemap.xml             # SEO sitemap
├── src/
│   ├── components/
│   │   ├── About.jsx           # About section
│   │   ├── Education.jsx       # Education timeline
│   │   ├── Experience.jsx      # Work experience timeline
│   │   ├── Footer.jsx          # Footer with contact
│   │   ├── Hero.jsx            # Animated hero section
│   │   ├── Home.jsx            # Main page layout
│   │   ├── Navigation.jsx      # Scroll navigation
│   │   ├── ProfileCard.jsx     # Daily.dev card
│   │   ├── ProjectDetails.jsx  # Project modal
│   │   ├── Projects.jsx        # Projects grid with filters
│   │   ├── ProjectsSection.jsx # Projects section
│   │   ├── ScrollProgress.jsx  # Scroll indicator
│   │   ├── Skills.jsx          # Skills grid
│   │   ├── Skeleton.jsx        # Loading skeletons
│   │   └── ThemeToggle.jsx     # Theme switcher
│   ├── hooks/
│   │   ├── useAnimations.js    # Animation variants
│   │   ├── useKeyboardNavigation.js # Keyboard controls
│   │   ├── useResponsive.js    # Responsive utilities
│   │   └── useTheme.js         # Theme management
│   ├── App.css                 # App styles
│   ├── App.js                  # Root component
│   ├── App.test.js             # App tests
│   ├── index.css               # Global styles
│   ├── index.js                # Entry point
│   ├── reportWebVitals.js      # Web Vitals
│   └── setupTests.js           # Test configuration
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Prettier configuration
├── craco.config.js             # CRACO configuration
├── jest.config.js              # Jest configuration
├── lighthouse.config.js        # Lighthouse CI config
├── package.json                # Dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind configuration
└── README.md                   # This file
```

## 🎨 Customization

### Theme Configuration

Edit [`tailwind.config.js`](tailwind.config.js) to customize:

-   Colors (primary, secondary, accent)
-   Theme variants (ocean, forest, sunset, rose)
-   Typography
-   Animations
-   Breakpoints

### Animations

Modify [`src/hooks/useAnimations.js`](src/hooks/useAnimations.js) for:

-   Fade effects (up, down, left, right)
-   Scale animations
-   Letter animations
-   Stagger containers
-   Hover/tap effects

## Custom Hooks Documentation

### useAnimations

Provides animation variants and scroll detection for Framer Motion.

**Usage:**

```javascript
const { ref, isInView, fadeInUp } = useAnimations();
```

### useTheme

Manages theme state and persistence.

### useResponsive

Handles responsive breakpoints and adaptive values.

### useKeyboardNavigation

Enables keyboard shortcuts for navigation.

## ♿ Accessibility

This portfolio follows WCAG 2.1 Level AA standards:

-   ✅ Semantic HTML structure
-   ✅ ARIA labels and roles
-   ✅ Keyboard navigation support
-   ✅ Skip links for screen readers
-   ✅ Sufficient color contrast
-   ✅ Focus indicators
-   ✅ Descriptive alt text
-   ✅ Accessible forms

## 🚀 Performance

Performance optimizations implemented:

-   ⚡ Code splitting with React.lazy
-   ⚡ Image optimization
-   ⚡ Lazy loading for components
-   ⚡ Skeleton loading states
-   ⚡ Efficient animations with GPU acceleration
-   ⚡ CSS purging in production
-   ⚡ Minification and compression
-   ⚡ Caching strategies

## 🔒 Security

Security measures:

-   🛡️ Content Security Policy (CSP)
-   🛡️ Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
-   🛡️ XSS protection
-   🛡️ CSRF protection
-   🛡️ Safe external links (noopener, noreferrer)

## 📊 SEO

SEO features:

-   🔍 Semantic HTML
-   🔍 Meta tags (description, keywords, author)
-   🔍 Open Graph tags for social sharing
-   🔍 Twitter Card tags
-   🔍 JSON-LD structured data
-   🔍 Sitemap.xml
-   🔍 Robots.txt
-   🔍 Canonical URLs

## 🧪 Testing

Run tests with:

```bash
npm test
```

Coverage report:

```bash
npm test -- --coverage
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting (`npm run lint:fix`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style Guidelines

-   Follow ESLint rules (see [`.eslintrc.json`](.eslintrc.json))
-   Use Prettier for formatting (see [`.prettierrc`](.prettierrc))
-   Write meaningful commit messages
-   Add tests for new features
-   Update documentation as needed

## 🔧 Development Tools

### Recommended VS Code Extensions

-   ESLint
-   Prettier
-   Tailwind CSS IntelliSense
-   ES7+ React/Redux/React-Native snippets
-   Auto Rename Tag
-   GitLens

## 📈 Analytics

This portfolio uses:

-   **Vercel Analytics** - Page views, user metrics
-   **Vercel Speed Insights** - Core Web Vitals, FCP, LCP, CLS, etc.
-   **Lighthouse CI** - Automated performance auditing

## 🐛 Known Issues

No known issues at this time. Please report any bugs via [GitHub Issues](https://github.com/shreyuu/Portfolio/issues).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

**Shreyash Meshram**

-   Email: [shreyashmeshram0031@gmail.com](mailto:shreyashmeshram0031@gmail.com)
-   GitHub: [@shreyuu](https://github.com/shreyuu)
-   LinkedIn: [shreyuu](https://www.linkedin.com/in/shreyuu/)
-   Portfolio: [https://shreyash-meshram.vercel.app](https://shreyash-meshram.vercel.app)

## 🙏 Acknowledgments

-   [React](https://react.dev/) - UI library
-   [Tailwind CSS](https://tailwindcss.com/) - CSS framework
-   [Framer Motion](https://www.framer.com/motion/) - Animation library
-   [Vercel](https://vercel.com/) - Hosting and analytics
-   [Daily.dev](https://daily.dev/) - Developer news platform

---

⭐ **If you found this portfolio helpful, please consider giving it a star!**
