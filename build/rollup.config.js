import resolve from "@rollup/plugin-node-resolve"; // 告诉 Rollup 如何查找外部模块
import vueJsx from 'rollup-plugin-vue-jsx-compat'
import commonjs from "@rollup/plugin-commonjs"; // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import esbuild from "rollup-plugin-esbuild";
import vue from "rollup-plugin-vue"; // 处理vue文件
import less from 'rollup-plugin-less'
import alias from '@rollup/plugin-alias'
import fs from "fs-extra"; // 写文件
import path from "path";
import typescripts from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';

const INPUT_PATH = path.resolve(__dirname, "../src");
const OUTPUT_PATH = path.resolve(__dirname, "../lib");

const aliasConfig = {
  customResolver: resolve({extensions: [".vue", ".ts"]}),
  entries: [
    {find: '@', replacement: path.resolve(__dirname, '../src')}
  ]
}

const plugins = [
  resolve(),
  alias(aliasConfig),
  vue({
    preprocessStyles: true,
    template: {
      isProduction: true,
    }
  }),
  postcss(),
  vueJsx(),
  esbuild({jsxFactory: "vueJsxCompat"}),
]

const onwarn = (warning) => {
  // 跳过某些警告
  if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
  // 抛出异常
  if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message);
  // 控制台打印一切警告
  console.warn(warning.message);
}

let dirs = fs.readdirSync(`${INPUT_PATH}/components`).filter(name => name[0] !== '_').map((name) => {
  return {
    input: `${INPUT_PATH}/components/${name}/index.ts`,
    external: ["vue"],
    plugins: [...plugins],
    output: {
      name: "index",
      file: `${OUTPUT_PATH}/${name}/index.js`,
      format: "es",
    },
    onwarn
  };
});

// let components = fs.readdirSync(`${INPUT_PATH}/components`).filter(name => name[0] !== '_').map(name => {
//   return {
//     name: "index",
//     file: `${OUTPUT_PATH}/${name}/index.js`,
//     format: "es",
//   }
// })


dirs.push({
  input: `${INPUT_PATH}/index.ts`,
  external: ["vue", ".vue"],
  plugins: [
    resolve({extensions: ".vue"}),
    vue({
      preprocessStyles: true,
      template: {
        isProduction: true,
      },
      target: 'browser',
      css: false,
      exposeFilename: false,
    }),
    postcss(),
    alias(aliasConfig),
    typescripts({
      tsconfigOverride: {
        'include': [
          'src/components/**/*',
          'src/vue-shim.d.ts',
        ],
        'exclude': [
          'node_modules',
          'packages/**/__tests__/*',
        ],
      },
      abortOnError: false,
    }),
    vueJsx(),
  esbuild({jsxFactory: "vueJsxCompat"}),
  ],
  output: {
    name: "index",
    file: `${OUTPUT_PATH}/index.js`,
    format: "es"
  },
  onwarn
})

export default dirs;
