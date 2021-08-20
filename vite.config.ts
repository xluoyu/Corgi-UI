import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import transformDemo from './build/transform-demo'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx(), transformDemo()],
  resolve: {
    alias: 
      process.env.NODE_ENV !== 'production'
      ? [
          {
            find: '@',
            replacement: path.resolve(__dirname, './src')
          },
          {
            find: 'site',
            replacement: path.resolve(__dirname, './site')
          }
        ]
      : undefined
  }
})
