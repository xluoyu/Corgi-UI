import { resolve } from 'path'
import chalk from 'chalk'

export const OUTPUT_PATH = resolve(__dirname, '../es')

export const onwarn = function onwarn(warning) {
  // 跳过某些警告
  if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
  // 抛出异常
  if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message)
  // 控制台打印一切警告
  console.warn(warning.message)
}

export const PREFIX = 'corgi-box/es'

export const green = (text: string) => {
  console.log(chalk.green(text))
}
export const yellow = (text: string) => {
  console.log(chalk.yellow(text))
}
export const red = (text: string) => {
  console.error(chalk.red(text))
}
