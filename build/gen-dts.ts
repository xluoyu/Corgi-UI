/**
 * 生成所需的.d.ts
 */
import { resolve } from 'path'
import fs from 'fs'
import { Project } from 'ts-morph'
import vueCompiler from '@vue/compiler-sfc'
import klawSync from 'klaw-sync'

const getFilePath = url => resolve(__dirname, url)

const genDts = async entry => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true, // 生成声明文件
      noEmitOnError: false, // 发送错误时不输出任何文件
      outDir: getFilePath('../types'),
      baseUrl: getFilePath('../'),
      paths: {
        '@corgi/*': ['src/*'],
      },
      skipLibCheck: true,
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })

}

export default genDts
