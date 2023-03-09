/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [require('flowbite/plugin')],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        purple: '#4d52ff',
        lightpurple: '#a8abff',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
};
