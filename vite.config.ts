import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import transformDemo from './build/vite-plugin-demo2vue/index'
import { resolve } from 'path'
import { corgiRoot, pkgRoot } from './build/paths'
import { babel } from '@rollup/plugin-babel'

export default defineConfig({
  // mode: 'production',
  // root: './website',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        play: resolve(__dirname, './webtest/index.html'),
      },
      plugins: [
        babel({
          babelHelpers: 'bundled',
        }),
      ],
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
