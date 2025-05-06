// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    root: 'src',
    server: {
      host: '0.0.0.0', // ✅ Accept connections from LAN
      port: 5173        // or any open port
    }
  });
  