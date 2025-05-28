/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#6366F1', // Indigo 500
          DEFAULT: '#4F46E5', // Indigo 600
          dark: '#4338CA', // Indigo 700
        },
        secondary: {
          light: '#8B5CF6', // Purple 500
          DEFAULT: '#7C3AED', // Purple 600
          dark: '#6D28D9', // Purple 700
        },
        ocean: {
          primary: {
            light: '#0EA5E9', // Sky 500
            DEFAULT: '#0284C7', // Sky 600
            dark: '#0369A1', // Sky 700
          },
          secondary: {
            light: '#38BDF8', // Sky 400
            DEFAULT: '#0EA5E9', // Sky 500
            dark: '#0284C7', // Sky 600
          },
        },
        forest: {
          primary: {
            light: '#22C55E', // Green 500
            DEFAULT: '#16A34A', // Green 600
            dark: '#15803D', // Green 700
          },
          secondary: {
            light: '#4ADE80', // Green 400
            DEFAULT: '#22C55E', // Green 500
            dark: '#16A34A', // Green 600
          },
        },
        sunset: {
          primary: {
            light: '#F97316', // Orange 500
            DEFAULT: '#EA580C', // Orange 600
            dark: '#C2410C', // Orange 700
          },
          secondary: {
            light: '#FB923C', // Orange 400
            DEFAULT: '#F97316', // Orange 500
            dark: '#EA580C', // Orange 600
          },
        },
        rose: {
          primary: {
            light: '#EC4899', // Pink 500
            DEFAULT: '#DB2777', // Pink 600
            dark: '#BE185D', // Pink 700
          },
          secondary: {
            light: '#F472B6', // Pink 400
            DEFAULT: '#EC4899', // Pink 500
            dark: '#DB2777', // Pink 600
          },
        },
        background: {
          light: '#F9FAFB', // Gray 50
          dark: '#050608', // Changed to the requested color
        },
        text: {
          light: {
            primary: '#111827', // Gray 900
            secondary: '#4B5563', // Gray 600
            tertiary: '#6B7280', // Gray 500
          },
          dark: {
            primary: '#F9FAFB', // Gray 50
            secondary: '#E5E7EB', // Gray 200
            tertiary: '#D1D5DB', // Gray 300
          },
        },
        accent: {
          cyan: {
            light: '#22D3EE', // Cyan 400
            DEFAULT: '#06B6D4', // Cyan 500
            dark: '#0891B2', // Cyan 600
          },
          green: {
            light: '#34D399', // Green 400
            DEFAULT: '#10B981', // Green 500
            dark: '#059669', // Green 600
          },
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        2000: '2000ms',
      },
    },
  },
  plugins: [],
};
