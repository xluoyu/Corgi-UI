import { readFileSync, statSync } from 'fs'
import createRenderer from './md-renderer'
const mdRenderer = createRenderer()
import { lexer, parser } from 'marked'
import { renderFile } from 'ejs'
import { resolve } from 'path'
import hljs from '../../../site/utils/hljs'
import dayjs from 'dayjs'

const docTemplate = resolve(__dirname, '../template/doc-template.ejs')
const controlTemplate = resolve(__dirname, '../template/doc-template.ejs')

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

const genDemosTemplate = (demos, column) => {
  return `<demos column="${column}">${demos.map(e => e.tag).join('\n')}</demos>`
}

const docLoader = async (code, path) => {
  let codeObject = lexer(code)
  let compoentList = []
  let demoColumn = 'two'
  let docType = 'default'
  await Promise.all(codeObject.map(async (item, index) => {
    if (item.type === 'html' && item.text === '<!-- control -->\n') {
      docType = 'control'
    }else if (item.type === 'html' && item.text === '<!-- oneColumn -->\n') {
      demoColumn = 'one'
    }else if (item.type === 'code' && item.lang === 'demo') {
      compoentList = await filterDemos(item.text, path)
      codeObject[index] = {
        type: 'html',
        pre: false,
        text: genDemosTemplate(compoentList, demoColumn),
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

  const lastTime = dayjs(statSync(path).mtime).format('YYYY-MM-DD HH:mm')
  return renderDocVueComponent(docType, docMainTemplate, compoentList, lastTime)
}

const renderDocVueComponent = (docType = 'docType', content, componentList, lastTime) => {
  return new Promise(reslove => {
    renderFile(docType == 'default' ? docTemplate : controlTemplate, { content, componentList, lastTime }, (err, str) => {
      if (err) {
        console.log(err)
        return
      }
      reslove(str)
    })
  })
}

export default docLoader
