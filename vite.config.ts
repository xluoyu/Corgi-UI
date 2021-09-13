import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import transformDemo from './build/vite-plugin-demo2vue/index'
import path from 'path'


export default defineConfig({
  plugins: [vueJsx(), transformDemo()],
  resolve: {
    alias: [
      {
        find: '@site',
        replacement: path.resolve(__dirname, './site'),
      },
      {
        find: '@corgi',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: 'corgi-box',
        replacement: path.resolve(__dirname, './es'),
      },
    ],
  },
})
