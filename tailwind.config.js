/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#14b8a6', // teal/aqua
          light: '#5eead4',
          dark: '#0d9488',
        },
        success: {
          DEFAULT: '#10b981', // mint green
          light: '#6ee7b7',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#f97316', // muted orange
          light: '#fb923c',
          dark: '#ea580c',
        },
        danger: {
          DEFAULT: '#ef4444', // muted red
          light: '#f87171',
          dark: '#dc2626',
        },
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}

