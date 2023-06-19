# Developing

## Setup

### 1. Prerequisites

- PNPM version >=8.6.2: https://pnpm.io/installation
- Node.js ^18.16.0: https://nodejs.org/en
- VSCode

### 2. Environment

- Install recommended project-specific VSCode extensions
- Run command `pnpm install`

## `package.json` script explanation

### dev

Starts a Fast Refresh dev server.

Fast Refresh is a React feature that allows you to edit code in your React components and have your changes applied in real-time without losing component state.

See: https://vitejs.dev/guide/cli.html#dev-server

### build

Compiles a production-ready bundle of HTML, CSS, and JS to the `dist` folder.

We auto-deploy to `render.com` so this script is only used for CI/CD purposes.

See: https://vitejs.dev/guide/cli.html#build

### lint

Manually lints the entire project.

VSCode should auto-lint for you so this script is only used for CI/CD purposes.

### preview

Only used to debug discrepancies between development and production-ready bundles which are extremely rare.

See: https://vitejs.dev/guide/cli.html#vite-preview

### storybook

Similar to the `dev` script but for Storybook. Starts a Fast Refresh dev server for previewing React components in isolation.

See: https://storybook.js.org/docs/react/get-started/why-storybook

### build-storybook

Only used for Chromatic.

### prepare

Auto-triggered by `pnpm install`. Sets up git pre-commit hooks to prevent committing code with formatting or linting errors.
