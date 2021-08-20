// import marked from 'marked'
const hljs = require('highlight.js')
const marked = require('marked')

function createRenderer() {
  const renderer = new marked.Renderer()
  const overrides = {
    code (code, language) {
      return code
    },
    codespan(code) {

      return `<code class="cg-text--code">${code}</code>`
    },
    heading (text, level) {
      return `<h${level} class="cg-h${level}">${text}</h${level}>`
    },
    table (header, body) {
      return `<div class="cg-table-wrapper">
        <table>
        <thead>
          ${header}
        </thead>
          <tbody>
            ${body}
          </tbody>
        </table>
      </div>
      `
    }
  }

  Object.keys(overrides).forEach((key) => {
    renderer[key] = overrides[key]
  })

  return renderer
}

// export default createRenderer
module.exports = createRenderer