const colors = require('tailwindcss/colors')
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx,vue,svelte}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        qDark: 'var(--color-dark)',
        positive: 'var(--color-positive)',
        negative: 'var(--color-negative)',
        info: 'var(--color-info)',
        warning: 'var(--color-warning)',
        func: {
          focus: 'var(--color-func-focus)',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              'text-decoration': 'none',
            },
            hr: {
              margin: 0,
            },
            img: {
              margin: 0,
            },
            h1: {
              'font-size': '4rem',
              'line-height': '4rem',
              'font-weight': 600,
              'margin-top': '1rem',
              'margin-bottom': '2rem',
            },
            h2: {
              'font-size': '3.5rem',
              'line-height': '3.5rem',
              'font-weight': 600,
              'margin-top': '1rem',
              'margin-bottom': '2rem',
            },
            h3: {
              'font-size': '2.75rem',
              'line-height': '3rem',
              'font-weight': 500,
              'margin-top': '1rem',
              'margin-bottom': '2rem',
            },
            h4: {
              'font-size': '2.125rem',
              'line-height': '2.5rem',
              'font-weight': 500,
              'margin-top': '1rem',
              'margin-bottom': '2rem',
            },
            h5: {
              'font-size': '1.5rem',
              'line-height': '2rem',
              'font-weight': 400,
              'margin-top': '1rem',
              'margin-bottom': '2rem',
            },
            h6: {
              'font-size': '1.25rem',
              'line-height': '2rem',
              'font-weight': 400,
              'margin-top': '1rem',
              'margin-bottom': '2rem',
            },
          },
        },
      },
    },
    screens: {
      xs: '0',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
      'lt-2xl': { max: '1400px' },
      'lt-xl': { max: '1200px' },
      'lt-lg': { max: '992px' },
      'lt-md': { max: '768px' },
      'lt-sm': { max: '576px' },
    },
  },
  plugins: [],
}
