import fs from 'fs'
import docLoader from './loaders/doc-loader'
import demoLoader from './loaders/demo-loader'
const createVuePlugin = require('@vitejs/plugin-vue')
const path = require('path')

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

const test = async () => {
  const code = await fs.readFileSync(path.resolve(__dirname, '../demo/views/test.vue'), 'utf-8')
  return code
}

const transformDemo = () => {
  const demoVitePlugin = {
    name: 'transform-demo',
    transform(src, id) {
      if (mdReg.test(id)) {
        // getTargetFile(id).then(res => console.log(res))
        return getTargetFile(id)

        // return test()
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