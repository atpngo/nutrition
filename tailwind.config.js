/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#3CCEEE'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif']
      }
    },
  
  },
  plugins: [require('@tailwindcss/forms')],
}