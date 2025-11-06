import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Get environment variables with fallbacks
// Use process.env for build-time variables (available in vite.config.js)
// Use import.meta.env for runtime variables (available in application code)
// Derive API_TARGET from VITE_API_URL (remove /api if present)
const getApiTarget = () => {
  const apiUrl = process.env.VITE_API_URL || 'http://localhost:5000/api';
  // If it ends with /api, remove it to get the base URL
  if (apiUrl.endsWith('/api')) {
    return apiUrl.slice(0, -4); // Remove '/api'
  }
  // If it's already a base URL, use it
  return apiUrl.replace(/\/api\/?$/, '') || 'http://localhost:5000';
};
const API_TARGET = process.env.VITE_API_TARGET || getApiTarget()
const DEV_PORT = parseInt(process.env.VITE_DEV_SERVER_PORT || '3000', 10)
const DEV_HOST = process.env.VITE_DEV_SERVER_HOST || 'localhost'

export default defineConfig({
  plugins: [react()],
  server: {
    port: DEV_PORT,
    host: DEV_HOST,
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
        secure: false,
        // Rewrite path if needed
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: process.env.VITE_BUILD_DIR || 'dist',
    sourcemap: true
  },
  // Define environment variables that will be available in the app
  define: {
    'import.meta.env.VITE_APP_TITLE': JSON.stringify(process.env.VITE_APP_TITLE || 'PDF Joiner Pro'),
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.VITE_APP_VERSION || '1.0.0'),
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:5000/api'),
  }
})

