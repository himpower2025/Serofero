import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      // SECURITY: GEMINI_API_KEY must NEVER be defined here. `define` inlines the
      // literal value into the shipped JS bundle, which means anyone can read it
      // straight out of devtools/network tab. The key now lives only in
      // server/index.js (server-side process.env), which the browser never sees.
      // The app version is safe to expose (not a secret) and keeps the in-app
      // footer in sync with package.json automatically.
      '__APP_VERSION__': JSON.stringify(process.env.npm_package_version || '1.0.0'),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify: file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Forward AI calls to the local Express proxy (server/index.js) during
      // `npm run dev` so the client never talks to Gemini directly.
      proxy: {
        '/api': {
          target: env.API_PROXY_TARGET || 'http://localhost:8787',
          changeOrigin: true,
        },
      },
    },
  };
});
