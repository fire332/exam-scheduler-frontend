/* eslint-env node */
import { join } from 'node:path';

import tsCfg from '../tsconfig.json' assert { type: 'json' };

/**
 * @param {string} baseDirectory current working directory
 * @returns {[string, ...string[]]}
 */
export function getProjects(baseDirectory) {
  const projects = [join(baseDirectory, './tsconfig.json')];
  return /** @type {[string, ...string[]]} */ (
    projects.concat(
      tsCfg.references.map((ref) => join(baseDirectory, ref.path)),
    )
  );
}

/** @type {ReadonlyArray<string>} */
export const TSC_LINT_ARGS = ['--incremental', '--noEmit', '-p'];

/** @type {ReadonlyArray<string>} */
export const ESLINT_BASE_ARGS = [
  '--report-unused-disable-directives',
  '--max-warnings=0',
];
