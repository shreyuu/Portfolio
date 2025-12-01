# Project Overview

This is a personal portfolio website for a Full Stack Developer and Computer Science student. It is a single-page application built with **React** and **Tailwind CSS**. The project showcases the developer's skills, experience, and projects. It is designed to be modern, responsive, and performant, with a focus on accessibility and SEO.

The project is bootstrapped with **Create React App** and customized using **CRACO** (Create React App Configuration Override). **Framer Motion** is used for animations, and **Vercel Analytics** and **Speed Insights** are integrated for analytics and performance monitoring.

## Building and Running

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Git

### Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/shreyuu/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm start
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

### Key Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start development server with CRACO |
| `npm test` | Run tests with CRACO |
| `npm run build` | Create production build |
| `npm run lint` | Run ESLint checks |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run eject` | Eject from Create React App (⚠️ one-way operation) |
| `npm run lighthouse` | Run Lighthouse CI for performance auditing |

## Development Conventions

### Code Style

The project uses **ESLint** and **Prettier** to enforce a consistent code style. The configuration files for these tools are `.eslintrc.json` and `.prettierrc` respectively.

### Git Hooks

**Husky** and **lint-staged** are used to run linting and formatting checks before each commit. This ensures that the codebase remains clean and consistent.

### Testing

The project uses **Jest** and **React Testing Library** for testing. Tests are located in files with the `.test.js` extension. The `npm test` command runs the tests.

### CI/CD

**GitHub Actions** are used for continuous integration. The workflow is defined in the `.github/workflows/ci.yml` file. It runs linting, testing, and a Lighthouse CI audit on each push and pull request.
