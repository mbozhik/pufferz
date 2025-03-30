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
      background: '#171717',
      foreground: '#ffffff',

      section: '#282828',
      gray: '#7f7f7f',

      transparent: 'transparent',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
