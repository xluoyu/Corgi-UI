const fs = require('fs')
const createRenderer = require('./md-renderer')
const mdRenderer = createRenderer()
const marked = require('marked')
const ejs = require('ejs')
const { resolve } = require('path')

const docTemplate = resolve(__dirname, '../template/doc-template.ejs')

async function resolveDemoTitle (fileName, demoEntryPath) {
  const demoStr = fs.readFileSync(
    resolve(demoEntryPath, '..', fileName),
    'utf-8',
  )
  return demoStr.match(/# ([^\n]+)/)[1]
}

const filterDemos = (string, url) => {
  return Promise.all(string.split('\n').map(async e => {
    let component = `${e}Demo`
    let fileName = `${e}.demo.md`
    return {
      id: e,
      component,
      fileName,
      title: await resolveDemoTitle(fileName, url),
      tag: `<${component} ref="${component}"/>`,
    }
  }))
}

const genDemosTemplate = demos => {
  return `<demos>${demos.map(e => e.tag).join('\n')}</demos>`
}

const docLoader = async (code, path) => {
  let codeObject = marked.lexer(code)

  const demoIndex = codeObject.findIndex(e => e.type === 'code' && e.lang === 'demo')
  let compoentList = []
  if (demoIndex !== -1) {
    compoentList = await filterDemos(codeObject[demoIndex].text, path)
    codeObject.splice(demoIndex, 1, {
      type: 'html',
      pre: false,
      text: genDemosTemplate(compoentList),
    })
  }

  const docMainTemplate = marked.parser(codeObject, {
    gfm: true,
    renderer: mdRenderer,
  })

  return renderDocVueComponent(docMainTemplate, compoentList)
}

const renderDocVueComponent = (content, componentList) => {
  return new Promise(reslove => {
    ejs.renderFile(docTemplate, { content, componentList }, (err, str) => {
      if (err) {
        console.log(err)
        return
      }
      reslove(str)
    })
  })
}

module.exports = docLoader
