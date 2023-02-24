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
          white_transparent: 'rgba(255,255,255,0.15)',
          light_blue_transparent: 'rgba(69, 123, 157, 0.5)'
        },
        fontFamily: {
          montserrat: ['Montserrat', 'system-ui'],
          rowdies: ['Rowdies', 'system-ui'],
        },
        animation:{
          'fade-in': 'fade-in 0.25s ease-out forwards' 
        },
        keyframes:{
          'fade-in': {
            '0%': { opacity: '0%' },  
            '100%': { opacity: '100%' }
          },
        },
        flexBasis:{
          '1/3-1rem': 'calc(33.333% - 1rem)'
        },
        width:{
          '1/3-1rem': 'calc(33.333% - 1rem)',
          '1/2-1rem': 'calc(50% - 1rem)',
          'full-2rem': 'calc(100% - 2rem)'
        }
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp')
    ],
  }