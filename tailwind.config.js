const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
      keyframes: {
        showAndHide: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      bgGradientDeg: {
        45: '45deg'
      },
      colors: {
        'primary-font-color': '#5E5873',
        gray: '#6E6B7B',
        'gray-light': '#B9B9C3',
        'blue-primary': '#5D7FC8',
        'red-primary': '#EA5455',
        'background-color': '#F8F8F8',
        'purple-primary': '#3554D1',
        'purple-secondary': '#8B9AD7',
        'border-gray': '#EBE9F1',
        'border-gray-light': '#D8D6DE',
      },
      fontSize: {
        title: '18px',
        subtitle: '14px',
        text: '12px'
      },
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        subtitle: ['Montserrat', 'sans-serif'],
        text: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`
          })
        },
        {
          // values from config and defaults you wish to use most
          values: Object.assign(
            theme('bgGradientDeg', {}), // name of config key. Must be unique
            {
              10: '10deg', // bg-gradient-10
              15: '15deg',
              20: '20deg',
              25: '25deg',
              30: '30deg',
              45: '45deg',
              60: '60deg',
              90: '90deg',
              120: '120deg',
              135: '135deg'
            }
          )
        }
      )
    })
  ]
}
