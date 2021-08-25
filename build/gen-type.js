const path = require('path')
const fs = require('fs')
const { Project } = require('ts-morph')
const vueCompiler = require('@vue/compiler-sfc')
const klawSync = require('klaw-sync')
const ora = require('ora')

const getFilePath = (url) => path.resolve(__dirname, url)

const TSCONFIG_PATH = getFilePath('../tsconfig.json')

const excludedFiles = [
  'package.json',
  'spec',
  'test',
  'tests',
  'style',
  '.DS_Store',
]
const exclude = path => !excludedFiles.some(f => path.includes(f))

const getTypes = async() => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true, // 生成声明文件
      emitDeclarationOnly: true, // 只生成声明文件，不产生js文件
      noEmitOnError: false, // 发送错误时不输出任何文件
      outDir: getFilePath('../types'),
      baseUrl: getFilePath('../'),
      paths: {
        '@components/*': ["src/components/*"],
      },
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })

  const sourceFiles = []

  const filePaths = klawSync(getFilePath('../src'), {
    nodir: true,
  }).map(item => item.path)
    .filter(e => !/\.spec/.test(e))
    .filter(e => /\.ts|\.vue/.test(e))

  /**
   * 对vue文件生成vue.d.ts
   */
  await Promise.all(
    filePaths.map(async file => {
      if (file.endsWith('.vue')) {
        const content = await fs.promises.readFile(file, 'utf-8')
        const sfc = vueCompiler.parse(content)
        const {script, scriptSetup} = sfc.descriptor
        if (script || scriptSetup) {
          let content = ''
          let isTS = false
          if (script && script.content) {
            content += script.content
            if (script.lang === 'ts') isTs = true
          }

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            })
            content += compiled.content
            if (scriptSetup.lang === 'ts') isTS = true
          }
          const sourceFile = project.createSourceFile(
            path.relative(process.cwd(), file) + (isTS ? '.ts' : '.js'),
            content,
          )
          sourceFiles.push(sourceFile)
        }
      } else if (file.endsWith('.ts')) {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    })
  )

  await project.emit({
    emitOnlyDtsFiles: true,
  })

  /**
   * 处理 components.ts 文件中的引用问题
   * '@components/xxx'
   */
  const importAlias = {
    '@components/': './cg-'
  }
  const entryFiles = ['src/components.ts']
  const filterSourceFiles = sourceFiles.filter(e => !/src\/\w+\//.test(e))
  for (const sourceFile of filterSourceFiles) {
    const sourceFilePathName = sourceFile.getFilePath()

    if(entryFiles.find(e => sourceFilePathName.includes(e))) {
      sourceFile.getExportDeclarations().map(modifySpecifier)
    }

    function modifySpecifier(d) {
      const specifier = d.getModuleSpecifierValue()
      const importAliasKeys = Object.keys(importAlias)
      if (specifier) {
        let importAliasKey = importAliasKeys.find(e => specifier.includes(e))
        const importItem = specifier.slice(importAliasKey.length)
        let replacer = importAlias[importAliasKey] + importItem
        // const originalPath = path.resolve(ROOT_PATH, replacer)

        // const sourceDir = path.dirname(path.resolve(sourceFilePathName, '../'))
        // const replaceTo = path.relative(sourceDir, originalPath)
        d.setModuleSpecifier(replacer)
      }
    }

    const emitOutput = sourceFile.getEmitOutput()
    for (const outputFile of emitOutput.getOutputFiles()) {
      const filepath = outputFile.getFilePath()
      await fs.promises.writeFile(filepath, outputFile.getText(), 'utf-8')
    }
  }
}

const spinner = ora('Generate types...\n').start()

getTypes()
  .then(() => spinner.succeed('Success !\n'))
  .catch(e => spinner.fail(`${e} !\n`))
