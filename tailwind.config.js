import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @satisfies {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans'],
    },
    extend: {
      colors: {
        primary: {
          50: 'color(display-p3 0.929 1 0.878 / <alpha-value>)',
          100: 'color(display-p3 0.875 0.992 0.788 / <alpha-value>)',
          200: 'color(display-p3 0.749 0.969 0.592 / <alpha-value>)',
          300: 'color(display-p3 0.627 0.929 0.412 / <alpha-value>)',
          400: 'color(display-p3 0.506 0.882 0.239 / <alpha-value>)',
          500: 'color(display-p3 0.4 0.737 0.161 / <alpha-value>)',
          600: 'color(display-p3 0.318 0.624 0.098 / <alpha-value>)',
          700: 'color(display-p3 0.235 0.482 0.059 / <alpha-value>)',
          800: 'color(display-p3 0.153 0.333 0.027 / <alpha-value>)',
          900: 'color(display-p3 0.075 0.173 0.008 / <alpha-value>)',
          950: 'color(display-p3 0.031 0.078 0 / <alpha-value>)',
        },
        secondary: {
          50: 'color(display-p3 0.98 0.898 0.906 / <alpha-value>)',
          100: 'color(display-p3 0.965 0.796 0.812 / <alpha-value>)',
          200: 'color(display-p3 0.929 0.592 0.62 / <alpha-value>)',
          300: 'color(display-p3 0.89 0.388 0.431 / <alpha-value>)',
          400: 'color(display-p3 0.855 0.184 0.239 / <alpha-value>)',
          500: 'color(display-p3 0.682 0.122 0.169 / <alpha-value>)',
          600: 'color(display-p3 0.545 0.098 0.133 / <alpha-value>)',
          700: 'color(display-p3 0.408 0.071 0.102 / <alpha-value>)',
          800: 'color(display-p3 0.271 0.047 0.067 / <alpha-value>)',
          900: 'color(display-p3 0.137 0.024 0.035 / <alpha-value>)',
          950: 'color(display-p3 0.067 0.012 0.016 / <alpha-value>)',
        },
        surface: {
          50: 'color(display-p3 0.969 0.969 0.973 / <alpha-value>)',
          100: 'color(display-p3 0.933 0.937 0.945 / <alpha-value>)',
          200: 'color(display-p3 0.867 0.875 0.894 / <alpha-value>)',
          300: 'color(display-p3 0.804 0.816 0.843 / <alpha-value>)',
          400: 'color(display-p3 0.678 0.698 0.741 / <alpha-value>)',
          500: 'color(display-p3 0.545 0.573 0.635 / <alpha-value>)',
          600: 'color(display-p3 0.42 0.451 0.522 / <alpha-value>)',
          700: 'color(display-p3 0.31 0.333 0.388 / <alpha-value>)',
          800: 'color(display-p3 0.212 0.227 0.267 / <alpha-value>)',
          900: 'color(display-p3 0.106 0.114 0.133 / <alpha-value>)',
          950: 'color(display-p3 0.055 0.059 0.067 / <alpha-value>)',
        },
        error: {
          50: 'color(display-p3 1 0.922 0.922 / <alpha-value>)',
          100: 'color(display-p3 0.996 0.824 0.824 / <alpha-value>)',
          200: 'color(display-p3 0.988 0.671 0.671 / <alpha-value>)',
          300: 'color(display-p3 0.98 0.502 0.502 / <alpha-value>)',
          400: 'color(display-p3 0.969 0.353 0.353 / <alpha-value>)',
          500: 'color(display-p3 0.949 0.188 0.188 / <alpha-value>)',
          600: 'color(display-p3 0.875 0.043 0.043 / <alpha-value>)',
          700: 'color(display-p3 0.655 0.027 0.027 / <alpha-value>)',
          800: 'color(display-p3 0.250 0.010 0.010 / <alpha-value>)',
          900: 'color(display-p3 0.216 0.004 0.004 / <alpha-value>)',
          950: 'color(display-p3 0.118 0 0 / <alpha-value>)',
        },
      },
    },
  },
};

export default config;
