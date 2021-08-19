const fs = require('fs')
const ejs = require('ejs')
const path = require('path')

const createComponentIndex = (url, options) => {
  return new Promise((reslove) => {
    ejs.renderFile('./template/component/index.ejs', {options: options}, (err, str) => {
      if (err) {console.log(err); return}
      try {
        fs.opendirSync(url)
      } catch (err) {
        fs.mkdirSync(url)
      }

      fs.writeFileSync(path.join(url, `./index.ts`), str)
      reslove()
    })
  })
}

const createComponentCssVal = (url, options) => {
  return new Promise((reslove) => {
    ejs.renderFile('./template/component/styleVar.ejs', {options: options}, (err, str) => {
      if (err) {console.log(err); return}
      try {
        fs.opendirSync(url)
      } catch (err) {
        fs.mkdirSync(url)
      }

      fs.writeFileSync(path.join(url, `./styleVar.ts`), str)
      reslove()
    })
  })
}

const createComponentVue = (url, options) => {
  return new Promise((reslove) => {
    ejs.renderFile('./template/component/component.ejs', {options: options}, (err, str) => {
      if (err) {console.log(err); return}
  
      fs.writeFileSync(path.join(url, `./${options.fileName}.vue`), str)
      reslove()
    })
  })
}

const createComponent = async (rootPath, options) => {
  let componentUrl = path.join(rootPath, `./${options.name}`)
  let componentSrcUrl = path.join(rootPath, `./${options.name}/src`)
  await createComponentIndex(componentUrl, options)
  await createComponentCssVal(componentSrcUrl, options)
  await createComponentVue(componentSrcUrl, options)
}

module.exports = {
  createComponent
}