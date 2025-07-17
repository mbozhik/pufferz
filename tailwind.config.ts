import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    screens: {
      xl: {max: '1780px'},
      sm: {max: '500px'},
    },
    fontFamily: {
      sans: ['var(--font-manrope)', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      background: '#0B1E3F',

      foreground: {
        DEFAULT: '#FFFFFF',
        blue: '#cadeff',
        light: '#A0B9DE',
      },

      primary: '#78C1FF',
      secondary: '#4880C7',
      border: '#1B3B6F',

      transparent: 'transparent',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
