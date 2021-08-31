import { resolve } from 'path'

const INPUT_PATH = resolve(__dirname, '../src')
const OUTPUT_PATH = resolve(__dirname, '../es')
const _INPUT_PATH = INPUT_PATH
export { _INPUT_PATH as INPUT_PATH }
const _OUTPUT_PATH = OUTPUT_PATH
export { _OUTPUT_PATH as OUTPUT_PATH }

export function onwarn(warning) {
  // 跳过某些警告
  if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
  // 抛出异常
  if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message)
  // 控制台打印一切警告
  console.warn(warning.message)
}

export const alias = [
  '@components',
  '@hooks',
  '@utils',
]
