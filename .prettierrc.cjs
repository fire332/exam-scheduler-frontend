/** @satisfies {import('prettier').Config} */
module.exports = {
  singleQuote: true,

  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss', // MUST come last: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
  ],
  pluginSearchDirs: false,
};
