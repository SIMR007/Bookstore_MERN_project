

/*  @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    }, 
    colors: {
      cream: {
        50: '#fdf4ec',
        100: 'rgba(238, 229, 218, 1)',
        200: '#eee7de',
        250:'#DECAB1',
        220:'#E5DBCE'
      },
      brown: {
        50: 'rgba(102, 102, 102, 1)',
        100: 'rgba(51, 51, 51, 1)',
        200: 'rgba(110, 83, 73, 1)',
      },
     'white' : '#fff',
     'transparent':'#f0f8ff00',
     '#333333':'#333333'
    },
  },
  plugins: [],
}