import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import buble from "rollup-plugin-buble";
import replace from "rollup-plugin-replace";

// 入口
const input = "src/index.ts";
// 插件
const plugins = [
  nodeResolve(),
  commonjs(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
  vue({
    preprocessStyles: true,
    template: {
      isProduction: true,
    }
  }),
  typescript({
    objectHashIgnoreUnknownHack: true,
  }),
  buble()
];

// 外链 - 外部依赖的名称
const external = ["vue"];

export default [
  {
    input,
    output: {
      file: "lib/index.umd.js",
      format: "umd",
      name: "rollup-vue-ts",
      sourcemap: false,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: "lib/index.esm.js",
      format: "es",
      sourcemap: false,
    },
    plugins,
    external,
  },
];