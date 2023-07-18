import tsCfg from './tsconfig.json' assert { type: 'json' };

const BASE_CODE_PATTERN = '*.{js,cjs,ts,tsx}';
const PRETTIER_CMD = 'prettier --ignore-unknown --write ';
const ESLINT_CMD =
  'eslint --report-unused-disable-directives --max-warnings=0 --fix ';
const BULK_THRESHOLD = 10;

function getProjects() {
  const projects = ['./tsconfig.json'];
  tsCfg.references.forEach((ref) => projects.push(ref.path));
  return projects;
}

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
for (const proj of getProjects()) {
  config[BASE_CODE_PATTERN + `*!(${proj.replaceAll('/', '\\')})`] = () =>
    `tsc --incremental --noEmit -p ${proj}`;
}

export default config;
