import { PluginOption } from "vite"
import marked from 'marked'
import hljs from 'highlight.js'
import fs from 'fs'
import demoLoader from './loaders/demo-loader'

const demoReg = /\.(md)$/

const mdToJs = (str) => {
  const content = JSON.stringify(marked(str))
  return `export default ${content}`
}

const getTargetFile = async (path) => {
  const code = await fs.readFileSync(path, 'utf-8')
  return demoLoader(code, path)
}

const transformDemo = () => {
  const demoVitePlugin:PluginOption = {
    name: 'transform-demo',
    transform(src, id) {
      if (demoReg.test(id)) {
        return getTargetFile(id)
      }
    },
    async handleHotUpdate (ctx) {
    }
  }

  return [demoVitePlugin]
}

export default transformDemo