import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: 'https://exam-scheduler-backend.onrender.com/',
        changeOrigin: true
      },
      '/oauth/v2/': {
        target: 'https://fancy-runnable-unicorn-dfmpp0.zitadel.cloud/oauth/v2/',
        changeOrigin: true
      }
    }
  }
});
