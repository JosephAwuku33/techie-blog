/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6EEB83',
        'secondary': '#272727',
        white: '#ffffff',
        black: '#000000',
        'tertiary': '#D9D9D9'

      },

      fontFamily: {
        "lexend-deca": ["Lexend Deca"],
        "dm-serif": ["DM Serif"]
      }
    },
  },
  plugins: [],
}

