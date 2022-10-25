/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primiry-color': '#15111e',
        'text-color': '#78777a',
        'subtext-color': '#c2bfc9',
        'overlay-color': '#00000099',
        'overlay-hover-color': '#ffffff1a',
        'overlay-black-color': '#000000b3'
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
