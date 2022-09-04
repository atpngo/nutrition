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
        'primary-blue': '#3CCEEE',
        'banner-success': '#16a34a'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif']
      },
      width: {
        'fooditem': '250px'
      }
    },
  
  },
  plugins: [require('@tailwindcss/forms')],
}