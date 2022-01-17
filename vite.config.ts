import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import transformDemo from './build/vite-plugin-demo2vue/index'
import { resolve } from 'path'
import { corgiRoot, pkgRoot } from './config/paths'

export default defineConfig({
  // mode: 'production',
  // root: './website',
  build: {
    rollupOptions: {
      input: {
        // main: resolve(__dirname, 'website/index.html'),
        play: resolve(__dirname, 'webtest/index.html'),
      },
    },
  },
  plugins: [vueJsx(), transformDemo()],
  resolve: {
    alias: [
      {
        find: '@site',
        replacement: resolve(__dirname, './website'),
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js',
      },
    ],
  },
})
