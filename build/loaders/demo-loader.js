const fs = require('fs')
const createRenderer = require('./md-renderer')
const mdRenderer = createRenderer()
const marked = require('marked')

const filterDemos = (string) => {
  return string.split('\n').map(e => {
    let component = `${e}Demo`
    return {
      id: e,
      component,
      fileName: `${e}.demo.md`,
      tag: `<${component}>`
    }
  })
}

const genDemosTemplate = (demos) => {
  return `<compoent-demos>${demos.map(e => e.tag).join('\n')}</compoent-demos`
}

const demoLoader = (code, path) => {
  let codeObject = marked.lexer(code)


  const demoIndex =  codeObject.findIndex(e => e.type === 'code' && e.lang === 'demo')
  
  if (demoIndex !== -1) {
    const compoents = filterDemos(codeObject[demoIndex].text)
    codeObject.splice(demoIndex, 1, {
      type: 'html',
      pre: false,
      text: genDemosTemplate(compoents)
    })
  }
  
  const docMainTemplate = marked.parser(codeObject, {
    gfm: true,
    renderer: mdRenderer
  })
  console.log(codeObject)
}

const getTargetFile = async (path) => {
  const code = await fs.readFileSync(path, 'utf-8')
  return demoLoader(code, path)
}


getTargetFile('../../src/components/button/demos/index.md')

//  default demoLoader