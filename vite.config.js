import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'fs';
import path from 'path';

const __dirname = path.resolve();
const pkg = JSON.parse(readFileSync('./package.json'));

console.log(pkg);
const isProduction = process.env.NODE_ENV === 'production';
export default defineConfig({
  plugins: [
    svelte({
      hot: !isProduction,
      emitCss: true,
      extensions: ['.svelte']
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: pkg.name,
      fileName: (format) => `${pkg.name}.${format}.js`
    }
  }
});
