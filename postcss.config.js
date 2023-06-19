/** @satisfies {import('postcss-load-config').Config} */
export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-preset-env': {}
  }
};
