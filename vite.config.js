import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.datavortex.nl/kalenderapp',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'X-Api-Key': 'kalenderapp:0m01WGvb06SMv1D1T658',
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
  }
});