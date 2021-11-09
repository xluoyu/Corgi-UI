import fs from 'fs'
import docLoader from './loaders/doc-loader'
import demoLoader from './loaders/demo-loader'
import controlLoader from './loaders/control-loader'
const createVuePlugin = require('@vitejs/plugin-vue')

const mdReg = /\.(md)$/

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/],
})

const getTargetFile = async path => {
  const code = await fs.readFileSync(path, 'utf-8')
  if (path.endsWith('.demo.md')) {
    return demoLoader(code, path)
  } else if(path.endsWith('.control.md')) {
    return controlLoader(code, path)
  } else {
    return docLoader(code, path)
  }
}

const transformDemo = () => {
  const demoVitePlugin = {
    name: 'transform-demo',
    // 传入时的钩子
    transform(src, id) {
      if (mdReg.test(id)) {
        return getTargetFile(id)
      }
    },
    // 热更新
    async handleHotUpdate (ctx) {
      const { file } = ctx
      if (mdReg.test(file)) {
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: () => getTargetFile(file),
        })
      }
    },
  }

  return [demoVitePlugin, vuePlugin]
}

export default transformDemo
