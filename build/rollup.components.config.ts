import { nodeResolve } from '@rollup/plugin-node-resolve' // 告诉 Rollup 如何查找外部模块
import vueJsx from 'rollup-plugin-vue-jsx-compat'
import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue' // 处理vue文件
import fs from 'fs-extra' // 写文件
import postcss from 'rollup-plugin-postcss'
import { OUTPUT_PATH, onwarn, PREFIX } from './config'
import { compRoot } from './paths'
console.log(compRoot)

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

export default fs.readdirSync(`${compRoot}/components`).filter(e => e != 'index.ts').map(name => {
  const input = `${compRoot}/components/${name}/index.ts`
  return {
    input,
    plugins: [...plugins],
    external: ['lodash-es', 'vue', 'element-plus'],
    output: {
      name: 'index',
      file: `${OUTPUT_PATH}/components/${name}/index.js`,
      format: 'es',
      paths: id => {
        if (/@corgi/.test(id)) {
          return PREFIX + id.slice('@corgi'.length)
        }
      },
    },
    onwarn,
  }
})
