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
        'light-bg': '#F2F1F6',
        'light-primary': '#FFFFFF',
        'dark-bg': '#333333',
        'dark-primary': '#1E1E1E',
        'dark-subtitle': '#E3E3E3',
        'primary-blue': '#3CCEEE',
        'banner-success': '#16a34a',
        'calories': '#EF476F',
        'fats': '#FBC813',
        'protein': '#06D6A0',
        'carbohydrates': '#BD4291',
        'secondary': '#1178B2',
        'opaque': 'rgb(0,0,0,0.21)',
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