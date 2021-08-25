import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import transformDemo from './build/vite-plugin-demo2vue/transform-demo'
import path from 'path'

export default defineConfig({
  plugins: [vueJsx(), transformDemo()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components')
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, './src/hooks')
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, './src/utils')
      },
      {
        find: 'site',
        replacement: path.resolve(__dirname, './site')
      }
    ]
  }
})
