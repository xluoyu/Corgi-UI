const { nodeResolve } = require('@rollup/plugin-node-resolve') // 告诉 Rollup 如何查找外部模块
const vueJsx = require('rollup-plugin-vue-jsx-compat')
const esbuild = require('rollup-plugin-esbuild')
const vue = require('rollup-plugin-vue') // 处理vue文件
const fs = require('fs-extra') // 写文件
const postcss = require('rollup-plugin-postcss')
const { INPUT_PATH, OUTPUT_PATH, onwarn, PREFIX } = require('./config')

const plugins = [
  nodeResolve(),
  vue({
    preprocessStyles: true,
    target: 'browser',
  }),
  vueJsx(),
  postcss({
    use: ['less'],
    extract: true,
  }),
  esbuild({ jsxFactory: 'vueJsxCompat' }),
]

export default fs.readdirSync(`${INPUT_PATH}/components`).filter(e => e != 'index.ts').map(name => {
  const input = `${INPUT_PATH}/components/${name}/index.ts`
  return {
    input,
    plugins: [...plugins],
    external: ['lodash', 'vue', 'element-plus'],
    output: {
      name: 'index',
      file: `${OUTPUT_PATH}/components/${name}/index.js`,
      format: 'es',
      paths: id => {
        // if (/@corgi\/components/.test(id)) {
        //   return PREFIX + id.slice('@corgi/components'.length)
        // }
        if (/@corgi/.test(id)) {
          return PREFIX + id.slice('@corgi'.length)
        }
      },
    },
    onwarn,
  }
})
