import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @satisfies {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans']
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
          950: 'color(display-p3 0.031 0.078 0 / <alpha-value>)'
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
          950: 'color(display-p3 0.067 0.012 0.016 / <alpha-value>)'
        },
        surface: {
          50: 'color(display-p3 0.918 0.941 0.98 / <alpha-value>)',
          100: 'color(display-p3 0.835 0.871 0.945 / <alpha-value>)',
          200: 'color(display-p3 0.694 0.749 0.867 / <alpha-value>)',
          300: 'color(display-p3 0.58 0.647 0.78 / <alpha-value>)',
          400: 'color(display-p3 0.475 0.537 0.663 / <alpha-value>)',
          500: 'color(display-p3 0.42 0.447 0.502 / <alpha-value>)',
          600: 'color(display-p3 0.29 0.341 0.451 / <alpha-value>)',
          700: 'color(display-p3 0.192 0.251 0.365 / <alpha-value>)',
          800: 'color(display-p3 0.11 0.157 0.251 / <alpha-value>)',
          900: 'color(display-p3 0.043 0.075 0.137 / <alpha-value>)',
          950: 'color(display-p3 0.02 0.039 0.082 / <alpha-value>)'
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
          800: 'color(display-p3 0.443 0.016 0.016 / <alpha-value>)',
          900: 'color(display-p3 0.216 0.004 0.004 / <alpha-value>)',
          950: 'color(display-p3 0.118 0 0 / <alpha-value>)'
        }
      }
    }
  }
};

export default config;
