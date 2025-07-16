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
      // Основные цвета
      background: '#0a0e1a', // Темно-синий для глубин
      foreground: '#ffffff',

      // Подводная палитра
      ocean: {
        surface: '#4dd9ea', // Поверхность океана
        shallow: '#2494c7', // Мелководье
        medium: '#1a73a1', // Средняя глубина
        deep: '#0d4a6b', // Глубокие воды
        abyss: '#0a0e1a', // Бездна
      },

      // Пузырьки и эффекты
      bubble: {
        light: '#b8e6ff', // Светлые пузырьки
        medium: '#7dd3fc', // Средние пузырьки
        dark: '#38bdf8', // Темные пузырьки
      },

      // Водоросли и растительность
      seaweed: {
        light: '#4ade80', // Светлые водоросли
        dark: '#16a34a', // Темные водоросли
      },

      // Рыбы и существа
      fish: {
        puffer: '#fbbf24', // Цвет рыб-шаров
        accent: '#f59e0b', // Акцентный цвет
      },

      // Дополнительные цвета
      section: '#0f1825',
      gray: '#64748b',
      transparent: 'transparent',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
