module.exports = {
  
  purge: ['./components//*.{js,ts,jsx,tsx}', './pages//*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        'n': '280px',
      },
      maxHeight: {
        'n': '280px',
      },
      colors: {
        primary: '#F1F3F8',
        colorOne: '#C6D947',
        colorTwo: '#F3542A',
        colorThree: '#F5972C',
        colorFour: '#7049F0',
        colorFive: '#0AA4F6',
        secondary: '#31291D'
      },
      margin: {
        '1/12': '8.333333%',
        '2/12': '16.666667%',
      }
    },
  },
  variants: {
    extend: {
      display: ['hover', 'focus'],
    },
  },
  plugins: [],
}
