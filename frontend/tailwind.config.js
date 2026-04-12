/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#C83E6C',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FDF2F5',
          foreground: '#C83E6C',
        },
        accent: {
          DEFAULT: '#25D366',
          foreground: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}