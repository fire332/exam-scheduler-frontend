/* eslint-env node */

import { execa } from 'execa';

import { Listr } from 'listr2';
import { relative } from 'path';
import { ESLINT_BASE_ARGS, TSC_LINT_ARGS, getProjects } from './utils.js';

process.title = 'Lint';

/** @satisfies {import('execa').Options} */
const execaOpts = {
  preferLocal: true,
};

const tasks = new Listr([], { concurrent: true });

// TypeScript checks
getProjects(process.cwd())
  .map((cfgPath) => ({
    title: `tsc -p ${relative(process.cwd(), cfgPath)}`,
    task: () => execa('tsc', [...TSC_LINT_ARGS, cfgPath], execaOpts),
    enabled: process.argv.includes('--typescript'),
  }))
  .forEach((task) => tasks.add(task));

// ESLint checks
tasks.add({
  title: 'eslint .',
  task: () => execa('eslint', [...ESLINT_BASE_ARGS, '.'], execaOpts),
  enabled: process.argv.includes('--eslint'),
});

await tasks.run();
