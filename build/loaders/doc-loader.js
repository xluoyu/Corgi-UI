const fs = require('fs')
const createRenderer = require('./md-renderer')
const mdRenderer = createRenderer()
const marked = require('marked')
const ejs = require('ejs')
const { resolve } = require('path')

const docTemplate = resolve(__dirname, '../template/doc-template.ejs')

const filterDemos = (string) => {
  return string.split('\n').map(e => {
    let component = `${e}Demo`
    return {
      id: e,
      component,
      fileName: `${e}.demo.md`,
      tag: `<${component} />`
    }
  })
}

const genDemosTemplate = (demos) => {
  return `<demos>${demos.map(e => e.tag).join('\n')}</demos>`
}

const docLoader = (code, path) => {
  let codeObject = marked.lexer(code)

  const demoIndex =  codeObject.findIndex(e => e.type === 'code' && e.lang === 'demo')
  let compoentList = []
  if (demoIndex !== -1) {
    compoentList = filterDemos(codeObject[demoIndex].text)
    codeObject.splice(demoIndex, 1, {
      type: 'html',
      pre: false,
      text: genDemosTemplate(compoentList)
    })
  }
  
  const docMainTemplate = marked.parser(codeObject, {
    gfm: true,
    renderer: mdRenderer
  })

  return renderDocVueComponent(docMainTemplate, compoentList)
}

const renderDocVueComponent = (content, componentList) => {
  return new Promise((reslove) => {
    ejs.renderFile(docTemplate, {content, componentList}, (err, str) => {
      if (err) {
        console.log(err)
        return
      }
      reslove(str)
    })
  })
}

// let res = getTargetFile('../../src/components/button/demos/index.md')
// res.then(res => {
  // console.log(res)
// })
module.exports = docLoader