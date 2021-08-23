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
import babel from 'rollup-plugin-babel'

const INPUT_PATH = path.resolve(__dirname, "../src");
const OUTPUT_PATH = path.resolve(__dirname, "../lib");

const aliasConfig = {
  customResolver: resolve({extensions: [".vue", ".ts"]}),
  entries: [
    {find: '@', replacement: path.resolve(__dirname, '../src')}
  ]
}

let dirs = fs.readdirSync(`${INPUT_PATH}/components`).filter(name => name[0] !== '_').map((name) => {
  return {
    input: `${INPUT_PATH}/components/${name}/index.ts`,
    external: ["vue"],
    plugins: [resolve({ extensions: [".vue"] }), alias(aliasConfig), vue({
      preprocessStyles: true,
      template: {
        isProduction: true,
      }
    }), postcss(), babel({
      presets: ["@vue/babel-plugin-jsx"]
    }), esbuild(), commonjs()],
    output: {
      name: "index",
      file: `${OUTPUT_PATH}/${name}/index.js`,
      format: "es",
    },
  };
});

dirs.push({
  input: `${INPUT_PATH}/entry.ts`,
  external: ["vue"],
  plugins: [resolve({ extensions: [".vue"] }), alias(aliasConfig), vue({
    preprocessStyles: true,
    template: {
      isProduction: true,
    }
  }), postcss(), vueJsx(), esbuild(), commonjs()],
  output: {
    name: "index",
    file: `${OUTPUT_PATH}/index.js`,
    format: "es"
  }
})

export default dirs;
