/**
 * 对组件库进行打包
 *
 * 拆分SFC中的style
 *
 * 生成.d.ts
 *
 * rollup
 */
import fs from 'fs'
import { resolve } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve' // 告诉 Rollup 如何查找外部模块
import { rollup } from 'rollup'
import vue from 'rollup-plugin-vue'
import vueJsx from 'rollup-plugin-vue-jsx-compat'
import esbuild from 'rollup-plugin-esbuild'
import { compRoot } from './paths'
import postcss from 'rollup-plugin-postcss'
import { green, red, yellow } from './config'
import getDts from './gen-dts'

const getComponents = async () => {
  const entry = resolve(compRoot, './components')
  const raw = await fs.promises.readdir(entry)
  return raw
    .map(e => ({ path: resolve(entry, e), name: e }))
}

const getOtherFiles = async () => {
  const raw = await fs.promises.readdir(compRoot)
  return raw
    .filter(e => e !== 'components')
    .filter(e => e !== 'package.json')
    .filter(e => e !== 'dist')
    .map(e => ({ path: resolve(compRoot, e), name: e }))
}

const OUTPUT_PATH = resolve(compRoot, './dist')


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
        nodeResolve(),
        vue({
          preprocessStyles: true,
          target: 'browser',
        }),
        vueJsx({}),
        esbuild({ jsxFactory: 'vueJsxCompat' }),
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
    console.log(e)
    /**
     * 报错就结束
     */
    red(e.message)
    process.exit(1)
  }
}

const buildOtherFile = async () => {
  const files = await getOtherFiles()

  const builds = files.map(async ({ path, name }) => {
    const isFile = fs.lstatSync(path).isFile()
    const entry = isFile ? path : resolve(path, './index.ts')
    const rollupConfig = {
      input: entry,
      plugins: [
        nodeResolve(),
        esbuild(),
      ],
      external: id => {
        return (
          id.startsWith('../') ||
          id.startsWith('./components') ||
          id.startsWith(PREFIX) ||
          id.startsWith('lodash-es') ||
          id.startsWith('vue')
        )
      },
    }

    const esm = {
      name,
      file: isFile ? (`${OUTPUT_PATH}/${name.replace('ts', 'js')}`) : `${OUTPUT_PATH}/${name}/index.js`,
      format: 'es',
    }

    const bundle = await rollup(rollupConfig)
    await bundle.write(esm as any)
  })


  try{
    await Promise.all(builds)
  } catch(e) {
    console.log(e)
    /**
     * 报错就结束
     */
    red(e.message)
    process.exit(1)
  }
}

;(async () => {
  yellow('开始生成类型说明')
  await getDts(compRoot, true)
  green('类型说明生成完成')

  yellow('开始打包组件')
  await buildComponents()
  green('组件打包完成')

  yellow('开始打包附属文件')
  await buildOtherFile()
  green('附属文件打包完成')
})()
