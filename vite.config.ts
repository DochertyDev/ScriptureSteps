import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load environment variables based on the current mode
    // Second parameter is the directory to search for .env files.
    // Third parameter is the prefix for environment variables to be loaded.
    const env = loadEnv(mode, process.cwd(), '');

    return {
      // Conditionally set the base path
      base: mode === 'development' ? '/' : '/ScriptureSteps/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Expose environment variables to your client-side code
        // e.g., import.meta.env.VITE_SOME_KEY
        'process.env': env
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});