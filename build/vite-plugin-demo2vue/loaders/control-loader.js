import { readFileSync, statSync } from 'fs'
import createRenderer from './md-renderer'
const mdRenderer = createRenderer()
import { lexer, parser } from 'marked'
import { renderFile } from 'ejs'
import { resolve } from 'path'
import hljs from '../../../website/utils/hljs'
import dayjs from 'dayjs'

const controlTemplate = resolve(__dirname, '../template/control-template.ejs')

const genControlTemplate = () => {
  return `<controlBox :key="controlKey" :config="config" @reset="reset"/>`
}

const docLoader = async (code, path) => {
  let codeObject = lexer(code)
  await Promise.all(codeObject.map(async (item, index) => {
    if (item.type === 'html' && item.text === '<!-- control -->\n\n') {
      codeObject[index] = {
        type: 'html',
        pre: false,
        text: genControlTemplate(path),
      }
    } else if (item.type === 'code') {
      const code = hljs.highlight(codeObject[index].text, { language: item.lang }).value
      codeObject[index].text = `<cg-card><pre class="code">${code}</pre></cg-card>\n`
    }
  }))
  console.log(codeObject)

  const docMainTemplate = parser(codeObject, {
    gfm: true,
    renderer: mdRenderer,
  })

  console.log(docMainTemplate)

  const lastTime = dayjs(statSync(path).mtime).format('YYYY-MM-DD HH:mm')

  return renderControlVueComponent(docMainTemplate, compoentList, lastTime)
}

const renderControlVueComponent = (content, componentList, lastTime) => {
  return new Promise(reslove => {
    renderFile(controlTemplate, { content, componentList, lastTime }, (err, str) => {
      if (err) {
        console.log(err)
        return
      }
      reslove(str)
    })
  })
}

export default docLoader
