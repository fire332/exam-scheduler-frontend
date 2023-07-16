/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-env node */
const baseCfg = require('./.prettierrc.cjs');

/** @satisfies {import('prettier').Config} */
const config = {
  ...baseCfg,
};

// Don't use prettier-plugin-tailwindcss in editor.
const idx = config.plugins.lastIndexOf('prettier-plugin-tailwindcss');
config.plugins.splice(idx, 1);

module.exports = config;
