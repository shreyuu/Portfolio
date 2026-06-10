// Empty PostCSS config so Vite does NOT walk up the directory tree and pick up
// the root CRA app's postcss.config.js (which requires tailwindcss/autoprefixer
// that aren't installed here). This subdirectory app uses plain CSS only.
export default {};
