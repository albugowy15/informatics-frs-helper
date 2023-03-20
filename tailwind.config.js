/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#00174B',
          200: '#002A78',
          300: '#003EA8',
          400: '#0053DB',
          500: '#306DFA',
          600: '#618BFF',
          700: '#8CA8FF',
          800: '#B4C5FF',
          900: '#DBE1FF',
        },
        secondary: {
          100: '#00201C',
          200: '#003731',
          300: '#005047',
          400: '#006B5F',
          500: '#008677',
          600: '#00A391',
          700: '#2FBFAC',
          800: '#55DBC7',
          900: '#75F8E3',
        },
        tertiary: {
          100: '#251A00',
          200: '#3E2E00',
          300: '#5A4400',
          400: '#775A00',
          500: '#957200',
          600: '#B48B00',
          700: '#D4A516',
          800: '#F2C036',
          900: '#FFDF97',
        },
        error: {
          100: '#410005',
          200: '#68000D',
          300: '#930017',
          400: '#BE0622',
          500: '#E32C37',
          600: '#FF5355',
          700: '#FF8984',
          800: '#FFB3AF',
          900: '#FFDAD7',
        },
        neutral: {
          100: '#1B1B1F',
          200: '#303034',
          300: '#46464A',
          400: '#5E5E62',
          500: '#77767A',
          600: '#919094',
          700: '#ACAAAF',
          800: '#C7C6CA',
          900: '#E4E2E6',
        },
        lightSurface: {
          100: '#FEFBFF'
        }
      },
      fontFamily: {
        primary: ['Roboto', fontFamily.sans]
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/line-clamp'),
  ],
}
