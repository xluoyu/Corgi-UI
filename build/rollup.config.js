import resolve from "@rollup/plugin-node-resolve"; // 告诉 Rollup 如何查找外部模块
import vueJsx from 'rollup-plugin-vue-jsx-compat'
import commonjs from "@rollup/plugin-commonjs"; // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import esbuild from "rollup-plugin-esbuild";
import vue from "rollup-plugin-vue"; // 处理vue文件
import less from 'rollup-plugin-less'
import alias from '@rollup/plugin-alias'
import fs from "fs-extra"; // 写文件
import path from "path";
import typescripts from 'rollup-plugin-typescript'
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

// let dirs = fs.readdirSync(`${INPUT_PATH}/components`).map((name) => {
//   return {
//     input: `${INPUT_PATH}/components/${name}/index.ts`,
//     external: ["vue"],
//     plugins: [resolve({ extensions: [".vue"] }), alias(aliasConfig), vue({preprocessStyles: true}), postcss(), vueJsx(), esbuild(), commonjs()],
//     output: {
//       name: "index",
//       file: `${OUTPUT_PATH}/${name}/index.js`,
//       format: "es",
//     },
//   };
// });

let dirs = [
  {
    input: `${INPUT_PATH}/components/test/test.vue`,
      external: ["vue"],
      plugins: [alias(aliasConfig), resolve({ extensions: [".vue"] }),image(),  vue(
        {
          preprocessStyles: true,
          template: {
            isProduction: true,
          },
          preprocessOptions: {
            less: {
              additionalData: `@import 'src/components/_style/mixin.less';`
            }
          }
        }
  ), postcss(), vueJsx(), esbuild(), commonjs()],
      output: {
        name: "index",
        file: `${OUTPUT_PATH}/scrollbar/index.js`,
        format: "es",
      },
  }
]

export default dirs;
