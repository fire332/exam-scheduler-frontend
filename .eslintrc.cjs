/* eslint-env node */

/** @satisfies {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.*.json'],
  },
  plugins: ['react-refresh', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
    linkComponents: [{ name: 'Link', linkAttribute: 'to' }],
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'arrow-body-style': ['error', 'as-needed'],
    'react-refresh/only-export-components': 'error',

    // @typescript-eslint rules
    '@typescript-eslint/consistent-type-exports': [
      'error',
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/require-array-sort-compare': [
      'error',
      { ignoreStringArrays: true },
    ],
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreVoidOperator: true, ignoreArrowShorthand: true },
    ],
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',

    // eslint-plugin-react rules
    'react/jsx-no-bind': [
      'error',
      {
        ignoreDOMComponents: true,
        ignoreRefs: true,
      },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-undef': 'off', // TypeScript catches this for us already
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-uses-vars': 'off', // TypeScript catches this for us already
    'react/no-access-state-in-setstate': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-namespace': 'error',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/prop-types': 'off', // TypeScript catches this for us already
    'react/self-closing-comp': 'error',
    'react/void-dom-elements-no-children': 'error',
  },
};
