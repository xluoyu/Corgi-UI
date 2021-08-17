import marked from 'marked'
import createRenderer from './md-renderer'
const mdRenderer = createRenderer()

const demoLoader = (code, path) => {
  return mdRenderer(code)
}


export default demoLoader