import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    include: ['tests/**/*.test.tsx'],
    alias: {
      "@/*":  new URL("/src/", import.meta.url).pathname,
      "@app/": new URL("./src/app/", import.meta.url).pathname,
      "@assets/": new URL("./src/assets/", import.meta.url).pathname,
      "@public": new URL("./public", import.meta.url).pathname
    }
  },
});

