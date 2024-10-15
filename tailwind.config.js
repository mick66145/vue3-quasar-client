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
