const { nodeResolve } = require('@rollup/plugin-node-resolve') // 告诉 Rollup 如何查找外部模块
const esbuild = require('rollup-plugin-esbuild')
const fs = require('fs-extra') // 写文件
const { INPUT_PATH, OUTPUT_PATH, onwarn, PREFIX } = require('./config')

const plugins = [
  nodeResolve(),
  esbuild(),
]

const hooks = fs.readdirSync(`${INPUT_PATH}/hooks`).filter(e => e !== 'test').map(name => {
  const input = `${INPUT_PATH}/hooks/${name}/index.ts`
  return {
    input,
    plugins: [...plugins],
    external: ['vue'],
    output: {
      name,
      file: `${OUTPUT_PATH}/hooks/${name}.js`,
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

const utils = fs.readdirSync(`${INPUT_PATH}/utils`).filter(e => e !== 'test').map(item => {
  const name = item.split('.')[0]
  const input = `${INPUT_PATH}/utils/${name}.ts`
  return {
    input,
    plugins: [...plugins],
    external: ['vue'],
    output: {
      name,
      file: `${OUTPUT_PATH}/utils/${name}.js`,
      format: 'es',
    },
    onwarn,
  }
})

const directives = fs.readdirSync(`${INPUT_PATH}/directives`).filter(e => e !== 'test').map(item => {
  const name = item.split('.')[0]
  const input = `${INPUT_PATH}/directives/${name}/index.ts`
  return {
    input,
    plugins: [...plugins],
    external: ['vue'],
    output: {
      name,
      file: `${OUTPUT_PATH}/directives/${name}.js`,
      format: 'es',
    },
    onwarn,
  }
})

export default [...hooks, ...utils, ...directives]
