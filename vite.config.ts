
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Needed for Docker port mapping
    port: 5173,
    allowedHosts: ['objectionable-unwindowed-rosana.ngrok-free.dev'],
    watch: {
      usePolling: true // Needed for hot reload in some Docker environments (Windows)
    }
  }
});
