/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        grayLight: 'rgb(149, 141, 141)',
        gray: 'rgb(100, 85, 85)',
        grayDark: 'rgb(60, 55, 55)',
        '555555': '#555555'
      }
    }
  },
  plugins: []
}
