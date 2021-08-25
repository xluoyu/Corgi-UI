const {INPUT_PATH, OUTPUT_PATH, onwarn, alias} = require('./config')
const {nodeResolve} = require("@rollup/plugin-node-resolve") // 告诉 Rollup 如何查找外部模块
const esbuild = require("rollup-plugin-esbuild")

export default {
  input: `${INPUT_PATH}/index.ts`,
  plugins: [
    nodeResolve(),
    esbuild(),
  ],
  external: ['vue'],
  output: {
    name: "index",
    file: `${OUTPUT_PATH}/index.js`,
    format: "es",
    paths: (id) => {
      if (/@components/.test(id)) {
        return './cg-' + id.slice('@components/'.length);
      }
      if (/@hooks/.test(id)) {
        return './hooks/' + id.slice('@hooks/'.length)
      }
      if (/@utils/.test(id)) {
        return './utils/' + id.slice('@utils/'.length)
      }
    }
  },
  onwarn
}