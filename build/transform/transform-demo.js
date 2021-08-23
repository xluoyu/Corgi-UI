import fs from 'fs'
import docLoader from './loaders/doc-loader'
import demoLoader from './loaders/demo-loader'
const createVuePlugin = require('@vitejs/plugin-vue')

const mdReg = /\.(md)$/

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
})

const getTargetFile = async (path) => {
  const code = await fs.readFileSync(path, 'utf-8')
  if (path.endsWith('.demo.md')) {
    return demoLoader(code, path)
  } else {
    return docLoader(code, path)
  }
}

const transformDemo = () => {
  const demoVitePlugin = {
    name: 'transform-demo',
    transform(src, id) {
      if (mdReg.test(id)) {
        return getTargetFile(id)
      }
    },
    async handleHotUpdate (ctx) {
      const { file } = ctx
      if (mdReg.test(file)) {
        const code = await getTargetFile(file)
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: () => code
        })
      }
    }
  }

  return [demoVitePlugin, vuePlugin]
}

export default transformDemo