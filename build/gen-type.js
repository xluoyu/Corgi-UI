/**
 * 生成TS类型声明文件
 */
const path = require('path')
const fs = require('fs')
const { Project } = require('ts-morph')
const vueCompiler = require('@vue/compiler-sfc')
const klawSync = require('klaw-sync')
const ora = require('ora')

const getFilePath = url => path.resolve(__dirname, url)

const TSCONFIG_PATH = getFilePath('../tsconfig.json')

const getTypes = async() => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true, // 生成声明文件
      noEmitOnError: false, // 发送错误时不输出任何文件
      outDir: getFilePath('../types'),
      baseUrl: getFilePath('../'),
      paths: {
        '@components/*': ['src/components/*'],
        '@hooks/*': ['src/hooks/*'],
        '@utils/*': ['src/utils/*'],
      },
      exclude: [
        'node_modules',
      ],
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })

  // 待编译文件数组
  const sourceFiles = []

  /**
   * 读取src下的所有文件
   *
   * 过滤测试用文件，只留下.ts/.vue类型的文件
   */
  const filePaths = klawSync(getFilePath('../src'), {
    nodir: true,
  }).map(item => item.path)
    .filter(e => !/\.spec/.test(e))
    .filter(e => /\.ts|\.vue/.test(e))


  await Promise.all(
    filePaths.map(async file => {
      /**
       * 对vue文件生成vue.d.ts
       */
      if (file.endsWith('.vue')) {
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
            if (script.lang === 'ts') isTs = true
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
            if (scriptSetup.lang === 'ts') isTS = true
          }
          // 将处理好的内容使用ts-morph的APi生成待编译文件
          const sourceFile = project.createSourceFile(
            path.relative(process.cwd(), file) + (isTS ? '.ts' : '.js'),
            content,
          )
          // 放到待编译数组中
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

  /**
   * 这里对alias做了特殊处理
   *
   * import {warn} from '@utils/error' => import {warn} from '../utils/error'
   *
   */
  const importAlias = {
    '@components/': '/cg-',
    '@utils/': '/utils/',
    '@hooks/': '/hooks/',
  }
  const importAliasKeys = Object.keys(importAlias)
  const ROOT_PATH = path.resolve(__dirname, '../src')

  for (const sourceFile of sourceFiles) {
    // 生成文件的地址链接
    const sourceFilePathName = sourceFile.getFilePath()
    sourceFile.getExportDeclarations().map(modifySpecifier)
    sourceFile.getImportDeclarations().map(modifySpecifier)

    function modifySpecifier(d) {
      if (!d) return
      const specifier = d.getModuleSpecifierValue()
      if (specifier) {
        let importAliasKey = importAliasKeys.find(e => specifier.includes(e))
        if (!importAliasKey) return
        const importItem = specifier.slice(importAliasKey.length)
        let replacer = importAlias[importAliasKey] + importItem
        let originalPath = path.relative(sourceFilePathName, ROOT_PATH)
        if (sourceFilePathName.includes('src/components')) {
          originalPath = originalPath.slice(6) // 减去两级 ../../
        }
        if (sourceFilePathName.includes('src/hooks')) {
          originalPath = originalPath.slice(3) // 减去一级 ../
        }
        if (!originalPath) {
          originalPath = '.'
        }
        d.setModuleSpecifier(originalPath + replacer)
      }
    }

    const emitOutput = sourceFile.getEmitOutput()
    for (const outputFile of emitOutput.getOutputFiles()) {
      const filepath = outputFile.getFilePath()
      await fs.promises.writeFile(filepath, outputFile.getText(), 'utf-8')
    }
  }
}

const spinner = ora('打包类型文件中...\n').start()

getTypes()
  .then(() => spinner.succeed('Success !\n'))
  .catch(e => spinner.fail(`${e} !\n`))
