import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void:    '#030305',
        base:    '#08080F',
        surface: '#0D0D1A',
        raised:  '#121228',
        crimson: { DEFAULT: '#E82035', dark: '#A01525', muted: '#1E0810' },
        steel:   { DEFAULT: '#6070A0', light: '#90A8D0', dark: '#303558' },
        frost:   '#ECF0FF',
        ink:     '#F4F6FF',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
