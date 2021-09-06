const { INPUT_PATH, OUTPUT_PATH, onwarn } = require('./config')
const { nodeResolve } = require('@rollup/plugin-node-resolve') // 告诉 Rollup 如何查找外部模块
const vueJsx = require('rollup-plugin-vue-jsx-compat')
const esbuild = require('rollup-plugin-esbuild')
const vue = require('rollup-plugin-vue') // 处理vue文件
const postcss = require('rollup-plugin-postcss')
const typescript2 = require('rollup-plugin-typescript2')
const path = require('path')

export default {
  input: `${INPUT_PATH}/index.ts`,
  plugins: [
    nodeResolve(),
    typescript2({
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      tsconfigOverride: {
        check: false,
        compilerOptions: { declaration: false },
      },
    }),
    vue({
      preprocessStyles: true,
      target: 'browser',
    }),
    postcss(),
    vueJsx(),
    esbuild({ jsxFactory: 'vueJsxCompat', minify: true }),

    // alias({
    //   entries: [
    //     {
    //       find: '@components',
    //       replacement: path.resolve(__dirname, '../src/components'),
    //     },
    //     {
    //       find: '@hooks',
    //       replacement: path.resolve(__dirname, '../src/hooks'),
    //     },
    //     {
    //       find: '@utils',
    //       replacement: path.resolve(__dirname, '../src/utils'),
    //     },
    //   ],
    // }),
  ],
  external: ['vue', 'element-plus'],
  output: {
    name: 'index',
    file: `${OUTPUT_PATH}/index.esm.js`,
    format: 'cjs',
    // paths: id => {
    /**
       * 对引用文件进行改写
       *
       * 不将其打入文件包中
       * 并将alias改为打包后的引用路径
       */
    // if (/@components/.test(id)) {
    //   return './cg-' + id.slice('@components/'.length)
    // }
    // if (/@hooks/.test(id)) {
    //   return './hooks/' + id.slice('@hooks/'.length)
    // }
    // if (/@utils/.test(id)) {
    //   return './utils/' + id.slice('@utils/'.length)
    // }
    // },
  },
  onwarn,
}
