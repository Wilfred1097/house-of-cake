/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        script: ['Great Vibes', 'cursive'],
      },
      colors: {
        brand: {
          50: '#f5f3f7',
          100: '#ebe7ef',
          200: '#d7d0df',
          300: '#b8aac5',
          400: '#9582aa',
          500: '#4B2E83', // Main brand color from logo
          600: '#442975',
          700: '#382262',
          800: '#2d1b4f',
          900: '#251741',
        },
      },
    },
  },
  plugins: [],
}