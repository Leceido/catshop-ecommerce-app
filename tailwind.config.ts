import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(0%)', opacity: '0'},
          '100%': { transform: 'translateY(0)', opacity: '1'}
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: '1'},
          '100%': { transform: 'translateY(0%)', opacity: '0'}
        }
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards'
      }
    },
    colors: {
      'white' : '#ffffff',
      'black' : '#000000',
      'green': {
        100: '#ACE1A5',
        200: '#90BD8A',
        300: '#71946C',
        400: '#6B8B67',
        500: '#526B4E',
        600: '#324230'
      },
      orange: {
        100: '#E0BBA4',
        200: '#B88769',
        300: '#8F6951',
        500: '#614737',
        600: '#3D2D23'
      },
      blue: {
        100: '#8A80E0',
        200: '#7169B8',
        300: '#58518F',
        500: '#3B3761',
        600: '#26233D'
      },
      red: {
        50:'#fef2f2',
        100:'#fee2e2',
        200:'#fecaca',
        300:'#fca5a5',
        400:'#f87171',
        500:'#ef4444',
        600:'#dc2626',
        700:'#b91c1c',
        800:'#991b1b',
        900:'#7f1d1d',
        950:'#450a0a'
      },
      primary: {
        l_green: '#ACE1A5',
        green: '#6B8B67',
        l_orange: '#E0BBA4',
        orange: '#614737',
        l_blue: '#3B3761',
        blue: '#A9A4E0'
      }
    }
  },
  plugins: [],
}
export default config
