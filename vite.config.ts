import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: 'devex_[local]_[hash:6]',
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(rootDir, 'src/index.ts'),
        'docs/index': resolve(rootDir, 'src/docs/index.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        chunkFileNames: 'shared.js',
        assetFileNames: (asset) => {
          if (asset.name?.endsWith('.css')) {
            return 'styles.css';
          }
          return '[name][extname]';
        },
      },
    },
  },
});
