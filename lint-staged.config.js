/* eslint-env node */

import { ESLINT_BASE_ARGS, TSC_LINT_ARGS, getProjects } from './tools/utils.js';

const BASE_CODE_PATTERN = '*.{js,cjs,ts,tsx}';
const ESLINT_CMD = ['eslint', ...ESLINT_BASE_ARGS, '--fix', ''].join(' ');
const PRETTIER_CMD = 'prettier --ignore-unknown --write ';
const BULK_THRESHOLD = 10;

/** @type {import('lint-staged').Config} */
const config = {
  [BASE_CODE_PATTERN]: (filenames) => {
    if (filenames.length > BULK_THRESHOLD)
      return [ESLINT_CMD + '.', PRETTIER_CMD + '.'];

    const filesStr = filenames.map((filename) => `'${filename}'`).join(' ');
    return [ESLINT_CMD + filesStr, PRETTIER_CMD + filesStr];
  },
  [`!(${BASE_CODE_PATTERN})`]: PRETTIER_CMD,
};

// Workaround for tsc not supporting --build --noEmit together.
for (const proj of getProjects(process.cwd())) {
  config[BASE_CODE_PATTERN + `*!(${proj.replaceAll('/', '\\')})`] = () =>
    ['tsc', ...TSC_LINT_ARGS, proj].join(' ');
}

export default config;
