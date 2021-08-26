const {resolve} = require('path')

const INPUT_PATH = resolve(__dirname, "../src")
const OUTPUT_PATH = resolve(__dirname, "../es")
exports.INPUT_PATH = INPUT_PATH
exports.OUTPUT_PATH = OUTPUT_PATH

exports.onwarn = (warning) => {
  // 跳过某些警告
  if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
  // 抛出异常
  if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message);
  // 控制台打印一切警告
  console.warn(warning.message);
}

exports.alias = [
  '@components',
  '@hooks',
  '@utils'
]
  