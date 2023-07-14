import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  projectId: 'rjhkrq',
  retries: {
    runMode: 2,
    openMode: 2,
  },
  e2e: {
    baseUrl: 'http://localhost:4173',
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor());
    },
  },
});
