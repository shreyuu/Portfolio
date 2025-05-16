# Personal Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive
- ♿ Accessibility compliant
- 🚀 Performance optimized
- 🔍 SEO friendly
- 📊 Analytics integration
- 🛡️ Security best practices
- 📝 Contact form with rate limiting
- 🎭 Smooth animations and transitions

## Tech Stack

- React 18
- Tailwind CSS
- Framer Motion
- EmailJS
- Vercel Analytics
- Sentry Error Tracking
- ESLint & Prettier

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/shreyuu/Portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
   REACT_APP_SENTRY_DSN=your_sentry_dsn
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint
- `npm run lint:fix` - Fixes ESLint errors
- `npm run format` - Formats code with Prettier

## Project Structure

```
portfolio/
├── public/
│   ├── index.html
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .eslintrc.json
├── .prettierrc
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

This project uses ESLint and Prettier for code formatting. The configuration files are included in the repository.

- ESLint rules are defined in `.eslintrc.json`
- Prettier configuration is in `.prettierrc`

## Accessibility

This project follows WCAG 2.1 guidelines and includes:

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Skip links
- Proper color contrast
- Screen reader support

## Performance

The project is optimized for performance with:

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Minification
- Compression

## Security

Security measures implemented:

- Content Security Policy (CSP)
- Security headers
- Input sanitization
- Rate limiting
- XSS protection
- CSRF protection

## Analytics and Monitoring

- Vercel Analytics for performance monitoring
- Sentry for error tracking
- Custom event tracking

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

[Shreyash Meshram](mailto:shreyashmeshram0031@gmail.com)

Project Link: [https://github.com/shreyuu/Portfolio](https://github.com/shreyuu/Portfolio)
