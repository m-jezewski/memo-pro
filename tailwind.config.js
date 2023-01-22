/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          dark_blue_1: '#1D3557',
          red_1: '#E63946',
          white_1: '#F1FAEE',
          light_blue_1: '#457B9D',
        },
        fontFamily: {
          montserrat: ['Montserrat', 'system-ui'],
          rowdies: ['Rowdies', 'system-ui'],
        },
      },
    },
    plugins: [],
  }