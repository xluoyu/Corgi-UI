import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import transformDemo from './build/transform/transform-demo'
import path from 'path'

export default defineConfig({
  plugins: [vueJsx(), transformDemo()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      },
      {
        find: 'site',
        replacement: path.resolve(__dirname, './site')
      }
    ]
  }
})
