// import marked from 'marked'
const marked = require('marked')

function createRenderer() {
  const renderer = new marked.Renderer()
  const overrides = {
    code (code) {
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
    },
    paragraph: text => {
      return `<p class="cg-p">${text}</p>`
    },
    link (href, title, text) {
      return `<a class="cg-a" href="${href}">${text}<cg-icon><Link /></cg-icon></a>`
    },
  }

  Object.keys(overrides).forEach(key => {
    renderer[key] = overrides[key]
  })

  return renderer
}

module.exports = createRenderer
