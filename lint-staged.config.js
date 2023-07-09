/** @satisfies {import('lint-staged').Config} */
export default {
  '**/*.{js,cjs,ts,tsx}': () => [
    'tsc',
    'eslint --report-unused-disable-directives --max-warnings=0'
  ],
  '*': 'prettier --ignore-unknown --write'
};
