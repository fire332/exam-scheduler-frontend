import react from '@vitejs/plugin-react-swc';
import { env } from 'node:process';
import { defineConfig, type UserConfigExport } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config = {
  plugins: [react(), tsconfigPaths()],
  server: {
    host: env.CODESPACES ? true : undefined,
  },
} satisfies UserConfigExport;

// https://vitejs.dev/config/
export default defineConfig(config);
