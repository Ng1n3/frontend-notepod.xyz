import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config'; 

export default defineConfig({
  // plugins: [react(), eslint()],
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/mocks/vitest-setup.ts'],
  },
});
