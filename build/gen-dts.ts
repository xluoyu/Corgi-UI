/**
 * 生成所需的.d.ts
 */
import { resolve, dirname } from 'path'
import fs from 'fs'
import { Project } from 'ts-morph'
import * as vueCompiler from '@vue/compiler-sfc'
import klawSync from 'klaw-sync'

const getFilePath = url => resolve(__dirname, url)

const TSCONFIG_PATH = getFilePath('../tsconfig.json')

const genDts = async (entry: string) => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true, // 生成声明文件
      noEmitOnError: false, // 发送错误时不输出任何文件
      emitDeclarationOnly: true,
      outDir: resolve(entry, './dist'),
      baseUrl: getFilePath('../'),
      paths: {
        '@corgi/*': ['src/*'],
      },
      skipLibCheck: true,
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })

  const excludedRiles = [
    'mock',
    'package.json',
    'spec',
    'test',
    'demos',
    'demo',
  ]
  const exclude = (path: string) => !excludedRiles.some(e => path.includes(e))

  /**
   * 读取src下的所有文件
   *
   * 过滤测试用文件，只留下.ts/.vue类型的文件
   */
  const filePaths = klawSync(entry, {
    nodir: true,
  }).map(item => item.path)
    .filter(e => /\.ts|\.vue/.test(e))
    .filter(exclude)


  // 待编译文件数组
  const sourceFiles = []

  await Promise.all(
    filePaths.map(async file => {
      if (file.endsWith('.vue')) {
        /**
         * 对vue文件生成vue.d.ts
         */
        const content = await fs.promises.readFile(file, 'utf-8')
        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor

        /**
         * 因为ts只能是对ts的编译，所以要提取.vue中的ts内容
         */
        if (script || scriptSetup) {
          let content = ''
          let isTS = false
          // 获取<script>的内容、并标记语言
          if (script && script.content) {
            content += script.content
            if (script.lang === 'ts' || script.lang === 'tsx' ) isTS = true
          }

          /**
            * 因为是<script setup>的语法，需要额外调用compileScript
            *
            *	该api可以从vue描述符中获取script的内容

            * 这里需要一个必填的第二个参数 options{id: string}
            * 主要是用来生成css的hash的，所以此时可以随意填
            */
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            })
            content += compiled.content
            if (scriptSetup.lang === 'ts' || scriptSetup.lang === 'tsx' ) isTS = true
          }

          // 将处理好的内容使用ts-morph的APi生成待编译文件
          const sourceFile = project.createSourceFile(
            resolve(process.cwd(), file) + (isTS ? '.ts' : '.js'),
            content,
          )

          sourceFiles.push(sourceFile)
        }
      } else if (file.endsWith('.ts')) {
        // 对于普通的ts 直接添加上文件链接，放到数组中
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
  )

  /**
   * 开始执行编译
   */
  await project.emit({
    emitOnlyDtsFiles: true, // 只编译指定内容
  })

  // for (const sourceFile of sourceFiles) {
  //   const emitOutput = sourceFile.getEmitOutput()
  //   for (const outputFile of emitOutput.getOutputFiles()) {
  //     const filePath = outputFile.getFilePath()
  //     await fs.promises.mkdir(dirname(filePath), {
  //       recursive: true,
  //     })
  //     await fs.promises.writeFile(filePath, outputFile.getText(), 'utf-8')
  //   }
  // }
}

export default genDts
