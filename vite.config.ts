/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`          -> normal multi-chunk build for hosting (clean URLs, needs SPA redirect)
// `npm run build:preview`  -> one self-contained HTML file with hash routing, opens by double-click
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'preview' ? [viteSingleFile()] : [])],
  base: mode === 'preview' ? './' : '/',
  define: { __PREVIEW__: JSON.stringify(mode === 'preview') },
  build: {
    target: 'es2020',
    outDir: mode === 'preview' ? 'dist-preview' : 'dist',
    assetsInlineLimit: mode === 'preview' ? 100000000 : 4096,
    cssCodeSplit: mode !== 'preview',
    rollupOptions: mode === 'preview' ? { output: { inlineDynamicImports: true } } : undefined,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
}));
