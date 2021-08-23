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
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'Corgi',
      fileName: (format) => `Corgi.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
