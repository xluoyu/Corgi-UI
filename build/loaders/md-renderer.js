// import marked from 'marked'
// import hljs from 'highlight.js'
const marked = require('marked')

function createRenderer() {
  const renderer = new marked.Renderer()
  const overrides = {
    code (content, language) {
     return content 
    },
    heading (test, level) {
      
    }
  }

  Object.keys(overrides).forEach((key) => {
    renderer[key] = overrides[key]
  })

  return renderer
}

// export default createRenderer
module.exports = createRenderer