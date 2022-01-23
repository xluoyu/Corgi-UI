/**
 * 打包组件
 */
import fs from 'fs'
import { resolve } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve' // 告诉 Rollup 如何查找外部模块
import { rollup } from 'rollup'
import vue from 'rollup-plugin-vue'
// import css from 'rollup-plugin-css-only'
import vueJsx from 'rollup-plugin-vue-jsx-compat'
import esbuild from 'rollup-plugin-esbuild'
import chalk from 'chalk'
import { compRoot } from './paths'
import postcss from 'rollup-plugin-postcss'
import { OUTPUT_PATH, green, red, yellow } from './config'
import getDts from './gen-dts'

const getComponents = async () => {
  const raw = await fs.promises.readdir(compRoot)
  return raw
    .filter(e => e !== 'package,json' && e !== 'index.ts' && e !== 'utils')
    .map(e => ({ path: resolve(compRoot, e), name: e }))
}

const plugins = [
  nodeResolve(),
  vue({
    preprocessStyles: true,
    target: 'browser',
  }),
  vueJsx({}),
  esbuild({ jsxFactory: 'vueJsxCompat' }),
]

const PREFIX = '@corgi-box'

const buildComponents = async () => {
  const components = await getComponents()

  const builds = components.map(async ({ path, name }) => {
    const entry = resolve(path, './index.ts')
    if (!fs.existsSync(entry)) return

    const esm = {
      name: 'index',
      file: `${OUTPUT_PATH}/components/${name}/index.js`,
      format: 'es',
      paths: id => {
        if (id.startsWith(`${PREFIX}/components`)) {
          return id.replace(`${PREFIX}/components`, '..')
        }
        return id
      },
    }

    const rollupConfig = {
      input: entry,
      plugins: [
        ...plugins,
        postcss({
          use: ['less'],
          extract: `${OUTPUT_PATH}/components/${name}/index.css`,
        }),
      ],
      external: id => {
        return (
          id.startsWith(PREFIX) ||
          id.startsWith('lodash-es') ||
          id.startsWith('vue') ||
          id.startsWith('element-plus')
        )
      },
    }

    const bundle = await rollup(rollupConfig)
    await bundle.write(esm as any)
  })

  try{
    await Promise.all(builds)
  } catch(e) {
    /**
     * 报错就结束
     */
    red(e.message)
    process.exit(1)
  }
}



;(async () => {
  yellow('开始生成类型说明')
  await getDts(compRoot)
  green('类型生成完毕')

  yellow('开始打包组件')
  await buildComponents()
})()
