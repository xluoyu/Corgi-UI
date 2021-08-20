const marked = require('marked')
const ejs = require("ejs")
const createRenderer = require('../loaders/md-renderer')
const mdRenderer = createRenderer()
const {resolve} = require('path')

const demoTemplate = resolve(__dirname, '../template/demo-template.ejs')

const getCompoentObj = (tokens) => {
  const res = {}
  const contentTokens = []
  contentTokens.links = tokens.links
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      res.title = token.text
    } else if (token.type === 'code' && token.lang === 'html') {
      res.template = token.text
    } else if (token.type === 'code' && token.lang === 'js') {
      res.script = token.text
    } else if (token.type === 'code' && token.lang === 'css') {
      res.style = token.text
    } else {
      contentTokens.push(token)
    }
  }
  res.content = marked.parser(contentTokens, {
    renderer: mdRenderer
  })

  res.code = getCompoentCode(res)
  return res
}

const getCompoentCode = (obj) => {
  let code = ``
  if (obj.template) {
    code += `<template>\n`
    code += obj.template
      .split('\n')
      .map((line) => (line.length ? '  ' + line : line))
      .join('\n')
    code += `\n</template>\n`
  }
  if (obj.script) {
    code += `<script>\n`
    code += obj.script
    code += `\n</script>\n`
  }
  if (obj.style) {
    code += `<style>\n`
    code += obj.style
    code += `\n</style>\n`
  }

  return code
}

const renderVueComponent = (componentObj) => {
  return new Promise((reslove) => {
    ejs.renderFile(demoTemplate, {options: componentObj}, (err, str) => {
      if (err) {
        console.log(err)
        return
      }
      reslove(str)
    })
  })
}

const demoLoader = (code, path) => {
  const tokens = marked.lexer(code)
  const demoCompoentObj = getCompoentObj(tokens)
  return renderVueComponent(demoCompoentObj)
}


module.exports = demoLoader