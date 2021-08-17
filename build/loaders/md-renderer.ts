import marked from 'marked'
import hljs from 'highlight.js'

function createRenderer() {
  const renderer = new marked.Renderer()
  const overrides = {
    code (content, language) {
     return content 
    }
  }

  Object.keys(overrides).forEach((key) => {
    renderer[key] = overrides[key]
  })

  return renderer
}

export default createRenderer