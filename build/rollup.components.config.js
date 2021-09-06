const { nodeResolve } = require('@rollup/plugin-node-resolve') // 告诉 Rollup 如何查找外部模块
const vueJsx = require('rollup-plugin-vue-jsx-compat')
const esbuild = require('rollup-plugin-esbuild')
const vue = require('rollup-plugin-vue') // 处理vue文件
const fs = require('fs-extra') // 写文件
const postcss = require('rollup-plugin-postcss')
const { INPUT_PATH, OUTPUT_PATH, onwarn } = require('./config')

const plugins = [
  nodeResolve(),
  vue({
    preprocessStyles: true,
    target: 'browser',
  }),
  vueJsx(),
  postcss({
    use: ['less'],
  }),
  esbuild({ jsxFactory: 'vueJsxCompat' }),

]

export default fs.readdirSync(`${INPUT_PATH}/components`).map(name => {
  const input = `${INPUT_PATH}/components/${name}/index.ts`
  return {
    input,
    plugins: [...plugins],
    external: ['vue', 'element-plus'],
    output: {
      name: 'index',
      file: `${OUTPUT_PATH}/cg-${name}/index.js`,
      format: 'es',
      paths: id => {
        if (/@components/.test(id)) {
          return '../cg-' + id.slice('@components/'.length)
        }
        if (/@hooks/.test(id)) {
          return '../hooks/' + id.slice('@hooks/'.length)
        }
        if (/@utils/.test(id)) {
          return '../utils/' + id.slice('@utils/'.length)
        }
      },
    },
    onwarn,
  }
})
