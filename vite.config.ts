import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import transformDemo from './build/vite-plugin-demo2vue/index'
import { resolve } from 'path'


export default defineConfig({
  mode: 'production',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        play: resolve(__dirname, 'play/index.html'),
      },
    },
  },
  plugins: [vueJsx(), transformDemo()],
  resolve: {
    alias: [
      {
        find: '@site',
        replacement: resolve(__dirname, './site'),
      },
      {
        find: '@corgi',
        replacement: resolve(__dirname, './src'),
      },
      {
        find: 'corgi-box',
        replacement: resolve(__dirname, './src/index'),
      },
      {
        find: 'vue',
        replacement: resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js'),
      },
    ],
  },
})
