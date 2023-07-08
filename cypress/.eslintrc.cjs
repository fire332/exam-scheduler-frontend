/* eslint-env node */

/** @satisfies {import('eslint').Linter.Config} */
module.exports = {
  env: {
    'cypress/globals': true,
    es2022: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:cypress/recommended',
    'prettier'
  ],
  parserOptions: {
    project: ['./tsconfig.json']
  },
  plugins: ['cypress', '@typescript-eslint']
};
