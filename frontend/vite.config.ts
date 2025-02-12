import crypto from 'crypto';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: (name, filename, css) => {
        const componentName = filename
          .replace(/\..+/, '')
          .split('/')
          .pop();

        const hash = crypto
          .createHash('md5')
          .update(css)
          .digest('base64')
          .replace(/\W/g, '')
          .substring(0, 5);

        return `${componentName}_${name}_${hash}`;
      },
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@modules': path.resolve(__dirname, './src/modules'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@UIKit': path.resolve(__dirname, './src/modules/UIKit/index'),
    },
  },
  define: {
    'process.env': process.env,
  },
  server: {
    open: true,
    port: 3000,
  },
})
