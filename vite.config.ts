import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import transformDemo from './build/transform-demo'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({}), transformDemo()],
  resolve: {
    alias: 
      process.env.NODE_ENV !== 'production'
      ? [
          {
            find: '@',
            replacement: path.resolve(__dirname, './src')
          }
        ]
      : undefined
  }
})
