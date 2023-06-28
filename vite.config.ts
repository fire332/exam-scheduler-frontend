import react from '@vitejs/plugin-react-swc';
import { env } from 'node:process';
import { defineConfig, type UserConfigExport } from 'vite';

const config = {
  plugins: [react()],
  server: {
    host: env.CODESPACES ? true : undefined,
    proxy: {
      '/api/': {
        target: 'https://fic-exam-scheduler-api-6f324588b682.herokuapp.com/',
        changeOrigin: true
      },
      '/oauth/v2/': {
        target: 'https://fancy-runnable-unicorn-dfmpp0.zitadel.cloud/oauth/v2/',
        changeOrigin: true
      }
    }
  }
} satisfies UserConfigExport;

// https://vitejs.dev/config/
export default defineConfig(config);
