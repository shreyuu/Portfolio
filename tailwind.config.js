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
        primary: {
          light: "#6366F1", // Indigo 500
          DEFAULT: "#4F46E5", // Indigo 600
          dark: "#4338CA", // Indigo 700
        },
        secondary: {
          light: "#8B5CF6", // Purple 500
          DEFAULT: "#7C3AED", // Purple 600
          dark: "#6D28D9", // Purple 700
        },
        background: {
          light: "#F9FAFB", // Gray 50
          dark: "#111827", // Gray 900
        },
        text: {
          light: {
            primary: "#111827", // Gray 900
            secondary: "#4B5563", // Gray 600
            tertiary: "#6B7280", // Gray 500
          },
          dark: {
            primary: "#F9FAFB", // Gray 50
            secondary: "#E5E7EB", // Gray 200
            tertiary: "#D1D5DB", // Gray 300
          },
        },
        accent: {
          cyan: {
            light: "#22D3EE", // Cyan 400
            DEFAULT: "#06B6D4", // Cyan 500
            dark: "#0891B2", // Cyan 600
          },
          green: {
            light: "#34D399", // Green 400
            DEFAULT: "#10B981", // Green 500
            dark: "#059669", // Green 600
          },
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
};
