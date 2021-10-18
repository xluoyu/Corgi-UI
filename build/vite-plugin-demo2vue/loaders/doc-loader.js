import { readFileSync } from 'fs'
import createRenderer from './md-renderer'
const mdRenderer = createRenderer()
import { lexer, parser } from 'marked'
import { renderFile } from 'ejs'
import { resolve } from 'path'
import hljs from '../../../site/utils/hljs'

const docTemplate = resolve(__dirname, '../template/doc-template.ejs')

async function resolveDemoTitle (fileName, demoEntryPath) {
  const demoStr = readFileSync(
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
  let codeObject = lexer(code)
  let compoentList = []

  await Promise.all(codeObject.map(async (item, index) => {
    if (item.type === 'code' && item.lang === 'demo') {
      compoentList = await filterDemos(item.text, path)
      codeObject[index] = {
        type: 'html',
        pre: false,
        text: genDemosTemplate(compoentList),
      }
    } else if (item.type === 'code') {
      const code = hljs.highlight(codeObject[index].text, { language: item.lang }).value
      codeObject[index].text = `<cg-card><pre class="code">${code}</pre></cg-card>\n`
    }
  }))
  const docMainTemplate = parser(codeObject, {
    gfm: true,
    renderer: mdRenderer,
  })
  return renderDocVueComponent(docMainTemplate, compoentList)
}

const renderDocVueComponent = (content, componentList) => {
  return new Promise(reslove => {
    renderFile(docTemplate, { content, componentList }, (err, str) => {
      if (err) {
        console.log(err)
        return
      }
      reslove(str)
    })
  })
}

export default docLoader
