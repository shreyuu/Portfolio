/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#3B82F6",
        secondary: "#60A5FA",
        background: {
          light: "#F3F4F6",
          dark: "#0e0e0e",
        },
        accent: {
          cyan: "#22D3EE",
          green: "#10B981",
        },
      },
    },
  },
  plugins: [],
};
