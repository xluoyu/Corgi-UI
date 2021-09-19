const { resolve } = require('path')

module.exports.INPUT_PATH = resolve(__dirname, '../src')
module.exports.OUTPUT_PATH = resolve(__dirname, '../es')

module.exports.onwarn = function onwarn(warning) {
  // 跳过某些警告
  if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
  // 抛出异常
  if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message)
  // 控制台打印一切警告
  console.warn(warning.message)
}

module.exports.PREFIX = 'corgi-box/es'

